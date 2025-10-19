# Habiba Photography Portfolio

A polished, responsive photography portfolio built with React, TypeScript, and Vite. Features editorial typography, smooth animations, and a refined visual design.

![Portfolio Preview](https://via.placeholder.com/1200x630/FAF6F1/121212?text=Habiba+Photography)

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Hero Carousel**: Auto-playing image carousel with Ken Burns effect and parallax scrolling
- **Photography Highlights**: Distinct horizontal carousel showcasing featured work
- **Masonry Gallery**: Responsive grid with category filtering and sorting
- **Lightbox**: Full-screen image viewing with navigation
- **Floating Contact Bubble**: Animated contact menu with social links
- **Smooth Animations**: Framer Motion transitions with reduced-motion support
- **SEO Optimized**: React Helmet for meta tags, Open Graph, and Twitter cards
- **Accessible**: Semantic HTML, keyboard navigation, ARIA labels, and focus management

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling with custom theme tokens
- **Framer Motion** for animations and page transitions
- **Embla Carousel** for custom carousel implementations
- **Yet Another React Lightbox** for image viewing
- **React Router DOM** for client-side routing
- **React Helmet Async** for SEO metadata
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will start at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FloatingContactBubble.tsx
│   ├── HeroCarousel.tsx
│   ├── HighlightsCarousel.tsx
│   ├── ImageCard.tsx
│   ├── MasonryGrid.tsx
│   ├── LightboxProvider.tsx
│   └── Section.tsx
├── routes/              # Page components
│   ├── Home.tsx
│   ├── Photography.tsx
│   └── NotFound.tsx
├── data/                # Data models and content
│   ├── site.ts          # Site configuration
│   ├── photos.ts        # Photo data
│   ├── highlights.ts    # Featured photos
│   └── testimonials.ts  # Client testimonials
├── assets/              # Images and static assets
│   ├── photos/          # Photography images
│   └── icons/
├── hooks/               # Custom React hooks
│   ├── usePrefersReducedMotion.ts
│   └── useScrollProgress.ts
├── utils/               # Utility functions
│   ├── cn.ts            # Tailwind class merger
│   └── image.ts         # Image utilities
├── App.tsx              # Main app component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles and Tailwind
```

## Adding Photos

### 1. Using Local Images

Add your images to `src/assets/photos/`, then import and add them to the photos array in `src/data/photos.ts`:

```typescript
import myPhoto from '../assets/photos/my-photo.jpg';

export const photos: Photo[] = [
  // ... existing photos
  {
    id: '13',
    src: myPhoto,
    width: 1200,
    height: 1600,
    alt: 'Description of the photo',
    category: 'Portraits',
    title: 'Photo Title',
    caption: 'Optional caption',
    year: 2024,
  },
];
```

### 2. Using External URLs

Simply add the external URL directly in the `src` field:

```typescript
{
  id: '14',
  src: 'https://example.com/photo.jpg',
  width: 1200,
  height: 1600,
  alt: 'Description',
  category: 'Editorial',
  title: 'External Photo',
  year: 2024,
}
```

### Photo Object Properties

- `id`: Unique identifier (string)
- `src`: Local import or external URL
- `width` & `height`: Actual image dimensions for aspect ratio
- `alt`: Accessibility description (required)
- `category`: One of: Portraits, Editorial, Events, Personal
- `title`: Optional display title
- `caption`: Optional description
- `year`: Optional year for sorting

## Adding Categories

Edit the `categories` array in `src/data/photos.ts`:

```typescript
export const categories = [
  'All',
  'Portraits',
  'Editorial',
  'Events',
  'Personal',
  'Weddings', // Add new category
] as const;
```

Then assign the new category to photos in the `photos` array.

## Adding Highlights

Featured photos appear in the "Photography Highlights" carousel. Edit `src/data/highlights.ts`:

```typescript
export const highlights: Highlight[] = [
  // ... existing highlights
  {
    id: 'h6',
    photoId: '13', // Must match a photo ID from photos.ts
    title: 'Display Title',
    category: 'Portraits',
  },
];
```

## Customization

### Site Configuration

Edit `src/data/site.ts` to update:
- Site title and description
- Photographer name and bio
- Contact information
- Social media links
- Navigation links

### Theme and Colors

Customize the design tokens in `tailwind.config.js`:

```js
colors: {
  bg: '#FAF6F1',      // Background color
  paper: '#FFFFFF',    // Card/paper color
  ink: '#121212',      // Primary text
  muted: '#6B7280',    // Secondary text
  accent: '#A5524F',   // Brand accent color
}
```

### Typography

Change fonts in `tailwind.config.js` and update the Google Fonts import in `src/index.css`:

```js
fontFamily: {
  display: ['Playfair Display', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

## Performance Optimization

- Images use `loading="lazy"` for below-the-fold content
- First hero image uses `loading="eager"`
- Aspect ratio containers prevent layout shift
- Framer Motion respects `prefers-reduced-motion`
- Production build includes code splitting

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari iOS 14+
- Chrome Android

## SEO

Each page has unique meta tags via React Helmet. Update in:
- `index.html` for default tags
- `App.tsx` SEO component for page-specific tags

Add social preview image in `public/` and reference in meta tags.

## Deployment

### Build

```bash
npm run build
```

Output will be in the `dist/` folder.

### Deploy to Vercel, Netlify, or GitHub Pages

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

For client-side routing, ensure your host supports SPA redirects (most modern hosts handle this automatically).

## Accessibility Checklist

- ✅ Semantic HTML landmarks
- ✅ Keyboard navigable
- ✅ Visible focus indicators
- ✅ Alt text on all images
- ✅ ARIA labels on controls
- ✅ Color contrast meets WCAG AA
- ✅ Respects reduced motion preferences
- ✅ Touch targets ≥44px

## License

MIT

## Credits

Built with ❤️ using:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Embla Carousel](https://www.embla-carousel.com/)
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)

## Support

For issues or questions, please open an issue on GitHub.
