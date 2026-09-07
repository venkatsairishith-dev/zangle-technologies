import React, { useEffect } from 'react';
import { isPointerOverUI, sceneState, setSelected } from './state/sceneState';

/**
 * Deselection.
 *
 * R3F is connected to `document.documentElement`, so a press that hits an
 * object is handled there and the event then bubbles on to `window`. By the
 * time this listener runs, any object that claimed the press has already
 * recorded it -- so an event that arrives unclaimed was a click on empty space.
 *
 * This has to be a synchronous identity check. Deferring it (even by
 * `setTimeout(0)`) puts it behind the render loop, where it can be delayed long
 * enough that every press looks stale.
 */
export const SelectionController: React.FC = () => {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (isPointerOverUI(event.target)) return;
      if (sceneState.lastHitEvent !== event) setSelected(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
};
