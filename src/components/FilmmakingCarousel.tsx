import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLightbox } from './LightboxProvider';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

// Filmmaking Highlights with their dedicated images
const filmmakingHighlights = [
  {
    id: 'filmmaking-highlight-1',
    src: new URL('../assets/photos/filmaking_landpage_highlights/img-01.PNG', import.meta.url).href,
    alt: 'Filmmaking highlight 1',
    title: 'Production',
    width: 1920,
    height: 1080,
    category: 'Filmmaking',
  },
  {
    id: 'filmmaking-highlight-2',
    src: new URL('../assets/photos/filmaking_landpage_highlights/img-02.PNG', import.meta.url).href,
    alt: 'Filmmaking highlight 2',
    title: 'Cinematography',
    width: 1920,
    height: 1080,
    category: 'Filmmaking',
  },
  {
    id: 'filmmaking-highlight-3',
    src: new URL('../assets/photos/filmaking_landpage_highlights/img-03.PNG', import.meta.url).href,
    alt: 'Filmmaking highlight 3',
    title: 'Direction',
    width: 1920,
    height: 1080,
    category: 'Filmmaking',
  },
];

export function FilmmakingCarousel() {
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
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0" style={{ touchAction: 'pan-x' }}>
          {filmmakingHighlights.map((photo, index) => (
            <div
              key={photo.id}
              className="flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0"
            >
              <div
                className="group relative aspect-video overflow-hidden cursor-pointer bg-ink/5 touch-manipulation active:scale-[0.98] transition-transform"
                onClick={() => openLightbox(filmmakingHighlights, index)}
              >
                {/* Image */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  loading="lazy"
                />

                {/* Commented out text overlay - can be re-added later */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {photo.title && (
                      <span className="inline-block text-white/90 px-3 py-1 text-sm md:text-base uppercase tracking-wide font-medium">
                        {photo.title}
                      </span>
                    )}
                  </div>
                </div> */}

                {/* Hover border */}
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/30 transition-all duration-300" />
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

      {/* View All Button */}
      <div className="mt-12 text-center">
        <Link to="/filmmaking" className="btn btn-secondary font-sans tracking-[0.2em] uppercase font-light text-xs md:text-sm">
          VIEW ALL
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
