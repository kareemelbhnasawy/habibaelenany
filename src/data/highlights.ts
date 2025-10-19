export interface Highlight {
  id: string;
  photoId: string;
  title: string;
  category: string;
}

export const highlights: Highlight[] = [
  {
    id: 'h1',
    photoId: '1',
    title: 'Movement & Expression',
    category: 'Editorial',
  },
  {
    id: 'h2',
    photoId: '4',
    title: 'Urban Elegance',
    category: 'Editorial',
  },
  {
    id: 'h3',
    photoId: '9',
    title: 'Dramatic Light',
    category: 'Editorial',
  },
  {
    id: 'h4',
    photoId: '2',
    title: 'Natural Light',
    category: 'Portraits',
  },
  {
    id: 'h5',
    photoId: '3',
    title: 'Golden Hour',
    category: 'Portraits',
  },
];
