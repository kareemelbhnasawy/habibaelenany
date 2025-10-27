import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ImageCard } from '../components/ImageCard';
import { useLightbox } from '../components/LightboxProvider';
import { categories, getPhotosByCategory } from '../data/photos';
import type { Category } from '../data/photos';
import { cn } from '../utils/cn';

export function Photography() {
  const [activeSection, setActiveSection] = useState<string>('Portraits');
  const { openLightbox } = useLightbox();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (category: string) => {
    setActiveSection(category);
    const element = sectionRefs.current[category];
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filter out 'All' from categories for sections
  const categoryList = categories.filter((cat) => cat !== 'All');

  const handleImageClick = (category: Category, index: number) => {
    const categoryPhotos = getPhotosByCategory(category);
    openLightbox(categoryPhotos, index, true);
  };

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
            A curated collection of my work capturing moments, emotions, and stories through the lens.
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
            {categoryList.map((category, index) => (
              <div key={category} className="flex items-center">
                <button
                  onClick={() => scrollToSection(category)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all outline-none',
                    activeSection === category
                      ? 'text-accent'
                      : 'text-ink/60 hover:text-accent'
                  )}
                >
                  {category}
                </button>
                {index < categoryList.length - 1 && (
                  <div className="h-4 w-px bg-ink/20" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Sections */}
        <div className="space-y-16">
          {categoryList.map((category) => {
            const categoryPhotos = getPhotosByCategory(category);

            if (categoryPhotos.length === 0) return null;

            return (
              <section
                key={category}
                id={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
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
                    {category}
                  </h2>
                </motion.div>

                {/* 2-Column Masonry Grid using CSS columns */}
                <div className="columns-2 gap-3 md:gap-4">
                  {categoryPhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '100px' }}
                      transition={{ delay: index * 0.05 }}
                      className="mb-3 md:mb-4 break-inside-avoid"
                    >
                      <ImageCard
                        photo={photo}
                        index={index}
                        onClick={() => handleImageClick(category, index)}
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
