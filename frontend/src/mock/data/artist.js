import studioProcessImage from "../assets/images/studio-process.jpg";

/**
 * AAKAR — studio + artist. Deliberately free of invented credentials,
 * awards or client names. Only the practice itself is described.
 */

export const artist = {
  eyebrow: "The Studio",
  headline: ["The artist", "behind AAKAR."],
  portrait: studioProcessImage,
  statement:
    "AAKAR is an independent 3D practice focused on building detailed digital forms for games, film, design and imagination.",
  body: [
    "It is a studio of one by choice: the same hands that block out an idea also sculpt it, texture it and light it — so nothing gets lost between departments.",
    "Work is built to be opened. Clean topology, real material logic, predictable naming. A form should survive being examined.",
  ],
  philosophy: [
    { id: "ph_01", line: "Silhouette before detail." },
    { id: "ph_02", line: "Materials are decided, never default." },
    { id: "ph_03", line: "If it cannot be examined closely, it is not finished." },
  ],
  practice: [
    {
      id: "pr_01",
      title: "Character & Creature Art",
      line: "Sculpt, retopology, groom-aware workflows, presentation renders.",
    },
    {
      id: "pr_02",
      title: "Hard-Surface & Props",
      line: "Real-world scale, trim sheets, CAD-adjacent precision for objects.",
    },
    {
      id: "pr_03",
      title: "Look Development",
      line: "PBR texturing, lighting studies, material libraries per asset.",
    },
    {
      id: "pr_04",
      title: "Realtime Delivery",
      line: "Game-ready LODs, rigs, FBX / GLB / USD export packages.",
    },
  ],
  toolkit: ["Blender", "ZBrush", "Substance 3D", "Marmoset", "Houdini", "Unreal Engine 5", "Marvelous Designer"],
  workflow: [
    { id: "wf_01", label: "Reference & intent" },
    { id: "wf_02", label: "Silhouette blockout" },
    { id: "wf_03", label: "High-poly sculpt" },
    { id: "wf_04", label: "Game-resident rebuild" },
    { id: "wf_05", label: "Material & light" },
    { id: "wf_06", label: "Delivery & documentation" },
  ],
  closingCta: { label: "About the Studio", href: "#process" },
  commissionCta: { label: "Start a Project", href: "#commission" },
};

export default artist;
