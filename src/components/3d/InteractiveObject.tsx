import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { SCENE } from './config';
import type { InteractionState, MotionParams } from './types';
import { clamp, damp, evalDrift } from './utils/motion';
import { evaluateZones, safeZoneUniforms, viewLayout } from './utils/safeZones';
import { isPointerOverUI, markHit, sceneState, setHovered, setSelected } from './state/sceneState';

/**
 * Continuous, ref-only view of an object's interaction state.
 *
 * Children read these to drive their own materials inside `useFrame`. They are
 * numbers rather than booleans on purpose: every visual response is a blend, so
 * nothing in the scene can ever snap between states.
 */
export interface InteractiveRefs {
  /** 0..1 pointer-over weight. */
  hover: MutableRefObject<number>;
  /** 0..1 selection weight. */
  select: MutableRefObject<number>;
  /** 0..1 active-drag weight. */
  drag: MutableRefObject<number>;
  /**
   * 0..1 readability suppression. Rises as the object drifts behind page UI
   * so its material can fade itself out; see `safeZones`.
   */
  dim: MutableRefObject<number>;
  state: MutableRefObject<InteractionState>;
}

const IDLE_REFS: InteractiveRefs = {
  hover: { current: 0 },
  select: { current: 0 },
  drag: { current: 0 },
  dim: { current: 0 },
  state: { current: 'idle' },
};

const InteractiveContext = createContext<InteractiveRefs>(IDLE_REFS);

/** Lets any child material animate against its parent's interaction state. */
export function useInteractiveRefs(): InteractiveRefs {
  return useContext(InteractiveContext);
}

export interface InteractiveObjectProps {
  id: string;
  basePosition: [number, number, number];
  motion: MotionParams;
  /** 1 = fixed in the world (full relative motion), 0 = glued to the camera. */
  parallax?: number;
  baseScale?: number;
  /** Seeds the noise field so two objects never share a drift path. */
  seed?: number;
  draggable?: boolean;
  /** Extra scale added at full hover. */
  hoverScale?: number;
  children: ReactNode;
}

const DRAG_SENSITIVITY = 4.2;
const MAX_DT = 1 / 30;

/** tan(fov/2) for SCENE.fov -- converts view depth to world half-height. */
const VIEW_TAN = Math.tan((SCENE.fov * Math.PI) / 360);

/**
 * Hard ceiling on how far page-layout avoidance may move an object, in world
 * units. A displacement larger than this stops reading as an object politely
 * making room and starts reading as a broken layout.
 */
const MAX_AVOID = 5.5;

/**
 * Wraps a mesh in autonomous motion plus the full idle -> hover -> selected ->
 * dragging -> released lifecycle.
 *
 * The object never stops being simulated. Selecting it does not switch off its
 * drift, it *attenuates* it (the `autonomy` weight), and releasing a drag lets
 * the accumulated angular velocity spin out under exponential damping. That is
 * what makes the objects feel like floating mass rather than UI widgets.
 */
export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  id,
  basePosition,
  motion,
  parallax = 1,
  baseScale = 1,
  seed = 0,
  draggable = true,
  hoverScale = 0.08,
  children,
}) => {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  /** Reused every frame; allocating a Vector3 per object per frame is churn. */
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const scratchEdge = useMemo(() => new THREE.Vector3(), []);

  const refs = useMemo<InteractiveRefs>(
    () => ({
      hover: { current: 0 },
      select: { current: 0 },
      drag: { current: 0 },
      dim: { current: 0 },
      state: { current: 'idle' as InteractionState },
    }),
    [],
  );

  // All drag bookkeeping is kept off React so a drag costs zero renders.
  const gesture = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
    targetRotX: 0,
    targetRotY: 0,
    velX: 0,
    velY: 0,
    appliedRotX: 0,
    appliedRotY: 0,
    userScale: 1,
    userScaleTarget: 1,
    hoverTarget: 0,
    /** Ticks up while released momentum is still visible. */
    releaseTimer: 0,
    /** Accumulated world-space displacement away from page UI. */
    avoidX: 0,
    avoidY: 0,
    avoidZ: 0,
  });

  /* ---------------------------------------------------------------- */
  /* Pointer handling                                                  */
  /* ---------------------------------------------------------------- */

  const handleOver = (event: ThreeEvent<PointerEvent>) => {
    if (isPointerOverUI(event.nativeEvent.target)) return;
    event.stopPropagation();
    gesture.current.hoverTarget = 1;
    setHovered(id);
    document.body.style.cursor = draggable ? 'grab' : 'pointer';
  };

  const handleOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    gesture.current.hoverTarget = 0;
    if (sceneState.hoveredId === id) setHovered(null);
    if (!gesture.current.active) document.body.style.cursor = '';
  };

  const handleDown = (event: ThreeEvent<PointerEvent>) => {
    // The canvas listens on the document so it can stay pointer-events:none.
    // Without this guard, clicking a nav link would also grab a sphere.
    if (isPointerOverUI(event.nativeEvent.target)) return;
    event.stopPropagation();
    markHit(event.nativeEvent);
    setSelected(id);
    if (!draggable) return;

    const g = gesture.current;
    g.active = true;
    g.pointerId = event.nativeEvent.pointerId;
    g.lastX = event.nativeEvent.clientX;
    g.lastY = event.nativeEvent.clientY;
    g.velX = 0;
    g.velY = 0;
    sceneState.dragging = true;
    document.body.style.cursor = 'grabbing';
  };

  const handleWheel = (event: ThreeEvent<WheelEvent>) => {
    // Only the selected object, and only while the cursor is actually on it.
    // Otherwise scrolling the page would quietly resize whatever the ray
    // happened to pass through.
    if (sceneState.selectedId !== id || gesture.current.hoverTarget < 0.5) return;
    event.stopPropagation();
    const g = gesture.current;
    g.userScaleTarget = clamp(g.userScaleTarget - event.nativeEvent.deltaY * 0.0012, 0.55, 2.4);
  };

  // Drag continues on the window, so the pointer can leave the object -- or the
  // viewport -- without the object sticking to the last known position.
  useEffect(() => {
    if (!draggable) return undefined;

    const onMove = (event: PointerEvent) => {
      const g = gesture.current;
      if (!g.active || event.pointerId !== g.pointerId) return;
      const dx = (event.clientX - g.lastX) / window.innerWidth;
      const dy = (event.clientY - g.lastY) / window.innerHeight;
      g.lastX = event.clientX;
      g.lastY = event.clientY;
      g.targetRotY += dx * DRAG_SENSITIVITY * Math.PI;
      g.targetRotX += dy * DRAG_SENSITIVITY * Math.PI;
      // Remembered so the release can carry the throw through.
      g.velX = dy * DRAG_SENSITIVITY * Math.PI * 14;
      g.velY = dx * DRAG_SENSITIVITY * Math.PI * 14;
    };

    const onUp = (event: PointerEvent) => {
      const g = gesture.current;
      if (!g.active || event.pointerId !== g.pointerId) return;
      g.active = false;
      g.pointerId = -1;
      g.releaseTimer = 1;
      sceneState.dragging = false;
      document.body.style.cursor = g.hoverTarget > 0.5 ? 'grab' : '';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [draggable]);

  useEffect(
    () => () => {
      if (sceneState.hoveredId === id) setHovered(null);
      document.body.style.cursor = '';
    },
    [id],
  );

  /* ---------------------------------------------------------------- */
  /* Simulation                                                        */
  /* ---------------------------------------------------------------- */

  useFrame((state, rawDelta) => {
    const camera = state.camera;
    const group = outer.current;
    const spin = inner.current;
    if (!group || !spin) return;

    const dt = Math.min(rawDelta, MAX_DT);
    const t = sceneState.reducedMotion ? 0 : performance.now() / 1000;
    const g = gesture.current;
    const selected = sceneState.selectedId === id;

    refs.hover.current = damp(refs.hover.current, g.hoverTarget, 9, dt);
    refs.select.current = damp(refs.select.current, selected ? 1 : 0, 7, dt);
    refs.drag.current = damp(refs.drag.current, g.active ? 1 : 0, 12, dt);

    refs.state.current = g.active
      ? 'dragging'
      : selected
        ? 'selected'
        : g.releaseTimer > 0
          ? 'released'
          : g.hoverTarget > 0.5
            ? 'hover'
            : 'idle';

    // Autonomy: full drift when idle, halved once the user takes ownership,
    // almost silenced while they are actually dragging.
    const autonomyTarget = g.active ? 0.12 : selected ? 0.5 : 1;
    const autonomy = damp(
      group.userData.autonomy ?? 1,
      sceneState.reducedMotion ? autonomyTarget * 0.25 : autonomyTarget,
      4,
      dt,
    );
    group.userData.autonomy = autonomy;

    const drift = evalDrift(motion, t, seed);
    const scrollOffset = sceneState.scroll.smooth * SCENE.travelY * (1 - parallax);

    // ---- Page-layout avoidance -------------------------------------------
    //
    // The zone test runs against the object's position WITHOUT its own
    // avoidance offset applied. That distinction is the whole correctness of
    // this system. Feeding the displaced position back into the test makes the
    // offset its own input: the object is pushed out, no longer reads as being
    // in a zone, damps back in, is pushed out again. That loop never settles,
    // so where the object happens to be sitting is a function of *when* you
    // look at it -- which is exactly the "objects are displaced after scrolling
    // back to the top" symptom. Probing the undisplaced position makes the
    // target a pure function of (base + drift + scroll), all of which return to
    // their original values at scroll 0, so the scene does too.
    //
    // A dragged object is exempt. The user is holding it; steering it out from
    // under their cursor would feel like the page fighting them.
    const probeX = basePosition[0] * viewLayout.xScale + drift[0] * autonomy;
    const probeY = basePosition[1] + drift[1] * autonomy + scrollOffset;
    const probeZ = basePosition[2] + drift[2] * autonomy;

    group.position.set(probeX, probeY, probeZ);
    group.updateMatrixWorld();
    group.getWorldPosition(scratch);
    const e = camera.matrixWorld.elements;

    // How far in front of the camera the object is. This guard is essential:
    // `project()` divides by w, so anything at or behind the camera plane comes
    // back with wildly inflated -- and sign-flipped -- coordinates. Without it,
    // objects the camera has already flown past report an enormous screen
    // radius, decide they are inside every zone at once, and get shoved into a
    // heap at the frustum edge.
    const viewDepth =
      (scratch.x - camera.position.x) * -e[8] +
      (scratch.y - camera.position.y) * -e[9] +
      (scratch.z - camera.position.z) * -e[10];

    let zones = null;
    if (!g.active && viewDepth > 1) {
      // Screen radius by projecting a point one radius along the camera's right
      // axis: cheaper and more honest than deriving it from fov and distance,
      // and it stays correct through the portrait dolly.
      scratchEdge
        .set(e[0], e[1], e[2])
        .multiplyScalar(group.scale.x)
        .add(scratch)
        .project(camera);
      scratch.project(camera);
      // Clamped: a near-camera object could otherwise claim to cover the whole
      // viewport and be pushed by every zone simultaneously.
      const screenRadius = Math.min(Math.abs(scratchEdge.x - scratch.x) * 0.5, 0.3);
      zones = evaluateZones(
        scratch.x,
        scratch.y,
        safeZoneUniforms.uZoneDims.value.w,
        screenRadius,
      );
    }

    if (zones) {
      // Zone pushes are authored in viewport fractions, so they have to be
      // converted to world units at this object's depth -- half a screen is a
      // very different distance for something 4 units away than for something
      // 30 units away.
      //
      // And then capped. Without the cap a background object at 33 units of
      // depth resolves a 0.42-of-a-viewport push into more than ten world
      // units, which does not read as "stepping aside" -- it reads as the
      // object being fired out of the composition, and it is what let objects
      // end up displaced by 18 units.
      // Viewport fractions to world units at this object's depth. X and Y need
      // different factors -- the frustum is wider than it is tall -- and using
      // one for both is what makes an object drift diagonally when it was only
      // ever asked to move sideways.
      const halfHeight = Math.max(viewDepth, 1) * VIEW_TAN;
      const halfWidth = halfHeight * state.viewport.aspect;
      // Far objects yield much less.
      //
      // A clean text column is not the same as an empty one -- emptied
      // completely, the copy stops sitting *inside* a world and starts sitting
      // on a gradient. What has to stay clear of the headline is anything with
      // enough presence to compete with it, and presence falls off with depth:
      // by 20 units back an object is small, fogged and already faded by its
      // depth layer. So the background plane keeps a fraction of the push and
      // of the fade, and remains visible behind the copy as atmosphere.
      const farness = clamp((basePosition[2] - -8.5) / -11.5, 0, 1);
      const yield_ = 1 - farness * 0.72;
      const targetX = clamp(zones.pushX * halfWidth * 2 * yield_, -MAX_AVOID, MAX_AVOID);
      const targetY = clamp(zones.pushY * halfHeight * 2 * yield_, -MAX_AVOID, MAX_AVOID);
      const targetZ = clamp(
        -zones.pushDepth * halfHeight * yield_,
        -MAX_AVOID,
        MAX_AVOID,
      );
      // Slow on purpose. The zone weight depends on where the object projects,
      // and the camera's idle float moves that projection continuously, so a
      // fast follow would let an object sitting near a zone edge twitch in and
      // out of hiding. At this rate the avoidance low-passes the camera.
      g.avoidX = damp(g.avoidX, targetX, 1.1, dt);
      g.avoidY = damp(g.avoidY, targetY, 1.1, dt);
      g.avoidZ = damp(g.avoidZ, targetZ, 1.1, dt);
      refs.dim.current = damp(refs.dim.current, zones.dim * yield_, 4, dt);
    } else {
      g.avoidX = damp(g.avoidX, 0, 1.1, dt);
      g.avoidY = damp(g.avoidY, 0, 1.1, dt);
      g.avoidZ = damp(g.avoidZ, 0, 1.1, dt);
      refs.dim.current = damp(refs.dim.current, 0, 4, dt);
    }

    // Final transform: BASE + AUTONOMOUS + SCROLL + INTERACTION, recomputed
    // from scratch every frame. Nothing here is ever incremented, so the scene
    // at scroll 0 is bit-for-bit the scene it started as.
    group.position.set(probeX + g.avoidX, probeY + g.avoidY, probeZ + g.avoidZ);

    // Released momentum: integrate the throw, then let it bleed off. While the
    // object is deselected the target unwinds to zero so it rejoins its
    // autonomous orientation instead of staying frozen where it was dropped.
    if (!g.active) {
      g.targetRotX += g.velX * dt;
      g.targetRotY += g.velY * dt;
      const decay = Math.exp(-1.9 * dt);
      g.velX *= decay;
      g.velY *= decay;
      if (!selected) {
        g.targetRotX = damp(g.targetRotX, 0, 0.45, dt);
        g.targetRotY = damp(g.targetRotY, 0, 0.45, dt);
        g.userScaleTarget = damp(g.userScaleTarget, 1, 0.6, dt);
      }
      if (g.releaseTimer > 0) {
        g.releaseTimer = Math.max(0, g.releaseTimer - dt * 0.8);
      }
    }

    // Spring follow gives the rotation weight; a direct assignment feels glassy
    // and mechanical, which is exactly what a floating object should not.
    g.appliedRotX = damp(g.appliedRotX, g.targetRotX, 9, dt);
    g.appliedRotY = damp(g.appliedRotY, g.targetRotY, 9, dt);

    const { spin: sp, wobble: wb } = motion;
    spin.rotation.set(
      (sp[0] * t + Math.sin(t * 0.31 + seed) * wb[0]) * autonomy + g.appliedRotX,
      (sp[1] * t + Math.sin(t * 0.27 + seed * 1.7) * wb[1]) * autonomy + g.appliedRotY,
      (sp[2] * t + Math.sin(t * 0.19 + seed * 2.3) * wb[2]) * autonomy,
    );

    g.userScale = damp(g.userScale, g.userScaleTarget, 8, dt);
    const breath = Math.sin(t * motion.breathSpeed * Math.PI * 2 + seed) * motion.breath * autonomy;
    const scale =
      baseScale *
      g.userScale *
      (1 + breath + refs.hover.current * hoverScale + refs.select.current * 0.05);
    group.scale.setScalar(scale);
  });

  return (
    <group
      ref={outer}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onPointerDown={handleDown}
      onWheel={handleWheel}
    >
      <group ref={inner}>
        <InteractiveContext.Provider value={refs}>{children}</InteractiveContext.Provider>
      </group>
    </group>
  );
};
