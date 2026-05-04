import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import SplashLoader from './components/SplashLoader';

// Lazy loading components for speed
const Home = lazy(() => import('./pages/Home'));
const Hakkimizda = lazy(() => import('./pages/Hakkimizda'));
const Fiyatlar = lazy(() => import('./pages/Fiyatlar'));
const Hizmetler = lazy(() => import('./pages/Hizmetler'));
const Portfolyo = lazy(() => import('./pages/Portfolyo'));
const Iletisim = lazy(() => import('./pages/Iletisim'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const PortfolioManager = lazy(() => import('./pages/admin/views/PortfolioManager'));
const PricingManager = lazy(() => import('./pages/admin/views/PricingManager'));
const InboxManager = lazy(() => import('./pages/admin/views/InboxManager'));

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [initialLoading, setInitialLoading] = React.useState(true);

  // Manage initial load
  React.useEffect(() => {
    // Show our premium React SplashLoader for a bit, then remove it
    const timer = setTimeout(() => {
      setInitialLoading(false);
      document.body.classList.add('loaded');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Sync Global Theme Color based on route
  React.useEffect(() => {
    const getThemeColor = (path) => {
      switch(path) {
        case '/hakkimizda': return '#D4C0A8';
        case '/fiyatlar': return '#00FF9D';
        case '/hizmetler': return '#C0C0C0';
        case '/portfolyo': return '#BC13FE';
        case '/iletisim': return '#FFB300';
        default: return '#00f3ff';
      }
    };
    const color = getThemeColor(location.pathname);
    document.documentElement.style.setProperty('--page-theme-color', color);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {initialLoading && <SplashLoader key="splash" />}
      </AnimatePresence>

      {!initialLoading && !isAdmin && <Navbar />}
      {!initialLoading && !isAdmin && <ScrollToTop />}
      
      {!initialLoading && (
        <Suspense fallback={<div style={{ height: '100vh', width: '100vw', background: '#020204' }}></div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/hakkimizda" element={<PageTransition><Hakkimizda /></PageTransition>} />
              <Route path="/fiyatlar" element={<PageTransition><Fiyatlar /></PageTransition>} />
              <Route path="/hizmetler" element={<PageTransition><Hizmetler /></PageTransition>} />
              <Route path="/portfolyo" element={<PageTransition><Portfolyo /></PageTransition>} />
              <Route path="/iletisim" element={<PageTransition><Iletisim /></PageTransition>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<PortfolioManager />} />
                <Route path="portfolio" element={<PortfolioManager />} />
                <Route path="pricing" element={<PricingManager />} />
                <Route path="inbox" element={<InboxManager />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      )}
    </>
  );
}

export default App;