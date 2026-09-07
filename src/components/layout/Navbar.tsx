import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
  Layers,
  Users,
  ArrowRight,
  ChevronDown,
  Server,
  Cloud,
  Database,
  Code2,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Building2,
  Flag,
  Sparkles,
  Search,
  ExternalLink,
  Terminal,
  Compass,
  Home as HomeIcon,
  Info,
  Rocket,
  Workflow,
  Stethoscope
} from 'lucide-react';
import { Logo } from '../common/Logo';

// ============================================================================
// 1. MAGNETIC NAV BUTTON COMPONENT (3D Magnetic Hover & Micro-interactions)
// ============================================================================
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  intensity?: number;
}

const MagneticNavItem: React.FC<MagneticProps> = ({
  children,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  intensity = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * intensity;
    const y = (clientY - (top + height / 2)) * intensity;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.03 : 1,
        z: isHovered ? 10 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 20,
        mass: 0.2
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px'
      }}
      className={`relative inline-flex items-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// 2. 3D TILT SERVICE CARD (Used in the Services Mega-Menu)
// ============================================================================
interface ServiceCardProps {
  id: string;
  title: string;
  tag: string;
  desc: string;
  icon: React.ReactNode;
  path: string;
  colorScheme: 'cyan' | 'blue' | 'purple' | 'emerald' | 'amber';
  chips: string[];
  onSelect: () => void;
  index: number;
}

const ServiceCard3D: React.FC<ServiceCardProps> = ({
  title,
  tag,
  desc,
  icon,
  path,
  colorScheme,
  chips,
  onSelect,
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotX, y: rotY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const colorVariants = {
    cyan: {
      border: 'hover:border-cyan-400/50 dark:hover:border-cyan-400/50',
      glow: 'rgba(6, 182, 212, 0.2)',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      iconBg: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
    },
    blue: {
      border: 'hover:border-blue-400/50 dark:hover:border-blue-400/50',
      glow: 'rgba(59, 130, 246, 0.2)',
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      iconBg: 'bg-blue-500/15 text-blue-500 border-blue-500/30'
    },
    purple: {
      border: 'hover:border-purple-400/50 dark:hover:border-purple-400/50',
      glow: 'rgba(168, 85, 247, 0.2)',
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      iconBg: 'bg-purple-500/15 text-purple-500 border-purple-500/30'
    },
    emerald: {
      border: 'hover:border-emerald-400/50 dark:hover:border-emerald-400/50',
      glow: 'rgba(16, 185, 129, 0.2)',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      iconBg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
    },
    amber: {
      border: 'hover:border-amber-400/50 dark:hover:border-amber-400/50',
      glow: 'rgba(245, 158, 11, 0.2)',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      iconBg: 'bg-amber-500/15 text-amber-500 border-amber-500/30'
    }
  };

  const scheme = colorVariants[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative h-full"
    >
      <Link
        to={path}
        onClick={onSelect}
        className="block h-full group focus:outline-none"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? '16px' : '0px'})`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d'
          }}
          className={`relative h-full rounded-2xl p-4 sm:p-5 bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 ${scheme.border} shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer`}
        >
          {/* Animated Radial Cursor Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 160px at ${glowPos.x}% ${glowPos.y}%, ${scheme.glow}, transparent 70%)`
            }}
          />

          {/* Card Top: Icon & Badge */}
          <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div
                className={`p-2.5 rounded-xl border ${scheme.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                {icon}
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${scheme.badge}`}
              >
                {tag}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
              <span>{title}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-500" />
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
              {desc}
            </p>
          </div>

          {/* Card Bottom: Chips list */}
          <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1" style={{ transform: 'translateZ(10px)' }}>
            {chips.map((chip, cIdx) => (
              <span
                key={cIdx}
                className="text-[9.5px] font-mono px-2 py-0.5 rounded-md bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================================
// 3. MAIN NAVBAR COMPONENT
// ============================================================================
/**
 * Mobile drawer motion.
 *
 * The panel itself already slid in as one block, which made a nine-row menu
 * arrive as a single flat card. Staggering the rows lets the drawer read as
 * unfolding: the container owns the timing, each row only declares its own
 * offset. Exit is deliberately much faster than entry -- a menu that takes as
 * long to leave as it took to arrive feels like it is fighting the tap.
 */
const mobileListMotion = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const mobileRowMotion = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] as const } },
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Navigation Dropdown & Menu States
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [staffingMenuOpen, setStaffingMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileStaffingOpen, setMobileStaffingOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Click ripple state
  const [activeRipple, setActiveRipple] = useState<string | null>(null);

  // Scroll detection
  const [scrolled, setScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Dropdown trigger refs — used to move focus back to the trigger on Escape,
  // and to open-and-focus-first-item on ArrowDown.
  const staffingTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const staffingPanelRef = useRef<HTMLDivElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);

  // Mobile panel refs — trigger button (for outside-click + focus-restore)
  // and the panel itself (for the focus trap).
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setServicesMenuOpen(false);
    setStaffingMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close mega-menu and dropdowns, and return focus to
  // whichever trigger opened them so keyboard users don't lose their place.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (staffingMenuOpen) staffingTriggerRef.current?.focus();
      if (servicesMenuOpen) servicesTriggerRef.current?.focus();
      if (mobileMenuOpen) mobileMenuTriggerRef.current?.focus();
      setServicesMenuOpen(false);
      setStaffingMenuOpen(false);
      setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside to close the desktop dropdowns. navContainerRef now
  // wraps the pill bar AND the mega-menu panels (see JSX), so clicking
  // anywhere inside an open menu is correctly treated as "inside".
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
        setStaffingMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobile panel: lock body scroll while open, so the page behind the
  // near-full-width drawer can't scroll underneath it.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Mobile panel: close on a click/tap outside it. Attached only while open,
  // and only after the current call stack finishes — otherwise the same
  // mousedown that opens the panel (via the hamburger's onClick) would also
  // fire this handler and instantly close it again.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutsideMobile = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = mobileMenuTriggerRef.current?.contains(target);
      const clickedPanel = mobileMenuPanelRef.current?.contains(target);
      if (!clickedTrigger && !clickedPanel) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () => document.removeEventListener('mousedown', handleClickOutsideMobile);
  }, [mobileMenuOpen]);

  // Mobile panel: focus trap + initial focus + focus restoration. The
  // focusable-element list is re-queried on every Tab press (not memoized at
  // open time) because the Staffing/Services accordions inside the panel
  // change what's focusable as they expand and collapse.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const panel = mobileMenuPanelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

    getFocusable()[0]?.focus();

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', handleTrap);
    return () => {
      panel.removeEventListener('keydown', handleTrap);
      mobileMenuTriggerRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  // Desktop dropdown keyboard support: ArrowDown opens the menu and moves
  // focus to its first link, matching the disclosure-menu pattern.
  const focusFirstMenuItem = (panelRef: React.RefObject<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();
    });
  };

  const handleTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    isOpen: boolean,
    open: () => void,
    panelRef: React.RefObject<HTMLDivElement>
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      open();
      focusFirstMenuItem(panelRef);
    } else if (e.key === 'Escape' && isOpen) {
      // Also handled by the global listener; this just avoids a double frame
      // where the menu is visually open but focus hasn't moved yet.
      e.currentTarget.focus();
    }
  };

  // Staffing Mega-Menu — 4 real staffing lines from zangleit.com
  const megaMenuStaffing: Array<Omit<ServiceCardProps, 'onSelect' | 'index'>> = [
    {
      id: 'it-staffing',
      title: 'IT Staffing',
      tag: 'Service',
      desc: 'Hire vetted IT talent for contract, contract-to-hire and direct placement, backed by payroll, compliance and onboarding support.',
      icon: <Users className="w-5 h-5 text-cyan-500" />,
      path: '/services/it-staffing',
      colorScheme: 'cyan',
      chips: ['Top 3% Talent', '48h Shortlists', '14-Day Trial']
    },
    {
      id: 'clinical-staffing',
      title: 'Clinical & Scientific',
      tag: 'Workforce',
      desc: 'Place nurses, allied health, clinical research and healthcare-IT professionals quickly, with credentialing, compliance and onboarding managed from the first brief.',
      icon: <HeartPulse className="w-5 h-5 text-emerald-500" />,
      path: '/services/clinical-staffing',
      colorScheme: 'emerald',
      chips: ['FDA / GxP Regs', 'Biostatistics', 'Trial Data Ops']
    },
    {
      id: 'outsourcing',
      title: 'Outsourcing',
      tag: 'Service',
      desc: 'Extend capacity with dedicated teams and managed services that bring governance, reporting and accountability into every outsourced workflow.',
      icon: <Building2 className="w-5 h-5 text-amber-500" />,
      path: '/services/outsourcing',
      colorScheme: 'amber',
      chips: ['Dedicated Pods', 'Nearshore/Offshore', 'SLA Delivery']
    },
    {
      id: 'veteran-hiring',
      title: 'Veteran Hiring',
      tag: 'Service',
      desc: 'Help veterans and military spouses translate proven leadership into technology careers, while employers gain disciplined talent ready to contribute.',
      icon: <Flag className="w-5 h-5 text-purple-500" />,
      path: '/services/veteran-hiring',
      colorScheme: 'purple',
      chips: ['Security Cleared', 'DoD / Cyber', 'Mission-Ready']
    }
  ];

  // Services Mega-Menu — the real 8-item Services dropdown from zangleit.com
  const megaMenuServices: Array<Omit<ServiceCardProps, 'onSelect' | 'index'>> = [
    {
      id: 'it-consulting',
      title: 'IT Consulting',
      tag: 'Service',
      desc: 'Shape strategy, modernize applications and deliver platforms with one team accountable for both the plan and the working system.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      path: '/services/it-consulting',
      colorScheme: 'emerald',
      chips: ['Strategy Roadmaps', 'Application Modernization', 'Enterprise Architecture']
    },
    {
      id: 'cloud-computing',
      title: 'Cloud Computing',
      tag: 'Service',
      desc: 'Move, modernize and operate workloads across AWS, Azure and Google Cloud with security, automation and FinOps discipline built into the plan.',
      icon: <Cloud className="w-5 h-5 text-cyan-500" />,
      path: '/services/cloud-computing',
      colorScheme: 'cyan',
      chips: ['Migration & Modernization', 'Platform Engineering', 'FinOps Cost Control']
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      tag: 'Service',
      desc: 'Turn fragmented data into trusted platforms, governed reporting and decision intelligence that executives can use with confidence.',
      icon: <LineChart className="w-5 h-5 text-purple-500" />,
      path: '/services/data-analysis',
      colorScheme: 'purple',
      chips: ['Lakehouse Engineering', 'Governed Pipelines', 'Self-Serve BI']
    },
    {
      id: 'website-development',
      title: 'Website Development',
      tag: 'Service',
      desc: 'Design and ship marketing sites, web apps and storefronts measured against speed, search visibility and conversion, not just visual polish.',
      icon: <Code2 className="w-5 h-5 text-blue-500" />,
      path: '/services/website-development',
      colorScheme: 'blue',
      chips: ['Mobile-First Builds', 'SEO & Core Web Vitals', 'CMS or Custom']
    },
    {
      id: 'product-development',
      title: 'Product Development',
      tag: 'Service',
      desc: 'Design, build, test and release production software with dedicated squads that own quality, velocity and business outcomes.',
      icon: <Rocket className="w-5 h-5 text-cyan-500" />,
      path: '/services/product-development',
      colorScheme: 'cyan',
      chips: ['Web & Mobile Engineering', 'Cloud-Native by Default', 'Dedicated Squads']
    },
    {
      id: 'business-reform',
      title: 'Business Reform',
      tag: 'Service',
      desc: 'Redesign processes, systems and operating rhythms so change is practical, adopted and measurable, with technology and people aligned from the start.',
      icon: <Workflow className="w-5 h-5 text-amber-500" />,
      path: '/services/business-reform',
      colorScheme: 'amber',
      chips: ['Process Redesign', 'Automation', 'Change Management']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      tag: 'Service',
      desc: 'Design, harden and operate cloud, hybrid and on-premises infrastructure with monitoring, backup, recovery and cost control built in.',
      icon: <Server className="w-5 h-5 text-slate-500" />,
      path: '/services/infrastructure',
      colorScheme: 'blue',
      chips: ['Cloud & Hybrid', 'Security Built In', 'Backup & Recovery']
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      tag: 'Industry',
      desc: 'Build secure, compliant healthcare systems and staff the clinical, data and IT teams that keep them running, from EHR modernization to HIPAA-ready cloud.',
      icon: <Stethoscope className="w-5 h-5 text-emerald-500" />,
      path: '/services/healthcare',
      colorScheme: 'emerald',
      chips: ['HIPAA-Ready by Design', 'HL7 & FHIR', 'Clinical & IT Staffing']
    }
  ];

  // Active route helpers
  const isPathActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // The staffing lines (IT Staffing, Clinical & Scientific, Outsourcing, Veteran
  // Hiring) live under /services/* on the real site, the same prefix every other
  // service page uses. Checking that prefix alone would light up "Services" too
  // whenever a staffing page is open, so Staffing is matched first by exact path
  // and Services explicitly excludes those paths.
  const isStaffingActive = megaMenuStaffing.some((i) => location.pathname === i.path);

  const isServicesActive =
    (location.pathname === '/services' || location.pathname.startsWith('/services/')) &&
    !isStaffingActive;

  const handleNavClick = (id: string, path: string) => {
    setActiveRipple(id);
    setTimeout(() => setActiveRipple(null), 500);
    setServicesMenuOpen(false);
    setStaffingMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none">
      {/* Full-width bar: the background/border spans the entire viewport
          (a real corporate header, not a floating inset capsule) while the
          content inside stays aligned to the site's standard max-w-7xl
          column. No backdrop-blur here on purpose: this bar is
          position:fixed, so a backdrop-filter forces the browser to
          re-blur the region behind it on every single scroll frame — the
          main source of scroll jank on phones. A near-opaque background
          reads the same and is free. */}
      <div
        className={`w-full border-b pointer-events-auto transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 border-slate-200/90 dark:border-slate-800/90 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
            : 'bg-white/92 dark:bg-slate-950/92 border-slate-200/60 dark:border-slate-800/60'
        }`}
      >
        {/* navContainerRef wraps the nav row AND the mega-menu panels below it
            (not just the row) — the outside-click handler needs both in
            scope, otherwise clicking non-interactive space inside an open
            mega-menu reads as "outside" and closes it instantly. */}
        <div ref={navContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-[70px] sm:h-[80px]">
            {/* ─── BRAND LOGO ───────────────────────────────────────── */}
            <Link
              to="/"
              onClick={() => {
                setServicesMenuOpen(false);
                setStaffingMenuOpen(false);
              }}
              className="flex items-center group shrink-0"
              aria-label="Zangle Technologies Home"
            >
              {/* The wordmark only takes its full size once there is room for it:
                  at the 1121px desktop breakpoint a 42px mark pushes the nav row
                  onto a second line. */}
              <Logo
                size="md"
                categoryBadge="STAFFING + TECH"
                className="[&>img]:!h-[38px] min-[1280px]:[&>img]:!h-[42px]"
              />
            </Link>

            {/* ─── DESKTOP NAVIGATION LINKS ─────────────────────────── */}
            {/* Breakpoint is a custom 1121px, not Tailwind's lg (1024px): at
                1024px seven nav items + the logo + the CTA button do not fit
                the pill without wrapping or overlapping. Below 1121px the
                hamburger menu takes over instead of a squeezed desktop bar. */}
            <nav
              id="primary-navigation"
              aria-label="Primary"
              className="hidden min-[1121px]:flex items-center gap-1 min-[1280px]:gap-1.5 text-[13.5px] min-[1280px]:text-[14.5px] font-[550] tracking-[0.01em]"
            >
              {/* 1. HOME BUTTON (3D Lift, Depth, Magnetic Hover) */}
              <MagneticNavItem
                onMouseEnter={() => {
                  setStaffingMenuOpen(false);
                  setServicesMenuOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('home', '/')}
                  className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center justify-center select-none ${
                    location.pathname === '/'
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {location.pathname === '/' && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {activeRipple === 'home' && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-lg bg-cyan-400/30 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">Home</span>
                </button>
              </MagneticNavItem>

              {/* 2. ABOUT BUTTON (Soft 3D Tilt & Magnetic Hover) */}
              <MagneticNavItem
                onMouseEnter={() => {
                  setStaffingMenuOpen(false);
                  setServicesMenuOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('about', '/about')}
                  className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center justify-center select-none ${
                    isPathActive('/about')
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {isPathActive('/about') && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {activeRipple === 'about' && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-lg bg-cyan-400/30 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">About</span>
                </button>
              </MagneticNavItem>

              {/* 3. STAFFING BUTTON (MAIN 3D EXPERIENCE: 3D Mega-Menu trigger) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setStaffingMenuOpen(true);
                  setServicesMenuOpen(false);
                }}
              >
                <MagneticNavItem>
                  <button
                    ref={staffingTriggerRef}
                    type="button"
                    onClick={() => {
                      setStaffingMenuOpen(!staffingMenuOpen);
                      setServicesMenuOpen(false);
                    }}
                    onKeyDown={(e) =>
                      handleTriggerKeyDown(e, staffingMenuOpen, () => setStaffingMenuOpen(true), staffingPanelRef)
                    }
                    aria-expanded={staffingMenuOpen}
                    aria-haspopup="true"
                    aria-controls="staffing-mega-menu"
                    aria-label="Staffing & Talent Mobilization menu"
                    className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 select-none ${
                      isStaffingActive || staffingMenuOpen
                        ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    {(isStaffingActive || staffingMenuOpen) && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">Staffing</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${
                        staffingMenuOpen ? 'rotate-180 text-cyan-500' : 'text-slate-400'
                      }`}
                    />
                  </button>
                </MagneticNavItem>
              </div>

              {/* 4. SERVICES BUTTON (MAIN 3D EXPERIENCE: 3D Mega-Menu trigger) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setServicesMenuOpen(true);
                  setStaffingMenuOpen(false);
                }}
              >
                <MagneticNavItem>
                  <button
                    ref={servicesTriggerRef}
                    type="button"
                    onClick={() => {
                      setServicesMenuOpen(!servicesMenuOpen);
                      setStaffingMenuOpen(false);
                    }}
                    onKeyDown={(e) =>
                      handleTriggerKeyDown(e, servicesMenuOpen, () => setServicesMenuOpen(true), servicesPanelRef)
                    }
                    aria-expanded={servicesMenuOpen}
                    aria-haspopup="true"
                    aria-controls="services-mega-menu"
                    aria-label="Technical Services menu"
                    className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 select-none ${
                      isServicesActive || servicesMenuOpen
                        ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    {(isServicesActive || servicesMenuOpen) && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">Services</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${
                        servicesMenuOpen ? 'rotate-180 text-cyan-500' : 'text-slate-400'
                      }`}
                    />
                  </button>
                </MagneticNavItem>
              </div>

              {/* 5. CASE STUDIES BUTTON */}
              <MagneticNavItem
                onMouseEnter={() => {
                  setStaffingMenuOpen(false);
                  setServicesMenuOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('case-studies', '/case-studies')}
                  className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center justify-center select-none ${
                    isPathActive('/case-studies')
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {isPathActive('/case-studies') && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {activeRipple === 'case-studies' && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-lg bg-cyan-400/30 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">Case Studies</span>
                </button>
              </MagneticNavItem>

              {/* 6. CAREERS BUTTON */}
              <MagneticNavItem
                onMouseEnter={() => {
                  setStaffingMenuOpen(false);
                  setServicesMenuOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('careers', '/careers')}
                  className={`relative px-3 py-1.5 min-[1280px]:px-4 min-[1280px]:py-2 rounded-lg transition-all duration-300 flex items-center justify-center select-none ${
                    isPathActive('/careers')
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {isPathActive('/careers') && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {activeRipple === 'careers' && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-lg bg-cyan-400/30 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">Careers</span>
                </button>
              </MagneticNavItem>
            </nav>

            {/* ─── RIGHT ACTION CONTROLS ────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle Button */}
              <button
                ref={mobileMenuTriggerRef}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="min-[1121px]:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800/80"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                {/* `mode="wait"` so the two glyphs never overlap mid-rotation. */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileMenuOpen ? 'close' : 'open'}
                    className="block"
                    initial={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

        {/* =====================================================================
            STAFFING 3D GLASSMORPHISM MEGA-MENU (Unfolds with 3D Perspective)
           ===================================================================== */}
        <AnimatePresence>
          {staffingMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
                rotateX: -14,
                scale: 0.95,
                transformPerspective: 1200
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                transformPerspective: 1200
              }}
              exit={{
                opacity: 0,
                y: 10,
                rotateX: -10,
                scale: 0.96,
                transformPerspective: 1200
              }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d'
              }}
              onMouseLeave={() => setStaffingMenuOpen(false)}
              id="staffing-mega-menu"
              ref={staffingPanelRef}
              className="absolute top-full left-0 right-0 pt-3 z-50 pointer-events-auto"
            >
              <div className="rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
                {/* Background Ambient Gradient Light */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mega-menu Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-2 relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                        ZANGLE TALENT & WORKFORCE MOBILIZATION
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      Pre-vetted engineering & technical talent on demand
                    </h3>
                  </div>

                  <Link
                    to="/services/it-staffing"
                    onClick={() => setStaffingMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Explore staffing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Animated 3D Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {megaMenuStaffing.map((staffing, idx) => (
                    <ServiceCard3D
                      key={staffing.id}
                      {...staffing}
                      index={idx}
                      onSelect={() => setStaffingMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================================
            SERVICES 3D GLASSMORPHISM MEGA-MENU (Unfolds with 3D Perspective)
           ===================================================================== */}
        <AnimatePresence>
          {servicesMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
                rotateX: -14,
                scale: 0.95,
                transformPerspective: 1200
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                transformPerspective: 1200
              }}
              exit={{
                opacity: 0,
                y: 10,
                rotateX: -10,
                scale: 0.96,
                transformPerspective: 1200
              }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d'
              }}
              onMouseLeave={() => setServicesMenuOpen(false)}
              id="services-mega-menu"
              ref={servicesPanelRef}
              className="absolute top-full left-0 right-0 pt-3 z-50 pointer-events-auto"
            >
              <div className="rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
                {/* Background Ambient Gradient Light */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mega-menu Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-2 relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                        ZANGLE TECHNICAL SERVICES & PRACTICES
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      Engineering solutions & specialized talent delivery
                    </h3>
                  </div>

                  <Link
                    to="/services"
                    onClick={() => setServicesMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Explore all 8 practice areas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Animated 3D Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {megaMenuServices.map((service, idx) => (
                    <ServiceCard3D
                      key={service.id}
                      {...service}
                      index={idx}
                      onSelect={() => setServicesMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>

      {/* ─── MOBILE SLIDEOUT DRAWER ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuPanelRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            tabIndex={-1}
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="min-[1121px]:hidden fixed inset-x-3 top-24 bottom-4 z-50 bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl overflow-y-auto shadow-2xl flex flex-col justify-between pointer-events-auto"
          >
            <motion.div
              className="space-y-2.5"
              variants={mobileListMotion}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="show"
            >
              {/* 1. Home */}
              <motion.div variants={mobileRowMotion}>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    location.pathname === '/'
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/90 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-cyan-500/15 text-cyan-500">
                      <HomeIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Home</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </motion.div>

              {/* 2. About Us */}
              <motion.div variants={mobileRowMotion}>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isPathActive('/about')
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/90 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-blue-500/15 text-blue-500">
                      <Info className="w-4 h-4" />
                    </div>
                    <span className="text-sm">About Us</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </motion.div>

              {/* 3. Staffing Solutions Accordion */}
              <motion.div variants={mobileRowMotion}>
                <div className={`rounded-2xl border transition-all ${
                  isStaffingActive
                    ? 'border-cyan-500/30 bg-slate-50/90 dark:bg-slate-900/90'
                    : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80'
                } p-3.5`}>
                  <button
                    type="button"
                    onClick={() => setMobileStaffingOpen(!mobileStaffingOpen)}
                    className="w-full flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-cyan-500/15 text-cyan-500">
                        <Users className="w-4 h-4" />
                      </div>
                      <span>Staffing Solutions</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        mobileStaffingOpen ? 'rotate-180 text-cyan-500' : ''
                      }`}
                    />
                  </button>

                  {/* Height-animated so the accordion unrolls instead of jumping the
                      rows below it. `initial={false}` keeps a drawer that opens with
                      this section already expanded from playing the roll on mount. */}
                  <AnimatePresence initial={false}>
                    {mobileStaffingOpen && (
                      <motion.div
                        key="staffing-sub"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {megaMenuStaffing.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <div className="p-1 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-cyan-500">
                                  {item.icon}
                                </div>
                                <span>{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 4. Technical Services Accordion */}
              <motion.div variants={mobileRowMotion}>
                <div className={`rounded-2xl border transition-all ${
                  isServicesActive
                    ? 'border-cyan-500/30 bg-slate-50/90 dark:bg-slate-900/90'
                    : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80'
                } p-3.5`}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-purple-500/15 text-purple-500">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span>Technical Services</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180 text-purple-500' : ''
                      }`}
                    />
                  </button>

                  {/* Height-animated so the accordion unrolls instead of jumping the
                      rows below it. `initial={false}` keeps a drawer that opens with
                      this section already expanded from playing the roll on mount. */}
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        key="services-sub"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5">
                          <Link
                            to="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-2 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10"
                          >
                            • All Services Hub
                          </Link>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {megaMenuServices.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <div className="p-1 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-cyan-500">
                                  {item.icon}
                                </div>
                                <span>{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 5. Case Studies */}
              <motion.div variants={mobileRowMotion}>
                <Link
                  to="/case-studies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isPathActive('/case-studies')
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/90 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-500">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Case Studies</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </motion.div>

              {/* 6. Careers */}
              <motion.div variants={mobileRowMotion}>
                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isPathActive('/careers')
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/90 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-amber-500/15 text-amber-500">
                      <Search className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Careers</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
