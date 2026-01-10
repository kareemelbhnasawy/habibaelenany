import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLightbox } from "../components/LightboxProvider";
import { useGroupedMedia } from "../hooks/useContent";

interface MediaItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  caption?: string;
  [key: string]: any;
}

interface Section {
  title: string;
  description: string;
  items: MediaItem[];
}

function SectionContainer({
  section,
  sectionIndex,
  allItems,
}: {
  section: Section;
  sectionIndex: number;
  allItems: MediaItem[];
}) {
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
    const globalIndex = allItems.findIndex(
      (i) => i.id === section.items[currentImageIndex].id
    );
    if (globalIndex !== -1) {
      // Cast allItems to any for the strict Photo type check, or ensure MediaItem is fully compatible
      // We know MediaItem has all Photo props now
      openLightbox(allItems as any, globalIndex, true);
    }
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
        {section.items.map((item: MediaItem, idx: number) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover", objectPosition: "center" }}
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
            {section.items.map((_: MediaItem, idx: number) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "w-8 bg-white" : "w-4 bg-white/50"
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
  const { sections: groupedItems, loading } = useGroupedMedia("Filmmaking");

  // Section Order & Metadata
  const sectionMetadata: Record<string, string> = {
    Production: "Behind the scenes and production moments",
    Cinematography: "Cinematic frames and visual storytelling",
    "Visual Effects": "Post-production and digital effects work",
    Direction: "Creative direction and scene composition",
    "Set Design": "Production design and art direction",
    Lighting: "Lighting setups and mood creation",
  };
  const order = [
    "Production",
    "Cinematography",
    "Visual Effects",
    "Direction",
    "Set Design",
    "Lighting",
  ];

  const sections = Object.keys(groupedItems)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((title) => ({
      title,
      description: sectionMetadata[title] || "Filmmaking collection",
      items: groupedItems[title].map((item) => ({
        ...item,
        src: item.url,
        width: item.width || 1920,
        height: item.height || 1080,
        category: item.category,
        alt: item.title || item.description || "Filmmaking Frame",
        title: item.title || undefined,
        description: item.description || undefined,
        caption: item.description || undefined,
        id: item.id,
      })),
    }));

  // Flatten for Lightbox
  const allItems = sections.flatMap((s) => s.items);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center pt-24">
        Loading...
      </div>
    );
  }

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
            Cinematic frames from film productions.
          </p>
        </motion.div>

        {/* Sections Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sections.map((section, index) => (
            <div key={section.title} className="w-full aspect-video">
              <SectionContainer
                section={section}
                sectionIndex={index}
                allItems={allItems}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted text-lg">
              No filmmaking content available yet.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
