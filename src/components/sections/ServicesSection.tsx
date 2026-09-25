import { Container } from '@/components/ui/Container';
import {
  Compass,
  ShieldCheck,
  Building,
  Flame,
  Layers,
  Droplets,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    icon: <Compass className="h-6 w-6 text-[#b45309]" />,
    title: 'Patios & Walkways',
    description:
      'Pennsylvania bluestone, thermal finishes, interlocking pavers, sitting walls, and integrated hidden drainage foundations.',
    points: ['Custom sitting walls & fire tables', 'Zero-puddle grade leveling'],
    link: '/services',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-[#b45309]" />,
    title: 'Retaining Walls',
    description:
      'Heavy-duty engineered gravity stone walls, tiered hillside retention, and structural erosion barrier solutions.',
    points: ['Geogrid reinforced foundations', 'Integrated weeping drainage lines'],
    link: '/services',
  },
  {
    icon: <Building className="h-6 w-6 text-[#b45309]" />,
    title: 'Steps & Front Stoops',
    description:
      'Grand natural stone entryways, curved granite steps, custom porticos, and code-compliant stone landings.',
    points: ['Deep frost-line concrete footings', 'Non-slip thermal bluestone treads'],
    link: '/services',
  },
  {
    icon: <Flame className="h-6 w-6 text-[#b45309]" />,
    title: 'Exterior Veneers & Fireplaces',
    description:
      'Full-bed and thin natural stone veneers, custom outdoor kitchens, Rumford fireboxes, and hand-carved mantels.',
    points: ['High-temp refractory fireboxes', 'Hand-split fieldstone & granite'],
    link: '/services',
  },
  {
    icon: <Layers className="h-6 w-6 text-[#b45309]" />,
    title: 'Chimneys & Brick Repair',
    description:
      'Complete chimney rebuilds from roofline up, historic lime mortar tuckpointing, and custom poured concrete crowns.',
    points: ['Code 4 milled lead counter-flashing', 'Authentic lime-mortar matching'],
    link: '/services',
  },
  {
    icon: <Droplets className="h-6 w-6 text-[#b45309]" />,
    title: 'Basement Waterproofing',
    description:
      'Foundation stone repointing, structural crack injections, exterior French drains, and hydrostatic moisture mitigation.',
    points: ['Structural foundation stabilization', 'Breathable damp-proof barriers'],
    link: '/services',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
              Specialized Disciplines
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Complete Masonry Solutions
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Every project is built with durable, code-exceeding footings, quarried natural stone, and weather-resistant breathable mortars to guarantee life-long structural endurance.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="p-6 sm:p-7 rounded-md bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Icon box in light amber */}
                <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>

                <h3 className="font-heading font-bold text-xl text-stone-900 group-hover:text-[#b45309] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-700">
                {item.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#b45309] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}

                <div className="pt-3">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b45309] hover:text-[#9a3412] transition-colors"
                  >
                    <span>Learn More Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
