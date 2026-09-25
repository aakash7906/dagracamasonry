import { Container } from '@/components/ui/Container';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    feature: 'Feature 01',
    title: 'Walkways & Steps',
    description:
      'Custom-cut Pennsylvania bluestone and granite steps engineered for safety, aesthetics, and generational durability with reinforced concrete sub-bases.',
    image: '/images/masonry/entrance-steps.png',
    link: '/services',
  },
  {
    feature: 'Feature 02',
    title: 'Custom Patios',
    description:
      'Hand-laid Pennsylvania bluestone, granite pavers, and sitting walls designed for luxury outdoor entertaining and seamless grade transitions.',
    image: '/images/masonry/firepit-round-patio.jpg',
    link: '/services',
  },
  {
    feature: 'Feature 03',
    title: 'Stone Veneer & Walls',
    description:
      'Engineered retaining walls and hand-chiseled natural fieldstone veneers built to withstand hydrostatic ground pressure and freeze-thaw cycles.',
    image: '/images/masonry/curved-retaining-wall.jpg',
    link: '/services',
  },
];

export function ArchitecturalPillars() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
              Crafted for Generations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Over 25 Years of Architectural Masonry
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether it's restoring 100-year-old historic brickwork or designing a customized Pennsylvania bluestone patio for your estate, our hands-on masons deliver unmatched European precision and structural permanence.
          </p>
        </div>

        {/* 3 Columns Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item) => (
            <Link
              key={item.feature}
              to={item.link}
              className="group rounded-md bg-white border border-stone-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-80 sm:h-[360px] lg:h-[400px] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between text-[#b45309] font-bold text-xs">
                    <span className="tracking-wider uppercase">{item.feature}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-[#b45309] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
