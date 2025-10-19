import { motion } from 'framer-motion';
import type { Photo } from '../data/photos';
import { cn } from '../utils/cn';

interface ImageCardProps {
  photo: Photo;
  onClick: () => void;
  index: number;
}

export function ImageCard({ photo, onClick, index }: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-ink/5">
        {/* Aspect ratio container */}
        <div
          style={{
            paddingBottom: `${(photo.height / photo.width) * 100}%`,
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            {photo.category && (
              <span className="inline-block px-2 py-1 rounded-full bg-accent/90 text-white text-xs font-medium mb-2">
                {photo.category}
              </span>
            )}
            {photo.title && (
              <h3 className="text-white font-display text-lg md:text-xl font-semibold">
                {photo.title}
              </h3>
            )}
            {photo.caption && (
              <p className="text-white/80 text-sm mt-1 line-clamp-2">
                {photo.caption}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle shadow lift on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg ring-2 ring-transparent',
          'group-hover:ring-accent/20 group-hover:shadow-lifted',
          'transition-all duration-300 pointer-events-none'
        )}
      />
    </motion.div>
  );
}
