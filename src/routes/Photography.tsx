import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MasonryGrid } from '../components/MasonryGrid';
import { ImageCard } from '../components/ImageCard';
import { useLightbox } from '../components/LightboxProvider';
import { categories, getPhotosByCategory } from '../data/photos';
import type { Category } from '../data/photos';
import { cn } from '../utils/cn';

type SortOrder = 'newest' | 'oldest';

export function Photography() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const { openLightbox } = useLightbox();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam as Category)) {
      setSelectedCategory(categoryParam as Category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSortOrder('newest');
    setSearchParams({});
  };

  // Filter and sort photos
  let filteredPhotos = getPhotosByCategory(selectedCategory);

  filteredPhotos = [...filteredPhotos].sort((a, b) => {
    const yearA = a.year || 2024;
    const yearB = b.year || 2024;
    return sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
  });

  const handleImageClick = (index: number) => {
    openLightbox(filteredPhotos, index);
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
            Photography
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            A curated collection of my work capturing moments, emotions, and stories through the lens.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-all focus-ring',
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-soft'
                    : 'bg-paper text-ink border border-ink/10 hover:border-accent hover:text-accent'
                )}
              >
                {category}
              </button>
            ))}
            {selectedCategory !== 'All' && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm font-medium bg-paper text-muted border border-ink/10 hover:border-ink/30 transition-all focus-ring"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <MasonryGrid>
            {filteredPhotos.map((photo, index) => (
              <ImageCard
                key={photo.id}
                photo={photo}
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
            <p className="text-muted text-lg mb-4">No photos found in this category.</p>
            <button
              onClick={handleClearFilters}
              className="btn btn-secondary"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
