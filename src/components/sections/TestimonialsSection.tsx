import { testimonialsData } from '@/data/mockData';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-stone-950 border-t border-stone-800">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider">
            Verified Client Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Reputation Carved in Stone
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Hear directly from estate owners, historical architects, and general contractors who have trusted Da Graca Masonry with their most significant projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <Card
              key={item.id}
              className="bg-stone-900 border-stone-800 flex flex-col justify-between hover:border-amber-500/30 transition-all p-6 relative group"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-stone-800 group-hover:text-amber-500/20 transition-colors" />

              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-stone-300 text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>

                <div className="pt-4 border-t border-stone-800/80">
                  <Badge variant="stone" className="text-[11px] mb-2 font-medium">
                    {item.projectType}
                  </Badge>
                  <h4 className="font-heading font-bold text-white text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {item.role} • {item.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
