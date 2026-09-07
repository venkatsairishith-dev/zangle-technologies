import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { PALETTE } from '../config';
import type { QualitySettings } from '../types';
import type { SharedGeometries } from '../utils/geometries';
import { buildCoreObjects } from '../utils/sceneLayout';
import { InteractiveObject, useInteractiveRefs } from '../InteractiveObject';
import { HighlightShell } from './HighlightShell';
import { evalDrift } from '../utils/motion';
import { sceneState } from '../state/sceneState';

/**
 * The cluster of small solids suspended inside the hero sphere.
 *
 * These are deliberately *opaque*: three.js renders only opaque geometry into
 * the transmission buffer, so making them glass too would make them vanish the
 * moment the shell refracted them.
 */
const CoreCluster: React.FC<{ geometry: THREE.SphereGeometry }> = ({ geometry }) => {
  const group = useRef<THREE.Group>(null);
  const cores = useMemo(() => buildCoreObjects(), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const materials = useMemo(
    () =>
      cores.map(
        (core) =>
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(PALETTE.heroCore[core.colorIndex % PALETTE.heroCore.length]),
            roughness: 0.14,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            emissive: new THREE.Color(PALETTE.heroCore[core.colorIndex % PALETTE.heroCore.length]),
            emissiveIntensity: 0.7,
            envMapIntensity: 1.15,
          }),
      ),
    [cores],
  );

  useFrame((state) => {
    const t = sceneState.reducedMotion ? 0 : state.clock.elapsedTime;
    if (group.current) {
      // The cluster turns as a whole while each member also drifts, so the
      // interior never settles into a readable pattern.
      group.current.rotation.y = t * 0.07;
      group.current.rotation.x = Math.sin(t * 0.05) * 0.25;
    }
    cores.forEach((core, index) => {
      const mesh = refs.current[index];
      if (!mesh) return;
      const drift = evalDrift(core.motion, t, index * 2.7);
      mesh.position.set(
        core.basePosition[0] + drift[0],
        core.basePosition[1] + drift[1],
        core.basePosition[2] + drift[2],
      );
      mesh.rotation.y = t * (0.1 + index * 0.05);
    });
  });

  return (
    <group ref={group}>
      {cores.map((core, index) => (
        <mesh
          key={core.id}
          ref={(node) => {
            refs.current[index] = node;
          }}
          geometry={geometry}
          material={materials[index]}
          scale={core.scale}
          raycast={() => null}
        />
      ))}
    </group>
  );
};

/** Animates the shell's optical properties against hover/selection. */
const ShellResponse: React.FC<{ material: React.MutableRefObject<any> }> = ({ material }) => {
  const refs = useInteractiveRefs();
  useFrame(() => {
    const m = material.current;
    if (!m) return;
    const energy = refs.hover.current * 0.6 + refs.select.current;
    // Dialling chromatic aberration and distortion up on hover makes the glass
    // feel like it is *reacting optically*, not just getting brighter.
    if ('chromaticAberration' in m) m.chromaticAberration = 0.08 + energy * 0.1;
    if ('distortion' in m) m.distortion = 0.06 + energy * 0.16;
    if ('thickness' in m) m.thickness = 1.25 + energy * 0.45;
    if ('envMapIntensity' in m) m.envMapIntensity = 0.9 + energy * 0.7;
    // Transmissive glass cannot simply fade its alpha, so the hero yields to
    // page UI by flattening instead: less refraction, less environment, and a
    // thinner shell all pull it back towards plain air.
    const dim = refs.dim.current;
    if (dim > 0.001) {
      if ('envMapIntensity' in m) m.envMapIntensity *= 1 - dim * 0.75;
      if ('thickness' in m) m.thickness *= 1 - dim * 0.6;
      if ('chromaticAberration' in m) m.chromaticAberration *= 1 - dim;
    }
  });
  return null;
};

interface GlassSphereProps {
  quality: QualitySettings;
  geometries: SharedGeometries;
  position?: [number, number, number];
  scale?: number;
}

/**
 * The hero: a large refractive sphere holding a slowly turning cluster of
 * glowing cores, exactly as the reference frames it just left of centre.
 *
 * On capable hardware the shell uses drei's transmission material for real
 * chromatic aberration and a backside pass. Below that it falls back to
 * `MeshPhysicalMaterial`, which still refracts through three's built-in
 * transmission pass but costs a fraction as much.
 */
export const GlassSphere: React.FC<GlassSphereProps> = ({
  quality,
  geometries,
  // Right edge, deliberately cropped by the frame.
  //
  // In the first viewport there is genuinely no clear region large enough to
  // hold an object this size: the copy owns the left, the shortlist card owns
  // the right, and the gap between them is about 75px. So rather than shrink
  // the hero until it fits a gap -- at which point it is not a hero -- it is
  // placed outboard of the card and allowed to run off the edge. The card
  // stays the dominant element with the sphere reading behind and past it,
  // which is depth rather than collision, and the crescent that remains is on
  // the side away from the headline.
  position = [9.0, 0.2, -6.6],
  scale = 2.5,
}) => {
  const materialRef = useRef<any>(null);

  const motion = useMemo(
    () => ({
      amplitude: [0.22, 0.34, 0.16] as [number, number, number],
      frequency: [0.045, 0.037, 0.03] as [number, number, number],
      phase: [0.4, 2.1, 4.0] as [number, number, number],
      spin: [0.006, 0.018, 0.004] as [number, number, number],
      wobble: [0.03, 0.05, 0.02] as [number, number, number],
      breath: 0.012,
      breathSpeed: 0.18,
      noiseAmplitude: 0.18,
      noiseSpeed: 0.025,
    }),
    [],
  );

  return (
    <InteractiveObject
      id="hero-sphere"
      basePosition={position}
      motion={motion}
      parallax={0.94}
      baseScale={scale}
      seed={0.5}
      hoverScale={0.035}
    >
      <ShellResponse material={materialRef} />

      <mesh geometry={geometries.heroSphere} renderOrder={3}>
        {quality.heroTransmission ? (
          <MeshTransmissionMaterial
            ref={materialRef}
            // The only transmissive object left in the scene, so it can stay
            // real. Samples are what cost -- each one is another blur pass --
            // while resolution is just buffer size, so 2 x 256 keeps the
            // interior crisp for roughly half the price of the original 4.
            samples={2}
            resolution={192}
            transmission={1}
            // Thickness and attenuation are what give glass a *body*: the tint
            // deepens towards the silhouette, where the light path through the
            // glass is longest, and that gradient is the strongest cue that an
            // object is both solid and transparent. Beer-Lambert absorption is
            // exponential in thickness/distance though, so this is a narrow
            // window -- at distance 1.35 the sphere went to near-black, and at
            // 3.2 it absorbed nothing and vanished into the page.
            thickness={1.25}
            roughness={0.02}
            // Higher IOR bends more, so the ring of compressed background
            // around the rim is wider and the edge is legible.
            ior={1.46}
            chromaticAberration={0.08}
            anisotropy={0}
            distortion={0.06}
            distortionScale={0.25}
            temporalDistortion={0}
            color="#dff2fb"
            attenuationColor="#63c8ea"
            attenuationDistance={2.9}
            envMapIntensity={0.9}
            toneMapped
          />
        ) : (
          <meshPhysicalMaterial
            ref={materialRef}
            color="#f2fbff"
            roughness={0.06}
            metalness={0}
            transmission={quality.transmission ? 1 : 0}
            thickness={quality.transmission ? 1.8 : 0}
            attenuationColor="#63c8ea"
            attenuationDistance={3.0}
            ior={1.44}
            clearcoat={1}
            clearcoatRoughness={0.04}
            transparent={!quality.transmission}
            opacity={quality.transmission ? 1 : 0.55}
            envMapIntensity={0.9}
          />
        )}
      </mesh>

      <CoreCluster geometry={geometries.coreSphere} />
      {/* Same silhouette-plus-sheen pairing as the small spheres, at the
          weight the hero needs to hold the frame. */}
      <HighlightShell
        geometry={geometries.heroSphere}
        color="#3fd3ea"
        edgeColor="#0f5580"
        edgeOpacity={0.4}
        scale={1.018}
        power={2.6}
        baseOpacity={0.3}
      />
    </InteractiveObject>
  );
};
