import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Layers,
  ArrowRight,
} from 'lucide-react';

export interface ServicePlace {
  id: string;
  name: string;
  category: 'princeton' | 'mercer' | 'somerset' | 'river-beyond';
  categoryLabel: string;
  badge?: string;
  fullAddress: string;
  distance: string;
  estDriveTime: string;
  tagline: string;
  keyServices: string[];
  recentWork: string;
  zoom: number;
  mapX: number; // Percentage for SVG visual map
  mapY: number; // Percentage for SVG visual map
}

export const PRINCETON_SERVICE_PLACES: ServicePlace[] = [
  {
    id: 'princeton-center',
    name: 'Princeton (Palmer Square & Downtown)',
    category: 'princeton',
    categoryLabel: 'Princeton Core',
    badge: 'Primary Dispatch Hub',
    fullAddress: 'Palmer Square, Princeton, NJ 08542',
    distance: '0 miles (Local HQ)',
    estDriveTime: 'Immediate / 5 min',
    tagline: 'Historic brick & bluestone plazas, residential heritage restoration',
    keyServices: ['Historic Lime Tuckpointing', 'Thermal Bluestone Patios', 'Stone Facades'],
    recentWork: 'Historic courtyard restoration & bluestone terrace masonry',
    zoom: 15,
    mapX: 50,
    mapY: 50,
  },
  {
    id: 'princeton-battlefield',
    name: 'Princeton Battlefield & Mercer Hill',
    category: 'princeton',
    categoryLabel: 'Princeton Core',
    badge: 'Historic District',
    fullAddress: 'Mercer Rd, Princeton, NJ 08540',
    distance: '1.8 miles',
    estDriveTime: '6 - 10 min',
    tagline: 'Heritage dry-laid stone boundaries & estate perimeter walls',
    keyServices: ['Dry-Laid Fieldstone Walls', 'Custom Gate Piers', 'Chimney Rebuilds'],
    recentWork: 'Restored 240-foot historic perimeter estate fieldstone wall',
    zoom: 14,
    mapX: 45,
    mapY: 54,
  },
  {
    id: 'institute-woods',
    name: 'Institute Woods & Olden Manor',
    category: 'princeton',
    categoryLabel: 'Princeton Core',
    fullAddress: 'Olden Ln, Princeton, NJ 08540',
    distance: '2.4 miles',
    estDriveTime: '8 - 12 min',
    tagline: 'Secluded luxury estates with custom fire features and woodland patios',
    keyServices: ['Alfresco Fire Pit Lounges', 'Tennessee Quartzite Terraces', 'Slope Retention'],
    recentWork: 'Tiered natural stone patio with gas fire pit and integrated lighting',
    zoom: 14,
    mapX: 47,
    mapY: 58,
  },
  {
    id: 'kingston-carnegie',
    name: 'Kingston & Lake Carnegie Enclave',
    category: 'princeton',
    categoryLabel: 'Princeton Core',
    fullAddress: 'Route 27, Kingston, NJ 08528',
    distance: '3.1 miles',
    estDriveTime: '8 - 12 min',
    tagline: 'Waterfront grade stabilization & canal-side stone retaining structures',
    keyServices: ['Hydrostatic Retaining Walls', 'Lakeside Terraces', 'Deep-Frost Footings'],
    recentWork: 'Engineered gravity boulder wall stabilizing steep waterfront terrace',
    zoom: 14,
    mapX: 56,
    mapY: 46,
  },
  {
    id: 'hopewell-pennington',
    name: 'Hopewell Valley & Pennington',
    category: 'mercer',
    categoryLabel: 'Mercer County',
    badge: 'Daily Crews Active',
    fullAddress: 'Pennington, NJ 08534',
    distance: '7.8 miles',
    estDriveTime: '12 - 16 min',
    tagline: 'Historic farmhouse renovations, Rumford fireplaces & rustic masonry',
    keyServices: ['Hand-Carved Fireplaces', 'Fieldstone Farmhouse Restoration', 'Courtyards'],
    recentWork: 'Indoor-outdoor dual Rumford hearth with hand-chiseled fieldstone',
    zoom: 13,
    mapX: 35,
    mapY: 57,
  },
  {
    id: 'lawrenceville-stonybrook',
    name: 'Lawrenceville & Stony Brook',
    category: 'mercer',
    categoryLabel: 'Mercer County',
    fullAddress: 'Main St, Lawrenceville, NJ 08648',
    distance: '5.6 miles',
    estDriveTime: '10 - 15 min',
    tagline: 'Colonial porticos, bluestone front steps & Belgian block driveways',
    keyServices: ['Stone Porticos & Stoops', 'Driveway Aprons', 'Veneer Facades'],
    recentWork: 'Grand colonial front stoop with thermal bluestone treads',
    zoom: 13,
    mapX: 42,
    mapY: 65,
  },
  {
    id: 'west-windsor-plainsboro',
    name: 'West Windsor & Plainsboro',
    category: 'mercer',
    categoryLabel: 'Mercer County',
    fullAddress: 'West Windsor, NJ 08550',
    distance: '4.9 miles',
    estDriveTime: '10 - 14 min',
    tagline: 'Modern luxury pool copings, outdoor chef kitchens & spacious patios',
    keyServices: ['Outdoor Kitchen Islands', 'Pool Coping Masonry', 'Contemporary Patios'],
    recentWork: '1,400 sq.ft. bluestone pool deck and integrated stone BBQ island',
    zoom: 13,
    mapX: 58,
    mapY: 57,
  },
  {
    id: 'montgomery-skillman',
    name: 'Montgomery & Skillman',
    category: 'somerset',
    categoryLabel: 'Somerset County',
    badge: 'Popular Region',
    fullAddress: 'Skillman, Montgomery, NJ 08558',
    distance: '6.2 miles',
    estDriveTime: '11 - 15 min',
    tagline: 'Expansive private country estates, multi-tier terraces & garden walls',
    keyServices: ['Multi-Tier Stone Terraces', 'Garden Retaining Walls', 'Stone Facades'],
    recentWork: 'Three-tiered architectural fieldstone terrace with integrated water fountain',
    zoom: 13,
    mapX: 52,
    mapY: 38,
  },
  {
    id: 'rocky-hill',
    name: 'Rocky Hill Historic Borough',
    category: 'somerset',
    categoryLabel: 'Somerset County',
    fullAddress: 'Washington St, Rocky Hill, NJ 08553',
    distance: '4.5 miles',
    estDriveTime: '9 - 13 min',
    tagline: '18th-century brick and quarried stone conservation & repointing',
    keyServices: ['Historic Mortar Matching', 'Foundation Waterproofing', 'Stone Stoops'],
    recentWork: 'Lime mortar repointing on historic 1840s stone carriage house',
    zoom: 14,
    mapX: 54,
    mapY: 42,
  },
  {
    id: 'bernardsville-bedminster',
    name: 'Bernardsville & Bedminster',
    category: 'somerset',
    categoryLabel: 'Somerset Hills',
    badge: 'Estate Specialist',
    fullAddress: 'Bernardsville, NJ 07924',
    distance: '24 miles',
    estDriveTime: '28 - 35 min',
    tagline: 'High-elevation mountain estate retaining walls, grand gate entrance piers',
    keyServices: ['Massive Gravity Retaining Systems', 'Grand Estate Gates', 'Full Veneer Facades'],
    recentWork: 'Granite boulder slope retaining wall with structural geogrid',
    zoom: 12,
    mapX: 55,
    mapY: 20,
  },
  {
    id: 'summit-shorthills',
    name: 'Summit & Short Hills',
    category: 'river-beyond',
    categoryLabel: 'Essex / Union',
    fullAddress: 'Summit, NJ 07901',
    distance: '32 miles',
    estDriveTime: '38 - 45 min',
    tagline: 'Architectural granite veneer, custom outdoor living & porticos',
    keyServices: ['Thin & Full Bed Veneer', 'Luxury Alfresco Living', 'Bluestone Walkways'],
    recentWork: 'Full front facade natural stone veneer & heated bluestone walkway',
    zoom: 12,
    mapX: 68,
    mapY: 15,
  },
  {
    id: 'mendham-morris',
    name: 'Mendham & Chester',
    category: 'river-beyond',
    categoryLabel: 'Morris County',
    fullAddress: 'Mendham, NJ 07945',
    distance: '30 miles',
    estDriveTime: '35 - 42 min',
    tagline: 'Rustic equestrian estates, heavy fieldstone walls & Rumford chimneys',
    keyServices: ['Equestrian Property Masonry', 'Chimney Reconstruction', 'Stone Terraces'],
    recentWork: 'Equestrian courtyard stone paving and two outdoor stone fireplaces',
    zoom: 12,
    mapX: 48,
    mapY: 16,
  },
  {
    id: 'lambertville-newhope',
    name: 'Lambertville & New Hope, PA',
    category: 'river-beyond',
    categoryLabel: 'Delaware River',
    badge: 'Tri-State Cross-Border',
    fullAddress: 'New Hope, PA 18938',
    distance: '16.5 miles',
    estDriveTime: '22 - 28 min',
    tagline: 'Delaware riverfront cottage stone restoration & heritage tuckpointing',
    keyServices: ['Historic Riverstone Masonry', 'Lime Tuckpointing', 'Waterfront Retention'],
    recentWork: 'Complete restoration of early 19th-century riverside rubble stone foundation',
    zoom: 13,
    mapX: 25,
    mapY: 48,
  },
  {
    id: 'doylestown-bucks',
    name: 'Doylestown & Bucks County, PA',
    category: 'river-beyond',
    categoryLabel: 'Bucks County, PA',
    fullAddress: 'Doylestown, PA 18901',
    distance: '24 miles',
    estDriveTime: '32 - 38 min',
    tagline: 'Iconic Bucks County brownstone & fieldstone restoration specialists',
    keyServices: ['Bucks County Brownstone', 'Estate Enclosures', 'Custom Flagstone Patios'],
    recentWork: 'Pennsylvania flagstone patio rebuild with matched lime mortar',
    zoom: 12,
    mapX: 18,
    mapY: 52,
  },
];

export function ServiceAreaMapInteractive() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('princeton-center');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapDisplayMode, setMapDisplayMode] = useState<'google' | 'cluster'>('google');

  // Find active place object
  const activePlace = useMemo(() => {
    return (
      PRINCETON_SERVICE_PLACES.find((p) => p.id === selectedPlaceId) ||
      PRINCETON_SERVICE_PLACES[0]
    );
  }, [selectedPlaceId]);

  // Filtered places based on category and search query
  const filteredPlaces = useMemo(() => {
    return PRINCETON_SERVICE_PLACES.filter((place) => {
      const matchesCategory =
        activeCategory === 'all' || place.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.fullAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Generate Google Maps Directions URL
  const handleOpenGoogleDirections = (address?: string) => {
    const destination = encodeURIComponent(
      typeof address === 'string' && address ? address : activePlace.fullAddress
    );
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  // Google Map Embed URL
  const googleMapEmbedUrl = useMemo(() => {
    const encoded = encodeURIComponent(activePlace.fullAddress);
    return `https://maps.google.com/maps?q=${encoded}&t=&z=${activePlace.zoom}&ie=UTF8&iwloc=&output=embed`;
  }, [activePlace]);

  return (
    <section
      id="service-area-map"
      className="py-14 sm:py-20 lg:py-24 bg-white text-stone-900 border-b border-stone-200/90 relative overflow-hidden"
    >
      {/* Background Ambience Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(180,83,9,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(217,119,6,0.02),transparent_50%)] pointer-events-none" />

      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#b45309] text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <Compass className="h-3.5 w-3.5 text-[#b45309]" />
            <span>Interactive Regional Coverage & Route Planner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-stone-950 tracking-tight">
            Princeton & Tri-State Service Area Map
          </h2>

          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Select any community across our New Jersey and Eastern Pennsylvania service corridor to inspect local project specialties, verify artisan dispatch times, and plan immediate GPS driving routes.
          </p>
        </div>

        {/* Top Control Bar: Search & Category Tabs */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:flex-1 lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search town, borough, or ZIP..."
                className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 text-xs px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: `All Places (${PRINCETON_SERVICE_PLACES.length})` },
                { id: 'princeton', label: 'Princeton Enclaves' },
                { id: 'mercer', label: 'Mercer County' },
                { id: 'somerset', label: 'Somerset Hills' },
                { id: 'river-beyond', label: 'River & Beyond' },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/90 shadow-2xs'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Grid: Interactive Master-Detail & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-stretch">
          {/* LEFT COLUMN: Place Selector & Route Assistant (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scrollable Location List */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#b45309]" />
                  Available Service Locations ({filteredPlaces.length})
                </span>
                <span className="text-[11px] text-stone-500 font-medium">Click to focus map</span>
              </div>

              <div className="space-y-2.5 max-h-[600px] sm:max-h-[720px] lg:max-h-[820px] overflow-y-auto pr-1.5 custom-scrollbar">
                {filteredPlaces.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-sm">
                    No service areas found matching "{searchQuery}".
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="block mx-auto mt-2 text-amber-700 hover:underline text-xs cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredPlaces.map((place) => {
                    const isSelected = place.id === activePlace.id;
                    return (
                      <div
                        key={place.id}
                        onClick={() => setSelectedPlaceId(place.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                            : 'bg-[#FAF8F5]/80 border-stone-200 hover:border-amber-400 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                                isSelected
                                  ? 'bg-amber-600 text-white font-bold'
                                  : 'bg-white text-stone-600 border border-stone-200'
                              }`}
                            >
                              <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3
                                  className={`text-sm font-bold font-heading leading-tight ${
                                    isSelected ? 'text-amber-950' : 'text-stone-900'
                                  }`}
                                >
                                  {place.name}
                                </h3>
                                {place.badge && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                                    {place.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 mt-1 line-clamp-1">{place.tagline}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[11px] font-bold text-amber-700 block whitespace-nowrap">
                              {place.distance}
                            </span>
                            <span className="text-[10px] text-stone-400 block whitespace-nowrap">
                              {place.estDriveTime}
                            </span>
                          </div>
                        </div>

                        {/* Quick Route Trigger on Card */}
                        <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-stone-200/60 text-[11px]">
                          <span className="text-stone-500 truncate max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
                            {place.fullAddress}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenGoogleDirections(place.fullAddress);
                            }}
                            className="inline-flex items-center gap-1 font-bold text-amber-700 hover:text-amber-800 hover:underline shrink-0 cursor-pointer ml-2"
                          >
                            <Navigation className="h-3 w-3 text-amber-600" />
                            <span>Route in Map</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Quick Contact & Dispatch Info */}
              <div className="pt-3 mt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Tri-State Licensed & Insured
                </span>
                <a
                  href="tel:9085557866"
                  className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  (908) 555-7866
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Responsive Map Frame & Visual Cluster (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* View Switcher Toolbar */}
            <div className="flex items-center justify-between bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMapDisplayMode('google')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    mapDisplayMode === 'google'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Google Live Map</span>
                </button>

                <button
                  onClick={() => setMapDisplayMode('cluster')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    mapDisplayMode === 'cluster'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Regional Sector Schematic</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600 pr-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Active Pin: {activePlace.name.split('(')[0].trim()}</span>
              </div>
            </div>

            {/* Map Display Container */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md flex-1 min-h-[420px] sm:min-h-[580px] flex flex-col">
              {mapDisplayMode === 'google' ? (
                /* Google Maps Live Responsive Iframe */
                <div className="relative w-full flex-1 min-h-[420px] sm:min-h-[580px] overflow-hidden">
                  <iframe
                    title={`Google Map - ${activePlace.name}`}
                    src={googleMapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute -top-[95px] left-0 w-full h-[calc(100%+95px)]"
                  />

                  {/* Custom Branded HUD Banner */}
                  <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm md:max-w-md bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 rounded-xl p-2.5 sm:p-3 shadow-md pointer-events-auto z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-tight">
                            {activePlace.name}
                          </p>
                          <p className="text-[11px] text-amber-700 font-semibold">
                            {activePlace.distance} • {activePlace.estDriveTime}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenGoogleDirections()}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Route</span>
                      </button>
                    </div>
                  </div>

                  {/* Corner Watermark / Helper */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-stone-200 text-[10px] text-stone-600 flex items-center gap-1.5 pointer-events-none shadow-xs z-10">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Verified Masonry Coverage Zone</span>
                  </div>
                </div>
              ) : (
                /* Regional Cluster SVG Interactive Schematic */
                <div className="relative w-full flex-1 min-h-[420px] sm:min-h-[580px] bg-[#FBF9F6] p-3 sm:p-4 md:p-6 flex flex-col justify-between">
                  {/* Top Schematic Header */}
                  <div className="flex items-center justify-between z-10">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800">
                        Dispatch Radius Visualizer
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 font-heading">
                        Tri-State Enclave Matrix
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-600 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span>Click any node to select</span>
                    </div>
                  </div>

                  {/* SVG Topological Map */}
                  <div className="relative w-full flex-1 min-h-[260px] sm:h-[420px] md:h-[540px] my-auto">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {/* Grid background lines */}
                      <defs>
                        <pattern
                          id="grid-pattern-light"
                          width="10"
                          height="10"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="rgba(0,0,0,0.04)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>

                      <rect width="100" height="100" fill="url(#grid-pattern-light)" />

                      {/* Concentric Dispatch Radius Rings from Princeton (50, 50) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="12"
                        fill="#fef3c7"
                        fillOpacity="0.4"
                        stroke="#d97706"
                        strokeWidth="0.3"
                        strokeDasharray="1,1"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="25"
                        fill="none"
                        stroke="#a8a29e"
                        strokeWidth="0.25"
                        strokeDasharray="1.5,1.5"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#d6d3d1"
                        strokeWidth="0.2"
                        strokeDasharray="2,2"
                      />

                      {/* Radius Annotations */}
                      <text x="50" y="37" fill="#78716c" fontSize="2.2" textAnchor="middle" fontWeight="bold">
                        5 Mile Core
                      </text>
                      <text x="50" y="24" fill="#a8a29e" fontSize="2.2" textAnchor="middle" fontWeight="bold">
                        15 Mile Daily Zone
                      </text>
                      <text x="50" y="7" fill="#a8a29e" fontSize="2.2" textAnchor="middle" fontWeight="bold">
                        35 Mile Regional Enclave
                      </text>

                      {/* Delaware River schematic curve */}
                      <path
                        d="M 12 10 C 18 35, 20 60, 26 95"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="0.8"
                        strokeDasharray="2,1"
                        opacity="0.6"
                      />
                      <text x="17" y="92" fill="#0369a1" fontSize="2.2" fontWeight="bold">
                        Delaware River
                      </text>

                      {/* Connecting lines from active place to Princeton Hub */}
                      {activePlace.id !== 'princeton-center' && (
                        <line
                          x1="50"
                          y1="50"
                          x2={activePlace.mapX}
                          y2={activePlace.mapY}
                          stroke="#d97706"
                          strokeWidth="0.7"
                          strokeDasharray="1,1"
                        />
                      )}
                    </svg>

                    {/* Interactive Marker Pins */}
                    {PRINCETON_SERVICE_PLACES.map((place) => {
                      const isSelected = place.id === activePlace.id;
                      const isHub = place.id === 'princeton-center';

                      return (
                        <div
                          key={place.id}
                          onClick={() => setSelectedPlaceId(place.id)}
                          style={{
                            left: `${place.mapX}%`,
                            top: `${place.mapY}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          className="absolute z-20 cursor-pointer group"
                        >
                          {/* Pulsing Beacon for Selected Node */}
                          {isSelected && (
                            <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                          )}

                          {/* Marker Dot / Icon */}
                          <div
                            className={`flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                              isSelected
                                ? 'h-7 w-7 bg-amber-600 text-white font-black scale-110 ring-2 ring-amber-300 ring-offset-2 ring-offset-white'
                                : isHub
                                ? 'h-6 w-6 bg-amber-700 text-white ring-2 ring-amber-200'
                                : 'h-5 w-5 bg-white text-stone-700 border border-stone-300 hover:border-amber-500 hover:text-amber-600 hover:scale-110'
                            }`}
                          >
                            <MapPin className="h-3 w-3" />
                          </div>

                          {/* Tooltip on hover / selected */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap px-2 py-1 rounded bg-stone-900 text-white border border-stone-800 text-[10px] font-bold shadow-xl pointer-events-none transition-all z-30 ${
                              isSelected
                                ? 'opacity-100 visible scale-105'
                                : 'opacity-0 group-hover:opacity-100 group-hover:visible'
                            }`}
                          >
                            {place.name.split('(')[0].trim()}
                            <span className="block text-[9px] text-stone-300 font-normal">
                              {place.distance} • {place.estDriveTime}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Legend */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-200 text-[11px] text-stone-600 z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-amber-600 ring-1 ring-amber-200" />
                        <span className="font-medium">Selected Target</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-700" />
                        <span className="font-medium">Princeton Center (HQ)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white border border-stone-400" />
                        <span className="font-medium">Service Corridor Nodes</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setMapDisplayMode('google')}
                      className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Switch to Live Satellite & Street Map</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
