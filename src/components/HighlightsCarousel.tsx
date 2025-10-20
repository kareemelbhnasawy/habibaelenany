import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { highlights } from '../data/highlights';
import { photos } from '../data/photos';
import { useLightbox } from './LightboxProvider';
import { cn } from '../utils/cn';

export function HighlightsCarousel() {
  const { openLightbox } = useLightbox();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const highlightPhotos = highlights.map(h => {
    const photo = photos.find(p => p.id === h.photoId);
    return { ...h, photo };
  }).filter(h => h.photo);

  // Create array of photos for lightbox
  const lightboxPhotos = highlightPhotos.map(h => h.photo!);

  return (
    <div className="relative">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2">
            Photography Highlights
          </h2>
          <p className="text-muted text-sm md:text-base uppercase tracking-wide">
            Featured Work
          </p>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollPrev}
            className={cn(
              'w-12 h-12 rounded-full',
              'bg-paper border border-ink/10',
              'flex items-center justify-center',
              'hover:border-ink/30 hover:shadow-soft transition-all',
              'focus-ring'
            )}
            aria-label="Previous slides"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className={cn(
              'w-12 h-12 rounded-full',
              'bg-paper border border-ink/10',
              'flex items-center justify-center',
              'hover:border-ink/30 hover:shadow-soft transition-all',
              'focus-ring'
            )}
            aria-label="Next slides"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden -mx-4 sm:mx-0" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0">
          {highlightPhotos.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div
                className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer touch-manipulation active:scale-[0.98] transition-transform"
                onClick={() => openLightbox(lightboxPhotos, index)}
              >
                {/* Image */}
                <img
                  src={highlight.photo!.src}
                  alt={highlight.photo!.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  loading="lazy"
                />

                {/* Overlay - tap on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-white text-xs font-medium mb-3">
                      {highlight.category}
                    </span>
                    <h3 className="text-white font-display text-xl md:text-2xl font-semibold">
                      {highlight.title}
                    </h3>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all duration-300 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        <button
          onClick={scrollPrev}
          className={cn(
            'w-10 h-10 rounded-full',
            'bg-paper border border-ink/10',
            'flex items-center justify-center',
            'hover:border-ink/30 hover:shadow-soft transition-all',
            'focus-ring'
          )}
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className={cn(
            'w-10 h-10 rounded-full',
            'bg-paper border border-ink/10',
            'flex items-center justify-center',
            'hover:border-ink/30 hover:shadow-soft transition-all',
            'focus-ring'
          )}
          aria-label="Next slides"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
