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
      <div className="relative overflow-hidden bg-ink/5">
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

        {/* Subtle dark overlay on hover - no text */}
        <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Subtle shadow lift on hover */}
      <div
        className={cn(
          'absolute inset-0 ring-2 ring-transparent',
          'group-hover:ring-accent/20 group-hover:shadow-lifted',
          'transition-all duration-300 pointer-events-none'
        )}
      />
    </motion.div>
  );
}
