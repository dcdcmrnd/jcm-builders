import { Hero } from "@/components/sections/hero";
import { CompanyOverview } from "@/components/sections/company-overview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Services } from "@/components/sections/services";
import { ConstructionProcess } from "@/components/sections/construction-process";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Statistics } from "@/components/sections/statistics";
import { CallToAction } from "@/components/sections/call-to-action";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CompanyOverview />
      <FeaturedProjects />
      <Services />
      <ConstructionProcess />
      <WhyChooseUs />
      <ProjectGallery />
      <Testimonials />
      <Statistics />
      <CallToAction />
      <Footer />
    </main>
  );
}
