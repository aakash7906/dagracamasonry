import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
