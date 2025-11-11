import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Short Form Highlights with their images
const shortFormHighlights = [
  {
    id: 'mernyth',
    title: 'Mernyth',
    src: new URL('../assets/photos/short-form-highlights/mernyth.JPG', import.meta.url).href,
    alt: 'Mernyth short form content',
  },
  {
    id: 'flyzone',
    title: 'Flyzone',
    src: new URL('../assets/photos/short-form-highlights/flyzone.jpg', import.meta.url).href,
    alt: 'Flyzone short form content',
  },
  {
    id: 'bodybar',
    title: 'Body Bar',
    src: new URL('../assets/photos/short-form-highlights/bodybar.PNG', import.meta.url).href,
    alt: 'Body Bar short form content',
  },
];

export function ShortFormContent() {
  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4">
          Short Form Content
        </h2>
      </div>

      {/* Grid - 3 columns with smaller images */}
      <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-sm md:max-w-4xl mx-auto">
        {shortFormHighlights.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to="/short-form"
              className="group block relative aspect-[9/16] overflow-hidden focus-ring touch-manipulation active:scale-[0.98] transition-transform max-w-[200px] md:max-w-none mx-auto"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                loading="lazy"
              />
              {/* Commented out text overlay - can be re-added later */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-white font-display text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
