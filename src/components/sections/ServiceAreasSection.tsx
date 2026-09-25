import { Container } from '@/components/ui/Container';

const towns = [
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

export function ServiceAreasSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
              Excellence Across the Tri-State
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Serving Premier Estates Across New Jersey
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We provide master stone masonry, structural retaining walls, and historic lime restoration across premier residential estates and commercial landmarks throughout:
          </p>
        </div>

        {/* Town Pill Cloud matching sample image */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-2">
          {towns.map((town) => (
            <span
              key={town}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-stone-800 bg-[#F4F0E8] border border-[#E5E0D5] hover:border-amber-400 hover:bg-white hover:text-stone-950 transition-colors shadow-2xs"
            >
              {town}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
