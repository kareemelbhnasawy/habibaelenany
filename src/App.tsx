import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingContactBubble } from "./components/FloatingContactBubble";
import { LightboxProvider } from "./components/LightboxProvider";
// import { PageLoader } from './components/PageLoader';
import { Home } from "./routes/Home";
import { Photography } from "./routes/Photography";
import { Filmmaking } from "./routes/Filmmaking";
import { ShortForm } from "./routes/ShortForm";
import { NotFound } from "./routes/NotFound";
import { siteConfig } from "./lib/siteConfig";
import { PageLoader } from "./components/PageLoader";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./routes/Login";
import { DashboardLayout } from "./components/admin/DashboardLayout";
import { AuthGuard } from "./components/admin/AuthGuard";
import { MediaLibrary } from "./routes/admin/MediaLibrary";
import { Migration } from "./routes/admin/Migration";
import { HomePageEditor } from "./routes/admin/pages/HomePageEditor";
import { PhotographyPageEditor } from "./routes/admin/pages/PhotographyPageEditor";
import { FilmmakingPageEditor } from "./routes/admin/pages/FilmmakingPageEditor";
import { ShortFormPageEditor } from "./routes/admin/pages/ShortFormPageEditor";
import { TestimonialsEditor } from "./routes/admin/pages/TestimonialsEditor";
import { SettingsPage } from "./routes/admin/pages/SettingsPage";
import { DashboardOverview } from "./routes/admin/DashboardOverview";

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

  // Scroll to top on route change - instant for iOS compatibility
  useEffect(() => {
    // Use instant behavior for iOS to prevent janky scrolling
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // Force scroll position for iOS Safari
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <SEO />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
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
              <SEO
                title="Photography"
                description="Explore my photography portfolio"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
              >
                <Photography />
              </motion.div>
            </>
          }
        />
        <Route
          path="/filmmaking"
          element={
            <>
              <SEO
                title="Filmmaking"
                description="Cinematic frames and film production moments"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
              >
                <Filmmaking />
              </motion.div>
            </>
          }
        />
        <Route
          path="/short-form"
          element={
            <>
              <SEO
                title="Short Form Content"
                description="Vertical storytelling for the digital age"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
              >
                <ShortForm />
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <LightboxProvider>
            <PageLoader isLoading={isLoading} />
            <Routes>
              {/* Public Routes - Wrapped in MainLayout implicitly via composition in the original code, 
                  but here we are restructuring. The original code rendered Navbar/Footer globally.
                  We need to make sure Navbar/Footer don't show on Admin pages. 
               */}
              <Route
                element={
                  <>
                    <Navbar />
                    <main>
                      <AnimatedRoutes />
                    </main>
                    <Footer />
                    <FloatingContactBubble />
                  </>
                }
                path="/*"
              />

              {/* Admin Routes */}
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <DashboardLayout />
                  </AuthGuard>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="home" element={<HomePageEditor />} />
                <Route path="photography" element={<PhotographyPageEditor />} />
                <Route path="filmmaking" element={<FilmmakingPageEditor />} />
                <Route path="short-form" element={<ShortFormPageEditor />} />
                <Route path="testimonials" element={<TestimonialsEditor />} />
                <Route path="migration" element={<Migration />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </LightboxProvider>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
