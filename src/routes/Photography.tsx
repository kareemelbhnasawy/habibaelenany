import { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "../components/ImageCard";
import { useLightbox } from "../components/LightboxProvider";
import { useMedia } from "../hooks/useContent";
import { cn } from "../utils/cn";
import type { MediaItem } from "../types/database";

export function Photography() {
  const [activeSection, setActiveSection] = useState<string>("Editorial");
  const { openLightbox } = useLightbox();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const { items: allItems, loading } = useMedia({ category: "Photography" });

  // Define section metadata (descriptions) only - Order is derived from data
  const sectionMetadata: Record<string, string> = {
    Fashion: "Fashion photography and styling",
    Editorial: "Fashion and editorial photography",
    Outdoor: "Natural light and landscape photography",
    Portraits: "Character and portrait photography",
    Products: "Commercial product photography",
  };

  const sections = useMemo(() => {
    const map = new Map<string, MediaItem[]>();

    // Group items while preserving order based on first occurrence
    allItems.forEach((item) => {
      const title = item.section || "Uncategorized";
      if (!map.has(title)) {
        map.set(title, []);
      }
      map.get(title)!.push(item);
    });

    return Array.from(map.entries()).map(([title, items]) => ({
      title,
      description: sectionMetadata[title] || "Portfolio collection",
      items: items.map((item) => ({
        ...item,
        src: item.url,
        alt: item.title || item.description || "Portfolio Item",
        title: item.title || undefined,
        description: item.description || undefined,
        year: item.year || undefined,
        id: item.id,
      })),
    }));
  }, [allItems]);

  // Set initial active section if not set and sections exist
  if (!activeSection && sections.length > 0) {
    setActiveSection(sections[0].title);
  }

  const scrollToSection = (sectionTitle: string) => {
    setActiveSection(sectionTitle);
    const element = sectionRefs.current[sectionTitle];
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleImageClick = (sectionTitle: string, index: number) => {
    const section = sections.find((s) => s.title === sectionTitle);
    if (section) {
      openLightbox(section.items, index, true);
    }
  };

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
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-4">
            Photography
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            A curated collection of my work capturing moments, emotions, and
            stories.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-20 z-30 bg-bg/95 backdrop-blur-md py-4 mb-12 -mx-4 px-4"
        >
          <div className="flex flex-wrap gap-0 justify-center items-center">
            {sections.map((section, index) => (
              <div key={section.title} className="flex items-center">
                <button
                  onClick={() => scrollToSection(section.title)}
                  className={cn(
                    "px-4 py-2 text-xs md:text-base font-sans font-light tracking-[0.2em] uppercase transition-all outline-none",
                    activeSection === section.title
                      ? "text-accent"
                      : "text-ink/60 hover:text-accent"
                  )}
                >
                  {section.title}
                </button>
                {index < sections.length - 1 && (
                  <div className="h-4 w-px bg-ink/20" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Sections */}
        <div className="space-y-16">
          {sections.map((section) => {
            if (section.items.length === 0) return null;

            return (
              <section
                key={section.title}
                id={section.title}
                ref={(el) => {
                  sectionRefs.current[section.title] = el;
                }}
                className="scroll-mt-32"
              >
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-semibold">
                    {section.title}
                  </h2>
                  <p className="text-muted mt-2">{section.description}</p>
                </motion.div>

                {/* 2-Column Masonry Grid */}
                <div className="columns-2 gap-3 md:gap-4">
                  {section.items.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ delay: index * 0.05 }}
                      className="mb-3 md:mb-4 break-inside-avoid"
                    >
                      <ImageCard
                        photo={photo}
                        index={index}
                        onClick={() => handleImageClick(section.title, index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
