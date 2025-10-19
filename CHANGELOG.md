# Changelog

## Latest Update - Unified Typography & Testimonials Carousel

### Major Improvements
- ✅ **Testimonials converted to carousel** - Now scrollable with 8 testimonials instead of static 3
- ✅ **Added 5 new testimonials** - From Film Director, Nike, Wedding Planner, Influencer, Music Producer
- ✅ **Unified all section headers** - All carousels now use the same elegant typography
  - Photography Highlights
  - Filmmaking Frames
  - Short Form Content
  - Clients & Feedback
- ✅ **Consistent layout** - All sections have title + subtitle structure
- ✅ **Better mobile experience** - Swipeable testimonials carousel

### Typography Updates
All section headers now use:
- **Title**: 3xl → 4xl → 5xl (responsive), Playfair Display, semibold
- **Subtitle**: uppercase, tracking-wide, muted color
- **Structure**: Left-aligned with navigation on right

**See [TYPOGRAPHY_UPDATE.md](TYPOGRAPHY_UPDATE.md) for complete details**

---

## Previous - Fixed All Placeholder Images

### Bug Fixes
- ✅ **Fixed Filmmaking "Production" image** - Was not loading, now working perfectly
- ✅ **Updated all Filmmaking images** - Verified working Unsplash URLs with quality optimization
- ✅ **Updated Short Form images** - Better image selection + proper URL parameters
- ✅ **Category Preview Tiles** - Added beautiful background images
  - Portraits: Professional portrait photography
  - Editorial: Fashion/editorial style
  - Filmmaking: Cinematic scene
  - All images use optimized Unsplash URLs (`w`, `h`, `q=80`, `fit=crop`)
  - Hover effect scales image for depth

### Image Quality Improvements
- All images now use `q=80` quality parameter (good compression, high quality)
- Proper dimensions: 1600x900 (filmmaking), 1080x1920 (short form), 800x1000 (categories)
- `fit=crop` ensures consistent aspect ratios
- Lazy loading for performance

**See [IMAGE_FIXES.md](IMAGE_FIXES.md) for complete details**

## Previous - Added Filmmaking & Short Form Content Sections

### New Features

#### 1. **Filmmaking Frames Section**
- New horizontal carousel showcasing filmmaking/videography work
- Landscape/cinematic aspect ratio (16:9)
- Hover effects reveal title and caption
- Uppercase header styling for visual distinction
- Positioned between Photography Highlights and Short Form Content

**Component:** `src/components/FilmmakingCarousel.tsx`

#### 2. **Short Form Content Section**
- Grid layout optimized for vertical/portrait content
- Vertical aspect ratio (9:16) for social media/short-form videos
- Grid displays 2-4 columns depending on screen size
- Title overlays on each item
- "See all feedback" link to filtered gallery view

**Component:** `src/components/ShortFormContent.tsx`

#### 3. **Expanded Photo Categories**
Added two new categories:
- **Filmmaking** - Cinematography, BTS, film production
- **Short Form** - TikTok, Reels, YouTube Shorts, vertical video content

All new photos include:
- Appropriate aspect ratios (16:9 for filmmaking, 9:16 for short form)
- Descriptive titles and captions
- Year metadata for sorting
- High-quality placeholder images from Unsplash

**Data:** `src/data/photos.ts`

### Content Added

#### Filmmaking Photos (5 items)
1. Cinematic Moments - Film scene with dramatic lighting
2. Production - Film production setup
3. Direction - Director working on set
4. Camera Work - Professional camera setup
5. Lighting Magic - Lighting setup for film

#### Short Form Content (4 items)
1. Mernyth - Dynamic vertical storytelling
2. Flyzone - Engaging social narratives
3. Body Bar - Fitness content
4. Daily Vibes - Lifestyle vlog content

### Updated Sections

**Home Page (`src/routes/Home.tsx`)**
New section order:
1. Hero (existing)
2. Photography Highlights (existing)
3. **Filmmaking Frames** ⭐ NEW
4. **Short Form Content** ⭐ NEW
5. Category Preview (updated to show Portraits, Editorial, Filmmaking)
6. Testimonials (existing)
7. CTA Band (existing)

**Photography Gallery**
- Filter now includes "Filmmaking" and "Short Form" options
- Deep links work: `/photography?category=Filmmaking`
- All new content searchable and sortable

### Design Consistency

All new sections follow the established design system:
- ✅ Same color palette (bg, paper, ink, accent)
- ✅ Playfair Display font for headings
- ✅ Consistent spacing and padding
- ✅ Responsive breakpoints (mobile, tablet, desktop)
- ✅ Hover effects and transitions
- ✅ Focus states for accessibility
- ✅ Framer Motion animations
- ✅ Lightbox integration

### Technical Details

**Files Modified:**
- `src/data/photos.ts` - Added 9 new photos, 2 new categories
- `src/routes/Home.tsx` - Added 2 new section imports and components
- Created: `src/components/FilmmakingCarousel.tsx`
- Created: `src/components/ShortFormContent.tsx`

**Build Impact:**
- CSS: 40.89 kB (7.92 kB gzipped)
- JS: 433.17 kB (141.65 kB gzipped)
- No build errors or warnings
- All TypeScript checks passed

### Lightbox Integration

Both new sections fully integrated with the lightbox:
- Click any image to view full-screen
- Swipe/arrow navigation
- Escape to close
- Displays title and caption
- Keyboard accessible

### Mobile Responsive

**Filmmaking Carousel:**
- Mobile: Single slide at 85% width with peek
- Tablet: 2 slides visible
- Desktop: 3 slides visible
- Arrow controls hide on mobile, shown below carousel

**Short Form Content:**
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Maintains 9:16 aspect ratio on all screens

### How to Customize

#### Add More Filmmaking Content
Edit `src/data/photos.ts`:
```typescript
{
  id: '22',
  src: 'your-image-url.jpg',
  width: 1920,
  height: 1080,  // 16:9 ratio
  alt: 'Description',
  category: 'Filmmaking',
  title: 'Your Title',
  caption: 'Optional caption',
  year: 2024,
}
```

#### Add More Short Form Content
```typescript
{
  id: '23',
  src: 'your-image-url.jpg',
  width: 1080,
  height: 1920,  // 9:16 ratio
  alt: 'Description',
  category: 'Short Form',
  title: 'Video Title',
  year: 2024,
}
```

#### Replace Placeholder Images
1. Add your images to `src/assets/photos/`
2. Import them in `src/data/photos.ts`
3. Update the `src` field

### Testing Checklist

- ✅ Build succeeds without errors
- ✅ All new sections render on home page
- ✅ Filmmaking carousel scrolls smoothly
- ✅ Short form grid displays correctly
- ✅ Lightbox opens and navigates properly
- ✅ Category filters work in Photography page
- ✅ Deep links function correctly
- ✅ Mobile responsive on all screen sizes
- ✅ Animations smooth and accessible
- ✅ No console errors

### Next Steps

1. Replace placeholder images with your actual content
2. Update titles and captions to match your work
3. Add more items to each category as needed
4. Consider adding video thumbnails for filmmaking/short form
5. Update testimonials to include video/film clients

---

**Date:** October 19, 2025
**Version:** 1.1.0
**Status:** ✅ Complete and tested
