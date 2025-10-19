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
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2">
            Filmmaking Frames
          </h2>
          <p className="text-muted text-sm md:text-base uppercase tracking-wide">
            Cinematic Stories
          </p>
        </div>

        <div className="hidden md:flex gap-2">
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

      {/* Carousel */}
      <div className="overflow-hidden -mx-4 sm:mx-0" ref={emblaRef}>
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
                className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-ink/5"
                onClick={() => openLightbox(filmmakingPhotos, index)}
              >
                {/* Image */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {photo.title && (
                      <h3 className="text-white font-display text-lg md:text-xl font-semibold mb-1">
                        {photo.title}
                      </h3>
                    )}
                    {photo.caption && (
                      <p className="text-white/80 text-sm line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/30 transition-all duration-300 rounded-lg" />
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
