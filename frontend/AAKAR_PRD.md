# AAKAR — Product Requirements Document (PRD)

## 1. Product Overview

**Project Name:** AAKAR  
**Product Type:** Premium 3D Artist Portfolio + 3D Product Store  
**Business Model:** Single-brand / single-owner studio  
**Primary Goal:** Showcase and sell the artist's 3D work while providing an immersive, premium digital studio experience.

AAKAR is a digital atelier for a 3D artist. The platform combines an artist portfolio, 3D asset store, studio presentation, custom project enquiries, and a single-owner management system.

The product must feel like a premium creative studio rather than a conventional e-commerce website.

---

## 2. Core Product Principles

### 2.1 Brand Experience

AAKAR should communicate:

- Premium craftsmanship
- Digital artistry
- 3D expertise
- Modern Indian creative identity
- Technical precision
- Exclusivity
- Strong visual storytelling

### 2.2 Design Principle

> **White communicates. Black immerses. Cobalt responds.**

The visual system follows a **60 / 30 / 10** color distribution:

- **60% White** — information, products, content, commerce
- **30% Black / Obsidian** — immersive experiences, hero, portfolio storytelling
- **10% Deep Cobalt** — interaction, CTA, active states, highlights

---

# 3. Target Users

## 3.1 Primary Customer

People looking to:

- Purchase professional 3D assets
- Explore high-quality 3D artwork
- Commission custom 3D work
- Discover the artist's portfolio
- Evaluate technical specifications before purchase

Potential customer segments:

- Game developers
- Film/VFX artists
- Animation studios
- Designers
- Agencies
- Architects
- Product designers
- Independent creators
- 3D enthusiasts

## 3.2 Artist / Owner

The single business owner manages:

- Products
- 3D assets
- Pricing
- Orders
- Customers
- Custom project requests
- Reviews
- Portfolio
- Homepage content
- Media
- Store settings

There are no vendors or marketplace sellers.

---

# 4. Business Scope

AAKAR is a **single-owner platform**.

### Included

- Artist portfolio
- 3D product catalogue
- Product detail pages
- 3D model previews
- Digital product purchasing
- Customer accounts
- Wishlist
- Cart
- Checkout
- Orders
- Downloads
- Reviews
- Custom project requests
- Contact/messages
- Single-owner admin management

### Not Included

- Multi-vendor marketplace
- Vendor onboarding
- Vendor commissions
- Seller dashboards
- Seller payouts
- Marketplace-level RBAC
- Multiple independent storefronts

---

# 5. Product Types

The initial product model should primarily support **digital 3D assets**.

Potential product types:

- Characters
- Creatures
- Weapons
- Clothing
- Props
- Sculptures
- Environments
- Accessories
- Other 3D assets

The architecture should remain extensible enough to support physical products later if the business requires it.

---

# 6. Public Website

## 6.1 Navigation

Primary navigation:

- AAKAR Logo
- WORK
- STORE
- STUDIO
- ABOUT
- CONTACT

Utility navigation:

- Search
- Wishlist
- Cart
- Account

The navigation should be minimal and editorial.

It should support visual state changes depending on the current section:

- Transparent / dark over hero
- Light over white sections
- Dark over light sections
- Cobalt active indicators

---

# 7. Homepage

The homepage is the primary brand experience.

## Section 1 — Immersive Hero

Purpose:

Introduce AAKAR and establish the visual identity immediately.

Requirements:

- Dark / obsidian background
- Large editorial typography
- Premium 3D model presentation
- Subtle camera/model interaction
- Cobalt lighting accents
- Primary CTA
- Secondary CTA

Suggested CTAs:

- Explore Collection
- View Work

Hero should feel like entering a digital exhibition.

---

## Section 2 — Featured Work

Showcase selected 3D artwork.

Requirements:

- Large visual presentation
- Minimal metadata
- Category
- Project title
- Year / status where relevant
- View project interaction

Avoid conventional card-grid presentation.

---

## Section 3 — Explore Collection

Present major product categories.

Example categories:

- Characters
- Creatures
- Weapons
- Clothing
- Props
- Sculptures
- Environments

Categories should be visually driven.

---

## Section 4 — 3D Product Collection

Show selected products.

Each product should communicate:

- Product image
- Product name
- Category
- Price
- Technical badges
- 3D preview availability

Examples of technical badges:

- PBR
- 4K
- UV
- Rigged
- Animated
- Game Ready

Only display badges supported by actual product data.

---

## Section 5 — Studio / Artist Story

Introduce the artist.

Content may include:

- Artist statement
- Experience
- Creative philosophy
- Specialization
- Selected tools/workflows
- Studio imagery

---

## Section 6 — From Zero → Form

Show the creation process.

Example:

1. Concept
2. Blockout
3. Sculpt
4. Retopology
5. UV
6. Texturing
7. Final

This section should visually demonstrate craftsmanship.

---

## Section 7 — Custom Project

Allow visitors to request custom work.

CTA:

**Start a Project**

The request form may include:

- Name
- Email
- Project type
- Description
- Reference files
- Budget
- Deadline
- Additional requirements

---

## Section 8 — Footer

Include:

- AAKAR branding
- Navigation
- Store links
- Social links
- Contact
- Privacy
- Terms
- Digital License
- Refund Policy

---

# 8. Collection / Store

Route:

`/collection`

Purpose:

Allow customers to discover and filter all available 3D assets.

## Requirements

- Search
- Category filtering
- Product sorting
- Price filtering
- Technical filters
- Product cards
- Pagination or infinite loading
- Empty state
- Loading state

Potential filters:

- Category
- Price
- Format
- Rigged
- Animated
- PBR
- Texture resolution
- Game Ready

The collection should remain visually premium rather than looking like a generic marketplace.

---

# 9. Product Detail

Route:

`/product/:slug`

The product page is a major conversion and product-examination experience.

## Product Viewer

Primary area:

- Large interactive 3D viewer
- Orbit controls
- Zoom
- Camera controls
- Loading state
- Error fallback
- Fullscreen option where appropriate

Potential future features:

- Material switching
- Wireframe mode
- Lighting presets
- Model hotspots
- Technical overlays

## Product Information

Display:

- Product name
- Category
- Description
- Price
- License
- Availability
- Supported formats
- Compatibility
- Technical specifications

## Technical Information

Example:

- Polygon count
- Texture resolution
- UV mapped
- PBR
- Rigged
- Animated
- File formats
- Software compatibility

Only show verified data.

## Purchase

Actions:

- Add to Cart
- Buy Now
- Add to Wishlist

---

# 10. Cart

Route:

`/cart`

Requirements:

- Product list
- Quantity where applicable
- Price
- Remove item
- Save/remove wishlist option
- Subtotal
- Checkout CTA

For digital products, avoid unnecessary shipping information.

---

# 11. Checkout

Route:

`/checkout`

Initial digital-product flow:

1. Account / authentication
2. Order summary
3. License selection if applicable
4. Payment
5. Order confirmation

The checkout should be short and focused.

---

# 12. Customer Account

Route:

`/account`

Sections:

- Profile
- Orders
- Downloads
- Wishlist
- Settings

## Orders

Customers should be able to view:

- Order ID
- Date
- Products
- Amount
- Payment status
- Download status

## Downloads

Customers should be able to access purchased digital files securely.

Downloads should eventually use protected/temporary URLs rather than public static file links.

---

# 13. Wishlist

Customers can:

- Add products
- Remove products
- View saved products
- Move products to cart

Wishlist data must be backend-ready.

---

# 14. Search

Search should support:

- Product name
- Category
- Tags
- Technical attributes

Future search can support:

- Fuzzy matching
- Suggested search
- Recent searches
- Popular searches

---

# 15. Custom Project System

Route:

`/contact` or dedicated custom-project flow.

Workflow:

```text
Submitted
    ↓
Reviewing
    ↓
Quoted
    ↓
Approved
    ↓
In Production
    ↓
Review
    ↓
Completed
```

Owner should be able to update request status.

Customer should receive appropriate status updates.

---

# 16. Studio / Portfolio

Route:

`/studio`

This should function as the artist's digital portfolio.

Possible sections:

- Selected Work
- Characters
- Creatures
- Props
- Sculptures
- Process
- Tools
- Creative Philosophy

Portfolio projects should be separate from products.

A portfolio item does not necessarily need to be purchasable.

---

# 17. Admin / Owner System

AAKAR has one owner.

No vendor system is required.

## Admin Navigation

- Dashboard
- Products
- Orders
- Customers
- Custom Requests
- Messages
- Reviews
- Portfolio
- Homepage
- Media Library
- Settings

---

# 18. Admin Dashboard

Dashboard should show:

- Revenue
- Total orders
- Products sold
- Active products
- New customers
- Pending custom requests
- Recent orders
- Top products

Analytics should be data-driven.

---

# 19. Product Management

Owner should be able to:

- Create product
- Edit product
- Save draft
- Preview
- Publish
- Unpublish
- Archive
- Delete where appropriate

## Product Editor

Recommended steps:

### 1. Basic Information

- Name
- Slug
- Description
- Category
- Tags

### 2. Media

- Thumbnail
- Hero image
- Gallery
- Videos

### 3. 3D Files

- GLB
- GLTF
- FBX
- OBJ
- Other supported files

### 4. Specifications

- Polygon count
- Texture resolution
- UV
- PBR
- Rigging
- Animation
- Compatibility

### 5. Pricing

- Price
- Currency
- License pricing

### 6. License

- Personal
- Commercial
- Extended
- Custom

Actual legal license terms must be provided/approved by the owner.

### 7. Preview

Show exactly how the product will appear publicly before publishing.

---

# 20. Order Management

Owner should see:

- Order ID
- Customer
- Product
- License
- Amount
- Payment status
- Order status
- Download status
- Created date

Digital order lifecycle may include:

```text
Pending Payment
      ↓
Paid
      ↓
Processing
      ↓
Ready
      ↓
Completed
```

---

# 21. Customer Management

Owner can view:

- Customer profile
- Email
- Registration date
- Orders
- Total spending
- Wishlist information where applicable
- Custom project history

Do not expose sensitive information unnecessarily.

---

# 22. Custom Request Management

Owner can:

- View requests
- Review request details
- View reference files
- Add internal notes
- Update status
- Send quote
- Mark approved
- Track project progress
- Mark completed

---

# 23. Media Library

Media Library should manage:

- Product images
- Portfolio images
- 3D models
- Videos
- Textures
- Documents

Media metadata should support:

- File name
- Type
- Size
- Dimensions
- Related product/project
- Upload date

---

# 24. Homepage Management

Owner should eventually control:

- Hero model
- Hero text
- Featured products
- Featured portfolio
- Collection sections
- Announcement
- Studio content
- Custom project CTA

This should prevent hardcoding homepage content.

---

# 25. Licensing

The platform should support structured licenses.

Possible types:

- Personal
- Commercial
- Extended
- Custom

The actual license wording must be supplied and approved by the business owner/legal advisor.

License information should be associated with products/orders.

---

# 26. Product Versioning

Products should eventually support versions.

Example:

```text
Samurai Beast
v1.0
v1.1
v2.0
```

Version information may include:

- Version number
- Release date
- Changelog
- Updated files

Customers who purchased a product may receive access to eligible updates depending on the license/business policy.

---

# 27. Recommendations

Support:

- Related products
- Similar products
- Recently viewed
- Recommended collections
- Bundles

Recommendation logic should eventually come from backend/API services.

---

# 28. SEO

Every public product should support:

- SEO title
- Meta description
- Slug
- Canonical URL
- OG title
- OG description
- OG image

Example URL:

`/product/samurai-beast`

Structured data can be added later.

---

# 29. Accessibility

Requirements:

- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Semantic HTML
- Accessible form labels
- Alt text
- Reduced-motion support
- Screen-reader-friendly navigation

3D interaction must never be the only way to understand product information.

---

# 30. Performance

3D is expensive and performance must be treated as a product feature.

Requirements:

- Lazy-load models
- Lazy-load heavy images
- Use responsive images
- Use WebP/AVIF where appropriate
- Avoid unnecessary JavaScript
- Code-split routes
- Progressive loading
- Mobile fallback for heavy 3D scenes
- Avoid loading every model on the homepage

Desktop may use richer 3D.

Mobile/low-powered devices should receive optimized experiences.

---

# 31. Animation Direction

Animation should be:

- Cinematic
- Smooth
- Intentional
- Scroll-aware
- 3D-aware

Preferred effects:

- Camera movement
- Model rotation
- Mask reveals
- Scale transitions
- Parallax
- Cobalt line animation
- Section transitions
- Hover interactions

Avoid:

- Excessive particles
- Constant floating objects
- Random motion
- Overly flashy transitions
- Long artificial loading animations

Respect:

`prefers-reduced-motion`

---

# 32. Technical Architecture

Frontend architecture:

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
Data Source
```

Data source can be:

```text
Mock
```

or:

```text
API
```

Example:

```text
ProductCard
     ↓
useProducts()
     ↓
products.service.js
     ↓
mock/data/products.js
```

Later:

```text
ProductCard
     ↓
useProducts()
     ↓
products.service.js
     ↓
API
     ↓
Backend
```

The UI must remain unchanged.

---

# 33. Frontend Folder Structure

```text
src/
├── assets/
│
├── components/
│   ├── common/
│   ├── navigation/
│   ├── hero/
│   ├── 3d/
│   ├── products/
│   ├── collection/
│   ├── studio/
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Collection/
│   ├── Product/
│   ├── Studio/
│   ├── About/
│   ├── Contact/
│   ├── Cart/
│   ├── Checkout/
│   └── Account/
│
├── mock/
│   ├── data/
│   └── assets/
│       ├── images/
│       └── models/
│
├── services/
│   ├── api/
│   └── mock/
│
├── hooks/
├── state/
├── routes/
├── utils/
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── animations.css
│
├── App.jsx
└── main.jsx
```

---

# 34. Core Mock Product Schema

```js
{
  id: "prod_001",

  name: "Samurai Beast",

  slug: "samurai-beast",

  description: "Premium production-ready 3D character asset.",

  category: {
    id: "cat_characters",
    name: "Characters",
    slug: "characters"
  },

  pricing: {
    amount: 4999,
    currency: "INR"
  },

  media: {
    thumbnail: "",
    hero: "",
    gallery: []
  },

  model: {
    previewUrl: "",
    formats: ["FBX", "OBJ", "GLB"]
  },

  specifications: {
    polygonCount: 85000,
    textureResolution: "4K",
    rigged: true,
    animated: false,
    uvMapped: true,
    pbr: true
  },

  license: {
    type: "commercial"
  },

  status: "published",

  tags: [
    "3d",
    "character",
    "pbr",
    "game-ready"
  ],

  createdAt: "2026-01-01"
}
```

---

# 35. Initial Technology Requirements

Use:

- React
- Vite
- JSX
- React Router
- Three.js
- React Three Fiber
- Drei
- GSAP
- Lenis
- Lucide React

Do not use:

- TypeScript
- Unnecessary UI frameworks
- Unnecessary state-management libraries
- Backend code during the initial frontend phase

---

# 36. Initial Development Phases

## Phase 0 — Foundation

- Vite setup
- Dependencies
- Folder structure
- Global styles
- Design tokens
- Routing foundation

## Phase 1 — Brand Experience

- Navbar
- Hero
- Typography
- 60/30/10 color system
- Basic animation system

## Phase 2 — 3D Foundation

- Three.js setup
- Model viewer
- Camera
- Lighting
- Loading/fallback states

## Phase 3 — Homepage

- Featured work
- Collection preview
- Studio section
- Process section
- Custom project CTA
- Footer

## Phase 4 — Store

- Collection
- Filters
- Search
- Product detail
- Product viewer

## Phase 5 — Commerce

- Cart
- Checkout
- Wishlist
- Account
- Orders
- Downloads

## Phase 6 — Owner Management

- Dashboard
- Product management
- Orders
- Customers
- Custom requests
- Portfolio
- Media
- Homepage management

## Phase 7 — Backend Integration

Replace mock services with API services.

The UI should not require major changes.

---

# 37. Initial Development Priority

The first milestone is NOT the complete website.

The first milestone is:

> Build a premium, responsive AAKAR homepage foundation with the 60/30/10 design system and a reusable 3D experience architecture.

Priority:

1. Project setup
2. Design tokens
3. Global styles
4. Routing
5. Navbar
6. Hero
7. 3D foundation
8. Homepage visual foundation
9. Mock data architecture
10. Service abstraction

---

# 38. Definition of Done — Initial Frontend

The initial frontend foundation is complete when:

- React/Vite project runs
- JavaScript/JSX only
- Folder architecture is established
- Routing works
- Design tokens are implemented
- 60/30/10 color system is active
- Navbar exists
- Homepage exists
- Hero exists
- 3D foundation exists
- Mock data exists separately
- Services abstract mock data
- Hooks consume services
- UI does not directly import mock data
- Responsive layout works
- Reduced-motion support exists
- `npm run build` succeeds
- No console errors
- No unnecessary hardcoded product data exists

---

# 39. Long-Term Vision

AAKAR should ultimately feel like:

**A digital atelier where 3D art is exhibited, examined, experienced, and purchased.**

It should not feel like a generic ecommerce template.

The experience should combine:

**Portfolio + 3D Exhibition + Digital Store + Artist Studio + Custom Work Platform**

while remaining technically structured for future backend integration.
