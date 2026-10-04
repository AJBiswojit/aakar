/**
 * AAKAR — brand + site level mock data.
 * Nothing here is composed inside JSX. Sections read this through
 * services -> hooks, so a real API can replace `siteService` later.
 */

export const brand = {
  name: "AAKAR",
  meaning: "आकार · FORM",
  statement: "FORM, CRAFTED DIGITALLY.",
  origin: "Bengaluru, India",
  established: "2026",
};

export const hero = {
  eyebrow: "3D ARTIST / DIGITAL ATELIER",
  location: "BASED IN INDIA",
  year: "2026",
  /** Primary hero statement — one only. */
  lines: ["Giving", "Imagination", "Form."],
  supporting:
    "An independent 3D studio creating characters, creatures, objects and digital worlds with precision and intent.",
  ctas: [
    { id: "collection", label: "Explore Collection", href: "#store", variant: "primary" },
    { id: "work", label: "View the Work", href: "#work", variant: "ghost" },
  ],
  disciplines: ["Characters", "Creatures", "Objects", "Digital Worlds"],
  scroll: "Scroll to enter",
  loader: "Loading Form",
  room: { index: "01", name: "The Arrival" },
};

export const navigation = {
  links: [
    { id: "work", label: "WORK", href: "#work" },
    { id: "store", label: "STORE", href: "#store" },
    { id: "studio", label: "STUDIO", href: "#studio" },
    { id: "about", label: "ABOUT", href: "#about" },
  ],
  utility: [
    { id: "search", label: "Search", kind: "search" },
    { id: "wishlist", label: "Wishlist", kind: "wishlist" },
    { id: "cart", label: "Cart", kind: "cart" },
  ],
};

export const footer = {
  navigate: [
    { label: "WORK", href: "#work" },
    { label: "STORE", href: "#store" },
    { label: "STUDIO", href: "#studio" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "mailto:studio@aakar.form" },
  ],
  social: [
    { label: "ARTSTATION", href: "https://www.artstation.com", handle: "/aakar" },
    { label: "INSTAGRAM", href: "https://www.instagram.com", handle: "@aakar.form" },
    { label: "BEHANCE", href: "https://www.behance.net", handle: "/aakar" },
  ],
  legal: [
    { label: "Privacy", href: "#legal" },
    { label: "Terms", href: "#legal" },
    { label: "Digital License", href: "#legal" },
    { label: "Refund Policy", href: "#legal" },
  ],
  contact: {
    studio: "Studio AAKAR",
    address: "Lavelle Road, Bengaluru 560001, India",
    email: "studio@aakar.form",
    hours: "Mon – Fri · 10:00 – 19:00 IST",
  },
  closing: "Form, crafted digitally.",
};

export const storeState = {
  /** Starts empty on purpose — cart / wishlist fill from real user actions. */
  cart: [],
  wishlist: [],
  currency: "INR",
};
