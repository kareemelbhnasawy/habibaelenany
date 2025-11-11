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

// Mernyth Videos - 8 videos
const mernythItems: ShortFormItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `mernyth-${i + 1}`,
  src: new URL(`../assets/vids/short-form/mernyth/mov_${String(i + 1).padStart(2, '0')}.MOV`, import.meta.url).href,
  width: 1080,
  height: 1920,
  alt: `Mernyth short form content ${i + 1}`,
  category: 'Short Form',
  title: 'Mernyth',
  description: 'Dynamic storytelling in vertical format that captures attention and drives engagement through compelling visual narratives.',
  year: 2024,
}));

// Flyzone Videos - 11 videos
const flyzoneItems: ShortFormItem[] = Array.from({ length: 11 }, (_, i) => ({
  id: `flyzone-${i + 1}`,
  src: new URL(`../assets/vids/short-form/flyzone/mov_${String(i + 1).padStart(2, '0')}.MOV`, import.meta.url).href,
  width: 1080,
  height: 1920,
  alt: `Flyzone short form content ${i + 1}`,
  category: 'Short Form',
  title: 'Flyzone',
  description: 'Engaging social narratives designed to connect with audiences and tell authentic stories in the digital age.',
  year: 2024,
}));

// BodyBar Videos - 4 videos
const bodybarItems: ShortFormItem[] = Array.from({ length: 4 }, (_, i) => ({
  id: `bodybar-${i + 1}`,
  src: new URL(`../assets/vids/short-form/bodybar/mov_${String(i + 1).padStart(2, '0')}.MOV`, import.meta.url).href,
  width: 1080,
  height: 1920,
  alt: `BodyBar short form content ${i + 1}`,
  category: 'Short Form',
  title: 'Body Bar',
  description: 'Fitness content that inspires and motivates viewers to pursue their wellness goals with style and confidence.',
  year: 2024,
}));

// Export all items combined
export const shortFormItems: ShortFormItem[] = [
  ...mernythItems,
  ...flyzoneItems,
  ...bodybarItems,
];
