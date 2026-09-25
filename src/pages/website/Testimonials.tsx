import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { testimonialsData } from '@/data/mockData';
import {
  Star,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  HeartHandshake,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '4.9 / 5.0', label: 'Average Client Rating', subtext: 'Across Google & Houzz' },
  { value: '1,200+', label: 'Projects Completed', subtext: 'Throughout NJ & Eastern PA' },
  { value: '25-Year', label: 'Workmanship Guarantee', subtext: 'On all structural stone' },
  { value: '98%', label: 'Repeat & Referral Rate', subtext: 'From architects & homeowners' },
];

export function Testimonials() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTestimonials =
    filterType === 'all'
      ? testimonialsData
      : testimonialsData.filter((item) =>
          item.projectType.toLowerCase().includes(filterType.toLowerCase())
        );

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
            Client Trust & Reputation
          </Badge> */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Reputation Carved in Stone
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl leading-relaxed">
            Read direct feedback from estate homeowners, historical preservation architects, and general contractors who have trusted Da Graca Masonry with their most demanding stone and brick installations.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>100% Verified Real Property Owners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-600" />
              <span>A+ Rated Custom Stonework</span>
            </div>
          </div>
        </div>

        {/* Stats Metric Cards Bar */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-5 sm:p-6 rounded-md bg-white border border-stone-200 shadow-sm space-y-1 hover:border-amber-400 transition-colors"
            >
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-700 block">
                {s.value}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">{s.label}</h4>
              <p className="text-[11px] text-stone-500">{s.subtext}</p>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="mt-8 p-4 sm:p-5 rounded-md bg-white border border-stone-200 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2">
            Filter by Scope:
          </span>
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className={
              filterType === 'all'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            All Reviews ({testimonialsData.length})
          </Button>
          <Button
            variant={filterType === 'facade' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('facade')}
            className={
              filterType === 'facade'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            Natural Stone Facades
          </Button>
          <Button
            variant={filterType === 'terrace' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('terrace')}
            className={
              filterType === 'terrace'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            Patios & Terraces
          </Button>
          <Button
            variant={filterType === 'historic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('historic')}
            className={
              filterType === 'historic'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            Historic Restorations
          </Button>
          <Button
            variant={filterType === 'retaining' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('retaining')}
            className={
              filterType === 'retaining'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs'
            }
          >
            Retaining Walls
          </Button>
        </div>
      </Container>

      {/* Testimonials Grid */}
      <Container className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-stone-200 bg-white text-stone-900 shadow-md flex flex-col justify-between hover:border-amber-500 hover:shadow-xl transition-all p-6 sm:p-8 relative group"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-stone-200 group-hover:text-amber-500/30 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <Badge
                  variant="stone"
                  className="text-[11px] font-semibold bg-amber-50 text-amber-900 border-amber-200 inline-block"
                >
                  {item.projectType}
                </Badge>

                <p className="text-stone-700 text-sm sm:text-base italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{item.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-stone-600">
                      <MapPin className="h-3 w-3 text-amber-600 inline" />
                      {item.location}
                    </span>
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0" title="Verified Client">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Trust & Guarantee Banner */}
      <Container className="mb-20">
        <div className="rounded-md bg-white border border-stone-200 p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto md:mx-0">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h4 className="font-heading font-bold text-stone-900 text-lg">
                Transparent Line-Item Proposals
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                No hidden contingency fees or unexpected add-ons. Every stone pallet, mortar specification, and labor hour is fully documented before work starts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-heading font-bold text-stone-900 text-lg">
                25-Year Workmanship Warranty
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We engineer below-frost foundations and install proper hydrostatic relief weeping systems so your masonry never shifts or heaves.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto md:mx-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="font-heading font-bold text-stone-900 text-lg">
                Direct Daily Communication
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                You receive daily progress updates directly from the jobsite supervisor, with constant access to company leadership throughout construction.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Consultation Banner CTA */}
      <Container>
        <div className="rounded-md bg-gradient-to-r from-stone-900 to-stone-950 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
              Ready to Discuss Your Project with Our Team?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Experience the craftsmanship and dedication that has earned our company an impeccable reputation across New Jersey estates.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md">
                <span>Request Free On-Site Consultation</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
