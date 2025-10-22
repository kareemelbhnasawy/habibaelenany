export interface FilmmakingItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  title?: string;
  caption?: string;
  year?: number;
}

export const filmmakingItems: FilmmakingItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Cinematic film scene with dramatic lighting',
    category: 'Filmmaking',
    title: 'Cinematic Moments',
    caption: 'Behind the scenes of storytelling',
    year: 2024,
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Film production camera setup',
    category: 'Filmmaking',
    title: 'Production',
    caption: 'Crafting visual narratives',
    year: 2024,
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Director working on film set',
    category: 'Filmmaking',
    title: 'Direction',
    caption: 'Bringing visions to life',
    year: 2023,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Professional film camera in action',
    category: 'Filmmaking',
    title: 'Camera Work',
    year: 2024,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Film set with lighting equipment',
    category: 'Filmmaking',
    title: 'Lighting Magic',
    year: 2023,
  },
];
