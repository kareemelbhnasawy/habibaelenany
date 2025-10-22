import { motion } from 'framer-motion';
import { MasonryGrid } from '../components/MasonryGrid';
import { ImageCard } from '../components/ImageCard';
import { useLightbox } from '../components/LightboxProvider';
import { filmmakingItems } from '../data/filmmaking';

export function Filmmaking() {
  const { openLightbox } = useLightbox();

  const handleImageClick = (index: number) => {
    openLightbox(filmmakingItems, index);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-4">
            Filmmaking
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Cinematic frames and behind-the-scenes moments from film productions.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {filmmakingItems.length > 0 ? (
          <MasonryGrid>
            {filmmakingItems.map((item, index) => (
              <ImageCard
                key={item.id}
                photo={item}
                index={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </MasonryGrid>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted text-lg">No filmmaking content available yet.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
