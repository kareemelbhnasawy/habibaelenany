import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { photos } from '../data/photos';
import { cn } from '../utils/cn';

const heroPhotos = photos.slice(0, 6);

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // Pause on hover
  useEffect(() => {
    if (!emblaApi) return;

    const container = emblaApi.containerNode();
    let autoplayInterval: ReturnType<typeof setInterval>;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    startAutoplay();

    return () => {
      stopAutoplay();
      container.removeEventListener('mouseenter', stopAutoplay);
      container.removeEventListener('mouseleave', startAutoplay);
    };
  }, [emblaApi]);

  return (
    <div className="relative h-full group">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroPhotos.map((photo, index) => (
            <div key={photo.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.06 }}
                transition={{
                  duration: 7,
                  ease: 'linear',
                }}
                className="w-full h-full"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 z-10',
          'w-10 h-10 md:w-12 md:h-12 rounded-full',
          'bg-paper/90 backdrop-blur-sm shadow-soft',
          'flex items-center justify-center',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'hover:bg-paper hover:shadow-lifted focus-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={scrollNext}
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 z-10',
          'w-10 h-10 md:w-12 md:h-12 rounded-full',
          'bg-paper/90 backdrop-blur-sm shadow-soft',
          'flex items-center justify-center',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'hover:bg-paper hover:shadow-lifted focus-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className="w-2 h-2 rounded-full bg-paper/50 hover:bg-paper transition-colors focus-ring"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
