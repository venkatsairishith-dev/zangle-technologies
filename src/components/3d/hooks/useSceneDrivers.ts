import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './usePerformanceTier';
import { sceneState } from '../state/sceneState';

let registered = false;
function ensureGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Wires the page to the scene: scroll progress and pointer position are pushed
 * into `sceneState` from plain DOM listeners, and read back inside the render
 * loop. No React state is touched, so scrolling costs zero reconciliation.
 *
 * `routeKey` changes on navigation; ScrollTrigger has to re-measure the document
 * afterwards or the camera would travel against a stale page height.
 */
export function useSceneDrivers(routeKey: string): void {
  useEffect(() => {
    ensureGsap();

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        sceneState.scroll.raw = self.progress;
      },
    });

    // Documents shorter than the viewport give ScrollTrigger nothing to measure;
    // fall back to a direct read so the scene still tracks any scroll that exists.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sceneState.scroll.viewports = Math.max(max, 0) / Math.max(window.innerHeight, 1);
      if (max <= 1) sceneState.scroll.raw = 0;
      else if (!trigger.isActive) sceneState.scroll.raw = Math.min(1, window.scrollY / max);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      trigger.kill();
    };
  }, []);

  // Re-measure after a route swap has painted its new content.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [routeKey]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const p = sceneState.pointer;
      p.x = (event.clientX / window.innerWidth) * 2 - 1;
      p.y = -((event.clientY / window.innerHeight) * 2 - 1);
      p.inside = true;
    };
    // Touch never produces the hover stream a mouse does. A few frames into any
    // gesture the browser claims the finger for scrolling and fires
    // pointercancel, and the pointerleave behind it would park the scene
    // dead-centre for the rest of the gesture -- measured at 3 reactive frames
    // out of 82, so on a phone the parallax was effectively inert. Drive touch
    // from the touch events instead: they keep arriving for the whole gesture,
    // and passive listeners leave scrolling untouched.
    let touching = false;

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touching = true;
      const p = sceneState.pointer;
      p.x = (touch.clientX / window.innerWidth) * 2 - 1;
      p.y = -((touch.clientY / window.innerHeight) * 2 - 1);
      p.inside = true;
    };

    // Releasing only clears `inside`; ScrollController then damps the offset
    // back to rest, so lifting a finger eases out instead of snapping.
    const onTouchEnd = () => {
      touching = false;
      sceneState.pointer.inside = false;
    };

    const onLeave = () => {
      if (touching) return;
      sceneState.pointer.inside = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      sceneState.reducedMotion = prefersReducedMotion();
    };
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      motionQuery.removeEventListener('change', syncMotion);
    };
  }, []);
}
