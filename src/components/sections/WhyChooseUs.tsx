import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Ruler, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    icon: <Sparkles className="h-6 w-6 text-amber-700" />,
    title: 'Old-World Artisan Precision',
    description: 'We do not rush joint work or take shortcuts. Every natural stone is individually selected, trimmed, and laid with meticulous attention to bedlines and texture harmony.',
  },
  {
    icon: <Ruler className="h-6 w-6 text-amber-700" />,
    title: 'Engineered Foundation Standards',
    description: 'Masonry is only as durable as the footing beneath it. All our retaining walls, bluestone terraces, and structural veneers exceed municipal building codes.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-amber-700" />,
    title: '25-Year Structural Warranty',
    description: 'We stand firmly behind the structural longevity of our work. Our projects are backed by comprehensive workmanship guarantees and manufacturer warranties.',
  },
  {
    icon: <Clock className="h-6 w-6 text-amber-700" />,
    title: 'On-Time, Clean Jobsite Protocol',
    description: 'We respect your estate and property. Dedicated job foremen, daily cleanup, HEPA dust mitigation, and transparent project timelines throughout.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-24 bg-white border-b border-stone-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
              The Da Graca Standard
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
              Why Discerning Architects & Homeowners Trust Our Trowel
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Masonry is a permanent art. When you invest in natural stone or historic brick, you want it to look just as magnificent three decades from today as it does on installation day.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Direct owner supervision on every jobsite',
                'Quarry-direct sourcing of premium natural stone',
                'Historic lime & Portland-free mortar specialists',
                'Detailed, itemized transparent quotes with zero surprises',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-stone-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-500/80 hover:bg-white hover:shadow-lg transition-all space-y-3"
              >
                <div className="h-12 w-12 rounded-xl bg-amber-100/70 flex items-center justify-center border border-amber-200">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-stone-900">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
