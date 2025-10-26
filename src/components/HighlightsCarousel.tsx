import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { highlights } from '../data/highlights';
import { photos } from '../data/photos';
import { useLightbox } from './LightboxProvider';
import { cn } from '../utils/cn';

export function HighlightsCarousel() {
  const { openLightbox } = useLightbox();

  const highlightPhotos = highlights.map(h => {
    const photo = photos.find(p => p.id === h.photoId);
    return { ...h, photo };
  }).filter(h => h.photo);

  // Create array of photos for lightbox
  const lightboxPhotos = highlightPhotos.map(h => h.photo!);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: true,
      dragFree: true,
      containScroll: 'trimSnaps',
      duration: 40,
    },
    [WheelGesturesPlugin()]
  );

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
          Photography Highlights
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
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0" style={{ touchAction: 'pan-x' }}>
          {highlightPhotos.map((highlight, index) => (
            <div
              key={`${highlight.id}-${index}`}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer touch-manipulation active:scale-[0.98] transition-transform"
                onClick={() => openLightbox(lightboxPhotos, index)}
              >
                {/* Image */}
                <img
                  src={highlight.photo!.src}
                  alt={highlight.photo!.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  loading="lazy"
                />

                {/* Overlay with badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-block px-4 py-2 rounded-full bg-accent/90 text-white text-sm font-medium w-fit">
                      {highlight.category}
                    </span>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all duration-300" />
              </div>
            </div>
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
