export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Renovation" | "Development";
  location: string;
  year: string;
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hillcrest-residence",
    title: "The Hillcrest Residence",
    category: "Residential",
    location: "Hillcrest, CA",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "meridian-tower",
    title: "Meridian Commercial Tower",
    category: "Commercial",
    location: "Downtown District",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1800&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "birchwood-renovation",
    title: "Birchwood Renovation",
    category: "Renovation",
    location: "Birchwood Park",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "northside-cultural-center",
    title: "Northside Cultural Center",
    category: "Development",
    location: "Northside",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1800&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "ridgeline-modern",
    title: "Ridgeline Modern",
    category: "Residential",
    location: "Ridgeline Heights",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "cascade-house",
    title: "The Cascade House",
    category: "Residential",
    location: "Cascade Bay",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1800&auto=format&fit=crop",
  },
  {
    slug: "lakeside-cottage",
    title: "Lakeside Cottage",
    category: "Renovation",
    location: "Lakeside",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1800&auto=format&fit=crop",
  },
  {
    slug: "harborview-apartments",
    title: "Harborview Apartments",
    category: "Development",
    location: "Harborview",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1800&auto=format&fit=crop",
  },
  {
    slug: "elm-street-remodel",
    title: "Elm Street Remodel",
    category: "Renovation",
    location: "Elm Street",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1800&auto=format&fit=crop",
  },
  {
    slug: "poolside-pavilion",
    title: "Poolside Pavilion",
    category: "Residential",
    location: "Sunset Ridge",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1800&auto=format&fit=crop",
  },
  {
    slug: "the-oak-house",
    title: "The Oak House",
    category: "Residential",
    location: "Oak Grove",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1800&auto=format&fit=crop",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
