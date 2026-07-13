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
    image: "/images/Deliso/deliso4.jpg",
  },
  {
    index: "02",
    title: "Commercial",
    description:
      "Retail, office, and hospitality spaces engineered for performance without sacrificing design.",
    image: "/images/sugbo/sugbo1.jpg",
  },
  {
    index: "03",
    title: "Renovations",
    description:
      "Thoughtful remodels that respect a structure's bones while transforming how it feels to live in.",
    image: "/images/cdf/cdf6.jpg",
  },
  {
    index: "04",
    title: "Developments",
    description:
      "Multi-unit and mixed-use projects delivered on schedule and on budget, without cutting corners.",
    image: "/images/sugbo/sugbo15.jpg",
  },
];
