import React, { useSyncExternalStore } from 'react';
import { getSelectedId, setSelected, subscribeSelection } from './state/sceneState';

const getServerSnapshot = () => null;

/**
 * The only part of the 3D layer React re-renders, and only when a human picks
 * an object. It exists because a control you cannot discover is not a control:
 * once something is grabbed, the page has to say what can be done with it.
 */
export const SceneHud: React.FC = () => {
  const selected = useSyncExternalStore(subscribeSelection, getSelectedId, getServerSnapshot);
  if (!selected) return null;

  const label = selected.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-30 -translate-x-1/2 px-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-xs shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zangle-card/80">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-cyan-500" />
        <span className="font-mono font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          {label}
        </span>
        <span className="hidden text-slate-600 dark:text-slate-300 sm:inline">
          Drag to rotate · Wheel to resize · Esc to release
        </span>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="rounded-full bg-slate-900/5 px-3 py-1 font-semibold text-slate-700 transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
        >
          Release
        </button>
      </div>
    </div>
  );
};
