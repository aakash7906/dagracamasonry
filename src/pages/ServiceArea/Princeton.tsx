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

const princetonServices = [
    {
        title: 'Custom Stone Patios & Walkways',
        desc: 'Architectural Pennsylvania thermal bluestone, Tennessee quartzite, and natural fieldstone terraces engineered for freeze-thaw resilience.',
        features: ['Thermal-treated bluestone', 'Sub-base gravel compaction', 'Natural patina finishes'],
    },
    {
        title: 'Engineered Retaining Walls',
        desc: 'Gravity boulder and hand-split stone retaining systems engineered to eliminate soil erosion and hydrostatic pressure on Princeton hillsides.',
        features: ['French drain weep systems', 'Geogrid reinforcement', 'Zero-failure gravity design'],
    },
    {
        title: 'Historic Lime Tuckpointing',
        desc: 'Heritage restoration utilizing custom-formulated non-hydraulic lime mortar that breathes, preserving historic 18th & 19th-century masonry.',
        features: ['Historic commission compliance', 'Spectroscopic mortar matching', 'Gentle low-pressure cleaning'],
    },
    {
        title: 'Architectural Stone Veneer & Facades',
        desc: 'Hand-dressed quarried granite, limestone, and native fieldstone veneer that enhances estate curbside majesty and structural longevity.',
        features: ['Full-bed & thin-stone veneers', 'Corrosion-resistant ties', 'Moisture weep screeds'],
    },
    {
        title: 'Hand-Carved Fireplaces & Chimneys',
        desc: 'Rumford wood-burning fireplaces, outdoor hearths, and full chimney rebuilds engineered with precision smoke-draw aerodynamics.',
        features: ['Refractory firebrick cores', 'Custom flagstone mantels', 'Lead counter-flashing'],
    },
    {
        title: 'Stone Porticos, Stoops & Entry Steps',
        desc: 'Grand colonial front entrances featuring solid bluestone treads, limestone risers, and hand-chiseled balustrade piers.',
        features: ['Frost-depth footings', 'Bullnose or thermal edges', 'Cast-iron railing anchors'],
    },
    {
        title: 'Outdoor Kitchens & Fire Pit Lounges',
        desc: 'Full-service luxury alfresco sanctuaries with integrated stainless grills, granite prep counters, and circular fieldstone fire pits.',
        features: ['Gas & wood-burning designs', 'All-weather cabinetry housings', 'Integrated low-voltage lighting'],
    },
    {
        title: 'Structural Stone Foundation Restoration',
        desc: 'Specialized structural underpinning, fieldstone basement repointing, and damp-proofing for historic Princeton residential basements.',
        features: ['Hydrostatic relief systems', 'Lime grout injection', 'Structural integrity certification'],
    },
    {
        title: 'Commercial Hardscaping & Landmarks',
        desc: 'Institutional-grade natural stone courtyards, municipal walkways, and plaza paving built to withstand heavy foot traffic.',
        features: ['ADA-compliant grading', 'High-density granite curbings', 'Permeable drainage pavers'],
    },
];

const neighborhoods = [
    'Western Section',
    'Princeton Battlefield Area',
    'Riverside Historic District',
    'Littlebrook',
    'Jugtown Historic District',
    'Institute for Advanced Study Woods',
    'Province Line Enclaves',
    'Pretty Brook & Great Road',
    'Carnegie Lake Waterfront',
    'Stony Brook Settlement',
    'Edgerstoune',
    'Tusculum Estates',
];

const nearbyTowns = [
    '08540 (Princeton Core)',
    '08542 (Princeton Borough)',
    '08544 (Princeton University)',
    'Kingston',
    'Hopewell Township',
    'Lawrenceville',
    'Pennington',
    'Rocky Hill',
    'Montgomery Township',
    'Plainsboro',
    'Skillman',
    'West Windsor',
];

const recentProjects = [
    {
        title: 'Western Section Hillside Retaining Wall',
        category: 'Retaining Wall & Drainage',
        image: '/images/masonry/princeton-wall.jpg',
        desc: 'Engineered curved native fieldstone gravity wall with integrated bluestone steps and continuous perforated French drains, built along a terraced garden slope.',
        specs: ['160 linear feet', 'Built-in granite coping', 'Integrated LED step lights'],
    },
    {
        title: 'Historic Portico & Bluestone Steps',
        category: 'Stone Entryway & Stoop',
        image: '/images/masonry/princeton-entryway.jpg',
        desc: 'Meticulously chiseled Pennsylvania bluestone grand entrance steps paired with hand-carved limestone fluted columns and custom wrought-iron handrails.',
        specs: ['Full frost-depth footing', 'Limestone risers', 'Historic district approved'],
    },
    {
        title: 'Rumford Outdoor Hearth & Terrace',
        category: 'Fireplace & Outdoor Living',
        image: '/images/masonry/princeton-fireplace.jpg',
        desc: 'Hand-laid weathered fieldstone outdoor fireplace with a solid 2.5-inch thermal bluestone hearth and custom copper chimney cap on an expansive private patio.',
        specs: ['Rumford smoke chamber', 'Dual firewood storage boxes', 'Gas ignition assist'],
    },
];

const comparisonData = [
    {
        feature: 'Workmanship Guarantee',
        us: '25-Year Structural Workmanship Warranty',
        others: '1-Year or Limited Standard Warranty',
    },
    {
        feature: 'Insurance & NJ Licensing',
        us: 'NJ Lic #13VH09876500 with $2M Liability & Full Workers Comp',
        others: 'Minimum liability, frequently subcontracted crews',
    },
    {
        feature: 'Stone Sourcing & Quality',
        us: '100% Authentic Quarried Pennsylvania Bluestone & Natural Fieldstone',
        others: 'Manufactured precast concrete pavers that fade and crack',
    },
    {
        feature: 'Historic Commission Compliance',
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

const princetonFaqs = [
    {
        q: 'Do you assist with Princeton Historic Preservation Commission approvals and permits?',
        a: 'Yes, absolutely. Many neighborhoods in Princeton (such as the Western Section, Jugtown, and Riverside) are designated historic preservation districts. We prepare architectural elevation drawings, geotechnical calculations for retaining walls, and custom mortar sample mockups compliant with local preservation regulations and Mercer County building codes.',
    },
    {
        q: 'What types of natural stone are recommended for Princeton’s freeze-thaw cycles?',
        a: 'For Princeton estate walkways and patios, authentic Pennsylvania thermal-treated bluestone, hand-split native fieldstone, and dense quarried granite are the premier choices. Unlike manufactured concrete pavers, quarried natural stone will not spall, crack, or fade under Central New Jersey snow, ice melt, and humid summers.',
    },
    {
        q: 'How long does a typical masonry project take in Princeton, NJ?',
        a: 'A standard custom patio or retaining wall installation typically takes 1 to 2 weeks from excavation to final cure. Larger estate transformations involving multi-level terracing, outdoor kitchens, and custom masonry fireplaces usually span 3 to 5 weeks. We maintain continuous on-site presence until your project is 100% completed.',
    },
    {
        q: 'Do you provide on-site stone and mortar test samples before construction starts?',
        a: 'Yes. Prior to laying a single stone, we bring physical stone slabs to your Princeton property so you can inspect their authentic color variations under your home’s natural lighting. We also formulate test mortar joints to ensure seamless color harmony with your home’s existing architecture.',
    },
    {
        q: 'What warranties and insurance protect my Princeton property?',
        a: 'Da Graca Masonry carries $2,000,000 in comprehensive commercial liability insurance and full workers compensation coverage. Every structural masonry installation—including retaining walls, foundations, and patio bases—is backed by our written 25-Year Workmanship Warranty.',
    },
    {
        q: 'How quickly can your team respond to emergency chimney or retaining wall stabilization?',
        a: 'We provide priority 24–48 hour emergency structural evaluations for leaning chimneys, collapsed foundation footings, and storm-damaged retaining walls across Princeton and Mercer County.',
    },
];

export function Princeton() {
    // Interactive FAQ state & click-outside handling
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
            {/* 1. HERO SECTION (Redesigned to match reference image layout) */}
            <section className="bg-white border-b border-stone-200/80 overflow-hidden">
                <Container size="full" className="max-w-[1760px] 2xl:max-w-[1840px] px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-14 lg:py-18">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                        {/* Left Column: Large Hero Firepit & Bluestone Patio Image */}
                        <div className="lg:col-span-7 xl:col-span-7">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/90 aspect-[4/3] sm:aspect-[16/11] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px] w-full group">
                                <img
                                    src="/images/masonry/princeton-hero-firepit.jpg"
                                    alt="Custom circular stone fire pit and bluestone patio in Princeton, NJ"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Right Column: Clean Editorial Content matching reference */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                            {/* Location Tag */}
                            <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-widest block font-sans">
                                    Princeton, NJ
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.15]">
                                    Masonry Contractor in Princeton, NJ
                                </h1>
                            </div>

                            {/* Description Body matching reference style */}
                            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Homeowners in Princeton, NJ — from the Western Section to Riverside and Littlebrook — call Da Graca Masonry & Stone for heirloom stonework built to endure New Jersey winters. With over 25 years of Mercer County experience, we specialize in authentic Pennsylvania bluestone patios, historic lime tuckpointing, concrete driveways, retaining walls, outdoor fire pits, and custom architectural masonry. Licensed (#13VH09876500) and fully insured ($2M).
                            </p>

                            {/* Action Buttons */}
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

                            {/* Quick Trust Highlights */}
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

            {/* 2. WHY CHOOSE DA GRACA MASONRY STRIP */}
            <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/70">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                Uncompromising Architectural Standards
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-950 tracking-tight">
                                Why Princeton Homeowners Choose Da Graca Masonry
                            </h2>
                        </div>

                        {/* Checklist Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            {[
                                '25+ Years Legacy',
                                'NJ Lic #13VH09876500',
                                'Free Laser On-Site Survey',
                                'No-Mess Clean Jobsite',
                                '25-Year Warranty',
                                '$2M Commercial Insurance',
                                'Authentic Quarry Stones',
                                'Historic Board Compliance',
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
                            When investing in landmark residential stonework in Princeton, structural integrity is just as critical as visual elegance. We engineer every project with frost-depth foundations, geotechnical French drains, and historic lime mortars specifically suited to Mercer County's clay-rich soils and freeze-thaw seasonal shifts.
                        </p>
                    </div>
                </Container>
            </section>

            {/* 3. OUR MASONRY SERVICES IN PRINCETON, NJ */}
            <section id="services" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-stone-200/80 scroll-mt-14">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-3xl mb-12 space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                            Artisan Craftsmanship & Engineering
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Our Masonry Services in Princeton, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            Comprehensive architectural stonework tailored to historic estates, private residences, and landmark properties.
                        </p>
                    </div>

                    {/* 9-Card Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {princetonServices.map((srv, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-7 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                                            Service 0{idx + 1}
                                        </span>
                                        <span className="text-[11px] text-stone-400 font-mono">Princeton, NJ</span>
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
                                Masonry Services Across Princeton Neighborhoods & Landmarks
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                We travel directly to your estate for thorough on-site consultations, laser grade evaluations, and stone sample presentations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Princeton Neighborhoods */}
                            <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 text-amber-700 font-heading font-bold text-base sm:text-lg">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                    <span>Princeton Historic Enclaves & Districts</span>
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

                            {/* Card 2: Nearby Municipalities & Zip Codes */}
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
                            Don’t see your exact street or enclave listed? We provide comprehensive on-site masonry inspections and line-item estimates across all 21 New Jersey counties and neighboring Bucks County, PA.
                        </p>
                    </div>
                </Container>
            </section>

            {/* 5. RECENT MASONRY WORK IN PRINCETON, NJ */}
            <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="max-w-3xl mb-12 space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                            Portfolio In Princeton
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                            Recent Masonry Work in Princeton, NJ
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base">
                            A curated look at structural retaining walls, bluestone terraces, and custom hearths built for discerning Princeton homeowners.
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
                                Why Princeton Homeowners Choose Da Graca Over the Competition
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                See how our heirloom craftsmanship and structural standards stack up against typical general masonry contractors.
                            </p>
                        </div>

                        {/* Comparison Table */}
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

                        {/* Emergency / Contact Callout Bar */}
                        <div className="p-6 sm:p-8 lg:p-10 rounded-xl bg-stone-950 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="space-y-1.5 text-center lg:text-left">
                                <h4 className="font-heading font-bold text-lg sm:text-2xl text-white">
                                    Have an Immediate Masonry Question in Princeton?
                                </h4>
                                <p className="text-xs sm:text-sm lg:text-base text-stone-400 max-w-2xl">
                                    Speak directly with an experienced estimator today at{' '}
                                    <a href="tel:9085557866" className="text-amber-400 font-bold hover:underline">
                                        (908) 555-STONE
                                    </a>
                                    , or choose one of our survey and estimate forms below.
                                </p>
                            </div>

                            {/* Action Buttons: Free Estimate Form & On-Site Visit Form */}
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
                                Princeton Client Testimonials
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                                Trusted by Discerning Princeton Homeowners
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
                                    quote:
                                        'The bluestone terrace and retaining wall Da Graca built for our estate on Hodge Road surpassed every expectation. Their daily cleanup and craftsmanship are world-class.',
                                    author: 'David & Eleanor S.',
                                    area: 'Western Section, Princeton',
                                    project: '1,400 sq ft Bluestone Patio & Granite Walls',
                                },
                                {
                                    quote:
                                        'Their knowledge of historic lime mortar in our 1920s Tudor was phenomenal. They successfully navigated the Historic Commission approval process with zero stress for us.',
                                    author: 'Dr. Julian M.',
                                    area: 'Riverside, Princeton',
                                    project: 'Historic Brick & Chimney Tuckpointing',
                                },
                                {
                                    quote:
                                        'Reliable, clean, and master-level stone masonry. Our carved outdoor fireplace is now the centerpiece of all our family gatherings. Highly recommend!',
                                    author: 'Catherine & Peter B.',
                                    area: 'Littlebrook, Princeton',
                                    project: 'Outdoor Fieldstone Fireplace & Dining Hearth',
                                },
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
                subheading="In addition to Princeton, our master stone artisans actively design and construct residential estate masonry in:"
                bgClassName="bg-[#FAF8F5]"
                activeTown="Princeton"
            />

            {/* 8.5 INTERACTIVE REGIONAL MAP & LIVE ROUTE PLANNER */}
            <ServiceAreaMapInteractive />

            {/* 9. INTERACTIVE FAQ SECTION (Relocated to page bottom) */}
            <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-stone-200/80">
                <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div ref={faqRef} className="max-w-5xl xl:max-w-6xl mx-auto space-y-8">
                        <div className="text-center space-y-3 max-w-2xl mx-auto">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-sans">
                                Clear Answers & Guidance
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
                                Frequently Asked Questions – Masonry in Princeton, NJ
                            </h2>
                            <p className="text-stone-600 text-sm sm:text-base">
                                Everything you need to know about our estimates, material selections, historic district permits, and structural warranties.
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            value={openFaq}
                            onValueChange={setOpenFaq}
                            className="space-y-4"
                        >
                            {princetonFaqs.map((faq, idx) => (
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
