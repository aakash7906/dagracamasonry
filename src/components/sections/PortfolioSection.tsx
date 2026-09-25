import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type FilterCategory = 'all' | 'patios' | 'facades' | 'historic' | 'walls';

export function PortfolioSection() {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const scrollToConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-24 bg-[#F4F0E8] border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header row with title on left and filter pills on right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
                Crafted Across New Jersey
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
              Some of Our Recent Work
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'patios', label: 'Patios & Terraces' },
              { id: 'facades', label: 'Stone Veneer' },
              { id: 'historic', label: 'Historic Brick' },
              { id: 'walls', label: 'Walls' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={filter === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(tab.id as FilterCategory)}
                className={
                  filter === tab.id
                    ? 'bg-stone-950 text-white font-semibold text-xs rounded-lg shadow-xs hover:bg-stone-900'
                    : 'bg-white border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs rounded-lg'
                }
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
          {/* Large Featured Card (8 Cols) */}
          <div className="lg:col-span-8 rounded-md bg-white border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-[320px] sm:h-[440px] w-full overflow-hidden bg-stone-200">
              <img
                src="/images/masonry/fireplace-patio.jpg"
                alt="Custom Stone Fireplace & Outdoor Living Pavilion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-sm">
                Featured Master Craft
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#b45309]">
                  Hardscaping & Outdoor Living • Somerset Hills, NJ
                </p>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 mt-1">
                  Custom Stone Fireplace & Outdoor Living Pavilion
                </h3>
              </div>

              <Link
                to="/gallery"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b45309] hover:text-[#9a3412] shrink-0"
              >
                <span>View Project Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Accompanying Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-md bg-white border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-[220px] sm:h-[300px] w-full overflow-hidden bg-stone-200">
              <img
                src="/images/masonry/stone-porch-entry.jpg"
                alt="Chester County Fieldstone Manor Facade & Porch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-6 sm:p-7 space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#b45309]">
                Residential Stone • Princeton, NJ
              </p>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-stone-900">
                Chester County Fieldstone Facade
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Over 4,500 sq ft of hand-chiseled natural fieldstone veneer with arched entrance.
              </p>
              <div className="pt-2">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#b45309]"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Bottom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Card 1 */}
          <div className="rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-52 w-full overflow-hidden bg-stone-200">
              <img
                src="/images/masonry/firepit-round-patio.jpg"
                alt="Flagstone Fire Pit & Round Patio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-1.5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#b45309]">
                Hardscaping • Mendham, NJ
              </p>
              <h4 className="font-heading font-bold text-base text-stone-900">
                Flagstone Fire Pit & Round Patio
              </h4>
              <p className="text-xs text-stone-500">
                Radial natural flagstone patio with round stone fire pit and curved seating wall.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-52 w-full overflow-hidden bg-stone-200">
              <img
                src="/images/masonry/curved-retaining-wall.jpg"
                alt="Curved Granite & Stone Retaining System"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-1.5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#b45309]">
                Retaining Walls • Bernardsville, NJ
              </p>
              <h4 className="font-heading font-bold text-base text-stone-900">
                Curved Granite Retaining System
              </h4>
              <p className="text-xs text-stone-500">
                Multi-tier curved natural stone retaining walls with granite coping and garden terraces.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-52 w-full overflow-hidden bg-stone-200">
              <img
                src="/images/masonry/paver-driveway.jpg"
                alt="Interlocking Paver Driveway & Front Walkway"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-1.5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#b45309]">
                Driveways & Paving • Bedminster, NJ
              </p>
              <h4 className="font-heading font-bold text-base text-stone-900">
                Paver Driveway & Front Walkway
              </h4>
              <p className="text-xs text-stone-500">
                Herringbone interlocking pavers with dark granite borders and adjoining walkway.
              </p>
            </div>
          </div>
        </div>

        {/* Dark Callout Banner across bottom (Exact match to sample image) */}
        <div className="rounded-md bg-stone-950 border border-stone-800 p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#b45309] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold font-heading text-white">
                Have a project in mind for this season?
              </h4>
              <p className="text-xs text-stone-300 leading-snug">
                Book your on-site consultation early — our schedule fills quickly during peak construction.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <Button
              onClick={scrollToConsultation}
              className="bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm"
            >
              Request a Free Quote
            </Button>
            <a
              href="tel:9085557866"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-stone-700 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#b45309]" />
              <span>(908) 555-7866</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
