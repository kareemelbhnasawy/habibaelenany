import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { photos } from '../data/photos';
import { useLightbox } from './LightboxProvider';
import { cn } from '../utils/cn';

const filmmakingPhotos = photos.filter(p => p.category === 'Filmmaking');

export function FilmmakingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const { openLightbox } = useLightbox();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2">
          Filmmaking Frames
        </h2>
      </div>

      {/* Carousel with Navigation */}
      <div className="relative flex items-center gap-4">
        {/* Previous Button - Desktop */}
        <button
          onClick={scrollPrev}
          className={cn(
            'hidden md:flex shrink-0',
            'items-center justify-center',
            'text-ink hover:text-accent transition-all outline-none',
            'opacity-60 hover:opacity-100'
          )}
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0">
          {filmmakingPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div
                className="group relative aspect-video overflow-hidden cursor-pointer bg-ink/5 touch-manipulation active:scale-[0.98] transition-transform"
                onClick={() => openLightbox(filmmakingPhotos, index)}
              >
                {/* Image */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  loading="lazy"
                />

                {/* Overlay with badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {photo.title && (
                      <span className="inline-block bg-white/90 text-ink px-3 py-1 text-sm md:text-base uppercase tracking-wide font-medium">
                        {photo.title}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/30 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        </div>

        {/* Next Button - Desktop */}
        <button
          onClick={scrollNext}
          className={cn(
            'hidden md:flex shrink-0',
            'items-center justify-center',
            'text-ink hover:text-accent transition-all outline-none',
            'opacity-60 hover:opacity-100'
          )}
          aria-label="Next slides"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button
          onClick={scrollPrev}
          className="text-ink hover:text-accent transition-all outline-none opacity-60 hover:opacity-100"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={scrollNext}
          className="text-ink hover:text-accent transition-all outline-none opacity-60 hover:opacity-100"
          aria-label="Next slides"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
