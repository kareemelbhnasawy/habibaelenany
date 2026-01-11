import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMedia } from "../hooks/useContent";

export function HeroCarousel() {
  // Use the new "Hero" category instead of isHero flag
  const { items } = useMedia({ category: "Hero" });
  const heroImages = items.map((item) => item.url);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [heroImages.length]);

  if (heroImages.length === 0) {
    return (
      <div className="relative h-full bg-gray-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Creating a "Ken Burns" effect with scale */}
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 7, ease: "linear" }}
          >
            <img
              src={heroImages[currentIndex]}
              alt={`Hero image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              // Ensure critical loading for the first image
              loading={currentIndex === 0 ? "eager" : "lazy"}
              style={{ objectPosition: "center 40%" }} // Adjusted to focus slightly higher
            />
          </motion.div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group relative h-1 w-8 overflow-hidden rounded-full bg-white/20 transition-all hover:bg-white/40 focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx === currentIndex && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
