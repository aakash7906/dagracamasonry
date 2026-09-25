import { testimonialsData } from '@/data/mockData';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-14 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
            Verified Client Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Reputation Carved in Stone
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Hear directly from estate owners, historical architects, and general contractors who have trusted Da Graca Masonry with their most significant projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-md flex flex-col justify-between hover:border-amber-500 hover:shadow-xl hover:shadow-stone-200/80 transition-all p-5 sm:p-6 relative group"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-stone-200 group-hover:text-amber-500/30 transition-colors" />

              <div className="p-0 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>

                <div className="pt-4 border-t border-stone-100">
                  <Badge variant="stone" className="text-[11px] mb-2 font-medium bg-amber-50 text-amber-900 border-amber-200">
                    {item.projectType}
                  </Badge>
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {item.role} • {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
