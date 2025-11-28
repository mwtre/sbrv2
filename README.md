# San Bernardino Alpine Waters

A modern, responsive website for San Bernardino Alpine Waters featuring e-commerce shop, Web3 integration, and beautiful animations.

## Features

- 🛍️ **Shop Modal** - Private, Business, and Events purchase options with Stripe integration
- 🔷 **Web3 Modal** - Water NFTs, BTC Staking Pools, and Global Reserve
- 🎨 **Beautiful Animations** - Scroll-triggered animations and bubble background effect
- 📱 **Mobile Optimized** - Fully responsive design for all devices
- ⚡ **Performance** - Optimized images, lazy loading, and code splitting
- 🎯 **Smooth Scrolling** - Navigation with smooth scroll to sections

## Tech Stack

- Next.js 15.3.2 (App Router)
- React 18.3.1
- TypeScript 5.8.3
- Tailwind CSS 3.4.17
- Framer Motion (animations)
- Sonner (toast notifications)
- Radix UI (components)
- Stripe (payments)
- Lucide React (icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This will create a static export in the `out` directory, ready for GitHub Pages deployment.

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment:

1. The repository is set up with GitHub Actions workflow
2. On every push to `main`, the site is automatically built and deployed
3. The site will be available at: `https://mwtre.github.io/sbrv2/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# The out/ directory contains the static files
# Upload the contents of out/ to your GitHub Pages branch
```

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (for Stripe checkout)
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Main page
│   └── globals.css   # Global styles
├── components/
│   ├── ShopModal.tsx      # Shopping modal
│   ├── Web3Modal.tsx      # Web3 features modal
│   ├── BubbleBackground.tsx  # Animated background
│   ├── AnimatedSection.tsx   # Scroll animations
│   └── ui/           # UI components (shadcn)
└── lib/
    └── utils.ts       # Utility functions
```

## Environment Variables

For production, you'll need to set up:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key (server-side only)

## License

© 2025 FONTI SAN BERNARDINO
