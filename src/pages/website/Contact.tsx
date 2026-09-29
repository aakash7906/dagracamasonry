import { useState } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Building,
  Calendar,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  LocateFixed,
  Loader2,
  AlertCircle,
  ShoppingCart,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyCity: string;
  surveyDate?: string;
  surveyTimeSlot?: string;
  siteAccessNotes?: string;
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
  const { addEstimate, setIsCartOpen } = useCart();
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Geolocation state
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleFetchLocation = () => {
    setLocationError(null);
    setLocationSuccess(false);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const city =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.suburb ||
              addr.municipality ||
              addr.county ||
              '';
            const state = addr.state || '';
            const postcode = addr.postcode || '';
            const road = addr.road
              ? `${addr.house_number ? addr.house_number + ' ' : ''}${addr.road}`
              : '';

            const parts = [road, city, state, postcode].filter(Boolean);
            const formatted =
              parts.length > 0
                ? parts.join(', ')
                : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

            setFormData((prev) => ({ ...prev, propertyCity: formatted }));
            setLocationSuccess(true);
            setTimeout(() => setLocationSuccess(false), 4000);
          } else {
            setFormData((prev) => ({
              ...prev,
              propertyCity: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            }));
            setLocationSuccess(true);
            setTimeout(() => setLocationSuccess(false), 4000);
          }
        } catch {
          setFormData((prev) => ({
            ...prev,
            propertyCity: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          }));
          setLocationSuccess(true);
          setTimeout(() => setLocationSuccess(false), 4000);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please enter your location manually.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError('Location unavailable. Please enter manually.');
        } else if (error.code === error.TIMEOUT) {
          setLocationError('Location request timed out. Please enter manually.');
        } else {
          setLocationError('Unable to detect location. Please enter manually.');
        }
        setTimeout(() => setLocationError(null), 5000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  // On-Site Survey Calendar State
  const today = new Date();
  const getInitialSurveyDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // skip Sunday
    return d;
  };

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(getInitialSurveyDate);
  const [selectedSlot, setSelectedSlot] = useState<'morning' | 'midday' | 'afternoon'>('midday');
  const [accessNotes, setAccessNotes] = useState('');

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const prev = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonthStart) {
      setCalendarMonth(prev);
    }
  };

  const monthYearStr = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(calendarMonth);

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateDisabled = (dayNum: number) => {
    const dateToCheck = new Date(year, month, dayNum);
    const dateZero = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate());
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dateZero < todayZero) return true;
    if (dateToCheck.getDay() === 0) return true; // Sundays closed for on-site surveys
    return false;
  };

  const timeSlots = [
    {
      id: 'morning' as const,
      label: 'Morning Survey',
      time: '8:30 AM – 11:30 AM',
      icon: Sun,
    },
    {
      id: 'midday' as const,
      label: 'Midday Survey',
      time: '11:30 AM – 2:30 PM',
      icon: Sun,
    },
    {
      id: 'afternoon' as const,
      label: 'Afternoon Survey',
      time: '2:30 PM – 5:30 PM',
      icon: Sunset,
    },
  ];

  const formattedSelectedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyTime =
      timeSlots.find((s) => s.id === selectedSlot)?.time || '11:30 AM – 2:30 PM';
    setFormData((prev) => ({
      ...prev,
      surveyDate: formattedSelectedDate,
      surveyTimeSlot: surveyTime,
      siteAccessNotes: accessNotes,
    }));
    addEstimate({
      type: 'onsite-survey',
      title: 'Detailed On-Site Survey & Estimate',
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      location: formData.propertyCity,
      service: formData.serviceType,
      details: formData.details,
      surveyDate: formattedSelectedDate,
      surveyTimeSlot: surveyTime,
      siteAccessNotes: accessNotes,
      propertyType: formData.propertyType,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      fileName: formData.fileName,
      referralSource: formData.referralSource,
    });
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
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-14">
        <div className="max-w-3xl space-y-4">
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
          <div className="p-6 rounded-md bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
          <div className="p-6 rounded-md bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
          <div className="p-6 rounded-md bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
          <div className="p-6 rounded-md bg-white border border-stone-200 hover:border-amber-500/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-20">
        <div className="rounded-md bg-stone-100/80 border border-stone-200 p-4 sm:p-8 lg:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
                On-Site Master Mason Survey
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
                Schedule Your Detailed On-Site Estimate
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Our licensed master masons personally visit your property to evaluate elevations, inspect soil grades, inspect structural masonry, and prepare a comprehensive, guaranteed line-item proposal.
              </p>

              {/* What Happens Next Checklist */}
              <div className="p-6 rounded-md bg-white border border-stone-200 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  What Happens Next?
                </h4>
                <div className="space-y-3 text-xs text-stone-700">
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-stone-900">Pick Your Survey Date & Window:</strong> Select your preferred walkthrough appointment slot on our interactive calendar.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-stone-900">On-Site Property Inspection:</strong> A master mason arrives on-site to inspect grades, measure dimensions, and review actual stone samples.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="text-stone-900">Guaranteed Line-Item Quote:</strong> Receive a complete, itemized cost proposal, 3D stone layout, fixed schedule, and 25-year warranty terms.
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Callout Box */}
              <div className="p-5 rounded-md bg-amber-50 border border-amber-200 flex items-start gap-4">
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
              <div className="rounded-md bg-white border border-stone-200 p-4 sm:p-8 lg:p-10 shadow-md">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="h-20 w-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                        On-Site Survey Scheduled!
                      </h3>
                      <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
                        Thank you for contacting <strong className="text-amber-700">Da Graca Masonry</strong>. We have logged your on-site property walkthrough request.
                      </p>
                    </div>

                    {/* Confirmed Appointment Card */}
                    <div className="max-w-md mx-auto p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                        <Calendar className="h-4 w-4" />
                        <span>Confirmed Survey Details</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-stone-400 block text-[11px]">Appointment Date:</span>
                          <span className="font-bold text-stone-900">{formData.surveyDate}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[11px]">Arrival Window:</span>
                          <span className="font-bold text-stone-900">{formData.surveyTimeSlot}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[11px]">Property Location:</span>
                          <span className="font-bold text-stone-900">{formData.propertyCity}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[11px]">Survey Status:</span>
                          <span className="font-bold text-emerald-700">Confirmed (Complimentary)</span>
                        </div>
                      </div>
                      {formData.siteAccessNotes && (
                        <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-600">
                          <span className="font-semibold text-stone-700">Access Notes:</span> {formData.siteAccessNotes}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Our lead estimator will call you at <strong className="text-stone-800">{formData.phone}</strong> 24 hours prior to confirm arrival.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <Button
                        onClick={() => setIsCartOpen(true)}
                        className="bg-[#b45309] hover:bg-[#9a3412] text-white text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>View in Cart & Inquiries</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData(initialForm);
                        }}
                        className="border-stone-300 text-xs px-4 py-2.5 rounded-lg cursor-pointer"
                      >
                        Schedule Another Survey
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-stone-900">
                        Detailed Project On-Site Estimate Form
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Fields marked with an asterisk (<span className="text-amber-600">*</span>) are required. Schedule your on-site property survey below.
                      </p>
                    </div>

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
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-stone-700">
                            Property Location / Address <span className="text-amber-600">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleFetchLocation}
                            disabled={isLocating}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#b45309] hover:text-[#9a3412] disabled:opacity-50 cursor-pointer transition-colors"
                            title="Auto-detect current location via GPS"
                          >
                            {isLocating ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin text-[#b45309]" />
                                <span>Detecting...</span>
                              </>
                            ) : (
                              <>
                                <LocateFixed className="h-3 w-3 text-[#b45309]" />
                                <span>Fetch Current Location</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.propertyCity}
                            onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                            placeholder="e.g. 142 Mercer St, Princeton, NJ 08540"
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                        </div>
                        {locationError && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-in fade-in duration-200">
                            <AlertCircle className="h-3 w-3 shrink-0" />
                            <span>{locationError}</span>
                          </p>
                        )}
                        {locationSuccess && (
                          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 animate-in fade-in duration-200">
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>Location detected successfully!</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Interactive On-Site Survey Calendar & Time Slot Booking Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-stone-200">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-[#b45309] text-white flex items-center justify-center shrink-0">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                              Book On-Site Survey Appointment <span className="text-amber-700">*</span>
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              Master masons conduct property surveys Mon – Sat.
                            </p>
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                        {/* Calendar Month & Grid */}
                        <div className="md:col-span-6 bg-stone-50/70 p-3 sm:p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                          <div className="flex items-center justify-between mb-2.5 px-1">
                            <span className="text-xs font-bold text-stone-900 font-heading">
                              {monthYearStr}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={prevMonth}
                                className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                disabled={calendarMonth.getFullYear() === today.getFullYear() && calendarMonth.getMonth() === today.getMonth()}
                                aria-label="Previous month"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={nextMonth}
                                className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 cursor-pointer transition-colors"
                                aria-label="Next month"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Weekdays */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-stone-400 uppercase">
                            <span>Su</span>
                            <span>Mo</span>
                            <span>Tu</span>
                            <span>We</span>
                            <span>Th</span>
                            <span>Fr</span>
                            <span>Sa</span>
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-7 w-7 mx-auto" />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const dayNum = i + 1;
                              const thisDate = new Date(year, month, dayNum);
                              const disabled = isDateDisabled(dayNum);
                              const selected = isSameDay(thisDate, selectedDate);
                              const isToday = isSameDay(thisDate, today);

                              return (
                                <button
                                  key={dayNum}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => setSelectedDate(thisDate)}
                                  className={`h-7 w-7 mx-auto rounded-lg text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${selected
                                      ? 'bg-[#b45309] text-white font-bold shadow-xs scale-105'
                                      : disabled
                                        ? 'text-stone-300 cursor-not-allowed opacity-30'
                                        : isToday
                                          ? 'text-amber-800 font-bold border border-amber-400 bg-amber-50 hover:bg-amber-100'
                                          : 'text-stone-700 hover:bg-white hover:shadow-2xs'
                                    }`}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Survey Arrival Windows */}
                        <div className="md:col-span-6 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                              Choose Arrival Window:
                            </span>
                            <div className="space-y-1.5">
                              {timeSlots.map((slot) => {
                                const Icon = slot.icon;
                                const isSelected = selectedSlot === slot.id;
                                return (
                                  <button
                                    key={slot.id}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot.id)}
                                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${isSelected
                                        ? 'border-[#b45309] bg-amber-50/40 ring-1 ring-[#b45309]/20 shadow-2xs'
                                        : 'border-stone-200 bg-stone-50/70 hover:bg-stone-100 hover:border-stone-300'
                                      }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected
                                            ? 'bg-amber-100 text-[#b45309]'
                                            : 'bg-white text-stone-500 border border-stone-200'
                                          }`}
                                      >
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-stone-900 leading-tight">
                                          {slot.label}
                                        </p>
                                        <p className="text-[10px] text-stone-500">{slot.time}</p>
                                      </div>
                                    </div>
                                    <div
                                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected
                                          ? 'border-[#b45309] bg-[#b45309]'
                                          : 'border-stone-300 bg-white'
                                        }`}
                                    >
                                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Selected chip */}
                          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 text-xs flex items-center gap-2 shadow-2xs">
                            <span className="font-medium text-[11px] leading-tight">
                              <strong>Selected:</strong> {formattedSelectedDate} • {timeSlots.find((s) => s.id === selectedSlot)?.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Site Access / Parking Notes */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Property Access / Parking Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          value={accessNotes}
                          onChange={(e) => setAccessNotes(e.target.value)}
                          placeholder="e.g. Gate code #4912, long driveway, dog in rear yard, architect attending..."
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
                        <Select
                          value={formData.serviceType}
                          onValueChange={(val) => setFormData({ ...formData, serviceType: val })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select discipline..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="natural-stone">Architectural Natural Stone Veneer</SelectItem>
                            <SelectItem value="bluestone-patio">Pennsylvania Bluestone Patio / Terrace</SelectItem>
                            <SelectItem value="brick-pointing">Historic Brick & Tuckpointing</SelectItem>
                            <SelectItem value="retaining-wall">Engineered Retaining Wall</SelectItem>
                            <SelectItem value="fireplace-chimney">Chimney Rebuilding / Hearth</SelectItem>
                            <SelectItem value="commercial">Commercial Masonry / Multi-Unit</SelectItem>
                            <SelectItem value="other">Other Bespoke Masonry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Property Classification
                        </label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(val) => setFormData({ ...formData, propertyType: val })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select property type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Single-Family Private Estate</SelectItem>
                            <SelectItem value="historic">Historic Landmark / Pre-1930s Home</SelectItem>
                            <SelectItem value="commercial">Commercial / Institutional Building</SelectItem>
                            <SelectItem value="new-construction">Architectural New Construction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Row 4: Budget Range and Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Estimated Investment Range
                        </label>
                        <Select
                          value={formData.budgetRange}
                          onValueChange={(val) => setFormData({ ...formData, budgetRange: val })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select investment range..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-15k">Under $15,000 (Repairs & Pointing)</SelectItem>
                            <SelectItem value="$15k-$30k">$15,000 – $30,000 (Patios / Walkways)</SelectItem>
                            <SelectItem value="$30k-$60k">$30,000 – $60,000 (Retaining Walls / Facades)</SelectItem>
                            <SelectItem value="$60k-$120k">$60,000 – $120,000 (Full Estate Masonry)</SelectItem>
                            <SelectItem value="$120k+">$120,000+ (Master Architectural Scope)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Desired Completion Timeline
                        </label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(val) => setFormData({ ...formData, timeline: val })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timeline..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Immediate / Emergency Repair</SelectItem>
                            <SelectItem value="1-3-months">Next 1–3 Months</SelectItem>
                            <SelectItem value="3-6-months">Next 3–6 Months</SelectItem>
                            <SelectItem value="planning">Future Season / Planning & Permits</SelectItem>
                          </SelectContent>
                        </Select>
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
                        className={`p-5 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer ${dragActive
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
                      <Select
                        value={formData.referralSource}
                        onValueChange={(val) => setFormData({ ...formData, referralSource: val })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select referral source..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Search / Google Maps</SelectItem>
                          <SelectItem value="architect">Architect or Landscape Designer Recommendation</SelectItem>
                          <SelectItem value="neighbor">Saw Our Jobsite Sign / Neighbor Referral</SelectItem>
                          <SelectItem value="word-of-mouth">Word of Mouth / Prior Client</SelectItem>
                          <SelectItem value="social">Instagram / Social Media Portfolio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white font-bold text-base py-6 shadow-lg shadow-amber-900/15 flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <CalendarCheck2 className="h-5 w-5" />
                        <span>Confirm & Schedule On-Site Survey</span>
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
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={faq.q} value={`item-${idx}`}>
                <AccordionTrigger>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
