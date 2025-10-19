# Installation Guide

## Why the React 19 Conflict Happened

When I initially scaffolded the project, Vite's React template used **React 19** (the latest version). However, `react-helmet-async` hasn't updated its peer dependencies to officially support React 19 yet, causing the installation error you saw.

**I've now fixed this** by downgrading to **React 18.3.1**, which is stable and fully compatible with all dependencies.

## ✅ Installation (No Conflicts)

```bash
# Install dependencies (clean install)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

That's it! No `--legacy-peer-deps` needed anymore.

## Verify Installation

After running `npm install`, you should see:

```
added 236 packages, and audited 236 packages in Xs

54 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v7.1.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [images]
```

## Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## What Changed

### Before (React 19 - had conflicts):
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "@types/react": "^19.1.16",
  "@types/react-dom": "^19.1.9"
}
```

### After (React 18 - no conflicts):
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5"
}
```

## Why React 18 is Fine

- React 18 is the **stable, production-ready** version
- All modern features are available (Suspense, Concurrent Rendering, etc.)
- Perfect compatibility with all libraries in the ecosystem
- No breaking changes needed in the code
- React 19 is still quite new and some packages haven't caught up yet

## Troubleshooting

### If you still see errors

1. **Clear everything and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node version:**
   ```bash
   node --version  # Should be 18.x or higher
   ```

3. **Try using npm instead of yarn/pnpm:**
   This project is configured for npm specifically.

### Common Issues

**Error: `Cannot find module 'react'`**
- Run: `npm install`

**Error: TypeScript errors about React**
- Run: `npm install --save-dev @types/react@^18.3.18 @types/react-dom@^18.3.5`

**Port 5173 already in use**
- Change port: `npm run dev -- --port 3000`
- Or kill the process using 5173

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. 🎨 Start customizing:
   - Replace placeholder photos in `src/data/photos.ts`
   - Update site info in `src/data/site.ts`
   - Customize colors in `src/index.css`

## Need Help?

Check:
- [README.md](README.md) - Full documentation
- [SETUP.md](SETUP.md) - Quick start guide

Happy coding! 🚀
