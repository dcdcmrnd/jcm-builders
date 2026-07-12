export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "JCM didn't just build our home, they understood exactly what we wanted before we could fully articulate it ourselves.",
    name: "Sarah & Mark Whitfield",
    role: "Homeowners",
    project: "The Hillcrest Residence",
  },
  {
    quote:
      "On time, on budget, zero surprises. In twenty years of commercial development I've never worked with a builder this transparent.",
    name: "David Chen",
    role: "Principal, Chen Development Group",
    project: "Meridian Commercial Tower",
  },
  {
    quote:
      "They treated our 1920s bungalow like it mattered. The renovation feels like it was always meant to be this way.",
    name: "Priya Anand",
    role: "Homeowner",
    project: "Birchwood Renovation",
  },
  {
    quote:
      "Precision is the right word. Every subcontractor on site held to the same standard JCM holds themselves to.",
    name: "Marcus Ruiz",
    role: "General Manager, Northside Arts Council",
    project: "Northside Cultural Center",
  },
];
