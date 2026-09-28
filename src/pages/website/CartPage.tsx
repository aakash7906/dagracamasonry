import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, EstimateInquiry } from '@/context/CartContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  HardHat,
  Printer,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';

export function CartPage() {
  const {
    items,
    estimates,
    itemCount,
    removeItem,
    updateQuantity,
    removeEstimate,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState('');

  const quickEstimates = estimates.filter((e) => e.type === 'quick-estimate');
  const onSiteEstimates = estimates.filter((e) => e.type === 'onsite-survey');
  const hasItems = items.length > 0 || estimates.length > 0;

  const handleTransmitInquiries = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionReference('DGM-' + Math.floor(100000 + Math.random() * 900000));
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100/70 pt-4 sm:pt-8 pb-16 sm:pb-24">
      <Container size="wide" className="px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb - Responsive Font & Spacing */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs text-stone-500 mb-4 sm:mb-6 font-medium overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-amber-800 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-800 font-semibold truncate">Cart & Inquiries</span>
        </nav>

        {/* Page Header - Responsive Padding & Layout */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-stone-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-xs relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-amber-500/5 rounded-full pointer-events-none blur-xl" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 flex-wrap">
                <ShoppingBag className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                <span>Project Dispatch Hub</span>
                <span className="text-amber-800/80 font-semibold">• {itemCount} {itemCount === 1 ? 'inquiry' : 'inquiries'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-stone-900 tracking-tight leading-tight">
                Cart & Consultation Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
                Review your submitted Quick Free Estimates, scheduled On-Site Surveys, and stone sample kits before our project director contacts you.
              </p>
            </div>

            {hasItems && (
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-2 md:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 text-xs font-semibold flex-1 sm:flex-initial py-2 sm:py-2.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="border-stone-200 text-stone-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold flex-1 sm:flex-initial py-2 sm:py-2.5"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        {isSubmitted ? (
          /* Submission Confirmation Banner */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-emerald-300 p-5 sm:p-8 md:p-12 text-center max-w-2xl mx-auto shadow-md"
          >
            <div className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              Inquiries Dispatched to Master Masons
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-stone-900 mt-3">
              Consultation & Estimate Confirmed
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed max-w-md mx-auto">
              Your inquiry docket has been sent directly to our chief masonry estimator. We will contact you within 24 hours to confirm your project parameters and appointment details.
            </p>

            <div className="my-5 sm:my-6 p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-left space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Docket Reference:</span>
                <span className="font-mono font-bold text-stone-900">{submissionReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimates & Surveys:</span>
                <span className="font-semibold text-stone-900">{estimates.length} forms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Stone Swatches:</span>
                <span className="font-semibold text-stone-900">{items.length} swatches</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
                <span className="text-stone-900">Inquiry Status:</span>
                <span className="text-emerald-700 font-semibold">Active & Confirmed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold w-full sm:w-auto py-2.5"
              >
                Back to Cart Hub
              </Button>
              <Link to="/gallery" className="w-full sm:w-auto">
                <Button className="bg-[#b45309] hover:bg-[#9a3412] text-white text-xs font-bold w-full py-2.5">
                  Explore Stone Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : !hasItems ? (
          /* Empty State */
          <div className="bg-white rounded-xl sm:rounded-2xl border border-stone-200 p-6 sm:p-12 md:p-16 text-center max-w-2xl mx-auto shadow-xs space-y-5">
            <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-stone-900">
                Your Cart & Inquiry Hub is Empty
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                You haven't submitted any estimate forms or added sample stones yet. Choose an option below to get started with Da Graca Masonry:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto pt-3 text-left">
              <Link
                to="/#consultation-form"
                className="p-3.5 sm:p-4 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all group"
              >
                <div className="text-amber-800 font-bold text-sm">            
                  <span>Quick Free Estimate</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Preliminary estimate within 24-48 hours. No site visit needed yet.
                </p>
                <div className="mt-3 text-xs font-semibold text-amber-800 flex items-center gap-1 group-hover:underline">
                  <span>Fill Quick Form</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>

              <Link
                to="/contact"
                className="p-3.5 sm:p-4 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Detailed On-Site Survey</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Book a date and time slot for a comprehensive on-property structural review.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-800 flex items-center gap-1 group-hover:underline">
                  <span>Book Site Visit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>

            <div className="pt-2">
              <Link to="/gallery">
                <Button variant="outline" size="sm" className="border-stone-300 text-stone-700 hover:bg-stone-50 text-xs py-2">
                  Browse Stone Swatches & Finishes
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart Grid: Stacks on mobile/tablet, 2-column on desktop (lg:grid-cols-12) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Form Submissions & Swatches */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* SECTION: ON-SITE ESTIMATE & SURVEY BOOKINGS */}
              {onSiteEstimates.length > 0 && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-stone-900 text-base sm:text-lg">
                          Detailed On-Site Survey Bookings
                        </h2>
                        <p className="text-[11px] sm:text-xs text-stone-500">
                          Scheduled visits for physical measurement, elevation & engineering review
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200">
                      {onSiteEstimates.length} {onSiteEstimates.length === 1 ? 'Survey' : 'Surveys'}
                    </span>
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    {onSiteEstimates.map((est) => (
                      <OnSiteCard key={est.id} estimate={est} onRemove={() => removeEstimate(est.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: QUICK FREE ESTIMATES */}
              {quickEstimates.length > 0 && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-stone-900 text-base sm:text-lg">
                          Quick Free Preliminary Estimates
                        </h2>
                        <p className="text-[11px] sm:text-xs text-stone-500">
                          Fast turn-around scope quotes based on your submitted specs
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-200">
                      {quickEstimates.length} {quickEstimates.length === 1 ? 'Estimate' : 'Estimates'}
                    </span>
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    {quickEstimates.map((est) => (
                      <QuickCard key={est.id} estimate={est} onRemove={() => removeEstimate(est.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: STONE SAMPLE SWATCHES */}
              {items.length > 0 && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-stone-900 text-base sm:text-lg">
                          Natural Stone Swatches & Material Kit
                        </h2>
                        <p className="text-[11px] sm:text-xs text-stone-500">
                          Delivered directly to your home or office for hands-on inspection
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 sm:py-1 rounded-full border border-stone-300">
                      {items.length} {items.length === 1 ? 'Swatch' : 'Swatches'}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl sm:rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 hover:bg-stone-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg sm:rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                            />
                          ) : (
                            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg sm:rounded-xl bg-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                              <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1">
                              {item.category}
                            </span>
                            <h3 className="font-heading font-bold text-stone-900 text-xs sm:text-sm md:text-base truncate">
                              {item.name}
                            </h3>
                            {item.finish && (
                              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 truncate">
                                Finish: <span className="font-semibold text-stone-700">{item.finish}</span>
                              </p>
                            )}
                            <p className="text-[11px] sm:text-xs text-stone-600 mt-1 flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              Courier delivery to NJ/PA
                            </p>
                          </div>
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-3 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 sm:p-2 hover:bg-stone-100 text-stone-600 transition-colors min-w-[32px] sm:min-w-[36px] flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2.5 sm:px-3 text-xs font-bold text-stone-800 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 sm:p-2 hover:bg-stone-100 text-stone-600 transition-colors min-w-[32px] sm:min-w-[36px] flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-red-500 p-2 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
                            title="Remove swatch"
                            aria-label="Remove swatch"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add More CTAs */}
              <div className="bg-stone-50 rounded-xl sm:rounded-2xl border border-stone-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <h4 className="font-heading font-bold text-stone-900 text-sm">
                    Need additional services or material choices?
                  </h4>
                  <p className="text-xs text-stone-500">
                    Add another estimate or explore our full portfolio of natural New Jersey stone.
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <Link to="/contact" className="flex-1 sm:flex-initial">
                    <Button size="sm" variant="outline" className="w-full border-stone-300 text-stone-700 hover:bg-white text-xs font-semibold py-2">
                      Add On-Site Survey
                    </Button>
                  </Link>
                  <Link to="/gallery" className="flex-1 sm:flex-initial">
                    <Button size="sm" className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white text-xs font-semibold py-2">
                      Browse Materials
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Order & Inquiry Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 sm:space-y-6 w-full">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm space-y-5">
                <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg border-b border-stone-200 pb-3">
                  Inquiry & Dispatch Summary
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Quick Free Estimates</span>
                    <span className="font-semibold text-stone-900">
                      {quickEstimates.length} {quickEstimates.length === 1 ? 'Inquiry' : 'Inquiries'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>On-Site Surveys Booked</span>
                    <span className="font-semibold text-stone-900">
                      {onSiteEstimates.length} {onSiteEstimates.length === 1 ? 'Survey' : 'Surveys'}
                    </span>
                  </div>
                  {items.length > 0 && (
                    <div className="flex items-center justify-between text-stone-600">
                      <span>Natural Stone Swatches</span>
                      <span className="font-semibold text-stone-900">
                        {items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'Swatch' : 'Swatches'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Site Visit Logistics (NJ/PA)</span>
                    <span className="font-semibold text-emerald-700">Arranged</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Delivery Courier Service</span>
                    <span className="font-semibold text-emerald-700">Active</span>
                  </div>

                  <div className="border-t border-stone-200 pt-3 flex items-center justify-between text-sm font-bold">
                    <span className="text-stone-900">Total Inquiries to Dispatch</span>
                    <span className="text-stone-900 text-base font-extrabold">{estimates.length + items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
                    Zero Obligation Guarantee
                  </p>
                  <p className="text-[11px] text-amber-800 leading-normal">
                    All site surveys, measurements, and masonry scope reviews are provided with no commitment required.
                  </p>
                </div>

                <Button
                  onClick={handleTransmitInquiries}
                  disabled={isSubmitting}
                  className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white font-bold py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <span>Transmitting Inquiries...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiries to Estimator</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="space-y-2.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">Direct Desk: <strong className="text-stone-800">(908) 555-STONE</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardHat className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>NJ Lic. #13VH09876500 • Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Serving All 21 NJ Counties & Bucks PA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

// -------------------------------------------------------------
// Helper Card: Detailed On-Site Estimate & Survey Booking
// -------------------------------------------------------------
function OnSiteCard({
  estimate,
  onRemove,
}: {
  estimate: EstimateInquiry;
  onRemove: () => void;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-emerald-300/80 shadow-xs p-4 sm:p-6 hover:border-emerald-400 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full pointer-events-none blur-xl" />

      {/* Top Bar: Badge, Survey Date & Time, Actions */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-emerald-700 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-2xs whitespace-nowrap">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            Detailed On-Site Survey
          </span>
          {estimate.surveyDate && (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-700 shrink-0" />
              {estimate.surveyDate}
            </span>
          )}
          {estimate.surveyTimeSlot && (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold bg-stone-100 text-stone-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-stone-500 shrink-0" />
              {estimate.surveyTimeSlot}
            </span>
          )}
        </div>

        <button
          onClick={onRemove}
          className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          title="Remove from cart"
          aria-label="Remove on-site survey"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Card Content Grid: Stacks on mobile, 2-column on md+ */}
      <div className="mt-3.5 sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Left Sub-column: Project Details */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base break-words">
            {estimate.title || 'On-Site Masonry Inspection'}
          </h3>

          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <span>
                Discipline: <strong className="text-stone-800">{estimate.service}</strong>
                {estimate.propertyType ? ` • ${estimate.propertyType}` : ''}
              </span>
            </div>

            {estimate.timeline && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                <span>
                  Desired Timeline: <strong className="text-stone-800">{estimate.timeline}</strong>
                </span>
              </div>
            )}

            {estimate.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-stone-800 break-words">{estimate.location}</span>
              </div>
            )}

            {estimate.siteAccessNotes && (
              <div className="mt-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-700">
                <span className="font-semibold block text-[11px] text-stone-500 mb-0.5">
                  Site Access & Gate Notes:
                </span>
                <p className="text-xs italic break-words">{estimate.siteAccessNotes}</p>
              </div>
            )}

            {estimate.details && (
              <div className="mt-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-700">
                <span className="font-semibold block text-[11px] text-stone-500 mb-0.5">
                  Project Scope Description:
                </span>
                <p className="text-xs break-words">{estimate.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sub-column: Contact & Logistics */}
        <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200 flex flex-col justify-between text-xs space-y-3">
          <div>
            <span className="font-bold text-stone-800 block mb-2 uppercase tracking-wider text-[10px]">
              Client & Site Contact
            </span>
            <div className="space-y-1.5 text-stone-600">
              <p className="font-semibold text-stone-900 text-sm break-words">{estimate.name}</p>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                <span>{estimate.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                <span className="break-all">{estimate.email}</span>
              </div>
              {estimate.fileName && (
                <div className="flex items-center gap-1.5 text-stone-700 mt-2 bg-white px-2.5 py-1 rounded border border-stone-200">
                  <FileText className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">Attached: {estimate.fileName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span>Inquiry Status: <strong className="text-emerald-700 font-semibold">Scheduled</strong></span>
            <span>Ref: {estimate.id.slice(-6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Helper Card: Quick Free Estimate
// -------------------------------------------------------------
function QuickCard({
  estimate,
  onRemove,
}: {
  estimate: EstimateInquiry;
  onRemove: () => void;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-amber-300/80 shadow-xs p-4 sm:p-6 hover:border-amber-400 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full pointer-events-none blur-xl" />

      {/* Top Bar: Badge, Turnaround, Actions */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-amber-700 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-2xs whitespace-nowrap">
            Quick Free Estimate
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-700 shrink-0" />
            24-48h Response Guarantee
          </span>
        </div>

        <button
          onClick={onRemove}
          className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          title="Remove from cart"
          aria-label="Remove estimate"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Card Content Grid: Stacks on mobile, 2-column on md+ */}
      <div className="mt-3.5 sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Left Sub-column: Scope */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base break-words">
            {estimate.title || 'Quick Masonry Estimate'}
          </h3>

          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <span>
                Requested Service: <strong className="text-stone-800">{estimate.service}</strong>
              </span>
            </div>

            {estimate.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                <span className="font-medium text-stone-800 break-words">{estimate.location}</span>
              </div>
            )}

            {estimate.details && (
              <div className="mt-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-700">
                <span className="font-semibold block text-[11px] text-stone-500 mb-0.5">
                  Project Notes:
                </span>
                <p className="text-xs italic break-words">{estimate.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sub-column: Contact Info */}
        <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200 flex flex-col justify-between text-xs space-y-3">
          <div>
            <span className="font-bold text-stone-800 block mb-2 uppercase tracking-wider text-[10px]">
              Contact Details
            </span>
            <div className="space-y-1.5 text-stone-600">
              <p className="font-semibold text-stone-900 text-sm break-words">{estimate.name}</p>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                <span>{estimate.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                <span className="break-all">{estimate.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span>Inquiry Status: <strong className="text-amber-800 font-semibold">Pending Review</strong></span>
            <span>Ref: {estimate.id.slice(-6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
