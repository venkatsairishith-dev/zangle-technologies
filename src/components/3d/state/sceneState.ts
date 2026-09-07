import { UI_SELECTOR } from '../config';

/**
 * A single mutable object shared between the DOM drivers and the render loop.
 *
 * Nothing in here lives in React state: scroll and pointer change on every
 * frame, and routing them through `setState` would re-render the entire scene
 * 60 times a second. React only ever hears about *selection*, which changes
 * when a human clicks something.
 */
export interface SceneState {
  scroll: {
    /** Raw page progress 0..1, written by the DOM driver. */
    raw: number;
    /** Critically damped follow of `raw`, written once per frame in-scene. */
    smooth: number;
    /** Signed rate of change of `smooth`, used for motion lean. */
    velocity: number;
    /**
     * How many viewport heights of scrollable travel the page has. Lets the
     * hero-scoped safe zones expire at "one screen down" rather than at some
     * fraction of a document whose length nobody controls.
     */
    viewports: number;
  };
  pointer: {
    /** Normalised device coords, -1..1. */
    x: number;
    y: number;
    /** Damped copy used for parallax so the camera never snaps. */
    sx: number;
    sy: number;
    /** Pointer position projected onto the scene's z=0 plane, world units. */
    worldX: number;
    worldY: number;
    inside: boolean;
  };
  selectedId: string | null;
  hoveredId: string | null;
  dragging: boolean;
  /**
   * The exact pointer event an object last claimed. Identity, not a timestamp:
   * the render loop can starve a deferred check by well over 100ms, which made
   * a time-window version read every successful press as a click on nothing.
   */
  lastHitEvent: Event | null;
  /** True while the document is hidden or the user prefers reduced motion. */
  reducedMotion: boolean;
}

export const sceneState: SceneState = {
  scroll: { raw: 0, smooth: 0, velocity: 0, viewports: 1 },
  pointer: { x: 0, y: 0, sx: 0, sy: 0, worldX: 0, worldY: 0, inside: false },
  selectedId: null,
  hoveredId: null,
  dragging: false,
  lastHitEvent: null,
  reducedMotion: false,
};

/* ------------------------------------------------------------------ */
/* Selection: the one slice React is allowed to subscribe to           */
/* ------------------------------------------------------------------ */

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeSelection(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSelectedId(): string | null {
  return sceneState.selectedId;
}

export function setSelected(id: string | null): void {
  if (sceneState.selectedId === id) return;
  sceneState.selectedId = id;
  listeners.forEach((l) => l());
}

export function setHovered(id: string | null): void {
  // Hover drives shader uniforms only, so it deliberately does not notify React.
  if (id === null && sceneState.hoveredId !== null) sceneState.hoveredId = null;
  else if (id !== null) sceneState.hoveredId = id;
}

/** Called by an object that has just taken a press, before the event reaches window. */
export function markHit(event: Event): void {
  sceneState.lastHitEvent = event;
}

/**
 * True when a pointer event landed on real page UI. The 3D canvas listens on
 * `document` so that it can stay `pointer-events: none` and never block the
 * site, which means it also sees every click on a nav link -- this is the guard
 * that stops the background hijacking them.
 */
export function isPointerOverUI(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return target.closest(UI_SELECTOR) !== null;
}
