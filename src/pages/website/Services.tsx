import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/mockData';
import {
  Gem,
  Layers,
  Compass,
  Flame,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Phone,
  HardHat,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
  Gem: <Gem className="h-6 w-6 text-amber-700" />,
  Layers: <Layers className="h-6 w-6 text-amber-700" />,
  Compass: <Compass className="h-6 w-6 text-amber-700" />,
  Flame: <Flame className="h-6 w-6 text-amber-700" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-700" />,
  Building2: <Building2 className="h-6 w-6 text-amber-700" />,
};

const processSteps = [
  {
    step: '01',
    title: 'Site Survey & Elevation Analysis',
    desc: 'Our master mason visits your property to measure grades, evaluate soil mechanics, analyze existing foundation footings, and discuss architectural vision.',
  },
  {
    step: '02',
    title: 'Quarry Selection & Mortar Matching',
    desc: 'We present physical natural stone slabs, quarry cut sheets, and formulate custom test mortar mockups to verify color, texture, and density harmony.',
  },
  {
    step: '03',
    title: 'Engineered Foundation & Drainage',
    desc: 'Sub-base excavation below frost depth, compacted crushed aggregate, reinforced concrete rebar footings, and perforated French drainage lines.',
  },
  {
    step: '04',
    title: 'Artisan Chiseling & Masonry Laying',
    desc: 'Every stone is individually hand-dressed, trimmed with carbide chisels, and laid according to traditional European bond patterns.',
  },
  {
    step: '05',
    title: 'Joint Tooling & Protective Curing',
    desc: 'Clean concave or raked joint finishes, acid-free efflorescence wash, protective damp curing, and complete daily jobsite cleanup.',
  },
];

export function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.id === activeCategory);

  return (
    <div className="py-12 sm:py-20 bg-stone-50 text-stone-900 min-h-screen">
      {/* Header Banner */}
      <Container className="mb-14">
        <div className="max-w-3xl space-y-4">
          {/* <Badge
            variant="stone"
            className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-700 mr-1.5 inline" />
            Specialized Capabilities & Disciplines
          </Badge> */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Architectural Masonry & Structural Stone Services
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl leading-relaxed">
            Every project we undertake blends centuries of Old-World Portuguese masonry heritage with modern geotechnical engineering. Explore our comprehensive services across New Jersey and the tri-state area.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>25-Year Structural Workmanship Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardHat className="h-4 w-4 text-amber-600" />
              <span>Direct Owner Jobsite Supervision</span>
            </div>
          </div>
        </div>

        {/* Quick Discipline Filter Pills */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-md bg-white border border-stone-200 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2">
            Filter by Discipline:
          </span>
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
            className={
              activeCategory === 'all'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            All Disciplines ({servicesData.length})
          </Button>
          {servicesData.map((s) => (
            <Button
              key={s.id}
              variant={activeCategory === s.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(s.id)}
              className={
                activeCategory === s.id
                  ? 'bg-amber-600 text-white font-semibold shadow-xs text-xs'
                  : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
              }
            >
              {s.title}
            </Button>
          ))}
        </div>
      </Container>

      {/* Services Detailed List */}
      <Container className="mb-20">
        <div className="space-y-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-md bg-white border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Section */}
                <div
                  className={`lg:col-span-5 h-[280px] sm:h-[380px] lg:h-full relative overflow-hidden bg-stone-100 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-center shadow-md">
                    {iconMap[service.iconName] || <Gem className="h-6 w-6 text-amber-700" />}
                  </div>
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-600 text-white font-semibold text-xs shadow-sm">
                        Signature Craft
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <Badge
                      variant="stone"
                      className="text-xs bg-amber-50 text-amber-900 border-amber-200 font-semibold"
                    >
                      Discipline #{index + 1}
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
                      {service.title}
                    </h2>
                    <p className="text-stone-600 text-base leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed border-l-2 border-amber-600 pl-4 bg-amber-50/50 py-2 rounded-r-lg">
                    {service.fullDescription}
                  </p>

                  {/* Feature Highlights Grid */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Engineering Standards & Methods:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800"
                        >
                          <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-4">
                    <Link to="/contact">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-sm">
                        <span>Request Estimate for this Discipline</span>
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </Link>
                    <Link to="/gallery">
                      <Button
                        variant="outline"
                        className="border-stone-300 hover:bg-stone-50 text-xs sm:text-sm"
                      >
                        <span>View Completed Projects</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* 5-Step Craft Process Section */}
      <Container className="mb-20">
        <div className="rounded-md bg-white border border-stone-200 p-6 sm:p-10 lg:p-16 shadow-lg space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge
              variant="stone"
              className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300"
            >
              The Da Graca Standard
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-950">
              Our 5-Step Master Masonry Workflow
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              From the initial geotechnical survey to the final mortar cure, we maintain rigorous engineering oversight at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="p-5 rounded-md bg-stone-50 border border-stone-200 hover:border-amber-500/80 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="font-heading font-black text-2xl text-amber-600 block mb-2">
                    {p.step}
                  </span>
                  <h3 className="font-heading font-bold text-stone-900 text-base mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-200/60 flex items-center gap-1 text-[11px] text-amber-800 font-semibold">
                  <Check className="h-3 w-3 text-amber-600" />
                  <span>Quality Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Consultation Banner CTA */}
      <Container>
        <div className="rounded-md bg-gradient-to-r from-amber-600 to-amber-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
              Need a Custom Masonry Specification or Blueprint Review?
            </h3>
            <p className="text-amber-100 text-sm max-w-xl">
              We work directly with private homeowners, landscape architects, and general contractors throughout New Jersey and Eastern PA.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="tel:9085557866">
              <Button
                variant="outline"
                className="bg-white hover:bg-stone-100 text-amber-950 font-bold border-white shadow-md text-xs sm:text-sm"
              >
                <Phone className="h-4 w-4 mr-1.5 text-amber-600" />
                (908) 555-STONE
              </Button>
            </a>
            <Link to="/contact">
              <Button className="bg-stone-950 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md">
                Schedule On-Site Survey
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
