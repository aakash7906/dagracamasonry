import { Container } from '@/components/ui/Container';
import { Award, FileText, HardHat, ShieldCheck, Check } from 'lucide-react';

const differentiators = [
  {
    icon: <Award className="h-6 w-6 text-amber-500" />,
    title: 'Uncompromising Expertise',
    description:
      'Our team brings multi-generational European stone masonry heritage. Every cut, joint, and bedline is placed by career craftsmen who take pride in lasting permanence.',
    highlight: 'Fully Licensed & Insured',
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    title: 'Transparency & Communication',
    description:
      'Detailed, line-item itemized estimates with zero hidden surprises. You receive daily progress briefings and a dedicated job foreman on-site from day one.',
    highlight: '100% Itemized Proposals',
  },
  {
    icon: <HardHat className="h-6 w-6 text-amber-500" />,
    title: 'Guaranteed In-House Crews',
    description:
      'We never broker out your project to unknown third-party subcontractors. Our vetted master masons execute every chisel strike from foundation to final acid wash.',
    highlight: 'Zero Subcontracting',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    title: 'Comprehensive Services',
    description:
      'From initial geotechnical site analysis and blueprint reviews to permitting and final joint sealing, we handle your entire masonry scope under one roof.',
    highlight: '25-Year Warranty',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F4F0E8] border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
              Uncompromising In-House Workmanship
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Here's What Sets Us Apart
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            No sub-contracted crews. No shortcuts. Just genuine quarried stone, high-strength mortar, and direct owner accountability on every job.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((card) => (
            <div
              key={card.title}
              className="p-6 sm:p-7 rounded-md bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Dark Rounded Icon Box as in sample design */}
                <div className="h-12 w-12 rounded-xl bg-stone-950 text-white flex items-center justify-center shadow-md">
                  {card.icon}
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Badge Highlight */}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-[#b45309]">
                <Check className="h-3.5 w-3.5 text-[#b45309]" />
                <span>{card.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
