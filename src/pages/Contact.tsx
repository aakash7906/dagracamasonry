import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  ChevronDown,
  Building,
  Sparkles,
} from 'lucide-react';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyCity: string;
  serviceType: string;
  propertyType: string;
  budgetRange: string;
  timeline: string;
  details: string;
  referralSource: string;
  fileName?: string;
}

const initialForm: ContactFormData = {
  fullName: '',
  phone: '',
  email: '',
  propertyCity: '',
  serviceType: 'natural-stone',
  propertyType: 'residential',
  budgetRange: '$15k-$30k',
  timeline: '1-3-months',
  details: '',
  referralSource: 'google',
};

const faqs = [
  {
    q: 'How does your on-site estimate and consultation process work?',
    a: 'A master mason from our team will personally visit your property to inspect site elevations, soil conditions, and structural requirements. We discuss stone species, mortar options, and provide a comprehensive line-item estimate—typically within 48–72 hours of the site survey.',
  },
  {
    q: 'Do you provide physical stone and mortar samples before construction begins?',
    a: 'Yes, absolutely. For all architectural stone veneers, bluestone terraces, and historic tuckpointing, we provide actual quarry samples and prepare on-site test mortar mockups to guarantee color harmony with your home.',
  },
  {
    q: 'What warranties and insurance coverage protect my project?',
    a: 'Da Graca Masonry carries $2,000,000 in comprehensive commercial liability and full workers compensation. All our structural stone, retaining wall, and patio installations are backed by our 25-Year Workmanship Warranty.',
  },
  {
    q: 'Do you handle municipal building permits and historic preservation approvals?',
    a: 'Yes. We prepare structural drawings, geotechnical specifications for retaining walls, and historic mortar laboratory reports required by local zoning boards and historic preservation commissions.',
  },
  {
    q: 'How quickly can you respond to emergency chimney or wall failures?',
    a: 'We offer priority 24–48 hour emergency structural stabilization for leaning chimneys, collapsed foundation stones, or severe storm damage to retaining walls across NJ and Eastern PA.',
  },
];

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, fileName: e.dataTransfer.files[0].name });
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-stone-50 text-stone-900 min-h-screen">
      {/* Header Banner */}
      <Container className="mb-14">
        <div className="max-w-3xl space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-700 mr-1.5 inline" />
            Direct Communication & Free Estimates
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Connect With Our Master Stonemasons
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl leading-relaxed">
            Planning a custom natural stone facade, bluestone terrace, or historic brick restoration? Contact our team for prompt consultations, blueprint reviews, and itemized estimates.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>NJ Licensed Builder #13VH09823400</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-600" />
              <span>Fully Insured & Bonded ($2M Aggregate)</span>
            </div>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Direct Phone */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-lg">Direct Phone</h3>
              <p className="text-xs text-stone-500">
                Speak directly with an experienced masonry estimator:
              </p>
              <div className="space-y-1">
                <a
                  href="tel:9085557866"
                  className="block text-base font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  (908) 555-STONE
                </a>
                <span className="block text-xs text-stone-500">Alt: (908) 555-7866</span>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Mon – Sat: 7:00 AM – 6:00 PM</span>
            </div>
          </div>

          {/* Card 2: Email Blueprints */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-lg">Email & Drawings</h3>
              <p className="text-xs text-stone-500">
                Send blueprints, architectural CAD files, or jobsite photos:
              </p>
              <div className="space-y-1">
                <a
                  href="mailto:estimates@dagracamasonry.com"
                  className="block text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors truncate"
                >
                  estimates@dagracamasonry.com
                </a>
                <span className="block text-xs text-stone-500">info@dagracamasonry.com</span>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Guaranteed reply within 24h</span>
            </div>
          </div>

          {/* Card 3: Yard & Office */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-lg">HQ & Yard</h3>
              <p className="text-xs text-stone-500">
                Central operational base and stone fabrication staging yard:
              </p>
              <div className="space-y-0.5 text-xs text-stone-700 font-medium">
                <p>Bridgewater, NJ 08807</p>
                <p className="text-stone-500">Somerset County, New Jersey</p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Yard visits by appointment</span>
            </div>
          </div>

          {/* Card 4: Service Radius */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-lg">Service Territory</h3>
              <p className="text-xs text-stone-500">
                Premier service radius across tri-state estates & historic towns:
              </p>
              <div className="text-xs text-stone-700 space-y-0.5">
                <p>• Somerset, Hunterdon, Morris</p>
                <p>• Mercer, Union & Essex County</p>
                <p>• Bucks County, PA & Rockland, NY</p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Free on-site travel in radius</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Main Form & Scope Section */}
      <Container className="mb-20">
        <div className="rounded-3xl bg-stone-100/80 border border-stone-200 p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
                Comprehensive Estimate
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
                Request Your On-Site Masonry Proposal
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Please complete the project inquiry details. The more information you provide regarding stone preferences, approximate dimensions, or site conditions, the faster our estimators can evaluate your scope.
              </p>

              {/* What Happens Next Checklist */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  What Happens Next?
                </h4>
                <div className="space-y-3 text-xs text-stone-700">
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-stone-900">Review & Initial Phone Chat:</strong> An estimator evaluates your project requirements within 24 hours.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-stone-900">On-Site Site Survey:</strong> We walk your property, take elevations, and review material samples in person.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="text-stone-900">Detailed Line-Item Quote:</strong> Complete scope breakdown, stone specifications, timeline, and warranty terms.
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Callout Box */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-900">
                    Emergency Chimney or Retaining Wall Issue?
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    If you suspect an imminent wall collapse, heavy water leak through brickwork, or loose chimney bricks, please call us directly for priority dispatch.
                  </p>
                  <a
                    href="tel:9085557866"
                    className="inline-block pt-1 text-xs font-bold text-amber-700 hover:underline"
                  >
                    Call Immediate Emergency Line: (908) 555-STONE →
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-10 shadow-md">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-5"
                  >
                    <div className="h-20 w-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-bold font-heading text-stone-900">
                      Inquiry Successfully Received!
                    </h3>
                    <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
                      Thank you for contacting <strong className="text-amber-700">Da Graca Masonry</strong>. Your project details have been assigned to our senior masonry estimator. We will review your requirements and reach out via phone or email within 24 business hours.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData(initialForm);
                        }}
                        className="border-stone-300"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-2xl font-heading font-bold text-stone-900 mb-2">
                      Project Estimate Request Form
                    </h3>
                    <p className="text-xs text-stone-500 -mt-3 mb-6">
                      Fields marked with an asterisk (<span className="text-amber-600">*</span>) are required.
                    </p>

                    {/* Row 1: Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Full Name <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Thomas Harrington"
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Phone Number <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(908) 000-0000"
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email and Property Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Email Address <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="thomas@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          City / Municipality & Zip <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.propertyCity}
                          onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                          placeholder="e.g. Princeton, NJ 08540"
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service Type and Property Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Primary Masonry Discipline <span className="text-amber-600">*</span>
                        </label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="natural-stone">Architectural Natural Stone Veneer</option>
                          <option value="bluestone-patio">Pennsylvania Bluestone Patio / Terrace</option>
                          <option value="brick-pointing">Historic Brick & Tuckpointing</option>
                          <option value="retaining-wall">Engineered Retaining Wall</option>
                          <option value="fireplace-chimney">Chimney Rebuilding / Hearth</option>
                          <option value="commercial">Commercial Masonry / Multi-Unit</option>
                          <option value="other">Other Bespoke Masonry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Property Classification
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="residential">Single-Family Private Estate</option>
                          <option value="historic">Historic Landmark / Pre-1930s Home</option>
                          <option value="commercial">Commercial / Institutional Building</option>
                          <option value="new-construction">Architectural New Construction</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Budget Range and Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Estimated Investment Range
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="under-15k">Under $15,000 (Repairs & Pointing)</option>
                          <option value="$15k-$30k">$15,000 – $30,000 (Patios / Walkways)</option>
                          <option value="$30k-$60k">$30,000 – $60,000 (Retaining Walls / Facades)</option>
                          <option value="$60k-$120k">$60,000 – $120,000 (Full Estate Masonry)</option>
                          <option value="$120k+">$120,000+ (Master Architectural Scope)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Desired Completion Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="urgent">Immediate / Emergency Repair</option>
                          <option value="1-3-months">Next 1–3 Months</option>
                          <option value="3-6-months">Next 3–6 Months</option>
                          <option value="planning">Future Season / Planning & Permits</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5: Project Scope Details */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Project Scope, Stone Preferences & Details <span className="text-amber-600">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Please describe what you are looking to build or restore. E.g.: 'We want to replace our deteriorating wood deck with a 1,200 sq ft bluestone patio with sitting walls, fire pit, and stone steps leading to lawn...'"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
                      />
                    </div>

                    {/* Drag and Drop Mock File Dropzone */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Attach Architectural Plans or Current Jobsite Photos (Optional)
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleFileDrop}
                        className={`p-5 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer ${
                          dragActive
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-stone-300 bg-stone-50 hover:bg-stone-100/70'
                        }`}
                        onClick={() => {
                          const input = document.getElementById('file-upload-input');
                          if (input) input.click();
                        }}
                      >
                        <input
                          id="file-upload-input"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFormData({ ...formData, fileName: e.target.files[0].name });
                            }
                          }}
                        />
                        <UploadCloud className="h-7 w-7 text-amber-600 mx-auto mb-2" />
                        {formData.fileName ? (
                          <div className="text-xs text-amber-700 font-semibold flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Attached: {formData.fileName}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-xs text-stone-700 font-medium">
                              Drag and drop blueprints or site photos here, or <span className="text-amber-700 underline">browse files</span>
                            </p>
                            <p className="text-[11px] text-stone-500 mt-1">
                              Supports PDF, JPG, PNG, DWG up to 25MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Referral source */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        How Did You Hear About Da Graca Masonry?
                      </label>
                      <select
                        value={formData.referralSource}
                        onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="google">Google Search / Google Maps</option>
                        <option value="architect">Architect or Landscape Designer Recommendation</option>
                        <option value="neighbor">Saw Our Jobsite Sign / Neighbor Referral</option>
                        <option value="word-of-mouth">Word of Mouth / Prior Client</option>
                        <option value="social">Instagram / Social Media Portfolio</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-base py-6 shadow-lg shadow-amber-600/20"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        <span>Submit Project Consultation Request</span>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive FAQ Section */}
      <Container className="mb-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
              Common Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 text-sm">
              Everything you need to know about scheduling, stone sourcing, and estimate appointments.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-amber-700 transition-colors"
                  >
                    <span className="font-heading font-bold text-stone-900 text-base sm:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
