import heroFormImage from "../assets/images/hero-form.jpg";
import creatureFormImage from "../assets/images/creature-form.jpg";
import weaponFormImage from "../assets/images/weapon-form.jpg";
import environmentFormImage from "../assets/images/environment-form.jpg";

/**
 * AAKAR — selected forms (exhibition pieces).
 * Works reference purchasable products by slug so the exhibition and the
 * store never drift apart. `layout` drives the asymmetric editorial grid.
 */

export const works = [
  {
    id: "work_001",
    index: "01",
    title: "Samurai Beast",
    kind: "Character",
    year: "2026",
    productId: "prod_001",
    productSlug: "samurai-beast",
    line: "A warden standing between ceremony and combat.",
    media: heroFormImage,
    interactive: true,
    layout: { span: "lg", ratio: "4 / 5", column: "left", offset: 0 },
  },
  {
    id: "work_002",
    index: "02",
    title: "Antlered Warden",
    kind: "Creature",
    year: "2026",
    productId: "prod_002",
    productSlug: "antlered-warden",
    line: "Anatomy first. Ornament second.",
    media: creatureFormImage,
    interactive: true,
    layout: { span: "sm", ratio: "1 / 1", column: "right", offset: 14 },
  },
  {
    id: "work_003",
    index: "03",
    title: "Obsidian Katana",
    kind: "Object",
    year: "2025",
    productId: "prod_003",
    productSlug: "obsidian-katana",
    line: "One trim sheet. Hand-painted wear.",
    media: weaponFormImage,
    interactive: false,
    layout: { span: "sm", ratio: "3 / 4", column: "left", offset: 8 },
  },
  {
    id: "work_004",
    index: "04",
    title: "Monolith Threshold",
    kind: "Digital World",
    year: "2025",
    productId: "prod_005",
    productSlug: "monolith-threshold",
    line: "A single shaft of light recomposes the frame.",
    media: environmentFormImage,
    interactive: true,
    layout: { span: "lg", ratio: "16 / 9", column: "right", offset: 0 },
  },
];

export default works;
