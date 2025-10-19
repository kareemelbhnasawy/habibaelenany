import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { cn } from '../utils/cn';

export function TestimonialsCarousel() {
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

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2">
            Clients & Feedback
          </h2>
          <p className="text-muted text-sm md:text-base uppercase tracking-wide">
            What People Say
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
            aria-label="Previous testimonials"
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
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden -mx-4 sm:mx-0" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div className="card p-6 md:p-8 h-full flex flex-col">
                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mb-6">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
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
          aria-label="Previous testimonials"
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
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
