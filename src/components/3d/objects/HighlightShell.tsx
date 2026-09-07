import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useInteractiveRefs } from '../InteractiveObject';

const VERTEX = /* glsl */ `
varying vec3 vWorldNormal;
varying vec3 vViewDir;
void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPosition.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uEdgeColor;
uniform float uOpacity;
uniform float uEdgeOpacity;
uniform float uPower;
varying vec3 vWorldNormal;
varying vec3 vViewDir;
void main() {
  // Fresnel: bright only where the surface turns away from the eye, so the
  // highlight traces the silhouette instead of washing the whole object out.
  float f = 1.0 - abs(dot(normalize(vWorldNormal), normalize(vViewDir)));

  // Two lobes from one dot product, in one draw call.
  //
  // The tight lobe is a dark cool line right at the silhouette: a transparent
  // object on a light ground has no boundary of its own, and without one the
  // eye cannot separate it from the background no matter how bright the rest
  // of it is. The broad lobe is the coloured specular sheen inside that line.
  // Running these as two separate meshes doubled the transparent draw calls
  // for an effect that is a single extra pow().
  float edge = pow(f, uPower * 2.2);
  float sheen = pow(f, uPower);

  float aEdge = edge * uEdgeOpacity;
  float aSheen = sheen * uOpacity;
  float alpha = aEdge + aSheen * (1.0 - aEdge);
  if (alpha < 0.002) discard;

  // Composite the sheen under the edge line so the darker boundary always wins
  // where they overlap -- otherwise the bright lobe fills in the very edge it
  // is supposed to be sitting inside.
  vec3 rgb = (uEdgeColor * aEdge + uColor * aSheen * (1.0 - aEdge)) / max(alpha, 1e-4);
  gl_FragColor = vec4(rgb, alpha);
}
`;

interface HighlightShellProps {
  geometry: THREE.BufferGeometry;
  color: string;
  /** Cool dark line drawn at the extreme silhouette. */
  edgeColor?: string;
  edgeOpacity?: number;
  /** Multiplier on the parent's scale; must clear the surface it wraps. */
  scale?: number;
  power?: number;
  /**
   * Rim strength when the object is untouched. A permanent trace of colour on
   * the silhouette is what lets clear glass hold an edge against a white page.
   */
  baseOpacity?: number;
}

/**
 * The visible affordance. A thin additive rim that fades up on hover and burns
 * brighter on selection, sharing the object's own geometry so the glow always
 * fits the silhouette exactly -- no sprite, no outline pass, one extra draw call.
 */
export const HighlightShell: React.FC<HighlightShellProps> = ({
  geometry,
  color,
  edgeColor = '#15618f',
  edgeOpacity = 0,
  scale = 1.045,
  power = 2.4,
  baseOpacity = 0,
}) => {
  const refs = useInteractiveRefs();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uEdgeColor: { value: new THREE.Color(edgeColor) },
          uOpacity: { value: baseOpacity },
          uEdgeOpacity: { value: edgeOpacity },
          uPower: { value: power },
        },
        transparent: true,
        depthWrite: false,
        // Normal, not additive. On a near-white ground additive blending has
        // nothing left to add and the highlight simply does not appear.
        blending: THREE.NormalBlending,
        side: THREE.FrontSide,
        toneMapped: false,
      }),
    [color, edgeColor, power, baseOpacity, edgeOpacity],
  );

  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const visibility = 1 - refs.dim.current;
    const opacity = (baseOpacity + refs.hover.current * 0.5 + refs.select.current * 0.8) * visibility;
    // The silhouette line does not brighten with interaction -- it is structure,
    // not feedback -- but it does yield to the readability fade like everything
    // else, so a rim never outlines an object that has stepped behind the copy.
    const edge = edgeOpacity * visibility;
    material.uniforms.uOpacity.value = opacity;
    material.uniforms.uEdgeOpacity.value = edge;
    if (mesh.current) mesh.current.visible = opacity + edge > 0.004;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      scale={scale}
      visible={baseOpacity + edgeOpacity > 0}
      raycast={() => null}
    />
  );
};
