import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageSkeleton } from './ImageSkeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  onLoad?: () => void;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  onLoad,
  priority = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <div className={`relative ${aspectRatio} overflow-hidden`}>
      <AnimatePresence mode="wait">
        {!isLoaded && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <ImageSkeleton aspectRatio="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/5">
          <p className="text-muted text-sm">Failed to load image</p>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}
