import { Hero } from '@/components/sections/Hero';
import { ArchitecturalPillars } from '@/components/sections/ArchitecturalPillars';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ConsultationSection } from '@/components/sections/ConsultationSection';
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection';

export function Home() {
  return (
    <>
      <Hero />
      <ArchitecturalPillars />
      <WhyChooseUs />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ConsultationSection />
      <ServiceAreasSection />
    </>
  );
}
