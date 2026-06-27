# Loft 28 — Permanent Deployment Guide

## Project Information
- **Name**: Loft 28 — Granja Vianna
- **Type**: Luxury Real Estate Showcase Website
- **Location**: Cotia, São Paulo, Brazil
- **Technology Stack**: React 19 + TypeScript + Vite + TailwindCSS + Express

## Build & Deployment

### Production Build
```bash
pnpm run build
```

This command:
1. Builds the React frontend with Vite
2. Bundles the Express server with esbuild
3. Creates optimized output in `/dist/`

### Start Production Server
```bash
NODE_ENV=production node dist/index.js
```

The server will:
- Listen on port 3000 (or `$PORT` environment variable)
- Serve static assets from `/dist/public/`
- Handle SPA routing (fallback to index.html)

### Deployment Checklist
- [x] Production build tested
- [x] Express server configured
- [x] Static assets optimized
- [x] SPA routing configured
- [x] Environment variables set
- [x] Git repository initialized

## Features
✨ **Editorial Design** - Asymmetric two-column layout
📸 **Rich Media Gallery** - High-quality photos and videos
🗺️ **Interactive Maps** - Google Maps integration
💬 **WhatsApp CTA** - Direct contact button
📱 **Responsive Design** - Mobile-friendly layout
🎨 **Dark/Light Theme** - Theme context ready
⚡ **High Performance** - Optimized bundle sizes

## Build Output Sizes
- HTML: 369.19 kB (gzip: 106.02 kB)
- CSS: 97.78 kB (gzip: 15.83 kB)
- JS: 369.49 kB (gzip: 110.87 kB)

## Environment Variables
```
NODE_ENV=production
PORT=3000
```

## Deployment to Manus WebDev
1. Project is configured with Manus WebDev hosting credentials
2. Git repository is initialized and ready
3. Build and start commands are configured
4. Deploy through Manus dashboard for permanent hosting

## Support
For deployment assistance, visit: https://help.manus.im
