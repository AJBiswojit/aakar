/**
 * AAKAR — collections. A collection is a curated set of forms released
 * together, not a category. Used for the store header + ticker.
 */

export const collections = [
  {
    id: "col_001",
    name: "Form Studies",
    volume: "Vol. 01",
    year: "2026",
    tagline: "Six figures released for examination.",
    description: "Digital forms built for artists, creators and worlds yet to be made.",
    productIds: ["prod_001", "prod_002", "prod_003", "prod_004", "prod_005", "prod_006"],
    cover: "/assets/work-character.jpg",
  },
  {
    id: "col_002",
    name: "Objects of Use",
    volume: "Vol. 00",
    year: "2025",
    tagline: "Props, blades and vessels with wear history.",
    description: "Small industrial design studies for cinematic staging.",
    productIds: ["prod_003", "prod_004", "prod_006"],
    cover: "/assets/work-weapon.jpg",
  },
];

export const storeIntro = {
  eyebrow: "Available in the atelier",
  headline: ["Ready to", "download, ready", "to examine."],
  supporting: "Each package ships with its specification sheet: topology, texture sets, formats and license.",
  formats: ["GLB", "FBX", "OBJ", "BLEND", "ZTL"],
};

export const brandClosing = {
  eyebrow: "AAKAR",
  lines: ["Form.", "Craft.", "Digital."],
  line: "Where imagination takes form.",
};

export default collections;
