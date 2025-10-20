import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { photos } from '../data/photos';
import { useLightbox } from './LightboxProvider';

const shortFormPhotos = photos.filter(p => p.category === 'Short Form');

export function ShortFormContent() {
  const { openLightbox } = useLightbox();

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2">
            Short Form Content
          </h2>
          <p className="text-muted text-sm md:text-base uppercase tracking-wide">
            Vertical Storytelling
          </p>
        </div>

        <Link
          to="/photography?category=Short Form"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent transition-colors focus-ring rounded-lg px-3 py-2"
        >
          <span>View All</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {shortFormPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer touch-manipulation active:scale-[0.98] transition-transform"
            onClick={() => openLightbox(shortFormPhotos, index)}
          >
            {/* Vertical aspect ratio for short form content */}
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-ink/5">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay with title - tap on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {photo.title && (
                    <h3 className="text-white font-display text-lg md:text-xl font-semibold text-center">
                      {photo.title}
                    </h3>
                  )}
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all duration-300 rounded-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
