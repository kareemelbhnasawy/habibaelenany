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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.nav.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-xs md:text-sm font-sans font-light tracking-[0.2em] uppercase transition-all px-3 py-2 relative outline-none",
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
            className="md:hidden p-2 outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Full-screen Menu with Blurred Background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-0 bg-paper/30 backdrop-blur-lg z-50 overflow-y-auto"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  {/* Close button */}
                  <div className="flex justify-end p-6">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 outline-none"
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <nav className="px-8 py-4">
                    {siteConfig.nav.links.map((link, index) => (
                      <div key={link.href}>
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
                      </div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
