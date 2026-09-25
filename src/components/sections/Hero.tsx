import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  const scrollToConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F4F0E8] py-12 sm:py-16 lg:py-20 border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Kicker */}
            {/* <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#b45309]" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
                Residential & Commercial High-End Masonry Specialists
              </span>
            </div> */}

            {/* Main Headline with italicized serif accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.12]">
              Expert Masonry:{' '}
              <span className="italic font-serif font-normal text-[#b45309]">
                A–Z Services.
              </span>{' '}
              Free Estimates.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              At Da Graca Masonry, we help homeowners, architects, and general contractors build and restore breathtaking natural stone facades, Pennsylvania bluestone patios, and structural brickwork with over three decades of field expertise.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-[#b45309] hover:bg-[#9a3412] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>Request a Consultation</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              <Link to="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-stone-300 hover:border-stone-400 bg-white text-stone-800 font-bold text-sm sm:text-base px-6 py-4 rounded-xl shadow-2xs hover:bg-stone-50 flex items-center justify-center gap-2"
                >
                  {/* <Sparkles className="h-4 w-4 text-[#b45309]" /> */}
                  <span>Explore Recent Projects</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Arched Photo + Floating Testimonial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Visual Photo Container */}
              <div className="relative rounded-md overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
                <img
                  src="/images/masonry/hero-patio.jpg"
                  alt="Custom Interlocking Pavers Patio & Outdoor Stone Kitchen by Da Graca Masonry"
                  className="w-full h-[360px] sm:h-[460px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
