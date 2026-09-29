import { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/Accordion';
import {
    ShieldCheck,
    Award,
    CheckCircle2,
    ArrowRight,
    Phone,
    MapPin,
    Star,
    Check,
    CalendarCheck2,
    Compass,
    FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection';
import { ServiceAreaMapInteractive } from '@/components/sections/ServiceAreaMapInteractive';

const lambertvilleServices = [
    {
        "title": "Inground Pool Paver Patios & Coping",
        "desc": "Deep charcoal and thermal bluestone swimming pool surrounds engineered for non-slip safety, clean aesthetics, and privacy integration.",
        "features": [
            "Thermal slip-resistant pavers",
            "Flush drainage grates",
            "Chlorine- and salt-resistant sealants"
        ]
    },
    {
        "title": "Historic Brick & Stone Tuckpointing",
        "desc": "Breathable lime mortar repointing for Victorian, Federal, and colonial stone rowhouses in the Lambertville Historic District.",
        "features": [
            "Non-hydraulic lime mortar",
            "Historic district compliance",
            "Hand-raked joint preservation"
        ]
    },
    {
        "title": "Terraced Hillside Retaining Walls",
        "desc": "Gravity stone walls built to stabilize steep hillside gardens behind Lambertville townhomes and country river estates.",
        "features": [
            "Geotechnical drainage pipes",
            "Geogrid slope stabilization",
            "Natural stone coping"
        ]
    },
    {
        "title": "Bluestone Courtyards & Urban Patios",
        "desc": "Intimate outdoor garden courtyards constructed with natural cleft Pennsylvania bluestone and historic brick borders.",
        "features": [
            "Compacted gravel sub-base",
            "Polymeric joint stabilizer",
            "Permeable drainage solutions"
        ]
    },
    {
        "title": "River Stone Foundations & Waterproofing",
        "desc": "Basement stone foundation tuckpointing, crystalline moisture barriers, and underpinning for riverfront properties.",
        "features": [
            "Hydrostatic pressure relief",
            "Breathable lime injection",
            "Structural certification"
        ]
    },
    {
        "title": "Front Entrance Stoops & Brownstone Steps",
        "desc": "Restoration and reconstruction of historic street-level entry steps using authentic brownstone and bluestone treads.",
        "features": [
            "Frost-depth footings",
            "Historic mould matching",
            "Hand-forged railing mounts"
        ]
    },
    {
        "title": "Custom Outdoor Fireplaces & Hearths",
        "desc": "Wood-burning fireplaces and fire pits constructed with reclaimed river stone and Pennsylvania bluestone mantels.",
        "features": [
            "Refractory firebox cores",
            "Hand-dressed stonework",
            "Integrated spark arrestors"
        ]
    },
    {
        "title": "Driveway Cobblestones & Belgian Block",
        "desc": "Hand-split granite cobblestone aprons and curbing set in reinforced concrete along steep river valley driveways.",
        "features": [
            "Reinforced concrete bed",
            "High-compression granite",
            "Erosion prevention"
        ]
    },
    {
        "title": "Outdoor Kitchens & Dining Bars",
        "desc": "Custom stone masonry islands housing built-in stainless grills, sinks, and granite countertops for riverside entertaining.",
        "features": [
            "Weatherproof masonry bases",
            "Granite or bluestone counters",
            "Integrated gas and power lines"
        ]
    }
];

const neighborhoods = [
    "Lambertville Historic District",
    "Cottage Hill Neighborhood",
    "Delaware Riverfront Corridor",
    "Music Mountain Area",
    "Bridge Street Historic Environs",
    "Union Street Corridor",
    "Alexauken Creek Enclave",
    "Connaught Hill Neighborhood",
    "Goat Hill Overlook Environs",
    "Swan Street Corridor",
    "Coryell Street Historic Area",
    "Holcombe-Jimison Farm Environs"
];

const nearbyTowns = [
    "08530 (Lambertville Core)",
    "New Hope, PA (18938)",
    "Stockton (08559)",
    "Hopewell (08525)",
    "Pennington (08534)",
    "Flemington (08822)",
    "Frenchtown",
    "Ringoes",
    "Sergeantsville",
    "Bucks County, PA",
    "Hunterdon County",
    "Mercer County"
];

const recentProjects = [
    {
        "title": "Cottage Hill Pool Surround & Patio",
        "category": "Pool Hardscaping",
        "image": "/images/servicearea/12.jpg",
        "desc": "Installed a modern charcoal paver inground pool surround with perimeter privacy fencing and integrated sub-deck drainage on a hillside lot.",
        "specs": [
            "1,100 sq ft pool patio",
            "Textured non-slip pavers",
            "Sub-deck drainage network"
        ]
    },
    {
        "title": "Bridge Street Historic Brick Tuckpointing",
        "category": "Historic Restoration",
        "image": "/images/servicearea/16.jpg",
        "desc": "Repointed exterior brickwork and rebuilt two deteriorating chimneys on an 1870s Victorian riverfront residence using breathable lime mortar.",
        "specs": [
            "100% lime mortar mix",
            "Historic preservation approved",
            "Lead counter-flashing"
        ]
    },
    {
        "title": "Delaware Riverfront Bluestone Courtyard",
        "category": "Courtyard Patio",
        "image": "/images/servicearea/7.jpg",
        "desc": "Crafted a private 650 sq ft Pennsylvania bluestone garden courtyard with custom fieldstone retaining walls and integrated lighting.",
        "specs": [
            "650 sq ft bluestone",
            "Fieldstone retaining wall",
            "Low-voltage LED fixtures"
        ]
    }
];

const comparisonData = [
    {
        feature: 'Workmanship Guarantee',
        us: '25-Year Structural Workmanship Warranty',
        others: '1-Year or Limited Standard Warranty',
    },
    {
        feature: 'Insurance & Licensing',
        us: 'NJ Lic #13VH09876500 with $2M Liability & Full Workers Comp',
        others: 'Minimum liability, frequently subcontracted crews',
    },
    {
        feature: 'Stone Sourcing & Quality',
        us: '100% Authentic Quarried Pennsylvania Bluestone & Natural Fieldstone',
        others: 'Manufactured precast concrete pavers that fade and crack',
    },
    {
        feature: 'Municipal & Historic Compliance',
        us: 'Full blueprint submission & historic mortar laboratory matching',
        others: 'Standard modern mortar that damages historic soft brick',
    },
    {
        feature: 'Daily Jobsite Supervision',
        us: 'Direct master mason owner oversight on-site every single day',
        others: 'Rotating third-party crews with no master mason present',
    },
    {
        feature: 'Preliminary Itemized Estimate',
        us: 'Comprehensive line-item quote with laser grade elevation review',
        others: 'Vague ballpark number with surprise add-on charges',
    },
    {
        feature: 'Jobsite Cleanliness Guarantee',
        us: 'Daily ground turf protection, dust control, and total site cleanup',
        others: 'Equipment left across lawns, mortar residue unwashed',
    },
];

const lambertvilleFaqs = [
    {
        "q": "Do you help with Lambertville Historic Preservation Commission permits?",
        "a": "Yes. Lambertville’s historic district has specific guidelines for brick, stone, and mortar preservation. We prepare mortar analysis reports and architectural details for commission review."
    },
    {
        "q": "What pavers are recommended around swimming pools in river valley climates?",
        "a": "We install high-density, low-absorption architectural pavers and thermal bluestone that remain cool underfoot, offer slip-resistant textures, and resist chlorine and saltwater splash."
    },
    {
        "q": "How do you prevent hillside erosion on steep Lambertville properties?",
        "a": "We construct engineered gravity stone retaining walls with geotextile soil reinforcement and perforated French drain lines that capture hillside groundwater and channel it away safely."
    },
    {
        "q": "Can you restore wet riverfront stone basements in Lambertville?",
        "a": "Yes. We specialize in interior stone basement repointing using hydraulic lime and vapor-permeable crystalline barriers that seal moisture while allowing the historic stone to breathe."
    },
    {
        "q": "What warranties are offered on Lambertville masonry installations?",
        "a": "Every structural project — from retaining walls to pool foundations and patio sub-bases — carries our comprehensive written 25-Year Workmanship Warranty."
    },
    {
        "q": "How do I schedule an on-site survey in Lambertville?",
        "a": "Fill out our online survey form or call our office. We will schedule a site visit and bring stone and paver samples to your home."
    }
];

export function Lambertville() {
    const [openFaq, setOpenFaq] = useState<string>('');
    const faqRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (openFaq && faqRef.current && !faqRef.current.contains(e.target as Node)) {
                setOpenFaq('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openFaq]);

    return (
        <div className="bg-stone-50 text-stone-900 min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="bg-white border-b border-stone-200/80 overflow-hidden">
                <Container size="full" className="max-w-[1760px] 2xl:max-w-[1840px] px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-14 lg:py-18">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                        {/* Left Column: Hero Stone Project Image */}
                        <div className="lg:col-span-7 xl:col-span-7">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/90 aspect-[4/3] sm:aspect-[16/11] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px] w-full group">
                                <img
                                    src="/images/servicearea/12.jpg"
                                    alt="Inground swimming pool surround with charcoal pavers and privacy enclosure in Lambertville, NJ"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Right Column: Clean Editorial Content */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-widest block font-sans">
                                    Lambertville, NJ • Historic Delaware River Valley
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.15]">
                                    Historic & Riverfront Masonry in Lambertville, NJ
                                </h1>
                            </div>

                            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Nestled along the Delaware River in Hunterdon County, Lambertville is celebrated for historic architecture and river valley topography. Da Graca Masonry & Stone provides specialized historic lime tuckpointing for 19th-century brick and stone townhomes, luxury inground pool surrounds, and slope-stabilizing garden retaining walls. Licensed (#13VH09876500) and fully insured ($2M).
                            </p>

                            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                                <a href="#services">
                                    <Button
                                        size="lg"
                                        className="bg-[#DED9D0] hover:bg-stone-900 hover:text-white text-stone-900 font-extrabold text-xs sm:text-sm px-8 py-5 rounded-md tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer"
                                    >
                                        FIND OUT MORE
                                    </Button>
                                </a>
                                <Link to="/contact#onsite-survey">
                                    <Button
                                        size="lg"
                                        className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm px-6 py-5 rounded-md tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                                    >
                                        <CalendarCheck2 className="h-4 w-4" />
                                        <span>Free On-Site Survey</span>
                                    </Button>
                                </Link>
                            </div>

                            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                                    25-Year Warranty
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                                    NJ Lic #13VH09876500
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                                    (908) 555-7866
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 2. WHY CHOOSE STRIP */}
            <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/70">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                Uncompromising Architectural Standards
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-950 tracking-tight">
                                Why Lambertville Homeowners Choose Da Graca Masonry
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            {[
                                '25+ Years Legacy',
                                'NJ Lic #13VH09876500',
                                'Free Laser On-Site Survey',
                                'No-Mess Clean Jobsite',
                                '25-Year Warranty',
                                '$2M Commercial Insurance',
                                'Authentic Quarry Stones',
                                'Municipal Board Compliance',
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 p-3 rounded-lg bg-white border border-stone-200/80 shadow-2xs text-xs sm:text-sm font-semibold text-stone-800"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-2">
                            Lambertville’s riverfront climate, high water tables, and steep hillside streets demand masonry built with high-permeability drainage and moisture-resilient materials. We deliver authentic restorations and contemporary luxury hardscaping tailored to river valley living.
                        </p>
                    </div>
                </Container>
            </section>

            {/* 3. OUR MASONRY SERVICES */}
            <section id="services" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-stone-200/80 scroll-mt-14">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-3xl mb-12 space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                            Artisan Craftsmanship & Engineering
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Our Masonry Services in Lambertville, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            Comprehensive architectural stonework tailored to historic estates, private residences, and landmark properties.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {lambertvilleServices.map((srv, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-7 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                                            Service 0{idx + 1}
                                        </span>
                                        <span className="text-[11px] text-stone-400 font-mono">Lambertville, NJ</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-heading font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                                        {srv.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                        {srv.desc}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-stone-200/70">
                                    <div className="space-y-1.5">
                                        {srv.features.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-700">
                                                <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        to="/contact#onsite-survey"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-800 pt-1 group/link"
                                    >
                                        <span>Request Estimate for this Service</span>
                                        <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. NEIGHBORHOODS & LANDMARKS SERVED */}
            <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="text-center space-y-3 max-w-2xl mx-auto">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                Hyper-Local Coverage
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight">
                                Masonry Services Across Lambertville Enclaves & Neighborhoods
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                We travel directly to your estate for thorough on-site consultations, laser grade evaluations, and stone sample presentations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 text-amber-700 font-heading font-bold text-base sm:text-lg">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                    <span>Lambertville Communities & Districts</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 font-medium">
                                    {neighborhoods.map((n) => (
                                        <div key={n} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                                            <span>{n}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 text-amber-700 font-heading font-bold text-base sm:text-lg">
                                    <Compass className="h-5 w-5 text-amber-600" />
                                    <span>Nearby Communities & Zip Codes</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 font-medium">
                                    {nearbyTowns.map((t) => (
                                        <div key={t} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-stone-400 shrink-0" />
                                            <span>{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm text-stone-500 text-center leading-relaxed">
                            Don’t see your exact street or enclave listed? We provide comprehensive on-site masonry inspections and line-item estimates across all regional counties.
                        </p>
                    </div>
                </Container>
            </section>

            {/* 5. RECENT MASONRY WORK */}
            <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-3xl mb-12 space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                            Portfolio In Lambertville
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Recent Masonry Work in Lambertville, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            A curated look at structural retaining walls, bluestone terraces, and custom hearths built for discerning homeowners.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                        {recentProjects.map((p, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-7 rounded-xl bg-stone-50 border border-stone-200/90 shadow-sm hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5 group"
                            >
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="stone" className="bg-amber-100 text-amber-950 border-amber-300 text-[11px] font-bold">
                                            {p.category}
                                        </Badge>
                                        <span className="text-[11px] text-stone-400 font-mono">Case 0{idx + 1}</span>
                                    </div>

                                    <h3 className="font-heading font-extrabold text-stone-950 text-lg sm:text-xl group-hover:text-amber-800 transition-colors">
                                        {p.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                        {p.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-stone-200/70 space-y-3">
                                    <div className="space-y-1.5">
                                        {p.specs.map((spec, sIdx) => (
                                            <div key={sIdx} className="flex items-center gap-2 text-xs text-stone-700">
                                                <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                                <span>{spec}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <Link
                                            to="/gallery"
                                            className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1.5 group/g"
                                        >
                                            <span>Explore Gallery Projects</span>
                                            <ArrowRight className="h-3.5 w-3.5 group-hover/g:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 6. COMPARISON TABLE */}
            <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-6xl xl:max-w-7xl mx-auto space-y-8">
                        <div className="text-center space-y-3 max-w-3xl mx-auto">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                True Transparency
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                                Why Lambertville Homeowners Choose Da Graca Over the Competition
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                See how our heirloom craftsmanship and structural standards stack up against typical general masonry contractors.
                            </p>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-stone-900 text-white font-heading">
                                        <th className="p-4 sm:p-5 lg:p-6 font-bold uppercase tracking-wider text-xs sm:text-sm w-[26%]">Standard / Feature</th>
                                        <th className="p-4 sm:p-5 lg:p-6 font-bold uppercase tracking-wider text-xs sm:text-sm text-amber-400 bg-stone-950 border-x border-stone-800 w-[44%]">
                                            Da Graca Masonry & Stone
                                        </th>
                                        <th className="p-4 sm:p-5 lg:p-6 font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-400 w-[30%]">
                                            Typical Other Contractors
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-200">
                                    {comparisonData.map((row, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-stone-50/50 transition-colors' : 'bg-stone-50/70 hover:bg-stone-50 transition-colors'}>
                                            <td className="p-4 sm:p-5 lg:p-6 font-bold text-stone-900">
                                                {row.feature}
                                            </td>
                                            <td className="p-4 sm:p-5 lg:p-6 font-semibold text-amber-950 bg-amber-50/70 border-x border-amber-100/90">
                                                <div className="flex items-start gap-2.5">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{row.us}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 lg:p-6 text-stone-600">
                                                {row.others}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 sm:p-8 lg:p-10 rounded-xl bg-stone-950 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="space-y-1.5 text-center lg:text-left">
                                <h4 className="font-heading font-bold text-lg sm:text-2xl text-white">
                                    Have an Immediate Masonry Question in Lambertville?
                                </h4>
                                <p className="text-xs sm:text-sm lg:text-base text-stone-400 max-w-2xl">
                                    Speak directly with an experienced estimator today at{' '}
                                    <a href="tel:9085557866" className="text-amber-400 font-bold hover:underline">
                                        (908) 555-STONE
                                    </a>
                                    , or choose one of our survey and estimate forms below.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                                <Link to="/#consultation" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto border-stone-700 bg-stone-900/90 hover:bg-stone-800 text-stone-100 hover:text-white font-bold text-xs sm:text-sm px-5 py-5 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                                    >
                                        <FileText className="h-4 w-4 text-amber-500" />
                                        <span>Get Free Estimate Form</span>
                                    </Button>
                                </Link>

                                <Link to="/contact#onsite-survey" className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-6 py-5 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all">
                                        <CalendarCheck2 className="h-4 w-4" />
                                        <span>On-Site Visit Form</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 7. REVIEWS & TESTIMONIALS */}
            <section className="py-14 sm:py-20 lg:py-24 bg-stone-950 text-white">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-3 max-w-2xl mx-auto">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-sans">
                                Lambertville Client Testimonials
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                                Trusted by Discerning Lambertville Homeowners
                            </h2>
                            <div className="flex items-center justify-center gap-2 pt-1 text-sm text-stone-400">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                                    ))}
                                </div>
                                <span className="font-bold text-white">4.9 / 5.0 Rating</span>
                                <span>• Across Google & Houzz Verified Clients</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
    {
        "quote": "Da Graca built our pool patio on Cottage Hill. The charcoal pavers and drainage work are remarkable. It turned our hillside yard into a private resort.",
        "author": "Julian & Rachel S.",
        "area": "Cottage Hill, Lambertville",
        "project": "Pool Paver Patio & Drainage"
    },
    {
        "quote": "Their knowledge of historic lime tuckpointing for our 19th-century brick home was second to none. They respected our property and the historic code.",
        "author": "Eileen M.",
        "area": "Historic District, Lambertville",
        "project": "Historic Brick Repointing & Chimney Rebuild"
    },
    {
        "quote": "Prompt, clean, and master-level stone masonry. Our garden retaining wall stopped our soil runoff completely. Highly recommend them.",
        "author": "Frank T.",
        "area": "Music Mountain Environs",
        "project": "Stone Retaining Wall & Steps"
    }
].map((rev, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 sm:p-7 rounded-xl bg-stone-900/90 border border-stone-800 shadow-md flex flex-col justify-between space-y-4 hover:border-amber-500/60 transition-colors"
                                >
                                    <div className="space-y-3">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                            ))}
                                        </div>
                                        <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                                            "{rev.quote}"
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-stone-800 space-y-1">
                                        <h4 className="font-heading font-bold text-white text-sm">
                                            {rev.author}
                                        </h4>
                                        <p className="text-xs text-amber-400 font-medium">{rev.area}</p>
                                        <p className="text-[11px] text-stone-500">{rev.project}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* 8. SERVING ALL OF NEW JERSEY & REGIONAL ENCLAVES */}
            <ServiceAreasSection
                badge="Tri-State Service Network"
                heading="Serving All of New Jersey & Eastern Pennsylvania"
                subheading="In addition to Lambertville, our master stone artisans actively design and construct residential estate masonry across:"
                bgClassName="bg-[#FAF8F5]"
                activeTown="Lambertville"
            />

            {/* 8.5 INTERACTIVE REGIONAL MAP & LIVE ROUTE PLANNER */}
            <ServiceAreaMapInteractive />

            {/* 9. INTERACTIVE FAQ SECTION */}
            <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div ref={faqRef} className="max-w-5xl xl:max-w-6xl mx-auto space-y-8">
                        <div className="text-center space-y-3 max-w-2xl mx-auto">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                Clear Answers & Guidance
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                                Frequently Asked Questions – Masonry in Lambertville, NJ
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                Everything you need to know about our estimates, material selections, municipal permits, and structural warranties.
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            value={openFaq}
                            onValueChange={setOpenFaq}
                            className="space-y-4"
                        >
                            {lambertvilleFaqs.map((faq, idx) => (
                                <AccordionItem key={faq.q} value={`faq-${idx}`}>
                                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                                    <AccordionContent>{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </Container>
            </section>
        </div>
    );
}
