import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactBubble } from './components/FloatingContactBubble';
import { LightboxProvider } from './components/LightboxProvider';
import { Home } from './routes/Home';
import { Photography } from './routes/Photography';
import { Filmmaking } from './routes/Filmmaking';
import { ShortForm } from './routes/ShortForm';
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

  // Scroll to top on route change - instant for iOS compatibility
  useEffect(() => {
    // Use instant behavior for iOS to prevent janky scrolling
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Force scroll position for iOS Safari
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <>
            <SEO />
            <Home />
          </>
        }
      />
      <Route
        path="/photography"
        element={
          <>
            <SEO title="Photography" description="Explore my photography portfolio" />
            <Photography />
          </>
        }
      />
      <Route
        path="/filmmaking"
        element={
          <>
            <SEO title="Filmmaking" description="Cinematic frames and film production moments" />
            <Filmmaking />
          </>
        }
      />
      <Route
        path="/short-form"
        element={
          <>
            <SEO title="Short Form Content" description="Vertical storytelling for the digital age" />
            <ShortForm />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <SEO title="404 - Page Not Found" />
            <NotFound />
          </>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LightboxProvider>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <FloatingContactBubble />
        </LightboxProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
