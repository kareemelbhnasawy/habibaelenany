export interface PhotographyItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  section: string;
  title?: string;
  caption?: string;
  year?: number;
}

// Editorial Photos - using varied aspect ratios for natural masonry
const editorialItems: PhotographyItem[] = [
  {
    id: 'editorial-1',
    src: new URL('../assets/photos/photography/editorial/img-01.jpg', import.meta.url).href,
    width: 4,
    height: 5,
    alt: 'Editorial photography',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-2',
    src: new URL('../assets/photos/photography/editorial/img-02.jpg', import.meta.url).href,
    width: 3,
    height: 4,
    alt: 'Editorial fashion',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-3',
    src: new URL('../assets/photos/photography/editorial/img-03.jpg', import.meta.url).href,
    width: 4,
    height: 3,
    alt: 'Editorial styling',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-4',
    src: new URL('../assets/photos/photography/editorial/img-04.jpg', import.meta.url).href,
    width: 2,
    height: 3,
    alt: 'Editorial concept',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-5',
    src: new URL('../assets/photos/photography/editorial/img-05.JPG', import.meta.url).href,
    width: 3,
    height: 4,
    alt: 'Editorial portrait',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-6',
    src: new URL('../assets/photos/photography/editorial/img-06.jpg', import.meta.url).href,
    width: 4,
    height: 5,
    alt: 'Editorial shoot',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
  {
    id: 'editorial-7',
    src: new URL('../assets/photos/photography/editorial/img-07.JPG', import.meta.url).href,
    width: 16,
    height: 9,
    alt: 'Editorial composition',
    category: 'Photography',
    section: 'Editorial',
    year: 2024,
  },
];

// Outdoor Photos - varied aspect ratios
const outdoorAspectRatios = [
  { width: 3, height: 4 },   // img-01: portrait
  { width: 16, height: 9 },  // img-02: landscape
  { width: 4, height: 5 },   // img-03: portrait
  { width: 4, height: 3 },   // img-04: landscape
  { width: 3, height: 4 },   // img-05: portrait
  { width: 1, height: 1 },   // img-06: square
  { width: 4, height: 5 },   // img-07: portrait
  { width: 16, height: 9 },  // img-08: landscape
  { width: 3, height: 4 },   // img-09: portrait
  { width: 4, height: 3 },   // img-10: landscape
  { width: 2, height: 3 },   // img-11: tall portrait
  { width: 4, height: 5 },   // img-12: portrait
  { width: 16, height: 9 },  // img-13: landscape
];

const outdoorItems: PhotographyItem[] = Array.from({ length: 13 }, (_, i) => ({
  id: `outdoor-${i + 1}`,
  src: new URL(`../assets/photos/photography/outdoor/img-${String(i + 1).padStart(2, '0')}.${i === 10 ? 'jpg' : 'JPG'}`, import.meta.url).href,
  width: outdoorAspectRatios[i].width,
  height: outdoorAspectRatios[i].height,
  alt: `Outdoor photography ${i + 1}`,
  category: 'Photography',
  section: 'Outdoor',
  year: 2024,
}));

// Portraits Photos - varied aspect ratios
const portraitsAspectRatios = [
  { width: 3, height: 4 },   // img-01: portrait
  { width: 4, height: 5 },   // img-02: portrait
  { width: 2, height: 3 },   // img-03: tall portrait
  { width: 3, height: 4 },   // img-04: portrait
];

const portraitsItems: PhotographyItem[] = Array.from({ length: 4 }, (_, i) => ({
  id: `portraits-${i + 1}`,
  src: new URL(`../assets/photos/photography/portraits/img-${String(i + 1).padStart(2, '0')}.JPG`, import.meta.url).href,
  width: portraitsAspectRatios[i].width,
  height: portraitsAspectRatios[i].height,
  alt: `Portrait photography ${i + 1}`,
  category: 'Photography',
  section: 'Portraits',
  year: 2024,
}));

// Products Photos - varied aspect ratios
const productsAspectRatios = [
  { width: 3, height: 4 },   // img-01: portrait
  { width: 1, height: 1 },   // img-02: square
  { width: 4, height: 3 },   // img-03: landscape
  { width: 3, height: 4 },   // img-04: portrait
  { width: 1, height: 1 },   // img-05: square
  { width: 4, height: 5 },   // img-06: portrait
  { width: 16, height: 9 },  // img-07: landscape
  { width: 3, height: 4 },   // img-08: portrait
];

const productsItems: PhotographyItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `products-${i + 1}`,
  src: new URL(`../assets/photos/photography/products/img-${String(i + 1).padStart(2, '0')}.JPG`, import.meta.url).href,
  width: productsAspectRatios[i].width,
  height: productsAspectRatios[i].height,
  alt: `Product photography ${i + 1}`,
  category: 'Photography',
  section: 'Products',
  year: 2024,
}));

// Export all items combined
export const photographyItems: PhotographyItem[] = [
  ...editorialItems,
  ...outdoorItems,
  ...portraitsItems,
  ...productsItems,
];

// Export sections separately for grouped display
export const photographySections = [
  {
    title: 'Editorial',
    description: 'Fashion and editorial photography',
    items: editorialItems,
  },
  {
    title: 'Outdoor',
    description: 'Natural light and landscape photography',
    items: outdoorItems,
  },
  {
    title: 'Portraits',
    description: 'Character and portrait photography',
    items: portraitsItems,
  },
  {
    title: 'Products',
    description: 'Commercial product photography',
    items: productsItems,
  },
];
