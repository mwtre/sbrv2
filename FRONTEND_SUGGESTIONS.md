# Frontend Development Suggestions for Fonti San Bernardino

## 📊 Current State Analysis

**Tech Stack:**
- Next.js 15.3.2 (App Router)
- React 18.3.1
- TypeScript 5.8.3
- Tailwind CSS 3.4.17
- Radix UI components
- Stripe integration (partial)
- Web3 integration (demo mode)

**Current Features:**
- ✅ Responsive navigation with sidebar
- ✅ Shop modal (Private/Business/Events)
- ✅ Web3 modal (NFTs, Staking, Reserve)
- ✅ Smooth scrolling sections
- ✅ Basic animations

---

## 🚀 Priority 1: Performance Optimizations

### 1.1 Image Optimization
**Current Issue:** Using `<img>` tags instead of Next.js `Image` component
```tsx
// ❌ Current
<img src="..." alt="..." className="..." />

// ✅ Suggested
import Image from 'next/image';
<Image 
  src="..." 
  alt="..." 
  width={800} 
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  className="..."
/>
```

**Benefits:**
- Automatic image optimization
- Lazy loading
- WebP/AVIF format conversion
- Reduced bandwidth

### 1.2 Code Splitting & Lazy Loading
```tsx
// ✅ Lazy load modals
const ShopModal = dynamic(() => import('@/components/ShopModal'), {
  loading: () => <ModalSkeleton />,
  ssr: false
});

const Web3Modal = dynamic(() => import('@/components/Web3Modal'), {
  loading: () => <ModalSkeleton />,
  ssr: false
});
```

### 1.3 Font Optimization
```tsx
// ✅ Use next/font instead of Google Fonts link
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-playfair'
});
```

### 1.4 Bundle Size Analysis
```bash
# Add to package.json
"analyze": "ANALYZE=true next build"
```

---

## 🎨 Priority 2: UX/UI Enhancements

### 2.1 Scroll-Triggered Animations
**Install:** `framer-motion` or `react-intersection-observer`

```tsx
// ✅ Example with framer-motion
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
    </motion.section>
  );
};
```

### 2.2 Loading States & Skeletons
```tsx
// ✅ Add loading skeletons for modals
const ModalSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-zinc-200 rounded w-3/4"></div>
    <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
  </div>
);
```

### 2.3 Toast Notifications
**Install:** `sonner` or `react-hot-toast`

```tsx
import { toast } from 'sonner';

// Usage
toast.success('Item added to cart!');
toast.error('Failed to connect wallet');
```

### 2.4 Form Validation & Error Handling
```tsx
// ✅ Use react-hook-form + zod
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

### 2.5 Micro-interactions
- Add hover effects to cards
- Button press animations
- Cart item add animations
- Success checkmarks

---

## 🏗️ Priority 3: Code Organization

### 3.1 Component Structure
```
src/
├── app/
│   ├── (routes)/
│   │   ├── shop/
│   │   ├── web3/
│   │   └── about/
│   └── api/
├── components/
│   ├── features/
│   │   ├── ShopModal/
│   │   │   ├── index.tsx
│   │   │   ├── PrivateTab.tsx
│   │   │   ├── BusinessTab.tsx
│   │   │   └── EventsTab.tsx
│   │   └── Web3Modal/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── ui/
├── hooks/
│   ├── useScroll.ts
│   ├── useCart.ts
│   └── useWeb3.ts
├── lib/
│   ├── constants/
│   ├── utils/
│   └── api/
└── types/
```

### 3.2 Custom Hooks
```tsx
// hooks/useCart.ts
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Cart logic
  return { cart, addItem, removeItem, clearCart };
};

// hooks/useScroll.ts
export const useScroll = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Scroll logic
  return isScrolled;
};
```

### 3.3 Constants & Configuration
```tsx
// lib/constants/products.ts
export const WATER_PRODUCTS = {
  PURE_SPRING: { ... },
  SPARKLING_CREST: { ... },
  ALPINE_BURST: { ... },
} as const;

// lib/constants/nfts.ts
export const NFT_RARITIES = {
  COMMON: { color: 'gray', multiplier: 1 },
  RARE: { color: 'blue', multiplier: 2 },
  EPIC: { color: 'purple', multiplier: 3 },
  LEGENDARY: { color: 'yellow', multiplier: 5 },
} as const;
```

### 3.4 Type Safety
```tsx
// types/index.ts
export type PurchaseType = 'private' | 'business' | 'events';
export type EventCategory = 'work' | 'cultural' | 'party';
export type NFTRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CartItem {
  id: string;
  name: string;
  type: PurchaseType;
  quantity: number;
  price: number;
  details?: string;
}
```

---

## ♿ Priority 4: Accessibility (a11y)

### 4.1 Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Add focus indicators
- Implement skip links

### 4.2 ARIA Labels
```tsx
<button
  aria-label="Open shopping cart"
  aria-expanded={isShopOpen}
  aria-controls="shop-modal"
>
  <ShoppingBag />
</button>
```

### 4.3 Screen Reader Support
- Add semantic HTML
- Use proper heading hierarchy
- Include alt text for all images
- Add aria-live regions for dynamic content

### 4.4 Color Contrast
- Ensure WCAG AA compliance (4.5:1 for text)
- Test with color blindness simulators
- Don't rely solely on color for information

---

## 🔍 Priority 5: SEO & Meta

### 5.1 Metadata
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'San Bernardino - Alpine Waters',
    template: '%s | San Bernardino'
  },
  description: 'Premium Alpine water from the Swiss Alps',
  keywords: ['alpine water', 'swiss water', 'premium water'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanbernardino.com',
    siteName: 'San Bernardino',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Bernardino - Alpine Waters',
    description: 'Premium Alpine water from the Swiss Alps',
  },
};
```

### 5.2 Structured Data (JSON-LD)
```tsx
// components/StructuredData.tsx
export const ProductSchema = ({ product }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        // ...
      }),
    }}
  />
);
```

### 5.3 Sitemap & Robots.txt
```tsx
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://sanbernardino.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // ...
  ];
}
```

---

## 🎯 Priority 6: Modern Features

### 6.1 Dark Mode Support
```tsx
// Already have dark mode CSS variables!
// Just need to add toggle
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
};
```

### 6.2 Internationalization (i18n)
**Install:** `next-intl` or `next-i18next`

```tsx
// Support for multiple languages
// Already have language selector in sidebar!
```

### 6.3 Progressive Web App (PWA)
```tsx
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
```

### 6.4 Analytics
```tsx
// Install: @vercel/analytics or Google Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔒 Priority 7: Security & Best Practices

### 7.1 Environment Variables
```bash
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_WEB3_PROVIDER=...
```

### 7.2 Input Sanitization
- Sanitize all user inputs
- Validate on both client and server
- Use CSRF tokens for forms

### 7.3 Error Boundaries
```tsx
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 7.4 Rate Limiting
- Implement rate limiting for API routes
- Add CAPTCHA for forms
- Protect against DDoS

---

## 📱 Priority 8: Mobile Experience

### 8.1 Touch Gestures
```tsx
// Add swipe gestures for mobile
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => nextSlide(),
  onSwipedRight: () => prevSlide(),
});
```

### 8.2 Mobile Menu Improvements
- Add haptic feedback
- Improve touch targets (min 44x44px)
- Add pull-to-refresh

### 8.3 Viewport Meta
```tsx
// Already in layout.tsx, but verify:
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
```

---

## 🧪 Priority 9: Testing

### 9.1 Unit Tests
**Install:** `@testing-library/react`, `jest`

```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 9.2 E2E Tests
**Install:** `playwright` or `cypress`

```tsx
// e2e/shop.spec.ts
test('user can add item to cart', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Open shop"]');
  await page.click('text=Add to Cart');
  expect(await page.textContent('.cart-count')).toBe('1');
});
```

### 9.3 Visual Regression
**Install:** `chromatic` or `percy`

---

## 🚀 Priority 10: Deployment Optimizations

### 10.1 Build Optimizations
```js
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### 10.2 Caching Strategy
```tsx
// app/api/products/route.ts
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### 10.3 CDN Configuration
- Use Vercel Edge Network or Cloudflare
- Optimize static assets
- Enable Brotli compression

---

## 📦 Recommended Package Additions

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",           // Animations
    "react-hook-form": "^7.49.0",         // Forms
    "zod": "^3.22.0",                     // Validation
    "sonner": "^1.4.0",                   // Toasts
    "next-themes": "^0.2.1",              // Dark mode
    "react-intersection-observer": "^9.5.0", // Scroll animations
    "zustand": "^4.4.7",                  // State management
    "wagmi": "^2.0.0",                    // Web3 (if needed)
    "@tanstack/react-query": "^5.0.0"     // Data fetching
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0",   // Bundle analysis
    "@playwright/test": "^1.40.0",        // E2E testing
    "@testing-library/react": "^14.0.0",   // Unit testing
    "eslint-plugin-jsx-a11y": "^6.8.0"     // A11y linting
  }
}
```

---

## 🎨 Design System Improvements

### Color Palette Enhancement
```tsx
// tailwind.config.ts
colors: {
  alpine: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... Alpine water theme colors
  },
  water: {
    // Water-themed colors
  }
}
```

### Typography Scale
```tsx
// Add consistent typography scale
fontSize: {
  'display': ['4.5rem', { lineHeight: '1.1' }],
  'h1': ['3rem', { lineHeight: '1.2' }],
  // ...
}
```

---

## 🔄 State Management

### Consider Zustand for Global State
```tsx
// store/cartStore.ts
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),
}));
```

---

## 📊 Monitoring & Analytics

### 1. Error Tracking
**Install:** `@sentry/nextjs`

### 2. Performance Monitoring
- Web Vitals tracking
- Real User Monitoring (RUM)
- Core Web Vitals dashboard

### 3. User Analytics
- Track user flows
- Conversion funnels
- A/B testing capabilities

---

## 🎯 Quick Wins (Easy to Implement)

1. ✅ Add loading skeletons
2. ✅ Implement toast notifications
3. ✅ Add scroll-triggered animations
4. ✅ Optimize images with Next.js Image
5. ✅ Add error boundaries
6. ✅ Improve form validation
7. ✅ Add dark mode toggle
8. ✅ Implement proper SEO metadata
9. ✅ Add structured data
10. ✅ Create sitemap

---

## 📝 Summary

**Immediate Actions:**
1. Optimize images (Next.js Image component)
2. Add loading states and skeletons
3. Implement scroll animations
4. Add toast notifications
5. Improve form validation

**Short-term (1-2 weeks):**
1. Refactor component structure
2. Add custom hooks
3. Implement dark mode
4. Add error boundaries
5. Set up testing framework

**Long-term (1-2 months):**
1. Full i18n implementation
2. PWA features
3. Advanced analytics
4. E2E testing suite
5. Performance optimization audit

---

**Note:** Prioritize based on your business needs and user feedback. Start with performance and UX improvements as they have the highest impact on user experience.

