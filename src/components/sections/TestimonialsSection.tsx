import { Container } from '@/components/ui/Container';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    initial: 'E',
    author: 'Edward Sterling',
    location: 'Princeton, NJ',
    role: 'Estate Homeowner',
    quote:
      'The craftsmanship displayed by Da Graca Masonry is second to none. Our fieldstone front facade looks like it was built 100 years ago by old-world artisans. Their crew was meticulous, punctual, and left the jobsite spotless every day.',
    project: 'Fieldstone Manor Facade',
  },
  {
    initial: 'E',
    author: 'Elena Rostova',
    location: 'Lambertville, NJ',
    role: 'Historic Architect',
    quote:
      'Finding masons who understand historic lime mortar chemistry and traditional tuckpointing is nearly impossible today. Da Graca restored our 1890s brick building with absolute perfection. True masters of their craft.',
    project: 'Historic Brick Restoration',
  },
  {
    initial: 'M',
    author: 'Marcus Vance',
    location: 'Somerset Hills, NJ',
    role: 'Private Resident',
    quote:
      'From our 2,000 sq ft bluestone terrace to the outdoor fireplace, every cut and joint line is razor-sharp. They accommodated customized design revisions seamlessly and finished right on schedule.',
    project: 'Bluestone Terrace & Fireplace',
  },
  {
    initial: 'G',
    author: 'Dr. Gregory Hayes',
    location: 'Bernardsville, NJ',
    role: 'Homeowner',
    quote:
      'Our hillside had severe erosion with an old railroad tie wall falling over. Da Graca engineered a double-tier limestone gravity wall with built-in French drainage. It completely transformed our property into an architectural showpiece.',
    project: 'Limestone Retaining Walls',
  },
  {
    initial: 'D',
    author: 'David Thorne',
    location: 'Morristown, NJ',
    role: 'General Contractor',
    quote:
      'As a custom luxury builder, my trade partners define my reputation. I have subbed all my architectural stonework to Da Graca for 8 years. Their masonry team is prompt, reads blueprints effortlessly, and never cuts corners.',
    project: 'Commercial & Estate Stone',
  },
  {
    initial: 'K',
    author: 'Kathryn Pendelton',
    location: 'Flemington, NJ',
    role: 'Historical Society Trustee',
    quote:
      'Da Graca repaired our historic municipal chimney and crumbling foundation using authentic breathable lime mortars. Their devotion to historic integrity and building science is unmatched in New Jersey.',
    project: 'Historic Chimney Rebuild',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
              Testimonials & Reputation
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Discover What Others Have Said About Da Graca Masonry!
          </h2>

          {/* Social Proof Rating Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-stone-700">
            <div className="flex items-center gap-1.5 bg-[#F4F0E8] border border-[#E5E0D5] px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="font-bold text-stone-900">Google Rating</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-500" />
                ))}
              </div>
              <span className="text-stone-500">5.0 (120+ Reviews)</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F4F0E8] border border-[#E5E0D5] px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="font-bold text-stone-900">Houzz Rating</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-500" />
                ))}
              </div>
              <span className="text-stone-500">5.0 (90+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* 6 Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="p-6 sm:p-7 rounded-md bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
                      {r.initial}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-stone-900 leading-tight">
                        {r.author}
                      </h4>
                      <p className="text-[11px] text-stone-500">{r.location} • {r.role}</p>
                    </div>
                  </div>
                  <span title="Verified Customer">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              {/* Project footer link */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Project: {r.project}</span>
                <Link
                  to="/gallery"
                  className="font-bold text-[#b45309] hover:underline flex items-center gap-1"
                >
                  <span>Photos</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
