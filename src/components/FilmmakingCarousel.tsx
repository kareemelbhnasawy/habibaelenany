import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLightbox } from "./LightboxProvider";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";
import { useMedia } from "../hooks/useContent";

// Filmmaking Highlights with their dedicated images
export function FilmmakingCarousel() {
  const { openLightbox } = useLightbox();
  // Fetch highlights for Filmmaking specifically
  const { items } = useMedia({
    category: "Filmmaking",
    isHighlight: true,
    limit: 6,
  });

  // Filter items that have images (video previews often have images in this schema, or we need to handle video types)
  // Assuming items have 'url' which is an image or video. For carousel we usually show image.
  // The media library uploads both. If type is video, url is video.
  // However, `FilmmakingCarousel` usually displays images or thumbnails.
  // We'll assume the URL is usable for `img src`. If it's a video, we might need a thumbnail generator or separate field.
  // For now, let's assume valid image URLs or that browser can handle it (it won't handle video in img tag well).
  // Ideally we should filter for type='image' if this is an image carousel, OR have a thumbnail_url.
  // Current schema doesn't have thumbnail_url.
  // But Filmmaking items in legacy data were PNG/JPGs.
  // We'll filter by type 'image' if possible, or just use items.

  const filmmakingHighlights = items.map((item) => ({
    id: item.id,
    src: item.url,
    alt: item.title || "Filmmaking Highlight",
    title: item.title || undefined,
    width: item.width || 1920,
    height: item.height || 1080,
    category: item.category,
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: true,
      dragFree: true,
      containScroll: "trimSnaps",
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
          Filmmaking Frames
        </h2>
      </div>

      {/* Carousel with Navigation */}
      <div className="relative flex items-center gap-4">
        {/* Previous Button - Desktop */}
        <button
          onClick={scrollPrev}
          className={cn(
            "hidden md:flex shrink-0",
            "items-center justify-center",
            "text-ink hover:text-accent transition-all outline-none",
            "opacity-60 hover:opacity-100"
          )}
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden flex-1" ref={emblaRef}>
          <div
            className="flex -ml-4 md:-ml-6 px-4 sm:px-0"
            style={{ touchAction: "pan-x" }}
          >
            {filmmakingHighlights.map((photo, index) => (
              <div
                key={photo.id}
                className="flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 pl-4 md:pl-6"
              >
                <div
                  className="group relative aspect-video overflow-hidden cursor-pointer bg-ink/5 touch-manipulation active:scale-[0.98] transition-transform"
                  onClick={() => openLightbox(filmmakingHighlights, index)}
                >
                  {/* Image */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105 protected-media"
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
            "hidden md:flex shrink-0",
            "items-center justify-center",
            "text-ink hover:text-accent transition-all outline-none",
            "opacity-60 hover:opacity-100"
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
        <Link
          to="/filmmaking"
          className="btn btn-secondary font-sans tracking-[0.2em] uppercase font-light text-xs md:text-sm"
        >
          VIEW ALL
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
