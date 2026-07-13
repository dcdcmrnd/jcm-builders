export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Renovation" | "Development";
  location: string;
  year: string;
  images: string[];
  description?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hn-salon-spa",
    title: "H&N Salon & Spa",
    category: "Commercial",
    location: "Azuela",
    year: "2025",
    description:
      "A full interior fit-out for a hair and beauty salon — from the glass-fronted reception and styling floor to a private treatment lounge and finished restrooms, built out with custom millwork, mirrored ceilings, and tiled wet areas.",
    images: [
      "/images/h&n/h&n1.jpg",
      "/images/h&n/h&n2.jpg",
      "/images/h&n/h&n3.jpg",
      "/images/h&n/h&n4.jpg",
      "/images/h&n/h&n5.jpg",
      "/images/h&n/h&n6.jpg",
      "/images/h&n/h&n7.jpg",
      "/images/h&n/h&n8.jpg",
      "/images/h&n/h&n9.jpg",
      "/images/h&n/h&n10.jpg",
      "/images/h&n/h&n11.jpg",
      "/images/h&n/h&n12.jpg",
      "/images/h&n/h&n13.jpg",
      "/images/h&n/h&n14.jpg",
      "/images/h&n/h&n15.jpg",
      "/images/h&n/h&n16.jpg",
      "/images/h&n/h&n17.jpg",
      "/images/h&n/h&n18.jpg",
      "/images/h&n/h&n19.jpg",
      "/images/h&n/h&n20.jpg",
      "/images/h&n/h&n21.jpg",
    ],
    featured: true,
  },
  {
    slug: "casa-de-fuente",
    title: "Casa de Fuente",
    category: "Residential",
    location: "Mountain Resthouse",
    year: "2025",
    images: [
      "/images/cdf/cdf1.jpg",
      "/images/cdf/cdf2.jpg",
      "/images/cdf/cdf3.jpg",
      "/images/cdf/cdf4.jpg",
      "/images/cdf/cdf5.jpg",
      "/images/cdf/cdf6.jpg",
    ],
    featured: true,
  },
  {
    slug: "deliso-residence",
    title: "Deliso Residence",
    category: "Residential",
    location: "Private Residence",
    year: "2025",
    images: [
      "/images/Deliso/deliso1.jpg",
      "/images/Deliso/deliso2.jpg",
      "/images/Deliso/deliso3.jpg",
      "/images/Deliso/deliso4.jpg",
    ],
    featured: true,
  },
  {
    slug: "sugbo-sentro-cebu",
    title: "Sugbo Sentro Cebu",
    category: "Development",
    location: "Cebu City, Philippines",
    year: "2026",
    description:
      "A design proposal for the revitalized Food Market & Entertainment Precinct — reimagining vendor layouts for stronger foot traffic, introducing a dedicated night-economy gathering space, and expanding parking infrastructure to meet peak-hour demand.",
    images: [
      "/images/sugbo/sugbo1.jpg",
      "/images/sugbo/sugbo2.jpg",
      "/images/sugbo/sugbo3.jpg",
      "/images/sugbo/sugbo4.jpg",
      "/images/sugbo/sugbo5.jpg",
      "/images/sugbo/sugbo6.jpg",
      "/images/sugbo/sugbo7.jpg",
      "/images/sugbo/sugbo8.jpg",
      "/images/sugbo/sugbo9.jpg",
      "/images/sugbo/sugbo10.jpg",
      "/images/sugbo/sugbo11.jpg",
      "/images/sugbo/sugbo12.jpg",
      "/images/sugbo/sugbo13.jpg",
      "/images/sugbo/sugbo14.jpg",
      "/images/sugbo/sugbo15.jpg",
    ],
    featured: true,
  },
  {
    slug: "fcga-complex",
    title: "FCGA Complex",
    category: "Development",
    location: "Commercial District",
    year: "2026",
    description:
      "A proposed 3-storey mixed-use commercial complex designed to complement its site while driving smart, sustainable growth — adaptable retail and hospitality spaces built to evolve with the community around them.",
    images: [
      "/images/fcga/fcga1.jpg",
      "/images/fcga/fcga2.jpg",
      "/images/fcga/fcga3.jpg",
      "/images/fcga/fcga4.jpg",
      "/images/fcga/fcga5.jpg",
      "/images/fcga/fcga6.jpg",
    ],
    featured: true,
  },
  {
    slug: "alboroto-residences",
    title: "Alboroto Residences",
    category: "Residential",
    location: "Coconut Grove Estate",
    year: "2025",
    description:
      "Where heritage meets modern design — a low-slung tropical bungalow that settles into its coconut grove, with expansive glass walls drawing the surrounding farm scenery straight into the living space.",
    images: [
      "/images/alboroto/alboroto1.jpg",
      "/images/alboroto/alboroto2.jpg",
      "/images/alboroto/alboroto3.jpg",
      "/images/alboroto/alboroto4.jpg",
    ],
    featured: true,
  },
  {
    slug: "camella-home-renovation",
    title: "Camella Home Renovation",
    category: "Renovation",
    location: "Camella Community",
    year: "2025",
    description:
      "A full interior fit-out for a family home within a Camella community — reimagining the bedrooms, bath, and utility spaces with warm modern finishes while keeping the home's classic exterior charm intact.",
    images: [
      "/images/camella/camella1.jpg",
      "/images/camella/camella2.jpg",
      "/images/camella/camella3.jpg",
      "/images/camella/camella4.jpg",
      "/images/camella/camella5.jpg",
      "/images/camella/camella6.jpg",
      "/images/camella/camella7.jpg",
      "/images/camella/camella8.jpg",
    ],
    featured: true,
  },
  {
    slug: "costa-amara",
    title: "Costa Amara",
    category: "Residential",
    location: "Coastal Residence",
    year: "2025",
    description:
      "A multi-level coastal retreat wrapped in woven timber screens and framed by palms — built for indoor-outdoor living around a private pool and rooftop terrace.",
    images: [
      "/images/amara/amara1.jpg",
      "/images/amara/amara2.jpg",
      "/images/amara/amara3.jpg",
      "/images/amara/amara4.jpg",
      "/images/amara/amara5.jpg",
      "/images/amara/amara6.jpg",
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
