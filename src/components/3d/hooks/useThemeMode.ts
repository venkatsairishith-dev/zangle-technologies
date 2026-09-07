import { useEffect, useState } from 'react';

/**
 * Tracks the `dark` class Tailwind toggles on <html>. The 3D background paints
 * the page's ground colour, so it has to follow the theme or dark mode would
 * come out blinding white.
 */
export function useThemeMode(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setMode(root.classList.contains('dark') ? 'dark' : 'light');
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return mode;
}
