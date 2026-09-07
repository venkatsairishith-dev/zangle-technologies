import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A page built to be *seen through*.
 *
 * Every surface here is translucent, so the 3D background stays legible behind
 * the copy while the copy itself stays readable on top of it. The page is
 * deliberately tall: the camera descent is driven by scroll progress, so it
 * needs real distance to travel through.
 */

interface LayerCard {
  title: string;
  body: string;
  detail: string;
}

const LAYERS: LayerCard[] = [
  {
    title: 'Flowing ribbons',
    body: 'Catmull-Rom spines extruded into tapered strips, then bent entirely on the GPU.',
    detail:
      'Geometry is generated once. Every wave, fold and lean is a vertex-shader displacement with analytically derived normals, so the specular highlight travels along the fold instead of sitting still on it.',
  },
  {
    title: 'Refractive glass',
    body: 'A hero sphere holding a cluster of glowing cores, plus a field of smaller bubbles.',
    detail:
      'The shell refracts through a real transmission pass. The cores inside are opaque on purpose — three.js only renders opaque geometry into the refraction buffer, so glass inside glass would simply vanish.',
  },
  {
    title: 'Crystals and cubes',
    body: 'Rounded boxes, octahedra and icosahedra drifting on independent paths.',
    detail:
      'The rounded cubes are superellipsoids: a UV sphere re-projected onto the unit ball of the p-norm, which gives exact analytic normals and a highlight that wraps the corners cleanly.',
  },
  {
    title: 'Atmospheric dust',
    body: 'Several hundred motes in one draw call, wrapped around the travelling camera.',
    detail:
      'The field recycles as the camera descends, so density stays constant over an arbitrarily long page for a fixed cost. Depth fade does the rest of the work.',
  },
];

const INTERACTIONS: Array<{ verb: string; result: string }> = [
  { verb: 'Scroll', result: 'flies the camera down through the scene volume' },
  { verb: 'Move the pointer', result: 'parallaxes the camera and bends ribbons out of the way' },
  { verb: 'Hover a shape', result: 'lifts its scale and fades a fresnel rim onto its silhouette' },
  { verb: 'Click a shape', result: 'selects it and quiets its autonomous drift' },
  { verb: 'Drag', result: 'spins it, with momentum carried through on release' },
  { verb: 'Wheel over a selection', result: 'scales it between 0.55x and 2.4x' },
  { verb: 'Escape, or click empty space', result: 'releases it back into free motion' },
];

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`rounded-2xl border border-white/60 bg-white/55 shadow-[0_8px_40px_-16px_rgba(15,23,42,0.25)] backdrop-blur-md dark:border-white/10 dark:bg-zangle-card/45 ${className}`}
  >
    {children}
  </div>
);

export const ExperiencePage: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero -------------------------------------------------------- */}
      <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-6 py-16">
        <span className="mb-5 w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          Real-time WebGL
        </span>
        <motion.h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          An environment you can{' '}
          <span className="text-gradient">move through</span>, not just look at.
        </motion.h1>
        <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          Nothing on this page is an image or a video. Every ribbon, sphere and crystal behind this
          text is geometry being lit, refracted and simulated right now — and every one of them
          answers to your cursor.
        </motion.p>
        <div className="mt-9 flex flex-wrap gap-3">
          {['Scroll to travel', 'Hover to highlight', 'Drag to spin'].map((hint) => (
            <span
              key={hint}
              className="rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              {hint}
            </span>
          ))}
        </div>
      </section>

      {/* Deliberately open stretch: gives the camera somewhere to go, and lets
          the composition read without any copy competing with it. */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-balance text-2xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
          Keep scrolling. The camera is descending through the scene on a curved path — objects
          leave frame above you, and new ones rise into it from below.
        </p>
      </section>

      {/* Layers ------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Four layers, one composition</h2>
        <p className="mb-10 max-w-2xl text-slate-600 dark:text-slate-400">
          Each is an independent component with its own quality budget, so the scene degrades
          gracefully from a workstation down to a phone.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {LAYERS.map((layer) => (
            <Panel key={layer.title} className="p-7 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold">{layer.title}</h3>
              <p className="mt-2 font-medium text-slate-700 dark:text-slate-300">{layer.body}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {layer.detail}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      {/* Interaction map --------------------------------------------- */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Panel className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold">Everything responds</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Objects hold five blended states — idle, hover, selected, dragging, released — and never
            snap between them.
          </p>
          <dl className="mt-8 divide-y divide-slate-900/10 dark:divide-white/10">
            {INTERACTIONS.map((item) => (
              <div key={item.verb} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                <dt className="w-56 shrink-0 font-mono text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  {item.verb}
                </dt>
                <dd className="text-slate-700 dark:text-slate-300">{item.result}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </section>

      {/* Performance ------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              k: 'Zero React renders per frame',
              v: 'Scroll, pointer and drag state live in a mutable store read inside the render loop. React only hears about selection.',
            },
            {
              k: 'Pooled geometry',
              v: 'One sphere, one rounded box, one crystal buffer shared across every instance in the scene.',
            },
            {
              k: 'Automatic quality tiers',
              v: 'Object counts, refraction, postprocessing and pixel ratio are all chosen from the device on first load.',
            },
          ].map((item) => (
            <Panel key={item.k} className="p-7">
              <h3 className="text-lg font-semibold">{item.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.v}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      {/* Close ------------------------------------------------------- */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Built to sit behind real content</h2>
        <p className="mx-auto mt-5 max-w-xl text-slate-600 dark:text-slate-400">
          The canvas is fixed at <code className="font-mono text-sm">z-0</code> with pointer events
          disabled. It raycasts from document-level events and ignores anything that lands on real
          UI — so it can never steal a click from a link or a form.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
        >
          Back to Zangle
        </Link>
      </section>
    </div>
  );
};

export default ExperiencePage;
