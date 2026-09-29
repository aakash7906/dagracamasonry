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

const newvernonServices = [
    {
        "title": "Natural Cleft Bluestone Patios & Steps",
        "desc": "Hand-chiseled natural cleft Pennsylvania bluestone patios paired with massive rockface stone slab garden steps.",
        "features": [
            "Natural cleft non-slip texture",
            "Solid stone slab garden risers",
            "Deep compacted aggregate bed"
        ]
    },
    {
        "title": "Estate Fieldstone Boundary Walls",
        "desc": "Traditional dry-laid and mortar-set native fieldstone perimeter walls designed to define pastures, gardens, and motor gates.",
        "features": [
            "Hand-split native fieldstone",
            "Deep frost footings",
            "Weather-resistant capping"
        ]
    },
    {
        "title": "Historic Lime Mortar Restoration",
        "desc": "Preservation tuckpointing for historic 18th- and 19th-century New Vernon stone residences and carriage houses using breathable lime mortar.",
        "features": [
            "100% non-hydraulic lime",
            "Historic preservation compliance",
            "Non-destructive mortar removal"
        ]
    },
    {
        "title": "Grand Entrance Steps & Porticos",
        "desc": "Natural stone entrance steps featuring solid 2.5-inch bluestone landings, stone risers, and hand-carved pillars.",
        "features": [
            "Frost-depth foundation guarantee",
            "Bullnose or rockface edges",
            "Cast-iron handrail mounting"
        ]
    },
    {
        "title": "Custom Outdoor Fireplaces & Hearths",
        "desc": "Wood-burning fireplaces and circular fire pits built with heavy local fieldstone and heat-resistant firebrick chambers.",
        "features": [
            "Refractory firebox design",
            "Custom thermal mantels",
            "Integrated wood storage boxes"
        ]
    },
    {
        "title": "Cobblestone Courtyards & Driveway Aprons",
        "desc": "Hand-split Belgian block driveway aprons set in reinforced concrete to protect gravel and asphalt estate driveways.",
        "features": [
            "Reinforced concrete cradle",
            "Hand-cut granite cobblestones",
            "Heavy farm equipment rated"
        ]
    },
    {
        "title": "Multi-Tier Hillside Retaining Walls",
        "desc": "Engineered stone retaining walls that conquer rolling slopes and carve out sweeping garden terraces.",
        "features": [
            "Geogrid earth tie-backs",
            "Continuous hydrostatic drainage",
            "Solid stone coping"
        ]
    },
    {
        "title": "Outdoor Gourmet Kitchen Pavilions",
        "desc": "Custom fieldstone cooking islands housing built-in stainless grills, pizza ovens, and granite prep counters.",
        "features": [
            "Weatherproof masonry bases",
            "Granite or bluestone counters",
            "Utility line rough-ins"
        ]
    },
    {
        "title": "Basement Foundation Damp-Proofing",
        "desc": "Structural fieldstone basement repointing, hydraulic pressure relief, and interior vapor barriers.",
        "features": [
            "Lime grout injection",
            "Perimeter drainage tie-in",
            "Structural certification"
        ]
    }
];

const neighborhoods = [
    "New Vernon Village Historic District",
    "Blue Mill Road Corridor",
    "Pleasantville Road Corridor",
    "Lees Hill Road Enclave",
    "Silver Lake Environs",
    "Great Swamp Wildlife Refuge Border",
    "Village Road Corridor",
    "Glen Alpin Historic Environs",
    "Dickson’s Mill Area",
    "Primrose Brook Corridor",
    "Van Beuren Road Corridor",
    "Red Gate Road Enclave"
];

const nearbyTowns = [
    "07976 (New Vernon / Harding)",
    "Morristown (07960)",
    "Mendham (07945)",
    "Chatham (07928)",
    "Madison (07940)",
    "Bernardsville (07924)",
    "Basking Ridge (07920)",
    "Far Hills",
    "Morris County",
    "Somerset County",
    "Short Hills",
    "Summit"
];

const recentProjects = [
    {
        "title": "Blue Mill Road Bluestone Terrace & Steps",
        "category": "Patio & Garden Steps",
        "image": "/images/servicearea/18.jpg",
        "desc": "Installed a natural cleft Pennsylvania bluestone terrace with thick rockface stone slab garden steps flanked by dry-stacked granite retaining walls.",
        "specs": [
            "900 sq ft cleft bluestone",
            "Solid rockface stone steps",
            "Flanking granite walls"
        ]
    },
    {
        "title": "New Vernon Village Fieldstone Perimeter Wall",
        "category": "Fieldstone Wall",
        "image": "/images/servicearea/4.jpg",
        "desc": "Constructed 200 feet of double-faced native fieldstone boundary wall along an estate border in the historic district.",
        "specs": [
            "200 linear feet",
            "Hand-dressed local fieldstone",
            "Frost-line concrete footer"
        ]
    },
    {
        "title": "Pleasantville Road Historic Lime Repointing",
        "category": "Historic Restoration",
        "image": "/images/servicearea/10.jpg",
        "desc": "Restored exterior stone masonry on an 1850s carriage house using custom-analyzed non-hydraulic lime mortar.",
        "specs": [
            "100% lime mortar mix",
            "Historic preservation approved",
            "Zero portland cement"
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

const newvernonFaqs = [
    {
        "q": "How do you adhere to Harding Township and New Vernon historic preservation codes?",
        "a": "New Vernon has strict historic preservation standards. We prepare detailed elevation drawings, stone split samples, and lime mortar formulations that comply fully with local historic guidelines."
    },
    {
        "q": "What is the advantage of rockface stone slab garden steps over poured concrete steps?",
        "a": "Natural stone slabs are carved from solid rock and will never chip, flake, or crack from frost. They provide organic weight and permanence that blends into natural gardens."
    },
    {
        "q": "Can you match historic fieldstone walls found on New Vernon country properties?",
        "a": "Yes. We select native regional fieldstone with authentic moss, iron weathering, and quarry splits that match existing historic walls."
    },
    {
        "q": "Do you carry commercial insurance adequate for high-value New Vernon estates?",
        "a": "Yes. Da Graca Masonry carries $2,000,000 in comprehensive commercial liability coverage and full workers compensation on every job."
    },
    {
        "q": "What warranty protects New Vernon homeowners?",
        "a": "Every structural masonry installation is backed by our written 25-Year Workmanship Warranty."
    },
    {
        "q": "How do I arrange a private site visit in New Vernon?",
        "a": "Contact us through our online survey form or phone. We will visit your property, review site conditions, and present physical stone samples."
    }
];

export function NewVernon() {
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
                                    src="/images/servicearea/18.jpg"
                                    alt="Natural cleft bluestone patio with rustic stone slab garden steps in New Vernon, NJ"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Right Column: Clean Editorial Content */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-widest block font-sans">
                                    New Vernon, NJ • Harding Township Enclave
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.15]">
                                    Master Stone Masonry & Heritage Restorations in New Vernon, NJ
                                </h1>
                            </div>

                            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                New Vernon in Harding Township is one of New Jersey’s most treasured historic rural enclaves. Da Graca Masonry & Stone provides estate owners with authentic cleft Pennsylvania bluestone terraces, rockface garden stairways, fieldstone perimeter boundary walls, and traditional lime mortar restorations. Licensed (#13VH09876500) and fully insured ($2M).
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
                                Why New Vernon Estate Owners Choose Da Graca Masonry
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
                            New Vernon’s protected rural character, historic zoning standards, and pastoral landscapes demand stonework crafted from genuine quarried stones. We deliver artisan-level stone splitting, non-hydraulic lime restorations, and discrete site operations.
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
                            Our Masonry Services in New Vernon, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            Comprehensive architectural stonework tailored to historic estates, private residences, and landmark properties.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {newvernonServices.map((srv, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-7 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                                            Service 0{idx + 1}
                                        </span>
                                        <span className="text-[11px] text-stone-400 font-mono">New Vernon, NJ</span>
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
                                Masonry Services Across New Vernon Enclaves & Neighborhoods
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                We travel directly to your estate for thorough on-site consultations, laser grade evaluations, and stone sample presentations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 text-amber-700 font-heading font-bold text-base sm:text-lg">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                    <span>New Vernon Communities & Districts</span>
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
                            Portfolio In New Vernon
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Recent Masonry Work in New Vernon, NJ
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
                                Why New Vernon Homeowners Choose Da Graca Over the Competition
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
                                    Have an Immediate Masonry Question in New Vernon?
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
                                New Vernon Client Testimonials
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                                Trusted by Discerning New Vernon Homeowners
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
        "quote": "Da Graca installed our bluestone patio and stone slab steps in New Vernon. The natural cleft texture and masonry work fit our historic home perfectly.",
        "author": "George & Victoria S.",
        "area": "Blue Mill Road, New Vernon",
        "project": "Bluestone Terrace & Rockface Steps"
    },
    {
        "quote": "Their restoration of our fieldstone boundary wall was magnificent. They preserved every historic stone and made the wall rock solid.",
        "author": "Charles D.",
        "area": "New Vernon Historic District",
        "project": "Fieldstone Wall Restoration"
    },
    {
        "quote": "Polite, highly skilled, and quiet. They respected our property and finished the job on time. Outstanding masons.",
        "author": "Eleanor H.",
        "area": "Lees Hill Road, New Vernon",
        "project": "Front Entrance Stoop & Walkway"
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
                subheading="In addition to New Vernon, our master stone artisans actively design and construct residential estate masonry across:"
                bgClassName="bg-[#FAF8F5]"
                activeTown="New Vernon"
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
                                Frequently Asked Questions – Masonry in New Vernon, NJ
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
                            {newvernonFaqs.map((faq, idx) => (
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
