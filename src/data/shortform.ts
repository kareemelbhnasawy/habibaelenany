export interface ShortFormItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  title: string;
  description: string;
  year?: number;
}

export const shortFormItems: ShortFormItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Vertical video content creation',
    category: 'Short Form',
    title: 'Mernyth',
    description: 'Dynamic storytelling in vertical format that captures attention and drives engagement through compelling visual narratives.',
    year: 2024,
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Social media content production',
    category: 'Short Form',
    title: 'Flyzone',
    description: 'Engaging social narratives designed to connect with audiences and tell authentic stories in the digital age.',
    year: 2024,
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Fitness content creation',
    category: 'Short Form',
    title: 'Body Bar',
    description: 'Fitness content that inspires and motivates viewers to pursue their wellness goals with style and confidence.',
    year: 2024,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Lifestyle vlog content',
    category: 'Short Form',
    title: 'Daily Vibes',
    description: 'Capturing everyday moments with a creative twist that resonates with lifestyle enthusiasts.',
    year: 2023,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1080&h=1920&fit=crop&q=80',
    width: 1080,
    height: 1920,
    alt: 'Coffee shop ambiance',
    category: 'Short Form',
    title: 'Coffee',
    description: 'Creating cozy and inviting content that celebrates the simple pleasures of coffee culture.',
    year: 2024,
  },
];
