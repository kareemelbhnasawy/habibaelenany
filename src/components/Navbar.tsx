import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../data/site";
import { cn } from "../utils/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobileMenuOpen) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Delay overflow hidden slightly to allow smooth animation start
      const timer = setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const isHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isMobileMenuOpen
          ? "bg-transparent"
          : isScrolled || !isHome
          ? "bg-paper/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 md:h-12">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-start outline-none"
            aria-label="Home"
          >
            <h1 className="text-2xl md:text-3xl font-display font-semibold tracking-tight leading-none">
               HABIBA EL ENANY
            </h1>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase font-light self-center ">
              PORTOFOLIO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {siteConfig.nav.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-xs font-sans font-light tracking-[0.2em] uppercase transition-all px-2 py-2 relative outline-none whitespace-nowrap",
                  location.pathname === link.href
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent"
                    : "text-ink hover:text-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 outline-none relative z-[110]"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 bg-paper/30 backdrop-blur-lg z-[100]"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                touchAction: 'none'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.05
                }}
                className="pt-24"
              >
                {/* Menu Items */}
                <nav className="px-8 py-4">
                  {siteConfig.nav.links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + (index * 0.06),
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "block py-5 text-base font-sans font-light tracking-[0.2em] uppercase transition-all outline-none",
                          location.pathname === link.href
                            ? "text-accent"
                            : "text-ink hover:text-accent"
                        )}
                      >
                        {link.label}
                      </Link>
                      {index < siteConfig.nav.links.length - 1 && (
                        <div className="border-b border-ink/10" />
                      )}
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
