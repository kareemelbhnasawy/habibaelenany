import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { shortFormItems } from '../data/shortform';

// Video lightbox modal component
function VideoLightbox({ src, isOpen, onClose }: { src: string; isOpen: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-white/70 transition-colors"
        aria-label="Close video"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Video container */}
      <div
        className="relative w-full max-w-[90vh] aspect-[9/16] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          controls
          playsInline
          loop
        />
      </div>
    </div>
  );
}

// Lazy loading video preview component
function LazyVideoPreview({ src, className, onClick }: { src: string; className: string; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsInView(true);
            setHasLoaded(true);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded]);

  // Set video to middle frame when loaded
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isInView) return;

    const handleLoadedMetadata = () => {
      videoElement.currentTime = videoElement.duration / 2;
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isInView]);

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={onClick}>
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        className={className}
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-all">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-ink ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

export function ShortForm() {
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  // Fix iOS scroll issues at edges
  useEffect(() => {
    // Ensure smooth scrolling at page boundaries
    const preventScrollLock = () => {
      document.body.style.overflowY = 'scroll';
      // @ts-expect-error - webkit prefix for iOS
      document.body.style.webkitOverflowScrolling = 'touch';
    };

    preventScrollLock();

    return () => {
      document.body.style.overflowY = '';
      // @ts-expect-error - webkit prefix for iOS
      document.body.style.webkitOverflowScrolling = '';
    };
  }, []);

  // Scroll to section based on URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      // Wait for the page to render
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100; // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ touchAction: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-4">
            Short Form Content
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Vertical storytelling for the modern digital landscape.
          </p>
        </motion.div>

        {/* Content Grid - Dynamic layout based on section video count */}
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          {(() => {
            // Group items by title (section)
            const sections: { [key: string]: typeof shortFormItems } = {};
            shortFormItems.forEach(item => {
              if (!sections[item.title]) {
                sections[item.title] = [];
              }
              sections[item.title].push(item);
            });

            return Object.entries(sections).map(([title, sectionItems], sectionIndex) => {
              const mainItem = sectionItems[0];
              const smallItems = sectionItems.slice(1);
              // Create URL-friendly ID from title (e.g., "Mernyth" -> "mernyth")
              const sectionId = title.toLowerCase().replace(/\s+/g, '-');

              return (
                <motion.div
                  key={title}
                  id={sectionId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px", amount: 0.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 lg:gap-16 scroll-mt-24"
                  style={{ willChange: 'auto' }}
                >
                  {/* Large Mobile Container */}
                  <div className={`relative mx-auto md:mx-0 flex items-center justify-center ${
                    sectionIndex % 2 === 1 ? 'md:order-2' : 'md:order-1'
                  }`}>
                    {/* iPhone-like container - Large */}
                    <div className="relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[300px] shrink-0">
                      {/* Phone frame */}
                      <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl isolate">
                        {/* Notch with camera */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-white rounded-b-3xl z-10 flex items-center justify-start pl-5">
                          {/* Front camera */}
                          <div className="relative w-2.5 h-2.5 mt-1">
                            <div className="absolute inset-0 bg-gray-400 rounded-full" />
                            <div className="absolute inset-0.5 bg-gray-500 rounded-full" />
                            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-600/50 rounded-full" />
                          </div>
                        </div>

                        {/* Screen */}
                        <div className="relative bg-paper rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                          <LazyVideoPreview
                            src={mainItem.src}
                            className="w-full h-full object-cover"
                            onClick={() => setLightboxVideo(mainItem.src)}
                          />
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  {/* Text + Small Phones */}
                  <div className={`flex flex-col gap-8 ${
                    sectionIndex % 2 === 1 ? 'md:order-1' : 'md:order-2'
                  }`}>
                    {/* Content/Text Section */}
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4">
                        {mainItem.title}
                      </h2>
                      <p className="text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto md:mx-0">
                        {mainItem.description}
                      </p>
                      {mainItem.year && (
                        <p className="mt-4 text-sm text-muted/60">
                          {mainItem.year}
                        </p>
                      )}
                    </div>

                    {/* Dynamic Small Phones Grid - Shows ALL remaining videos */}
                    {smallItems.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto md:mx-0">
                        {smallItems.map((item, i) => (
                          <div key={i} className="relative w-full max-w-[100px] sm:max-w-[120px]">
                            {/* Small iPhone-like container */}
                            <div className="relative w-full">
                              {/* Phone frame */}
                              <div className="relative bg-white rounded-[1.5rem] p-1.5 shadow-lg">
                                {/* Notch - smaller */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 bg-white rounded-b-2xl z-10 flex items-center justify-start pl-2">
                                  {/* Front camera - tiny */}
                                  <div className="relative w-1 h-1 mt-0.5">
                                    <div className="absolute inset-0 bg-gray-400 rounded-full" />
                                  </div>
                                </div>

                                {/* Screen */}
                                <div className="relative bg-paper rounded-[1.2rem] overflow-hidden aspect-[9/19.5]">
                                  <LazyVideoPreview
                                    src={item.src}
                                    className="w-full h-full object-cover"
                                    onClick={() => setLightboxVideo(item.src)}
                                  />
                                </div>
                              </div>

                              {/* Home indicator - tiny */}
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-white/40 rounded-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <VideoLightbox
        src={lightboxVideo || ''}
        isOpen={!!lightboxVideo}
        onClose={() => setLightboxVideo(null)}
      />
    </main>
  );
}
