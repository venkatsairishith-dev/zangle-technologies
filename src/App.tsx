import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Background3DLayer } from './components/layout/Background3DLayer';
import { PageTransition3D } from './components/layout/PageTransition3D';
// import { RingCursor3D } from './components/ui/RingCursor3D'; // see note below

// Eagerly load core entry page
import { HomePage } from './pages/HomePage';

// Lazy load secondary routes for optimal code splitting & lightning-fast initial load
const HireTalentPage = lazy(() => import('./pages/HireTalentPage').then(m => ({ default: m.HireTalentPage })));
const JobsPage = lazy(() => import('./pages/JobsPage').then(m => ({ default: m.JobsPage })));
const PracticeAreasPage = lazy(() => import('./pages/PracticeAreasPage').then(m => ({ default: m.PracticeAreasPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const TalentBenchPage = lazy(() => import('./pages/TalentBenchPage').then(m => ({ default: m.TalentBenchPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));

// Specialized Practice & Industry Service Pages (Lazy Loaded)
const ITStaffingPage = lazy(() => import('./pages/ITStaffingPage').then(m => ({ default: m.ITStaffingPage })));
const EngineeringStaffingPage = lazy(() => import('./pages/EngineeringStaffingPage').then(m => ({ default: m.EngineeringStaffingPage })));
const ClinicalStaffingPage = lazy(() => import('./pages/ClinicalStaffingPage').then(m => ({ default: m.ClinicalStaffingPage })));
const OutsourcingPage = lazy(() => import('./pages/OutsourcingPage').then(m => ({ default: m.OutsourcingPage })));
const VeteranHiringPage = lazy(() => import('./pages/VeteranHiringPage').then(m => ({ default: m.VeteranHiringPage })));
const CloudComputingPage = lazy(() => import('./pages/CloudComputingPage').then(m => ({ default: m.CloudComputingPage })));
const DataAnalysisPage = lazy(() => import('./pages/DataAnalysisPage').then(m => ({ default: m.DataAnalysisPage })));
const WebsiteDevelopmentPage = lazy(() => import('./pages/WebsiteDevelopmentPage').then(m => ({ default: m.WebsiteDevelopmentPage })));
const ProductDevelopmentPage = lazy(() => import('./pages/ProductDevelopmentPage').then(m => ({ default: m.ProductDevelopmentPage })));
const ITConsultingPage = lazy(() => import('./pages/ITConsultingPage').then(m => ({ default: m.ITConsultingPage })));
const BusinessReformPage = lazy(() => import('./pages/BusinessReformPage').then(m => ({ default: m.BusinessReformPage })));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage').then(m => ({ default: m.InfrastructurePage })));
const HealthcarePage = lazy(() => import('./pages/HealthcarePage').then(m => ({ default: m.HealthcarePage })));

// Minimal glassmorphic loading spinner
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-20">
    <div className="relative flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 animate-pulse" />
    </div>
    <span className="mt-4 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-widest uppercase animate-pulse">
      Loading Zangle Experience...
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-cyan-500 selection:text-white">
          {/* Custom ring cursor disabled for performance. It ran a permanent
              60fps rAF spring loop and carried a `backdrop-blur` that followed
              the pointer, forcing the browser to re-composite a blurred region
              on every mouse move — a large part of the desktop input lag.
              The component is still in src/components/ui/RingCursor3D.tsx;
              re-render it here to bring it back. */}
          {/* <RingCursor3D /> */}

          {/* Real-time 3D background. Fixed at z-0 behind every route, with
              pointer-events disabled so it can never intercept a click on the
              site -- it raycasts from document-level events instead. */}
          <Background3DLayer />

          {/* Foreground UI Components */}
          <Navbar />
          {/* pt-* clears the fixed navbar with real breathing room baked in
              for every route — individual pages should not need their own
              navbar-clearance padding, only extra emphasis on top of this
              where a page wants more (e.g. the homepage hero). */}
          <main className="flex-grow overflow-x-hidden relative z-10 pt-28 sm:pt-32 lg:pt-36">
            <PageTransition3D>
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  {/* Primary Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hire-talent" element={<HireTalentPage />} />
                  {/* Showcase route for the 3D background: translucent surfaces
                      throughout, and enough page height for the camera to travel. */}
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/practice-areas" element={<PracticeAreasPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/talent-bench" element={<TalentBenchPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Specialized Staffing & Service Pages */}
                  <Route path="/services/it-staffing" element={<ITStaffingPage />} />
                  <Route path="/staffing/it-staffing" element={<ITStaffingPage />} />
                  <Route path="/services/engineering" element={<EngineeringStaffingPage />} />
                  <Route path="/services/engineering-staffing" element={<EngineeringStaffingPage />} />
                  <Route path="/staffing/engineering" element={<EngineeringStaffingPage />} />
                  <Route path="/services/clinical-staffing" element={<ClinicalStaffingPage />} />
                  <Route path="/staffing/clinical-scientific" element={<ClinicalStaffingPage />} />
                  <Route path="/services/outsourcing" element={<OutsourcingPage />} />
                  <Route path="/staffing/outsourcing" element={<OutsourcingPage />} />
                  <Route path="/services/veteran-hiring" element={<VeteranHiringPage />} />
                  <Route path="/staffing/veteran-hiring" element={<VeteranHiringPage />} />
                  <Route path="/staffing" element={<HireTalentPage />} />
                  <Route path="/services/cloud-computing" element={<CloudComputingPage />} />
                  <Route path="/services/data-analysis" element={<DataAnalysisPage />} />
                  <Route path="/services/website-development" element={<WebsiteDevelopmentPage />} />
                  <Route path="/services/product-development" element={<ProductDevelopmentPage />} />
                  <Route path="/services/it-consulting" element={<ITConsultingPage />} />
                  <Route path="/services/business-reform" element={<BusinessReformPage />} />
                  <Route path="/services/infrastructure" element={<InfrastructurePage />} />
                  <Route path="/services/healthcare" element={<HealthcarePage />} />

                  {/* 404 Not Found Fallback */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </PageTransition3D>
          </main>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
