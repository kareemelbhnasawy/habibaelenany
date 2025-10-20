import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { Photo } from '../data/photos';

interface LightboxContextType {
  openLightbox: (photos: Photo[], index: number) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within LightboxProvider');
  }
  return context;
}

interface LightboxProviderProps {
  children: ReactNode;
}

export function LightboxProvider({ children }: LightboxProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (newPhotos: Photo[], index: number) => {
    setPhotos(newPhotos);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const slides = photos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  }));

  const currentPhoto = photos[currentIndex];

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <div style={{ position: 'relative' }}>
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={currentIndex}
          on={{
            view: ({ index: newIndex }) => setCurrentIndex(newIndex),
          }}
          controller={{ closeOnBackdropClick: true }}
          carousel={{ finite: false }}
          render={{
            buttonPrev: photos.length <= 1 ? () => null : undefined,
            buttonNext: photos.length <= 1 ? () => null : undefined,
          }}
        />
        {isOpen && currentPhoto && (
          <div
            className="lightbox-custom-caption"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2147483647,
              background: 'linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.8) 60%, transparent 100%)',
              padding: '3rem 2rem 2rem',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {currentPhoto.category && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(165, 82, 79, 0.9)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    width: 'fit-content',
                  }}
                >
                  {currentPhoto.category}
                </span>
              )}
              {currentPhoto.title && (
                <h3
                  style={{
                    color: 'white',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    margin: '0',
                  }}
                >
                  {currentPhoto.title}
                </h3>
              )}
              {currentPhoto.caption && (
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    margin: '0.5rem 0 0 0',
                    maxWidth: '600px',
                  }}
                >
                  {currentPhoto.caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </LightboxContext.Provider>
  );
}
