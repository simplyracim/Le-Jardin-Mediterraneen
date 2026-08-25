# Technical Specification — Le Jardin Méditerranéen

## Development Environment

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5.6 | Type safety |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| shadcn/ui | latest | Component library |
| Node.js | 20 | Runtime environment |

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | DOM rendering |
| `react-router-dom` | ^7.0.0 | Client-side routing |
| `gsap` | ^3.12.7 | Animation engine (scroll-triggered reveals, parallax, page load sequences) |
| `lucide-react` | ^0.460.0 | Icon library (Cart, UtensilsCrossed, Sparkles, MessageSquare) |
| `embla-carousel-react` | ^8.3.0 | Testimonial carousel on homepage |
| `@trpc/client` | ^11.0.0 | tRPC client for type-safe API calls |
| `@trpc/react-query` | ^11.0.0 | React Query integration for tRPC |
| `@tanstack/react-query` | ^5.0.0 | Server state management, caching, mutations |
| `drizzle-orm` | ^0.41.0 | Database ORM for SQLite |
| `better-sqlite3` | ^11.0.0 | SQLite database driver |
| `bcryptjs` | ^2.4.3 | Password hashing for local auth |
| `jose` | ^6.0.0 | JWT token creation and verification |
| `zod` | ^3.24.0 | Schema validation (forms, API inputs) |
| `superjson` | ^2.2.0 | JSON serialization for tRPC (Date support) |
| `hono` | ^4.7.0 | Lightweight HTTP server for tRPC backend |
| `@hono/node-server` | ^1.13.0 | Node.js adapter for Hono |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.6.0 | TypeScript compiler |
| `vite` | ^6.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3.0 | React Fast Refresh for Vite |
| `tailwindcss` | ^3.4.0 | CSS utility framework |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixing |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | ReactDOM type definitions |
| `@types/bcryptjs` | ^2.4.6 | bcryptjs type definitions |
| `drizzle-kit` | ^0.30.0 | Drizzle ORM migrations and studio |
| `tsx` | ^4.19.0 | TypeScript execution for server scripts |

### Fonts (Google Fonts CDN)

| Font | Weights | Usage |
|------|---------|-------|
| Cormorant Garamond | 400 (Regular), 400 Italic | Display headings (H1-H4), hero titles, taglines, quotes |
| Montserrat | 400 (Regular), 500 (Medium), 600 (SemiBold) | Body text, navigation, buttons, labels, prices |

---

## Component Inventory

### shadcn/ui Components

| Component | Installation | Usage |
|-----------|-------------|-------|
| `button` | `npx shadcn add button` | Primary buttons, CTA buttons, form submit |
| `input` | `npx shadcn add input` | Form text inputs (reservation, contact, events, gift cards) |
| `textarea` | `npx shadcn add textarea` | Message fields, special requests, event details |
| `select` | `npx shadcn add select` | Dropdowns (guest count, event type, time slots, subject) |
| `dialog` | `npx shadcn add dialog` | Gallery lightbox, purchase modals, confirmation dialogs |
| `label` | `npx shadcn add label` | Form field labels |
| `tabs` | `npx shadcn add tabs` | Gallery category filter tabs |
| `separator` | `npx shadcn add separator` | Decorative dividers between content sections |

### Custom Components

#### Layout Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Navigation` | `scrolled: boolean` | Fixed top nav with transparent→white scroll transition, mobile hamburger overlay |
| `Footer` | — | Brown background footer with newsletter, social links, legal links |
| `PageLayout` | `children, heroImage?, title?, subtitle?` | Consistent page wrapper with hero section pattern |
| `Container` | `children, className?` | Max-width 1440px centered container with responsive padding |

#### Shared Section Components

| Component | Props | Description |
|-----------|-------|-------------|
| `SectionHeading` | `title, subtitle?, italic?, centered?, light?` | Reusable serif heading with optional decorative line |
| `CTAButton` | `text, href, variant?, icon?, external?` | Styled button with arrow icon and hover rotation |
| `DietaryBadge` | `type: 'V' \| 'GF'` | Small terracotta badge for vegetarian/gluten-free tags |
| `MenuItemCard` | `name, description, price, tags?, image?` | Horizontal card for menu items (image left, content right) |
| `DishCard` | `image, title, description, ctaText, href` | Vertical card with image, title, description, and CTA link |
| `TestimonialCard` | `quote, author, date` | White card with italic quote and author info |
| `ScrollReveal` | `children, delay?, direction?, className?` | Wrapper component for GSAP scroll-triggered animations |
| `ParallaxImage` | `src, alt, speed?, className?` | Image with scroll-linked parallax translateY |
| `ScrollIndicator` | — | Bouncing "Scroll to discover" indicator, hidden on mobile |
| `LanguageToggle` | `language, onToggle` | EN/FR toggle switch for language state |

#### Page-Specific Components

| Component | Page | Description |
|-----------|------|-------------|
| `HeroSection` | Home | Full-screen hero with background image, overlay, headline, tagline, CTA |
| `TestimonialCarousel` | Home | Embla-based auto-advancing carousel with 3 visible cards (desktop) |
| `MenuTeaserGrid` | Home | 3-column grid of DishCards for menu categories |
| `MenuCategorySection` | Menu | Brown header + 2-column grid of MenuItemCards |
| `GalleryGrid` | Gallery | Masonry-style responsive grid with filter tabs |
| `GalleryLightbox` | Gallery | Full-screen image viewer with prev/next navigation |
| `EventInquiryForm` | Events | Complete private event inquiry form with validation |
| `GiftCardSelector` | Gift Cards | Amount selection buttons + custom input + e-card form |
| `ContactInfoCards` | Contact | 4 info cards (address, phone, email, hours) with icons |
| `ReservationForm` | Reservations | Booking form with date/time picker + sidebar info |
| `PositionCard` | Careers | Job listing card with title, type badge, description, apply CTA |
| `OrderRedirect` | Order Online | Landing page with external link CTA |

---

## Animation Implementation Plan

### Animation Library: GSAP

**Rationale**: GSAP is selected over Framer Motion because the design requires precise scroll-linked parallax effects, sequenced page load animations, and ScrollTrigger-driven reveals — all of which are GSAP's core strengths. The animation system is scroll-heavy rather than gesture/state-driven.

### Easing Definitions (GSAP CustomEase or strings)

| Name | GSAP Value | Usage |
|------|-----------|-------|
| `Standard` | `"power2.out"` | Hover effects, general transitions |
| `Smooth` | `"power3.inOut"` | Scroll reveals, parallax |
| `Bounce` | `"back.out(1.7)"` | Scroll indicator bounce |

### Animation Implementation Table

| Animation | Library / Add-on | Implementation Approach | Complexity |
|-----------|-----------------|------------------------|------------|
| **Page Load Sequence** (hero fade → nav slide → text reveal → scroll indicator) | GSAP timeline | Single GSAP timeline on mount with sequenced `.to()` calls and delays. Triggered once per session. | Medium |
| **Scroll-Triggered Reveals** (fade + slide-up on all sections) | GSAP + ScrollTrigger | `ScrollTrigger` with `trigger` set to each section, `start: "top 80%"`, `toggleActions: "play none none none"`. Staggered child reveals via `stagger` property. Reusable `ScrollReveal` wrapper component. | Medium |
| **Parallax Background Images** | GSAP + ScrollTrigger | `ScrollTrigger.create()` with `scrub: true`, animating `yPercent` at 0.3x-0.5x speed relative to scroll. Desktop only (disabled below 1024px). | Medium |
| **Testimonial Carousel** | embla-carousel-react | Embla carousel with `loop: true`, `align: "start"`, autoplay plugin (5s interval). Navigation via prev/next button callbacks. Pause on hover via mouse event handlers. | Low |
| **Scroll-Down Indicator Bounce** | CSS @keyframes | Pure CSS `translateY(0 → 8px → 0)` animation with `animation: bounce 2s infinite`. Hidden below 768px via media query. No JS needed. | Low |
| **Navigation Background Transition** | GSAP + ScrollTrigger | ScrollTrigger with `start: "100px top"` toggles nav class. CSS transition handles the color/shadow change. | Low |
| **Button Hover Effects** | CSS transitions | Pure CSS `transition: all 300ms ease-out` for background fill, border color, arrow rotation via `transform: rotate(-45deg)`. | Low |
| **Card Hover Effects** (scale, shadow, lift) | CSS transitions | Pure CSS `transition: all 300ms ease-out` for `transform: scale(1.05)`, `box-shadow`, `translateY(-4px)`. | Low |
| **Mobile Menu Overlay** | GSAP | Timeline: hamburger morphs to X, overlay slides in from right, menu items stagger fade-in (50ms each). Reverse on close. | Medium |
| **Form Input Focus** | CSS transitions | Pure CSS `transition: border-color 200ms` for bottom-border color change to terracotta. | Low |
| **Gallery Lightbox** | GSAP | Modal fade-in (opacity 0→1, 300ms), image transitions (fade 200ms). Close on X, backdrop click, Escape key. | Low |
| **Hero Background Slow Zoom** | GSAP | `scale: 1.05 → 1.0` over 10 seconds on page load. Combined with parallax scrub on scroll. | Low |
| **Staggered Card Reveals** | GSAP + ScrollTrigger | `stagger: 0.1` property on ScrollTrigger timeline for dish cards, gift cards, gallery images. | Low |

---

## State & Logic Plan

### Global State (React Context)

| State | Type | Scope | Implementation |
|-------|------|-------|----------------|
| `Language` | `'fr' \| 'en'` | App-wide | React Context with toggle function. All text content switches immediately on toggle. Default: `'fr'`. |
| `AuthState` | `{ user: User \| null, isAdmin: boolean, isLoading: boolean }` | App-wide | React Context with `useAuth` hook. Consumes tRPC auth.me query. Controls admin navigation visibility. |

### Page-Level State

| State | Page | Type | Implementation |
|-------|------|------|----------------|
| `ActiveCategory` | Menu | string | `useState` for sticky sidebar active category. Updated via scroll position detection or click. |
| `DietaryFilters` | Menu | `{ v: boolean, gf: boolean }` | `useState` toggles. Filters visible menu items client-side. |
| `GalleryFilter` | Gallery | `'all' \| 'food' \| 'drinks' \| 'ambiance' \| 'events'` | `useState` filters displayed images. CSS fade transition. |
| `LightboxImage` | Gallery | `{ index: number, open: boolean }` | `useState` controls lightbox modal. Keyboard navigation via `useEffect` keydown listener. |
| `CarouselIndex` | Home (Testimonials) | number | Managed by embla-carousel API. Exposed for dot indicators. |
| `FormState` | Multiple forms | `{ status: 'idle' \| 'loading' \| 'success' \| 'error', errors: Record<string, string> }` | `useState` per form. Zod validation on submit. |

### Data Flow (tRPC + React Query)

| Endpoint | Method | Purpose | Caching |
|----------|--------|---------|---------|
| `auth.me` | Query | Get current user session | `staleTime: 5 minutes` |
| `auth.register` | Mutation | Create local account | Invalidate none |
| `auth.login` | Mutation | Login with credentials | Invalidate `auth.me` |
| `auth.logout` | Mutation | Clear session | Invalidate `auth.me` |
| `auth.oauthCallback` | Query | Handle OAuth redirect | One-time |
| `menu.list` | Query | Fetch all menu items | `staleTime: 30 minutes` (menu rarely changes) |
| `contact.submit` | Mutation | Submit contact form | No caching |
| `reservation.create` | Mutation | Create reservation | No caching |
| `event.inquiry` | Mutation | Submit event inquiry | No caching |

### Client-Side Validation (Zod Schemas)

| Form | Schema | Rules |
|------|--------|-------|
| **Contact** | `ContactSchema` | name: min 2 chars; email: valid format; phone: optional; subject: enum; message: min 10 chars |
| **Reservation** | `ReservationSchema` | guests: 1-12; date: future date only; time: enum; name: min 2; email: valid; phone: required |
| **Event Inquiry** | `EventInquirySchema` | name, email, phone: required; eventType: enum; guests: number; date: future; details: optional |
| **Register** | `RegisterSchema` | username: min 3 chars; email: valid; password: min 6 chars |
| **Login** | `LoginSchema` | email: valid; password: required |

---

## Routing Plan (react-router-dom v7)

### Route Table

| Route | Page Component | Auth Required | Admin Only |
|-------|---------------|---------------|------------|
| `/` | `HomePage` | No | No |
| `/menu` | `MenuPage` | No | No |
| `/our-story` | `StoryPage` | No | No |
| `/gallery` | `GalleryPage` | No | No |
| `/events` | `EventsPage` | No | No |
| `/gift-cards` | `GiftCardsPage` | No | No |
| `/contact` | `ContactPage` | No | No |
| `/reservations` | `ReservationsPage` | No | No |
| `/careers` | `CareersPage` | No | No |
| `/order-online` | `OrderOnlinePage` | No | No |
| `/login` | `LoginPage` | No (redirects if auth) | No |
| `/register` | `RegisterPage` | No (redirects if auth) | No |
| `/admin` | `AdminPage` | Yes | Yes |
| `/privacy-policy` | `PrivacyPolicyPage` | No | No |
| `/terms-of-use` | `TermsOfUsePage` | No | No |
| `/accessibility` | `AccessibilityPage` | No | No |

### Route Guards

- **Auth routes** (`/login`, `/register`): Redirect to `/` if already authenticated
- **Admin route** (`/admin`): Check `isAdmin` flag from auth context. Redirect to `/` if not admin. Conditionally render admin nav link.

---

## Project File Structure

```
├── public/
│   ├── images/
│   │   ├── hero-main.jpg
│   │   ├── story-dining.jpg
│   │   ├── chef-karim.jpg
│   │   ├── reservation-dining.jpg
│   │   ├── menu-lunch.jpg
│   │   ├── menu-dinner.jpg
│   │   ├── menu-cocktails.jpg
│   │   ├── dish-mezze.jpg
│   │   ├── dish-couscous.jpg
│   │   ├── dish-tagine.jpg
│   │   └── ... (other gallery/menu images)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (auto-generated)
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLayout.tsx
│   │   ├── shared/
│   │   │   ├── Container.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   ├── DietaryBadge.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── ParallaxImage.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   ├── cards/
│   │   │   ├── MenuItemCard.tsx
│   │   │   ├── DishCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── GiftCard.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ReservationForm.tsx
│   │   │   ├── EventInquiryForm.tsx
│   │   │   └── GiftCardForm.tsx
│   │   └── chat/
│   │       └── AIChatWidget.tsx        # AI chat floating widget
│   ├── sections/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StorySection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── MenusSection.tsx
│   │   │   ├── ChefSection.tsx
│   │   │   ├── ReservationCTASection.tsx
│   │   │   └── MenuTeaserSection.tsx
│   │   ├── menu/
│   │   │   └── MenuCategorySection.tsx
│   │   └── story/
│   │       ├── StoryHeroSection.tsx
│   │       ├── OurStorySection.tsx
│   │       ├── ValuesSection.tsx
│   │       └── VisitGallerySection.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── StoryPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── GiftCardsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ReservationsPage.tsx
│   │   ├── CareersPage.tsx
│   │   ├── OrderOnlinePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── TermsOfUsePage.tsx
│   │   └── AccessibilityPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useLanguage.ts
│   │   └── useScrollReveal.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/
│   │   ├── utils.ts             # cn() utility, shared helpers
│   │   ├── trpc.ts              # tRPC client setup
│   │   ├── gsap.ts              # GSAP plugin registration
│   │   └── constants.ts         # Colors, breakpoints, nav links
│   ├── data/
│   │   ├── menu.ts              # Static menu item data
│   │   ├── testimonials.ts      # Testimonial data
│   │   ├── gallery.ts           # Gallery image data
│   │   ├── positions.ts         # Career positions data
│   │   └── translations.ts      # FR/EN text content
│   ├── server/
│   │   ├── index.ts             # Hono server entry point
│   │   ├── db.ts                # SQLite database connection
│   │   ├── schema.ts            # Drizzle ORM table definitions
│   │   ├── context.ts           # tRPC context builder (auth)
│   │   ├── routers/
│   │   │   ├── _app.ts          # Root router
│   │   │   ├── auth.ts          # Auth router (register, login, logout, me)
│   │   │   ├── menu.ts          # Menu router
│   │   │   └── contact.ts       # Contact form submission router
│   │   └── seed.ts              # Database seed script
│   ├── types/
│   │   └── index.ts             # Shared TypeScript types
│   ├── App.tsx                  # Root component with routing
│   ├── main.tsx                 # Entry point (React + tRPC provider)
│   └── index.css                # Global styles, Tailwind directives, Google Fonts
├── drizzle/
│   └── migrations/              # Drizzle migration files
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.server.json
├── package.json
└── .env                         # JWT_SECRET, DATABASE_URL
```

---

## Backend Architecture

### Server: Hono + tRPC

The backend uses Hono as the HTTP server framework with tRPC as the type-safe API layer. All API routes are handled through tRPC routers mounted on a Hono server.

**Server entry** (`src/server/index.ts`): Hono app with CORS, `better-sqlite3` database connection, tRPC middleware at `/api/trpc`, and static file serving in production.

### Database: SQLite + Drizzle ORM

**Schema** (`src/server/schema.ts`):

| Table | Columns | Purpose |
|-------|---------|---------|
| `users` | `id` (PK), `username`, `email`, `passwordHash`, `role` (`'user' \| 'admin'`), `createdAt` | Local auth user accounts |
| `menuItems` | `id` (PK), `name`, `description`, `price`, `category`, `tags`, `imageUrl`, `createdAt` | Menu items (seeded) |
| `contacts` | `id` (PK), `name`, `email`, `phone`, `subject`, `message`, `createdAt` | Contact form submissions |
| `reservations` | `id` (PK), `guests`, `date`, `time`, `name`, `email`, `phone`, `requests`, `seating`, `createdAt` | Table reservations |

### Authentication System

**Local Auth (username/password)**:
- Registration: Validate with Zod → hash password with bcryptjs → insert into `users` table → return JWT
- Login: Verify email/password → issue JWT token stored in httpOnly cookie
- Logout: Clear cookie
- `auth.me` query: Verify JWT from cookie → return user object with `isAdmin` flag

**OAuth 2.0 (Simulated)**:
- Frontend initiates OAuth flow via `window.location.href` to mock OAuth provider URL
- OAuth callback route (`/api/trpc/auth.oauthCallback`) receives `code` query param, exchanges for token (simulated), creates/updates user, sets JWT cookie, redirects to `/`
- UI shows "Login with OAuth Provider" button

**Admin Authorization**:
- `role` field on `users` table: enum `['user', 'admin']`, default `'user'`
- `isAdmin` derived from `role === 'admin'` in auth context
- Admin nav link conditionally rendered based on `isAdmin`
- `/admin` route guarded: redirect non-admin users to `/`

### AI Chat Widget

A floating chat widget accessible from all pages with a creative icon (Sparkles from lucide-react) that opens a chat panel. The widget sends messages to a tRPC endpoint and streams responses.

- **Frontend**: Floating button (bottom-right) → expandable chat panel with message history, input field, send button
- **tRPC endpoint**: `chat.sendMessage` mutation — accepts message text, returns streamed AI response
- **Implementation**: Simulated AI responses using predefined restaurant-themed replies (about menu, hours, location, reservations)
- **Icon**: Sparkles from lucide-react for the chat toggle button

### Contact Form Data Flow

1. User fills contact form → client-side Zod validation
2. On submit → `contact.submit` tRPC mutation
3. Server validates again → inserts into `contacts` table
4. Admin views submissions on `/admin` page via `contact.list` tRPC query (admin-protected)

---

## Tailwind Configuration

### Custom Theme Extensions

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        terracotta: '#C84C2E',
        sand: '#F5EDE3',
        brown: '#5A3E2B',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
      },
      screens: {
        'desktop-lg': '1440px',
        'tablet': '768px',
        'desktop': '1024px',
      },
    },
  },
}
```

### Global CSS (`src/index.css`)

- Tailwind directives (`@tailwind base`, `components`, `utilities`)
- Google Fonts import (@import for Cormorant Garamond + Montserrat)
- CSS custom properties for color tokens
- Scroll indicator bounce `@keyframes`
- Base styles: `font-family: 'Montserrat', sans-serif` on body
- Scroll behavior: `scroll-behavior: smooth`

---

## Data Storage Plan

### Static Data (TypeScript modules in `src/data/`)

| Data Type | Storage | Rationale |
|-----------|---------|-----------|
| Menu items | `src/data/menu.ts` | Static menu content, imported directly. No API call needed for display. |
| Testimonials | `src/data/testimonials.ts` | Static customer quotes. |
| Gallery images | `src/data/gallery.ts` | Static image metadata (src, category, alt). |
| Career positions | `src/data/positions.ts` | Static job listings. |
| Translations | `src/data/translations.ts` | FR/EN translation key-value pairs for all UI text. |

### Dynamic Data (SQLite via tRPC)

| Data Type | Table | Operations |
|-----------|-------|------------|
| User accounts | `users` | Create (register), Read (me query) |
| Contact submissions | `contacts` | Create (submit form), Read (admin list) |
| Reservations | `reservations` | Create (book table), Read (admin list) |

### Database Seeding

`src/server/seed.ts`: Script to seed the `menuItems` table with all menu data on first run. Executed via `npm run seed`.

---

## Color Token Reference

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| Primary accent | `#C84C2E` | `text-terracotta`, `bg-terracotta`, `border-terracotta` |
| Sand background | `#F5EDE3` | `bg-sand` |
| Brown (text/dark) | `#5A3E2B` | `text-brown`, `bg-brown`, `border-brown` |
| White | `#FFFFFF` | `bg-white`, `text-white` |
| Brown 30% border | `#5A3E2B30` | `border-brown/30` |
| Terracotta 15% hover | `#C84C2E26` | `bg-terracotta/15` |
| Black 50% overlay | `#00000080` | `bg-black/50` |

---

## Icon Reference (lucide-react)

| Icon | Name | Usage |
|------|------|-------|
| Arrow right | `ArrowRight` | CTA buttons, card links |
| Chevron down | `ChevronDown` | Scroll indicator, dropdowns |
| Map pin | `MapPin` | Address info |
| Phone | `Phone` | Phone contact |
| Mail / Envelope | `Mail` | Email contact |
| Clock | `Clock` | Opening hours |
| Facebook | `Facebook` | Social links |
| Instagram | `Instagram` | Social links |
| X / Close | `X` | Close modals, mobile menu |
| Menu / Hamburger | `Menu` | Mobile nav toggle |
| External link | `ExternalLink` | Order online page |
| Check | `Check` | Checkmarks, validation |
| Shopping cart | `Cart` | AI chat widget (per creative icon requirement) |
| Utensils crossed | `UtensilsCrossed` | AI chat widget alternative |
| Sparkles | `Sparkles` | AI chat widget toggle icon |
| Message square | `MessageSquare` | AI chat send button |

---

## Implementation Order

1. **Project scaffolding** — Vite + React + TypeScript + Tailwind + shadcn/ui
2. **Font and color setup** — Google Fonts, Tailwind config, CSS custom properties
3. **Layout components** — Navigation, Footer, Container, PageLayout
4. **Shared components** — SectionHeading, CTAButton, ScrollReveal, ParallaxImage
5. **Routing** — react-router-dom setup with all routes
6. **Homepage** — Hero + all 7 sections with GSAP animations
7. **Menu page** — Categories, items, dietary filters
8. **Static pages** — Our Story, Gallery, Events, Gift Cards, Contact, Careers, Order Online
9. **Backend setup** — Hono server, tRPC, SQLite, Drizzle schema
10. **Auth system** — Register, login, logout, OAuth, admin middleware
11. **Forms** — Contact, reservation, event inquiry with tRPC mutations
12. **Admin dashboard** — Protected route, contact submissions table, reservation list
13. **AI chat widget** — Floating panel with tRPC endpoint
14. **Polish** — All animations, responsive design, language toggle
