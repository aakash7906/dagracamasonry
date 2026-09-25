import { servicesData } from '@/data/mockData';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Gem, Layers, Compass, Flame, ShieldCheck, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import type { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
  Gem: <Gem className="h-6 w-6 text-amber-600" />,
  Layers: <Layers className="h-6 w-6 text-amber-600" />,
  Compass: <Compass className="h-6 w-6 text-amber-600" />,
  Flame: <Flame className="h-6 w-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-600" />,
  Building2: <Building2 className="h-6 w-6 text-amber-600" />,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white border-b border-stone-200">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
            Specialized Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Our Masonry Disciplines
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Every stone is individually shaped, set, and inspected. We fuse traditional European masonry heritage with modern structural engineering standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col justify-between border-stone-200 bg-white hover:border-amber-500 hover:shadow-xl hover:shadow-stone-200/80 shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Service image preview */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-lg bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-center shadow-md">
                  {iconMap[service.iconName] || <Gem className="h-6 w-6 text-amber-600" />}
                </div>
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-amber-600 text-white text-[11px] font-bold shadow-sm">
                      Signature Craft
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-xl text-stone-900 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm mt-2 leading-relaxed">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <ul className="space-y-2 text-xs text-stone-700">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-stone-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-amber-700 hover:text-amber-800 hover:bg-amber-50 font-semibold text-xs"
                    onClick={() => {
                      const el = document.getElementById('consultation');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Consult on this Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
