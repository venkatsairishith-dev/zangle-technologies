import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * three.js + R3F is roughly 280kB gzipped. Loading it eagerly would put the
 * entire WebGL stack in front of the hero's first paint for a layer the user
 * cannot even interact with yet, so the chunk is fetched only once the browser
 * is idle and the page has rendered.
 */
const Scene3DBackground = lazy(() =>
  import('../3d/Scene3DBackground').then((m) => ({ default: m.Scene3DBackground })),
);

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Router-aware mount point for the 3D background.
 *
 * Keeping `useLocation` here rather than inside the scene means the whole
 * `components/3d` tree stays router-agnostic and reusable, while still getting
 * told when the document height changed under it after a navigation.
 */
export const Background3DLayer: React.FC = () => {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => win.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Scene3DBackground routeKey={pathname} />
    </Suspense>
  );
};
