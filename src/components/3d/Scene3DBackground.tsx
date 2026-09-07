import React, { Component, Suspense, useEffect, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { SCENE } from './config';
import type { PerformanceTier } from './types';
import { Scene } from './Scene';
import { SceneHud } from './SceneHud';
import { SelectionController } from './SelectionController';
import { useSceneDrivers } from './hooks/useSceneDrivers';
import { usePerformanceTier } from './hooks/usePerformanceTier';
import { useThemeMode } from './hooks/useThemeMode';
import { sceneState } from './state/sceneState';

/**
 * A background must never be able to take the site down with it. Driver loss,
 * a shader that will not compile on some obscure GPU, an out-of-memory context
 * -- all of it degrades to "no background" rather than a blank page.
 */
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) console.warn('[Scene3DBackground] disabled after error:', error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export interface Scene3DBackgroundProps {
  /** Changes on navigation so scroll measurements can be refreshed. */
  routeKey?: string;
  /** Force a quality tier; omit to auto-detect from the device. */
  tier?: PerformanceTier;
  /** Show the selection chip when an object is grabbed. */
  hud?: boolean;
  className?: string;
}

/**
 * The website's 3D background layer.
 *
 * Sits fixed behind all page content at `z-0` with `pointer-events: none`, so
 * it can never intercept a click on the site. Interaction still works because
 * R3F is pointed at `document.documentElement` as its event source and
 * raycasts from client coordinates; objects then ignore any event whose DOM
 * target was real page UI (see `isPointerOverUI`).
 */
export const Scene3DBackground: React.FC<Scene3DBackgroundProps> = ({
  routeKey = 'default',
  tier,
  hud = true,
  className = '',
}) => {
  const quality = usePerformanceTier(tier);
  const theme = useThemeMode();
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');
  // Starts at the tier's ceiling and drops if the device cannot hold the
  // frame budget. Resolution is the cheapest thing to give up -- far cheaper
  // than removing objects, which the user would actually notice.
  const [dpr, setDpr] = useState<number | [number, number]>(quality.dpr);
  useEffect(() => setDpr(quality.dpr), [quality.dpr]);

  useSceneDrivers(routeKey);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setEventSource(document.documentElement);
    setEnabled(true);
  }, []);

  // A background animating in a hidden tab is pure battery drain.
  useEffect(() => {
    const sync = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  if (!enabled || !eventSource) return null;

  return (
    <CanvasBoundary>
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${className}`}
        aria-hidden="true"
        data-no-3d
      >
        <Canvas
          dpr={dpr}
          frameloop={frameloop}
          // Postprocessing renders through its own buffers, so MSAA on the
          // default framebuffer would be paid for and thrown away.
          gl={{
            antialias: quality.antialias && !quality.bloom,
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true,
          }}
          camera={{ position: SCENE.cameraStart, fov: SCENE.fov, near: 0.1, far: 140 }}
          eventSource={eventSource}
          eventPrefix="client"
          onCreated={({ gl, scene, camera }) => {
            // Dev-only handle so the scene graph can be inspected from the
            // console or an automated visual check.
            if (import.meta.env.DEV) {
              const w = window as unknown as {
                __scene3d?: unknown;
                __sceneState?: unknown;
                __gl?: unknown;
                __camera?: unknown;
              };
              w.__scene3d = scene;
              w.__gl = gl;
              w.__camera = camera;
              w.__sceneState = sceneState;
            }
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            // Under 1.0 in light mode. ACES rolls the top of its range off into
            // white, so an exposure at or above 1 on an already-bright scene spends
            // most of the image in that roll-off, where saturation is crushed.
            gl.toneMappingExposure = theme === 'light' ? 0.88 : 1.18;
            // Transmission re-renders the whole scene into a side buffer every
            // frame. At these sphere radii half resolution is indistinguishable,
            // and it is the single cheapest win on any GPU -- so it now applies
            // on every tier, not just the weak ones.
            const renderer = gl as THREE.WebGLRenderer & { transmissionResolutionScale?: number };
            if ('transmissionResolutionScale' in renderer) {
              renderer.transmissionResolutionScale = 0.5;
            }
          }}
        >
          {/* Two consecutive bad seconds and the canvas drops to 1x. It never
              climbs back past the tier ceiling, so this can only ever cost the
              user pixels, never frames. */}
          <PerformanceMonitor
            ms={250}
            iterations={5}
            threshold={0.75}
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(quality.dpr)}
          />
          <Suspense fallback={null}>
            <Scene quality={quality} theme={theme} />
          </Suspense>
        </Canvas>
      </div>
      <SelectionController />
      {hud ? <SceneHud /> : null}
    </CanvasBoundary>
  );
};

export default Scene3DBackground;
