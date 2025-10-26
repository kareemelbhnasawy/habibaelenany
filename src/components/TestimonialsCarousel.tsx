import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { cn } from '../utils/cn';

export function TestimonialsCarousel() {
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
          Clients & Feedback
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
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0" style={{ touchAction: 'pan-x' }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div className="card p-6 md:p-8 h-full flex flex-col">
                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mb-6">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base md:text-lg truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-muted leading-relaxed text-sm md:text-base flex-1">
                  "{testimonial.quote}"
                </blockquote>
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
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button
          onClick={scrollPrev}
          className="text-ink hover:text-accent transition-all outline-none opacity-60 hover:opacity-100"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={scrollNext}
          className="text-ink hover:text-accent transition-all outline-none opacity-60 hover:opacity-100"
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
