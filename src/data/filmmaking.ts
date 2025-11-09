export interface FilmmakingItem {
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

// Section 1 Photos
const section1Items: FilmmakingItem[] = [
  {
    id: 'section1-1',
    src: new URL('../assets/photos/filmaking/section-1/image00001.jpeg', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Filmmaking behind the scenes',
    category: 'Filmmaking',
    section: 'Production',
    year: 2024,
  },
  {
    id: 'section1-2',
    src: new URL('../assets/photos/filmaking/section-1/image00002.jpeg', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film production setup',
    category: 'Filmmaking',
    section: 'Production',
    year: 2024,
  },
  {
    id: 'section1-3',
    src: new URL('../assets/photos/filmaking/section-1/image00003.jpeg', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Cinematic moments on set',
    category: 'Filmmaking',
    section: 'Production',
    year: 2024,
  },
  {
    id: 'section1-4',
    src: new URL('../assets/photos/filmaking/section-1/image00004.jpeg', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film crew at work',
    category: 'Filmmaking',
    section: 'Production',
    year: 2024,
  },
  {
    id: 'section1-5',
    src: new URL('../assets/photos/filmaking/section-1/image00005.jpeg', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Behind the scenes filmmaking',
    category: 'Filmmaking',
    section: 'Production',
    year: 2024,
  },
];

// Section 2 Photos
const section2Items: FilmmakingItem[] = [
  {
    id: 'section2-1',
    src: new URL('../assets/photos/filmaking/section-2/img-01.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Cinematic frame',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-2',
    src: new URL('../assets/photos/filmaking/section-2/img-02.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film scene capture',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-3',
    src: new URL('../assets/photos/filmaking/section-2/img-03.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Visual storytelling',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-4',
    src: new URL('../assets/photos/filmaking/section-2/img-04.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Camera work',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-5',
    src: new URL('../assets/photos/filmaking/section-2/img-05.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film production',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-6',
    src: new URL('../assets/photos/filmaking/section-2/img-06.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Cinematic shot',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
  {
    id: 'section2-7',
    src: new URL('../assets/photos/filmaking/section-2/img-07.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film scene',
    category: 'Filmmaking',
    section: 'Cinematography',
    year: 2024,
  },
];

// Section 3 Photos
const section3Items: FilmmakingItem[] = [
  {
    id: 'section3-1',
    src: new URL('../assets/photos/filmaking/section-3/img-01.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Film scene',
    category: 'Filmmaking',
    section: 'Visual Effects',
    year: 2024,
  },
  {
    id: 'section3-2',
    src: new URL('../assets/photos/filmaking/section-3/img-02.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'VFX work',
    category: 'Filmmaking',
    section: 'Visual Effects',
    year: 2024,
  },
  {
    id: 'section3-3',
    src: new URL('../assets/photos/filmaking/section-3/img-03.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Post-production',
    category: 'Filmmaking',
    section: 'Visual Effects',
    year: 2024,
  },
  {
    id: 'section3-4',
    src: new URL('../assets/photos/filmaking/section-3/img-04.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Digital effects',
    category: 'Filmmaking',
    section: 'Visual Effects',
    year: 2024,
  },
];

// Section 4 Photos
const section4Items: FilmmakingItem[] = Array.from({ length: 14 }, (_, i) => ({
  id: `section4-${i + 1}`,
  src: new URL(`../assets/photos/filmaking/section-4/img-${String(i + 1).padStart(2, '0')}.PNG`, import.meta.url).href,
  width: 1600,
  height: 1200,
  alt: `Directing scene ${i + 1}`,
  category: 'Filmmaking',
  section: 'Direction',
  year: 2024,
}));

// Section 5 Photos
const section5Items: FilmmakingItem[] = [
  {
    id: 'section5-1',
    src: new URL('../assets/photos/filmaking/section-5/img-01.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Set design',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-2',
    src: new URL('../assets/photos/filmaking/section-5/img-02.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Production design',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-3',
    src: new URL('../assets/photos/filmaking/section-5/img-03.JPG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Set construction',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-4',
    src: new URL('../assets/photos/filmaking/section-5/img-04.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Art direction',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-5',
    src: new URL('../assets/photos/filmaking/section-5/img-05.JPG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Location setup',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-6',
    src: new URL('../assets/photos/filmaking/section-5/img-06.JPG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Prop design',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-7',
    src: new URL('../assets/photos/filmaking/section-5/img-07.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Set details',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
  {
    id: 'section5-8',
    src: new URL('../assets/photos/filmaking/section-5/img-08.PNG', import.meta.url).href,
    width: 1600,
    height: 1200,
    alt: 'Environment design',
    category: 'Filmmaking',
    section: 'Set Design',
    year: 2024,
  },
];

// Section 6 Photos
const section6Items: FilmmakingItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `section6-${i + 1}`,
  src: new URL(`../assets/photos/filmaking/section-6/img-${String(i + 1).padStart(2, '0')}.PNG`, import.meta.url).href,
  width: 1600,
  height: 1200,
  alt: `Lighting scene ${i + 1}`,
  category: 'Filmmaking',
  section: 'Lighting',
  year: 2024,
}));

// Export all items combined
export const filmmakingItems: FilmmakingItem[] = [
  ...section1Items,
  ...section2Items,
  ...section3Items,
  ...section4Items,
  ...section5Items,
  ...section6Items,
];

// Export sections separately for grouped display
export const filmmakingSections = [
  {
    title: 'Production',
    description: 'Behind the scenes and production moments',
    items: section1Items,
  },
  {
    title: 'Cinematography',
    description: 'Cinematic frames and visual storytelling',
    items: section2Items,
  },
  {
    title: 'Visual Effects',
    description: 'Post-production and digital effects work',
    items: section3Items,
  },
  {
    title: 'Direction',
    description: 'Creative direction and scene composition',
    items: section4Items,
  },
  {
    title: 'Set Design',
    description: 'Production design and art direction',
    items: section5Items,
  },
  {
    title: 'Lighting',
    description: 'Lighting setups and mood creation',
    items: section6Items,
  },
];
