import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { photos } from '../data/photos';

const heroPhotos = photos.slice(0, 6);

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
    axis: 'x',
    watchDrag: false, // Disable dragging to prevent interference with page scrolling
  });

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
    <div className="relative h-full group pointer-events-none">
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
                  className="w-full h-full object-contain md:object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
