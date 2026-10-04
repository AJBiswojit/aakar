/**
 * AAKAR — process. Seven states the same idea passes through.
 * `image` is optional per step; the viewer crossfades between states.
 */

export const processSteps = [
  {
    id: "step_01",
    index: "01",
    name: "Concept",
    line: "Silhouette, intent and reference gathered before a single vertex exists.",
    stage: "Idea",
    image: "",
  },
  {
    id: "step_02",
    index: "02",
    name: "Blockout",
    line: "Masses only. The form has to read from across the room before it reads up close.",
    stage: "Structure",
    image: "/assets/process-blockout.jpg",
  },
  {
    id: "step_03",
    index: "03",
    name: "Sculpt",
    line: "High-frequency detail — anatomy, cloth breaks, carved ornament — at millions of polygons.",
    stage: "Form",
    image: "/assets/process-sculpt.jpg",
  },
  {
    id: "step_04",
    index: "04",
    name: "Retopology",
    line: "A clean quad shell rebuilt over the sculpt so the piece can actually move.",
    stage: "Logic",
    image: "/assets/process-blockout.jpg",
  },
  {
    id: "step_05",
    index: "05",
    name: "UV",
    line: "Layout with intent: symmetry where it saves space, resolution where the eye lands.",
    stage: "Precision",
    image: "",
  },
  {
    id: "step_06",
    index: "06",
    name: "Texture",
    line: "PBR passes painted from physical reference — wear, roughness, the history of an object.",
    stage: "Surface",
    image: "/assets/process-texture.jpg",
  },
  {
    id: "step_07",
    index: "07",
    name: "Final Form",
    line: "Lit, rendered, published. The idea now holds weight on its own.",
    stage: "Delivery",
    image: "/assets/showcase-object.jpg",
  },
];

export const processMeta = {
  title: "From Zero → Form",
  eyebrow: "Method / Seven states",
  note: "Every asset leaves the studio with its full history — sculpt, retopo, UV, texture set.",
};

export default processSteps;
