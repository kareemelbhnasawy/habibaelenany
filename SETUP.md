# Quick Setup Guide

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure Overview

```
src/
├── components/           # UI components
│   ├── Navbar.tsx       # Top navigation with mobile menu
│   ├── Footer.tsx       # Site footer with links
│   ├── FloatingContactBubble.tsx  # Animated contact FAB
│   ├── HeroCarousel.tsx           # Hero image carousel
│   ├── HighlightsCarousel.tsx     # Featured work carousel
│   ├── ImageCard.tsx              # Gallery image card
│   ├── MasonryGrid.tsx            # Responsive grid layout
│   ├── LightboxProvider.tsx       # Image lightbox context
│   └── Section.tsx                # Animated section wrapper
│
├── routes/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Photography.tsx # Gallery with filters
│   └── NotFound.tsx    # 404 page
│
├── data/               # Content & configuration
│   ├── site.ts        # Site-wide settings
│   ├── photos.ts      # Photo gallery data
│   ├── highlights.ts  # Featured photos
│   └── testimonials.ts # Client reviews
│
├── hooks/              # Custom React hooks
│   ├── usePrefersReducedMotion.ts
│   └── useScrollProgress.ts
│
├── utils/              # Helper functions
│   ├── cn.ts          # Class name merger
│   └── image.ts       # Image utilities
│
├── assets/photos/      # Image files
├── App.tsx            # Main app with routing
├── main.tsx           # Entry point
└── index.css          # Global styles (Tailwind v4)
```

## Key Features

### 1. Hero Section
- Auto-playing carousel with Ken Burns effect
- Parallax scrolling on image
- Pause on hover
- Custom dots and arrows

### 2. Photography Highlights
- Horizontal scrolling carousel
- Category chips
- Hover effects with title overlay
- Distinct from hero carousel

### 3. Gallery (Photography page)
- Category filtering (All, Portraits, Editorial, Events, Personal)
- Sort by newest/oldest
- Responsive masonry grid
- Click to open lightbox

### 4. Floating Contact Bubble
- Fixed position bottom-right
- Idle animation (float every 12s)
- Hover wiggle effect
- Opens menu with:
  - Email (mailto)
  - Copy email (with toast)
  - Instagram link
  - LinkedIn link
  - Behance link

### 5. Lightbox
- Full-screen image viewing
- Keyboard navigation
- Swipe gestures on mobile
- Shows title and caption

## Customization

### Update Site Information
Edit `src/data/site.ts`:
- Site title and description
- Photographer name and bio
- Contact email and social links
- Navigation items

### Add Photos
1. Place images in `src/assets/photos/`
2. Edit `src/data/photos.ts` and add:
```typescript
{
  id: 'unique-id',
  src: 'path-or-url',
  width: 1200,
  height: 1600,
  alt: 'Description',
  category: 'Portraits',
  title: 'Photo Title',
  year: 2024,
}
```

### Add to Highlights
Edit `src/data/highlights.ts`:
```typescript
{
  id: 'h-id',
  photoId: 'photo-id-from-photos.ts',
  title: 'Display Title',
  category: 'Editorial',
}
```

### Change Colors
Edit `src/index.css` in the `@theme` section:
```css
--color-bg: #FAF6F1;
--color-paper: #FFFFFF;
--color-ink: #121212;
--color-muted: #6B7280;
--color-accent: #800B12;
```

### Change Fonts
1. Update Google Fonts import in `src/index.css`
2. Update theme variables:
```css
--font-display: 'Your Display Font', serif;
--font-sans: 'Your Body Font', sans-serif;
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling (CSS-first config)
- **Framer Motion** - Animations
- **Embla Carousel** - Carousels
- **Yet Another React Lightbox** - Image viewer
- **React Router** - Client-side routing
- **React Helmet Async** - SEO meta tags
- **Lucide React** - Icons

## Build Output

Production build creates:
- Optimized JavaScript bundles (code-split)
- Minified CSS
- Compressed assets
- All in `dist/` folder

Build size:
- CSS: ~40KB (~8KB gzipped)
- JS: ~477KB (~155KB gzipped)

## Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari iOS 14+
- Chrome Android

## Deployment

Works with:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static host

No server-side rendering or API routes needed. Pure static site with client-side routing.

## Performance Tips

1. Images use lazy loading
2. Hero images preloaded
3. Code splitting by route
4. Framer Motion respects reduced motion
5. Aspect ratio containers prevent CLS

## Accessibility

- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Alt text
- ✅ WCAG AA contrast
- ✅ Reduced motion support
- ✅ 44px+ touch targets

## Troubleshooting

### Build fails
- Run `npm install` again
- Clear node_modules and reinstall
- Check Node version (18+ required)

### Images not loading
- Check import paths in `photos.ts`
- Ensure images are in `src/assets/photos/`
- For external URLs, verify they're accessible

### Styles not working
- Tailwind v4 uses CSS-first config
- Don't use `tailwind.config.js`
- Define theme in `src/index.css` using `@theme`

## Next Steps

1. Replace placeholder photos with your own
2. Update site configuration in `src/data/site.ts`
3. Customize colors and fonts
4. Add your testimonials
5. Update meta tags and favicon
6. Deploy to your hosting provider

Enjoy building! 🎨📸
