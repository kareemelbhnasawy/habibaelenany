export interface Photo {
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

// Import images - these can be local paths or external URLs
import hero1 from '../assets/photos/WhatsApp Image 2025-10-19 at 10.53.06.jpeg';
import hero2 from '../assets/photos/WhatsApp Image 2025-10-19 at 09.34.37.jpeg';

export const photos: Photo[] = [
  {
    id: '1',
    src: hero1,
    width: 1200,
    height: 1600,
    alt: 'Movement and expression in dance photography',
    category: 'Editorial',
    title: 'Movement',
    caption: 'Capturing the essence of motion and emotion',
    year: 2024,
  },
  {
    id: '2',
    src: hero2,
    width: 1200,
    height: 1600,
    alt: 'Portrait photography showcasing natural beauty',
    category: 'Portraits',
    title: 'Natural Light',
    caption: 'Minimalist portrait with natural lighting',
    year: 2024,
  },
  // Placeholder photos for demonstration
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Portrait with warm tones',
    category: 'Portraits',
    title: 'Golden Hour',
    year: 2024,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Editorial fashion portrait',
    category: 'Editorial',
    title: 'Urban Elegance',
    year: 2024,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200',
    width: 1200,
    height: 1800,
    alt: 'Candid event moment',
    category: 'Events',
    title: 'Celebration',
    year: 2024,
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Professional headshot',
    category: 'Portraits',
    title: 'Professional',
    year: 2023,
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200',
    width: 1600,
    height: 1200,
    alt: 'Editorial fashion shoot',
    category: 'Editorial',
    title: 'Sophistication',
    year: 2024,
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Outdoor lifestyle portrait',
    category: 'Personal',
    title: 'Free Spirit',
    year: 2023,
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200',
    width: 1200,
    height: 1800,
    alt: 'Dramatic editorial lighting',
    category: 'Editorial',
    title: 'Contrast',
    year: 2024,
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Natural beauty portrait',
    category: 'Portraits',
    title: 'Simplicity',
    year: 2023,
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200',
    width: 1600,
    height: 1200,
    alt: 'Event photography',
    category: 'Events',
    title: 'Joy',
    year: 2024,
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Male portrait photography',
    category: 'Portraits',
    title: 'Character',
    year: 2024,
  },
  // Filmmaking Frames
  {
    id: '13',
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
    id: '14',
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
    id: '15',
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
    id: '16',
    src: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Professional film camera in action',
    category: 'Filmmaking',
    title: 'Camera Work',
    year: 2024,
  },
  {
    id: '17',
    src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1600&q=80',
    width: 1600,
    height: 900,
    alt: 'Film set with lighting equipment',
    category: 'Filmmaking',
    title: 'Lighting Magic',
    year: 2023,
  },
  // Short Form Content
  {
    id: '18',
    src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Vertical video content creation',
    category: 'Short Form',
    title: 'Mernyth',
    caption: 'Dynamic storytelling in vertical format',
    year: 2024,
  },
  {
    id: '19',
    src: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Social media content production',
    category: 'Short Form',
    title: 'Flyzone',
    caption: 'Engaging social narratives',
    year: 2024,
  },
  {
    id: '20',
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Fitness content creation',
    category: 'Short Form',
    title: 'Body Bar',
    caption: 'Fitness content that inspires',
    year: 2024,
  },
  {
    id: '21',
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Lifestyle vlog content',
    category: 'Short Form',
    title: 'Daily Vibes',
    year: 2023,
  },
];

export const categories = [
  'All',
  'Portraits',
  'Editorial',
  'Events',
  'Personal',
] as const;

export type Category = typeof categories[number];

export function getPhotosByCategory(category: Category): Photo[] {
  if (category === 'All') return photos;
  return photos.filter(photo => photo.category === category);
}
