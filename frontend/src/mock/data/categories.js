import heroFormImage from "../assets/images/hero-form.jpg";
import creatureFormImage from "../assets/images/creature-form.jpg";
import objectFormImage from "../assets/images/object-form.jpg";
import weaponFormImage from "../assets/images/weapon-form.jpg";
import environmentFormImage from "../assets/images/environment-form.jpg";
import studioProcessImage from "../assets/images/studio-process.jpg";

/**
 * AAKAR — collection categories. The list is typographic first; `preview`
 * is the form that appears when a row is hovered.
 */

export const categories = [
  {
    id: "cat_characters",
    name: "Characters",
    slug: "characters",
    note: "Heroes, wardens, stylised figures",
    preview: heroFormImage,
    previewTone: "light",
  },
  {
    id: "cat_creatures",
    name: "Creatures",
    slug: "creatures",
    note: "Anatomy, grooms, fictional species",
    preview: creatureFormImage,
    previewTone: "dark",
  },
  {
    id: "cat_weapons",
    name: "Weapons",
    slug: "weapons",
    note: "Blades, fittings, real-world scale",
    preview: weaponFormImage,
    previewTone: "dark",
  },
  {
    id: "cat_clothing",
    name: "Clothing",
    slug: "clothing",
    note: "Simulated high, rebuilt low",
    preview: studioProcessImage,
    previewTone: "dark",
  },
  {
    id: "cat_props",
    name: "Props",
    slug: "props",
    note: "Set dressing and hero props",
    preview: objectFormImage,
    previewTone: "dark",
  },
  {
    id: "cat_sculptures",
    name: "Sculptures",
    slug: "sculptures",
    note: "Collectible and presentation pieces",
    preview: objectFormImage,
    previewTone: "dark",
  },
  {
    id: "cat_environments",
    name: "Environments",
    slug: "environments",
    note: "Modular kits and world blocks",
    preview: environmentFormImage,
    previewTone: "dark",
  },
];

export default categories;
