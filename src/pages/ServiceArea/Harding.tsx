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

const hardingServices = [
    {
        "title": "Multi-Tier Geometric Entry Landings",
        "desc": "Architectural stone entry stoops featuring multi-tone geometric pavers, contrasting charcoal soldier inlays, and solid bullnose step caps.",
        "features": [
            "Custom geometric layout cuts",
            "Double soldier border accent",
            "Frost-depth concrete foundations"
        ]
    },
    {
        "title": "Master Pennsylvania Bluestone Patios",
        "desc": "Geometric and natural cleft bluestone terraces designed for large-scale outdoor entertaining and sunset estate views.",
        "features": [
            "Patterned ashlar layouts",
            "Thermal true-edge cuts",
            "Laser-leveled subgrade"
        ]
    },
    {
        "title": "Equestrian Farm Stone Boundary Walls",
        "desc": "Traditional dry-laid and mortar-set fieldstone perimeter walls designed to define pastures, paddocks, and estate motor gates.",
        "features": [
            "Hand-split native fieldstone",
            "Deep frost footings",
            "Weather-resistant stone capping"
        ]
    },
    {
        "title": "Belgian Block Cobblestone Curbing",
        "desc": "Hand-cut granite cobblestones set in reinforced concrete haunches to line Harding driveways and landscape beds.",
        "features": [
            "Reinforced concrete cradle",
            "Hand-cut granite blocks",
            "Plow-resistant durability"
        ]
    },
    {
        "title": "Custom Outdoor Fireplaces & Hearths",
        "desc": "Wood-burning and gas stone fireplaces built with Rumford aerodynamic fireboxes and natural stone mantels.",
        "features": [
            "Firebrick chamber lining",
            "Thermal bluestone hearth slabs",
            "Custom chimney spark arrestors"
        ]
    },
    {
        "title": "Multi-Tier Hillside Retaining Walls",
        "desc": "Terraced stone systems that conquer challenging slope elevations and create expansive garden terraces.",
        "features": [
            "Engineered geotextile grids",
            "Integrated bluestone stairs",
            "Concealed drainage channels"
        ]
    },
    {
        "title": "Historic Lime Mortar Restoration",
        "desc": "Restoring historic 18th- and 19th-century Harding farmsteads and stone carriage houses with breathable lime mortars.",
        "features": [
            "100% non-hydraulic lime",
            "Historic preservation compliance",
            "Non-destructive mortar removal"
        ]
    },
    {
        "title": "Outdoor Gourmet Kitchen Enclosures",
        "desc": "Custom stone masonry islands housing built-in stainless grills, warming drawers, and natural granite countertops.",
        "features": [
            "Weatherproof masonry bases",
            "Granite or bluestone counters",
            "Utility line rough-ins"
        ]
    },
    {
        "title": "Basement Foundation Repointing",
        "desc": "Underpinning, damp-proofing, and structural tuckpointing for historic stone basements and bank barns.",
        "features": [
            "Hydraulic pressure relief",
            "Breathable waterproofing",
            "Structural integrity inspection"
        ]
    }
];

const neighborhoods = [
    "New Vernon Village",
    "Green Village Corridor",
    "Logansville Historic Area",
    "Primrose Brook Enclave",
    "Tempe Wick Road Corridor",
    "Pleasantville Road Corridor",
    "Blue Mill Road Estates",
    "Lees Hill Enclave",
    "Dickson’s Mill Area",
    "Great Swamp Perimeter",
    "Van Beuren Road Corridor",
    "Baileys Mill Corridor"
];

const nearbyTowns = [
    "07976 (Harding / New Vernon)",
    "Morristown (07960)",
    "Mendham (07945)",
    "Chatham (07928)",
    "Madison (07940)",
    "Bernardsville (07924)",
    "Basking Ridge (07920)",
    "Far Hills (07931)",
    "Morris County",
    "Somerset County",
    "Long Hill",
    "Chester"
];

const recentProjects = [
    {
        "title": "Green Village Multi-Tier Entry Stoop",
        "category": "Entry Stoop",
        "image": "/images/servicearea/19.jpg",
        "desc": "Installed a custom geometric stone entry landing with charcoal border inlays and matching multi-tone paver courtyard in Harding.",
        "specs": [
            "Multi-tier geometric landing",
            "Charcoal border inlay",
            "Deep frost-line footing"
        ]
    },
    {
        "title": "Tempe Wick Fieldstone Paddock Wall",
        "category": "Fieldstone Wall",
        "image": "/images/servicearea/4.jpg",
        "desc": "Constructed 180 feet of double-faced native fieldstone perimeter wall along an equestrian paddock.",
        "specs": [
            "180 linear feet",
            "Hand-dressed local fieldstone",
            "Frost-line concrete footer"
        ]
    },
    {
        "title": "Harding Estate Bluestone Terrace",
        "category": "Bluestone Patio",
        "image": "/images/servicearea/7.jpg",
        "desc": "Crafted an expansive 1,200 sq ft Pennsylvania thermal bluestone entertainment terrace with built-in stone benches and lighting.",
        "specs": [
            "1,200 sq ft bluestone",
            "Built-in stone benches",
            "Concealed LED light fixtures"
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

const hardingFaqs = [
    {
        "q": "Do you manage environmental and zoning permits for Harding Township projects?",
        "a": "Yes. Harding Township has specific environmental and large-lot zoning guidelines. We handle all site plan submissions, stormwater calculations, and permit processing."
    },
    {
        "q": "What is the advantage of adding a charcoal border inlay to an entry stoop?",
        "a": "A contrasting charcoal soldier border creates architectural depth, frames the entryway, and visually highlights steps for safety during day and night."
    },
    {
        "q": "How do you prevent weeds and sinking on paver installations in Harding?",
        "a": "We excavate 10–12 inches, install high-tensile geotextile fabric, compact dense crushed stone in 2-inch lifts, and seal joints with premium polymeric sand that sets hard like concrete."
    },
    {
        "q": "Can you build stone entrance pillars for Harding estate gates?",
        "a": "Yes. We construct custom masonry driveway entrance columns complete with electrical conduits for automated gates, lantern fixtures, and intercom systems."
    },
    {
        "q": "Do you carry full liability insurance and licensing for Morris County?",
        "a": "Yes. Da Graca Masonry carries $2,000,000 in general liability insurance, full workers compensation, and NJ Home Improvement Contractor License #13VH09876500."
    },
    {
        "q": "How do I schedule a complimentary on-site consultation in Harding?",
        "a": "You can contact us via our online survey form or call us directly. We provide comprehensive written estimates with itemized line items and material samples."
    }
];

export function Harding() {
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
                                    src="/images/servicearea/19.jpg"
                                    alt="Multi-tiered geometric stone entry landing with charcoal soldier border in Harding Township, NJ"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Right Column: Clean Editorial Content */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-widest block font-sans">
                                    Harding, NJ • Morris County Country Estates
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.15]">
                                    Estate Stone Masonry in Harding Township, NJ
                                </h1>
                            </div>

                            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Preserving the pastoral beauty and timeless architectural standard of Harding Township, Da Graca Masonry & Stone builds custom geometric stone entry landings, extensive bluestone courtyards, equestrian fieldstone retaining walls, and custom outdoor hearths. Licensed (#13VH09876500) and fully insured ($2M).
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
                                Why Harding Township Homeowners Choose Da Graca Masonry
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
                            Harding Township is renowned for grand country estates, rolling equestrian acreage, and minimum 3-acre zoning. We engineer hardscapes with heavy aggregate foundations, precision edge restraints, and architectural border inlays that last for generations.
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
                            Our Masonry Services in Harding, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            Comprehensive architectural stonework tailored to historic estates, private residences, and landmark properties.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {hardingServices.map((srv, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-7 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                                            Service 0{idx + 1}
                                        </span>
                                        <span className="text-[11px] text-stone-400 font-mono">Harding, NJ</span>
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
                                Masonry Services Across Harding Enclaves & Neighborhoods
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                We travel directly to your estate for thorough on-site consultations, laser grade evaluations, and stone sample presentations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 text-amber-700 font-heading font-bold text-base sm:text-lg">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                    <span>Harding Communities & Districts</span>
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
                            Portfolio In Harding
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Recent Masonry Work in Harding, NJ
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
                                Why Harding Homeowners Choose Da Graca Over the Competition
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
                                    Have an Immediate Masonry Question in Harding?
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
                                Harding Client Testimonials
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                                Trusted by Discerning Harding Homeowners
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
        "quote": "Da Graca created an architectural stone entry for our Harding home that is truly unique. The geometric border cuts and level landings are perfection.",
        "author": "Alexander & Claire V.",
        "area": "Green Village, Harding",
        "project": "Geometric Stone Entry Stoop & Patio"
    },
    {
        "quote": "Their craftsmanship on our equestrian property stone walls is outstanding. They understand Harding aesthetics and zoning requirements thoroughly.",
        "author": "Patricia G.",
        "area": "Tempe Wick Area, Harding",
        "project": "Fieldstone Paddock Walls & Gate Pillars"
    },
    {
        "quote": "On time, on budget, and impeccable cleanup every single afternoon. We could not be happier with our new bluestone patio.",
        "author": "William R.",
        "area": "Pleasantville Road, Harding",
        "project": "Bluestone Terrace & Walkways"
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
                subheading="In addition to Harding, our master stone artisans actively design and construct residential estate masonry across:"
                bgClassName="bg-[#FAF8F5]"
                activeTown="Harding"
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
                                Frequently Asked Questions – Masonry in Harding, NJ
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
                            {hardingFaqs.map((faq, idx) => (
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
