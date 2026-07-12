export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery & Design",
    description:
      "We start with your vision, site, and budget — translating them into architectural drawings and a clear scope.",
  },
  {
    index: "02",
    title: "Planning & Permits",
    description:
      "Detailed engineering, material selection, and permitting handled end-to-end before a single shovel hits the ground.",
  },
  {
    index: "03",
    title: "Construction",
    description:
      "Our crews build with precision and daily accountability — transparent timelines, no surprises.",
  },
  {
    index: "04",
    title: "Quality Review",
    description:
      "Every detail is inspected against our own standard, not just code minimums.",
  },
  {
    index: "05",
    title: "Handover",
    description:
      "We walk the finished space with you, together, before handing over the keys.",
  },
];
