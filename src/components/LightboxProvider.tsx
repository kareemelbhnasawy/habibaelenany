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
    title: photo.title,
    description: photo.caption,
  }));

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false }}
        render={{
          buttonPrev: photos.length <= 1 ? () => null : undefined,
          buttonNext: photos.length <= 1 ? () => null : undefined,
        }}
      />
    </LightboxContext.Provider>
  );
}
