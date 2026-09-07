import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Terminal, Home, Briefcase, Users, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex p-4 rounded-3xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
          <Terminal className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase">
            Error 404 • Resource Not Found
          </span>
          <motion.h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Route Dereferenced.
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            The endpoint or resource you requested could not be resolved in the Zangle Technologies active registry.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/hire-talent">
            <Button variant="glow" size="md" leftIcon={<Users className="w-4 h-4" />}>
              Hire Tech Talent
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" size="md" leftIcon={<Briefcase className="w-4 h-4" />}>
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
