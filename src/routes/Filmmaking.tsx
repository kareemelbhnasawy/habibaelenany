import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLightbox } from '../components/LightboxProvider';
import { filmmakingItems, filmmakingSections } from '../data/filmmaking';

function SectionContainer({ section, sectionIndex }: { section: typeof filmmakingSections[0]; sectionIndex: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const { openLightbox } = useLightbox();
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (!entry.isIntersecting) {
            setCurrentImageIndex(0); // Reset to first image when leaving viewport
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Slideshow effect when in view
  useEffect(() => {
    if (!isInView || section.items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % section.items.length);
    }, 800); // Change image every 800ms

    return () => clearInterval(interval);
  }, [isInView, section.items.length]);

  const handleClick = () => {
    const globalIndex = filmmakingItems.findIndex(i => i.id === section.items[currentImageIndex].id);
    openLightbox(filmmakingItems, globalIndex, true);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px", amount: 0.1 }}
      transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
      className="relative h-full overflow-hidden bg-paper border border-ink/10 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {section.items.map((item, idx) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/20 group-hover:from-ink/70 group-hover:via-ink/30 group-hover:to-ink/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
        {/* Commented out text overlay - can be re-added later */}
        {/* <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-3">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-2">
            {section.description}
          </p>
          <p className="text-sm text-white/70">
            {section.items.length} {section.items.length === 1 ? 'photo' : 'photos'}
          </p>
        </motion.div> */}

        {/* Progress indicator when section is in view */}
        {isInView && section.items.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 flex gap-1"
          >
            {section.items.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function Filmmaking() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-4">
            Filmmaking
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Cinematic frames and behind-the-scenes moments from film productions.
          </p>
        </motion.div>

        {/* Sections Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filmmakingSections.map((section, index) => (
            <div
              key={section.title}
              className="w-full aspect-video"
            >
              <SectionContainer section={section} sectionIndex={index} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filmmakingItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted text-lg">No filmmaking content available yet.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
