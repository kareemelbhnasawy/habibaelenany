import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

export function HeroCarousel() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
    axis: 'x',
    watchDrag: false, // Disable dragging to prevent interference with page scrolling
  });

  // Load hero images on component mount
  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        // Dynamically import all images from src/assets/photos/hero directory
        const imageModules = import.meta.glob('../assets/photos/hero/*.{png,jpg,jpeg,webp,JPG,PNG,JPEG,WEBP}');
        
        if (Object.keys(imageModules).length > 0) {
          // Load all the image modules and extract their URLs
          const imagePromises = Object.entries(imageModules).map(async ([path, importFn]) => {
            const module = await importFn() as { default: string };
            return module.default;
          });
          
          const imageUrls = await Promise.all(imagePromises);
          setHeroImages(imageUrls);
        } else {
          console.warn('No hero images found in src/assets/photos/hero directory');
          setHeroImages([]);
        }
      } catch (error) {
        console.error('Failed to load hero images:', error);
        setHeroImages([]);
      }
    };

    loadHeroImages();
  }, []);

  // Auto-play
  useEffect(() => {
    if (!emblaApi || heroImages.length === 0) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi, heroImages]);

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

  if (heroImages.length === 0) {
    return (
      <div className="relative h-full bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500">Loading hero images...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full group pointer-events-none">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroImages.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
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
                  src={src}
                  alt={`Hero image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${src}`);
                    // Hide broken images
                    e.currentTarget.style.display = 'none';
                  }}
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
