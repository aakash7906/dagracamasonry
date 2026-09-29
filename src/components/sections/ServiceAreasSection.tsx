import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { MapPin } from 'lucide-react';

export const serviceAreaTowns = [
  'Princeton',
  'Bernardsville',
  'Bedminster',
  'Somerset Hills',
  'Mendham',
  'Morristown',
  'Short Hills',
  'Summit',
  'Chatham',
  'Chester',
  'Far Hills',
  'Tewksbury',
  'Lambertville',
  'Hopewell',
  'Westfield',
  'Basking Ridge',
  'Clinton',
  'Warren',
  'New Vernon',
  'Harding',
  'Saddle River',
  'Alpine',
  'Doylestown, PA',
  'New Hope, PA',
  'Hunterdon County',
  'Morris County',
  'Mercer County',
];

export const townSlugMap: Record<string, string> = {
  'Princeton': 'princeton',
  'Bernardsville': 'bernardsville',
  'Bedminster': 'bedminster',
  'Somerset Hills': 'somerset-hills',
  'Mendham': 'mendham',
  'Morristown': 'morristown',
  'Short Hills': 'short-hills',
  'Summit': 'summit',
  'Chatham': 'chatham',
  'Chester': 'chester',
  'Far Hills': 'far-hills',
  'Tewksbury': 'tewksbury',
  'Lambertville': 'lambertville',
  'Hopewell': 'hopewell',
  'Westfield': 'westfield',
  'Basking Ridge': 'basking-ridge',
  'Clinton': 'clinton',
  'Warren': 'warren',
  'New Vernon': 'new-vernon',
  'Harding': 'harding',
  'Saddle River': 'saddle-river',
  'Alpine': 'alpine',
  'Doylestown, PA': 'doylestown',
  'New Hope, PA': 'new-hope',
  'Hunterdon County': 'hunterdon-county',
  'Morris County': 'morris-county',
  'Mercer County': 'mercer-county',
};

export interface ServiceAreasSectionProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  bgClassName?: string;
  activeTown?: string;
  className?: string;
}

export function ServiceAreasSection({
  badge = 'Excellence Across the Tri-State',
  heading = 'Serving Premier Estates Across New Jersey',
  subheading = 'We provide master stone masonry, structural retaining walls, and historic lime restoration across premier residential estates and commercial landmarks throughout:',
  bgClassName = 'bg-white',
  activeTown,
  className = '',
}: ServiceAreasSectionProps) {
  return (
    <section className={`py-14 sm:py-20 lg:py-24 ${bgClassName} border-b border-[#E5E0D5] ${className}`}>
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
        {/* Dynamic Header */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          {badge && (
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309] font-sans">
                {badge}
              </span>
            </div>
          )}

          {heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
              {heading}
            </h2>
          )}

          {subheading && (
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Floating Location Cards Grid */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3.5">
          {serviceAreaTowns.map((town) => {
            const isActive = activeTown === town;
            const slug = townSlugMap[town] || town.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const content = (
              <div
                className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-white rounded-md border transition-all duration-300 hover:-translate-y-1 text-left group cursor-pointer ${
                  isActive
                    ? 'border-[#b45309] ring-1 ring-[#b45309]/30 bg-amber-50/20'
                    : 'border-stone-200/90 hover:border-[#b45309]'
                }`}
              >
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#b45309] flex items-center justify-center shrink-0 text-white group-hover:scale-105 group-hover:bg-[#9a3412] transition-all">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#b45309] transition-colors leading-tight truncate">
                  {town}
                </span>
              </div>
            );

            return (
              <Link
                key={town}
                to={`/service-area/${slug}`}
                title={`View ${town} Masonry Services`}
                className="block focus:outline-none"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
