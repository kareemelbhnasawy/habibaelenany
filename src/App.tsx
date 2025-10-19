import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactBubble } from './components/FloatingContactBubble';
import { LightboxProvider } from './components/LightboxProvider';
import { Home } from './routes/Home';
import { Photography } from './routes/Photography';
import { NotFound } from './routes/NotFound';
import { siteConfig } from './data/site';

function SEO({ title, description }: { title?: string; description?: string }) {
  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <SEO />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </motion.div>
            </>
          }
        />
        <Route
          path="/photography"
          element={
            <>
              <SEO title="Photography" description="Explore my photography portfolio" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Photography />
              </motion.div>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <SEO title="404 - Page Not Found" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NotFound />
              </motion.div>
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LightboxProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <AnimatedRoutes />
            </div>
            <Footer />
            <FloatingContactBubble />
          </div>
        </LightboxProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
