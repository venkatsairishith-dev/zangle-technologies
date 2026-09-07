import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';

// ============================================================================
// TYPES & HOVER CONTEXT STATES
// ============================================================================
type CursorMode = 'default' | 'clickable' | 'button' | 'nav' | 'hire-talent' | 'services' | 'text';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export const RingCursor3D: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity tracking for dynamic 3D tilt
  const lastMousePos = useRef({ x: -100, y: -100, time: performance.now() });
  const velocity = useRef({ vx: 0, vy: 0 });

  // Spring physics for Central Pointer (High responsiveness)
  const pointerSpringConfig = { stiffness: 950, damping: 48, mass: 0.15 };
  const pointerX = useSpring(mouseX, pointerSpringConfig);
  const pointerY = useSpring(mouseY, pointerSpringConfig);

  // Spring physics for Outer 3D Glass Ring (Deliberate floating trailing inertia)
  const ringTargetX = useMotionValue(-100);
  const ringTargetY = useMotionValue(-100);
  const ringSpringConfig = { stiffness: 260, damping: 24, mass: 0.55 };
  const ringX = useSpring(ringTargetX, ringSpringConfig);
  const ringY = useSpring(ringTargetY, ringSpringConfig);

  // Soft Ambient Glow Follower (Ultra-smooth large diffusion light)
  const glowSpringConfig = { stiffness: 120, damping: 28, mass: 0.8 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  // Dynamic 3D Rotation angles (X, Y, Z tilt)
  const targetRotateX = useMotionValue(22);
  const targetRotateY = useMotionValue(-20);
  const targetRotateZ = useMotionValue(8);

  const rotSpringConfig = { stiffness: 180, damping: 20 };
  const springRotateX = useSpring(targetRotateX, rotSpringConfig);
  const springRotateY = useSpring(targetRotateY, rotSpringConfig);
  const springRotateZ = useSpring(targetRotateZ, rotSpringConfig);

  // Magnetic Button Attraction reference offset
  const magneticOffset = useRef({ x: 0, y: 0 });

  // Detect Touch / Mobile Devices
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768);
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Inject Global Cursor Hiding Style for Desktop (Respects fine pointer)
  useEffect(() => {
    if (isTouchDevice) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'zangle-3d-cursor-style';
    styleEl.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      const el = document.getElementById('zangle-3d-cursor-style');
      if (el) el.remove();
    };
  }, [isTouchDevice]);

  // Handle Mouse Events & Dynamic Hover Target Classification
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTouchDevice) return;

      const { clientX: x, clientY: y } = e;

      if (!isVisible) setIsVisible(true);

      // 1. Update Immediate Mouse Position
      mouseX.set(x);
      mouseY.set(y);

      // 2. Compute Instantaneous Velocity
      const now = performance.now();
      const dt = Math.max((now - lastMousePos.current.time) / 1000, 0.001);
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;

      velocity.current = {
        vx: dx / dt,
        vy: dy / dt
      };

      lastMousePos.current = { x, y, time: now };

      // 3. Inspect Target Element for Interactive Context
      const target = e.target as HTMLElement | null;
      let detectedMode: CursorMode = 'default';
      magneticOffset.current = { x: 0, y: 0 };

      if (target) {
        // Special Case: "Hire Talent" Button / Link
        const hireTalentTarget = target.closest(
          'a[href="/hire-talent"], [aria-label*="Hire Talent"], button:has(span:contains("Hire Talent"))'
        );
        const hasHireTalentText =
          target.innerText?.includes('Hire Talent') ||
          target.parentElement?.innerText?.includes('Hire Talent');

        if (hireTalentTarget || hasHireTalentText) {
          detectedMode = 'hire-talent';
          const rect = (hireTalentTarget || target).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          magneticOffset.current = {
            x: (centerX - x) * 0.32,
            y: (centerY - y) * 0.32
          };
        }
        // Special Case: Services Mega-Menu or Service Cards
        else if (
          target.closest('#services, [aria-label*="Services"], .service-card, [data-service]') ||
          target.innerText?.includes('Services')
        ) {
          detectedMode = 'services';
          const cardEl = target.closest('.service-card, [data-service], .glass-card');
          if (cardEl) {
            const rect = cardEl.getBoundingClientRect();
            const relX = (x - rect.left) / rect.width - 0.5;
            const relY = (y - rect.top) / rect.height - 0.5;
            targetRotateX.set(20 - relY * 25);
            targetRotateY.set(-20 + relX * 25);
          }
        }
        // Special Case: Navigation Link / Button
        else if (target.closest('header nav a, header nav button, [role="navigation"] a')) {
          detectedMode = 'nav';
        }
        // Special Case: Standard Button / Magnetic CTA
        else if (target.closest('button, [role="button"], .btn')) {
          detectedMode = 'button';
          const btnEl = target.closest('button, [role="button"], .btn') as HTMLElement;
          if (btnEl) {
            const rect = btnEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            magneticOffset.current = {
              x: (centerX - x) * 0.28,
              y: (centerY - y) * 0.28
            };
          }
        }
        // Special Case: Text Inputs / Content Editable
        else if (target.closest('input, textarea, [contenteditable="true"]')) {
          detectedMode = 'text';
        }
        // Special Case: General Clickable / Links / Tabs / Modals
        else if (
          target.closest('a, summary, [tabindex="0"], select, [data-clickable="true"]') ||
          window.getComputedStyle(target).cursor === 'pointer'
        ) {
          detectedMode = 'clickable';
        }
      }

      setCursorMode(detectedMode);

      // 4. Update Ring Target with Magnetic Pull
      ringTargetX.set(x + magneticOffset.current.x);
      ringTargetY.set(y + magneticOffset.current.y);

      // 5. Dynamic 3D Tilt Calculation based on Velocity & Mode
      if (!shouldReduceMotion && detectedMode !== 'services') {
        const speedX = Math.max(Math.min(velocity.current.vx * 0.035, 30), -30);
        const speedY = Math.max(Math.min(velocity.current.vy * 0.035, 30), -30);

        const baseTiltX = detectedMode === 'button' || detectedMode === 'hire-talent' ? 12 : 22;
        const baseTiltY = detectedMode === 'button' || detectedMode === 'hire-talent' ? -12 : -20;

        targetRotateX.set(baseTiltX - speedY * 0.75);
        targetRotateY.set(baseTiltY + speedX * 0.75);
        targetRotateZ.set(8 + speedX * 0.35);
      }
    },
    [
      isTouchDevice,
      isVisible,
      mouseX,
      mouseY,
      ringTargetX,
      ringTargetY,
      shouldReduceMotion,
      targetRotateX,
      targetRotateY,
      targetRotateZ
    ]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (isTouchDevice) return;
      setIsMouseDown(true);

      // Spawn Smooth 3D Expanding Click Ripple
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        scale: 1.0
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [isTouchDevice]
  );

  const handleMouseUp = useCallback(() => {
    if (isTouchDevice) return;
    setIsMouseDown(false);
  }, [isTouchDevice]);

  const handleMouseLeaveDoc = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnterDoc = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Global Window Event Listeners
  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mouseenter', handleMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
    };
  }, [
    isTouchDevice,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeaveDoc,
    handleMouseEnterDoc
  ]);

  // Continuous Subtle Idle 3D Float & Breathing Cycle
  useEffect(() => {
    // Gated on `isVisible`: this rAF loop used to run for the entire life of the
    // session, driving three springs at 60fps even when the pointer had left the
    // window and nothing was on screen. Now it only runs while the cursor is
    // actually over the page.
    if (shouldReduceMotion || isTouchDevice || !isVisible) return;

    let frameId: number;
    const animateIdle = (time: number) => {
      const t = time * 0.0018;

      // When resting/low velocity, inject a gentle harmonic 3D oscillation
      if (Math.abs(velocity.current.vx) < 15 && Math.abs(velocity.current.vy) < 15) {
        const idleWobbleX = Math.sin(t * 1.4) * 4.5;
        const idleWobbleY = Math.cos(t * 1.1) * 4.5;
        const idleWobbleZ = Math.sin(t * 0.8) * 3.5;

        targetRotateX.set(22 + idleWobbleX);
        targetRotateY.set(-20 + idleWobbleY);
        targetRotateZ.set(8 + idleWobbleZ);
      }

      // Decay velocity gradually
      velocity.current.vx *= 0.92;
      velocity.current.vy *= 0.92;

      frameId = requestAnimationFrame(animateIdle);
    };

    frameId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion, isTouchDevice, isVisible, targetRotateX, targetRotateY, targetRotateZ]);

  // Do not render anything on touch/mobile devices
  if (isTouchDevice) return null;

  // Scale & Styling Configurations based on Cursor Mode
  const getRingScale = () => {
    if (isMouseDown) return 0.92;
    switch (cursorMode) {
      case 'hire-talent':
        return 1.48;
      case 'services':
        return 1.42;
      case 'button':
        return 1.35;
      case 'nav':
        return 1.25;
      case 'clickable':
        return 1.3;
      case 'text':
        return 0.55;
      default:
        return 1.0;
    }
  };

  const getPointerScale = () => {
    if (isMouseDown) return 0.65;
    if (cursorMode === 'text') return 1.4;
    if (cursorMode !== 'default') return 0.75;
    return 1.0;
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* =====================================================================
          1. SOFT AMBIENT GLOW ILLUMINATION FIELD
         ===================================================================== */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 -ml-24 -mt-24 rounded-full pointer-events-none blur-3xl opacity-20 dark:opacity-15"
        style={{
          x: glowX,
          y: glowY,
          background:
            cursorMode === 'hire-talent'
              ? 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(6,182,212,0.4) 40%, transparent 70%)'
              : cursorMode === 'services'
              ? 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(37,99,235,0.4) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(16,185,129,0.2) 40%, transparent 70%)'
        }}
      />

      {/* =====================================================================
          2. EXPANDING 3D CLICK RIPPLES (On Mouse Down/Click)
         ===================================================================== */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              x: ripple.x,
              y: ripple.y,
              scale: 0.8,
              opacity: 0.85,
              rotateX: 25,
              rotateY: -20
            }}
            animate={{
              scale: 2.5,
              opacity: 0,
              rotateX: 30,
              rotateY: -25
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full border border-cyan-400/80 dark:border-cyan-300/90 pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '700px',
              boxShadow:
                '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 12px rgba(16, 185, 129, 0.4)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* =====================================================================
          3. MAIN 3D POLISHED GLASS RING (Trailing Spring Inertia & Tilt)
         ===================================================================== */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          transformStyle: 'preserve-3d',
          perspective: '800px'
        }}
      >
        <motion.div
          animate={{
            scale: getRingScale()
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 24,
            mass: 0.3
          }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            rotateZ: springRotateZ,
            transformStyle: 'preserve-3d'
          }}
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer Glass Ring Base */}
          <div
            className={`w-10 h-10 rounded-full transition-all duration-300 relative ${
              cursorMode === 'text'
                ? 'opacity-30 border border-slate-400 dark:border-slate-500'
                : 'backdrop-blur-[1.5px]'
            }`}
            style={{
              background:
                cursorMode === 'hire-talent'
                  ? 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 60%, transparent 85%)'
                  : 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.06) 60%, transparent 85%)',
              border: '1.6px solid transparent',
              backgroundImage:
                cursorMode === 'hire-talent'
                  ? 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), linear-gradient(135deg, rgba(16,185,129,0.95), rgba(6,182,212,0.9), rgba(37,99,235,0.85))'
                  : 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), linear-gradient(135deg, rgba(6,182,212,0.92), rgba(37,99,235,0.8), rgba(16,185,129,0.88))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow:
                cursorMode === 'hire-talent'
                  ? '0 0 18px rgba(16, 185, 129, 0.55), 0 0 32px rgba(6, 182, 212, 0.35), inset 0 0 10px rgba(16, 185, 129, 0.35)'
                  : cursorMode === 'services'
                  ? '0 0 18px rgba(6, 182, 212, 0.6), 0 0 30px rgba(37, 99, 235, 0.35), inset 0 0 10px rgba(6, 182, 212, 0.4)'
                  : cursorMode === 'button'
                  ? '0 0 16px rgba(6, 182, 212, 0.5), 0 0 28px rgba(16, 185, 129, 0.25), inset 0 0 8px rgba(6, 182, 212, 0.35)'
                  : '0 0 12px rgba(6, 182, 212, 0.4), 0 0 22px rgba(16, 185, 129, 0.2), inset 0 0 6px rgba(6, 182, 212, 0.25)'
            }}
          >
            {/* Specular White Top Glint Highlight */}
            <div className="absolute top-0.5 left-2 right-2 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-90" />

            {/* Subtle Bottom Refraction Accent */}
            <div className="absolute bottom-0.5 left-2.5 right-2.5 h-[1px] rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-80" />
          </div>

          {/* ─── SECONDARY CONCENTRIC ORBITING RING (Active on Nav / Services / Hire Talent) ─── */}
          <AnimatePresence>
            {(cursorMode === 'nav' ||
              cursorMode === 'services' ||
              cursorMode === 'hire-talent') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1.28,
                  rotate: cursorMode === 'services' ? 360 : -360
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  rotate: {
                    repeat: Infinity,
                    duration: cursorMode === 'services' ? 3.5 : 6,
                    ease: 'linear'
                  },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.3 }
                }}
                className="absolute inset-0 -m-1.5 rounded-full border border-dashed border-cyan-400/50 dark:border-cyan-300/60 pointer-events-none"
                style={{
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.35)'
                }}
              />
            )}
          </AnimatePresence>

          {/* ─── HIRE TALENT SPECIAL DUAL SATELLITE ORBIT GLINTS ─── */}
          <AnimatePresence>
            {cursorMode === 'hire-talent' && (
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  rotate: { repeat: Infinity, duration: 2.8, ease: 'linear' },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 -m-2 pointer-events-none"
              >
                {/* Emerald Satellite Dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                {/* Cyan Satellite Dot */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          4. CENTRAL POINTER DOT (Immediate Zero-Latency Response)
         ===================================================================== */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          x: pointerX,
          y: pointerY
        }}
      >
        <motion.div
          animate={{
            scale: getPointerScale(),
            width: cursorMode === 'text' ? '2px' : '9px',
            height: cursorMode === 'text' ? '18px' : '9px',
            borderRadius: cursorMode === 'text' ? '2px' : '9999px'
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
          className="-translate-x-1/2 -translate-y-1/2 relative shadow-lg"
          style={{
            background:
              cursorMode === 'hire-talent'
                ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                : cursorMode === 'text'
                ? '#06b6d4'
                : 'linear-gradient(135deg, #06b6d4, #2563eb)',
            boxShadow:
              cursorMode === 'hire-talent'
                ? '0 0 10px #10b981, 0 0 4px #ffffff'
                : '0 0 10px #06b6d4, 0 0 4px #ffffff'
          }}
        >
          {/* High-Gloss Central Specular Nucleus */}
          {cursorMode !== 'text' && (
            <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-white opacity-95" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RingCursor3D;
