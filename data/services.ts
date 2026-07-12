export type Service = {
  index: string;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Residential",
    description:
      "Custom homes designed and built around how you actually live — from first sketch to final walkthrough.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop",
  },
  {
    index: "02",
    title: "Commercial",
    description:
      "Retail, office, and hospitality spaces engineered for performance without sacrificing design.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    index: "03",
    title: "Renovations",
    description:
      "Thoughtful remodels that respect a structure's bones while transforming how it feels to live in.",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1400&auto=format&fit=crop",
  },
  {
    index: "04",
    title: "Developments",
    description:
      "Multi-unit and mixed-use projects delivered on schedule and on budget, without cutting corners.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop",
  },
];
