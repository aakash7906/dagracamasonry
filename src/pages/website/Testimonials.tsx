import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
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
import { testimonialsData } from '@/data/mockData';
import type { TestimonialItem } from '@/types';
import {
  Star,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  HeartHandshake,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '4.9 / 5.0', label: 'Average Client Rating', subtext: 'Across Google & Houzz' },
  { value: '1,200+', label: 'Projects Completed', subtext: 'Throughout NJ & Eastern PA' },
  { value: '25-Year', label: 'Workmanship Guarantee', subtext: 'On all structural stone' },
  { value: '98%', label: 'Repeat & Referral Rate', subtext: 'From architects & homeowners' },
];

const ratingLabels: Record<number, string> = {
  1: '1 Star (Poor)',
  2: '2 Stars (Fair)',
  3: '3 Stars (Good)',
  4: '4 Stars (Very Good)',
  5: '5 Stars (Exceptional)',
};

export function Testimonials() {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    rating: 5,
    message: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [filterType]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTestimonial(null);
      }
    };
    if (selectedTestimonial) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTestimonial]);

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewFormData({ name: '', email: '', projectType: '', rating: 5, message: '' });
    }, 4000);
  };

  const filteredTestimonials =
    filterType === 'all'
      ? testimonialsData
      : testimonialsData.filter((item) =>
          item.projectType.toLowerCase().includes(filterType.toLowerCase())
        );

  const pageCount = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const currentTestimonials = filteredTestimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="py-12 sm:py-20 bg-stone-50 text-stone-900 min-h-screen">
      {/* Header Banner */}
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-14">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
            Reputation Carved in Stone
          </h1>
          <p className="text-stone-600 text-base sm:text-lg lg:text-xl leading-relaxed">
            Read direct feedback from estate homeowners, historical preservation architects, and general contractors who have trusted Da Graca Masonry with their most demanding stone and brick installations.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
              <span>100% Verified Real Property Owners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-600 shrink-0" />
              <span>A+ Rated Custom Stonework</span>
            </div>
          </div>
        </div>

        {/* Stats Metric Cards Bar */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 sm:p-6 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1 hover:border-amber-400 transition-colors"
            >
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-700 block">
                {s.value}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">{s.label}</h4>
              <p className="text-[11px] text-stone-500">{s.subtext}</p>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="mt-8 p-3.5 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-xs flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 shrink-0">
            Filter by Scope:
          </span>
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className={
              filterType === 'all'
                ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs cursor-pointer'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs cursor-pointer'
            }
          >
            All Reviews ({testimonialsData.length})
          </Button>
          <Button
            variant={filterType === 'facade' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('facade')}
            className={
              filterType === 'facade'
                ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs cursor-pointer'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs cursor-pointer'
            }
          >
            Natural Stone Facades
          </Button>
          <Button
            variant={filterType === 'terrace' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('terrace')}
            className={
              filterType === 'terrace'
                ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs cursor-pointer'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs cursor-pointer'
            }
          >
            Patios & Terraces
          </Button>
          <Button
            variant={filterType === 'historic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('historic')}
            className={
              filterType === 'historic'
                ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs cursor-pointer'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs cursor-pointer'
            }
          >
            Historic Restorations
          </Button>
          <Button
            variant={filterType === 'retaining' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('retaining')}
            className={
              filterType === 'retaining'
                ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs cursor-pointer'
                : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs cursor-pointer'
            }
          >
            Retaining Walls
          </Button>
        </div>
      </Container>

      {/* Testimonials Grid */}
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentTestimonials.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedTestimonial(item)}
              className="rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-sm flex flex-col justify-between hover:border-amber-500 hover:shadow-lg transition-all p-6 sm:p-8 relative group cursor-pointer"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-stone-200 group-hover:text-amber-500/30 transition-colors pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <Badge
                  variant="stone"
                  className="text-[11px] font-semibold bg-amber-50 text-amber-900 border-amber-200 inline-block"
                >
                  {item.projectType}
                </Badge>

                <p className="text-stone-700 text-sm sm:text-base italic leading-relaxed line-clamp-3">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{item.role}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-0.5 text-stone-600">
                      <MapPin className="h-3 w-3 text-amber-600 inline shrink-0" />
                      {item.location}
                    </span>
                  </p>
                </div>
                <div
                  className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0"
                  title="Verified Client"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Controls */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="h-10 w-10 rounded-full flex items-center justify-center border border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mx-4">
              {[...Array(pageCount)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentPage === i
                      ? 'w-6 bg-amber-600'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
              disabled={currentPage === pageCount - 1}
              className="h-10 w-10 rounded-full flex items-center justify-center border border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </Container>

      {/* Share Your Experience (Left) & Trust & Guarantee (Right) Side-by-Side */}
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Share Your Experience Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-700" />
                  <span>Client Review Portal</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading tracking-tight">
                  Share Your Experience
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  If you&apos;ve recently completed a project with Da Graca Masonry, let us know how our team did. Your feedback helps uphold our heirloom craftsmanship standards.
                </p>
              </div>

              {reviewSubmitted ? (
                <div className="text-center py-10 sm:py-14 space-y-4">
                  <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900">
                      Thank You for Your Feedback!
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Your review has been submitted for verification and will appear in our client portfolio shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Full Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewFormData.name}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                        placeholder="e.g. Robert Sterling"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={reviewFormData.email}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, email: e.target.value })}
                        placeholder="robert@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Project Type and Rating */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Project Type <span className="text-amber-600">*</span>
                      </label>
                      <Select
                        value={reviewFormData.projectType}
                        onValueChange={(value) => setReviewFormData({ ...reviewFormData, projectType: value })}
                      >
                        <SelectTrigger className="w-full h-11 rounded-xl border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm text-stone-900">
                          <SelectValue placeholder="Select Project Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Natural Stone Facades">Natural Stone Facades</SelectItem>
                          <SelectItem value="Patio & Walkway">Patio & Walkway</SelectItem>
                          <SelectItem value="Retaining Wall">Retaining Wall</SelectItem>
                          <SelectItem value="Stone Veneer">Stone Veneer</SelectItem>
                          <SelectItem value="Chimney Repair">Chimney Repair</SelectItem>
                          <SelectItem value="Historic Restoration">Historic Restoration</SelectItem>
                          <SelectItem value="Other">Other Masonry Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          Your Rating <span className="text-amber-600">*</span>
                        </label>
                        <span className="text-xs font-semibold text-amber-700">
                          {ratingLabels[reviewFormData.rating] || '5 Stars'}
                        </span>
                      </div>
                      <div className="flex items-center justify-around h-11 px-3 rounded-xl bg-stone-50 border border-stone-300">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                            className="p-1 text-stone-300 hover:text-amber-400 focus:outline-none transition-colors cursor-pointer group"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                                reviewFormData.rating >= star
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Experience Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Experience <span className="text-amber-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={reviewFormData.message}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, message: e.target.value })}
                      placeholder="Share details about the craftsmanship, communication, and overall outcome of your stonework..."
                      className="w-full px-3.5 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 resize-none transition-all"
                    />
                  </div>

                  {/* Row 4: Submit Button & Verification Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11.5px] text-stone-500 flex items-center gap-1.5 order-2 sm:order-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>All reviews are verified with property records.</span>
                    </p>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 h-11 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 shrink-0"
                    >
                      <span>Submit Review</span>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Trust & Guarantee Banner Stacked Vertically */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Award className="h-3.5 w-3.5 text-amber-700" />
                <span>The Da Graca Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-950 tracking-tight">
                Our Artisan Guarantee
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Every masonry contract is backed by our multi-generational commitment to lasting structural integrity.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5 my-6 flex-1 flex flex-col justify-around">
              <div className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-stone-50/70 border border-stone-200/80 hover:border-amber-400/80 transition-all">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60 shadow-2xs">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    Transparent Line-Item Proposals
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    No hidden contingency fees or unexpected add-ons. Every stone pallet, mortar specification, and labor hour is fully documented before work starts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-stone-50/70 border border-stone-200/80 hover:border-amber-400/80 transition-all">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60 shadow-2xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    25-Year Workmanship Warranty
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    We engineer below-frost foundations and install proper hydrostatic relief weeping systems so your masonry never shifts or heaves.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-stone-50/70 border border-stone-200/80 hover:border-amber-400/80 transition-all">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60 shadow-2xs">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    Direct Daily Communication
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    You receive daily progress updates directly from the jobsite supervisor, with constant access to company leadership throughout construction.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-700">NJ License #13VH09876500</span>
              <span className="text-amber-700 font-semibold">$2M Commercial Liability</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Consultation Banner CTA */}
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="rounded-2xl bg-gradient-to-r from-stone-900 to-stone-950 p-6 sm:p-10 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
              Ready to Discuss Your Project with Our Team?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Experience the craftsmanship and dedication that has earned our company an impeccable reputation across New Jersey estates.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer">
                <span>Request Free On-Site Consultation</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors z-10 cursor-pointer"
              aria-label="Close review dialog"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 sm:p-10 space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between">
                <Quote className="h-10 w-10 text-amber-200" />
                <div className="flex items-center gap-1">
                  {[...Array(selectedTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>

              <Badge
                variant="stone"
                className="text-xs font-semibold bg-amber-50 text-amber-900 border-amber-200 inline-block"
              >
                {selectedTestimonial.projectType}
              </Badge>

              <p className="text-stone-800 text-base sm:text-lg italic leading-relaxed">
                &ldquo;{selectedTestimonial.quote}&rdquo;
              </p>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-lg">
                    {selectedTestimonial.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5 mt-1">
                    <span>{selectedTestimonial.role}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 text-stone-600">
                      <MapPin className="h-4 w-4 text-amber-600 inline shrink-0" />
                      {selectedTestimonial.location}
                    </span>
                  </p>
                </div>
                <div
                  className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0"
                  title="Verified Client"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

