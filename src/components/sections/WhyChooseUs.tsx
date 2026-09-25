import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Ruler, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    title: 'Old-World Artisan Precision',
    description: 'We do not rush joint work or take shortcuts. Every natural stone is individually selected, trimmed, and laid with meticulous attention to bedlines and texture harmony.',
  },
  {
    icon: <Ruler className="h-6 w-6 text-amber-500" />,
    title: 'Engineered Foundation Standards',
    description: 'Masonry is only as durable as the footing beneath it. All our retaining walls, bluestone terraces, and structural veneers exceed municipal building codes.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    title: '25-Year Structural Warranty',
    description: 'We stand firmly behind the structural longevity of our work. Our projects are backed by comprehensive workmanship guarantees and manufacturer warranties.',
  },
  {
    icon: <Clock className="h-6 w-6 text-amber-500" />,
    title: 'On-Time, Clean Jobsite Protocol',
    description: 'We respect your estate and property. Dedicated job foremen, daily cleanup, HEPA dust mitigation, and transparent project timelines throughout.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-stone-900 border-t border-stone-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="stone" className="uppercase font-semibold tracking-wider">
              The Da Graca Standard
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
              Why Discerning Architects & Homeowners Trust Our Trowel
            </h2>
            <p className="text-stone-300 leading-relaxed">
              Masonry is a permanent art. When you invest in natural stone or historic brick, you want it to look just as magnificent three decades from today as it does on installation day.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Direct owner supervision on every jobsite',
                'Quarry-direct sourcing of premium natural stone',
                'Historic lime & Portland-free mortar specialists',
                'Detailed, itemized transparent quotes with zero surprises',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-stone-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors space-y-3"
              >
                <div className="h-12 w-12 rounded-xl bg-stone-900 flex items-center justify-center border border-stone-800">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
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
