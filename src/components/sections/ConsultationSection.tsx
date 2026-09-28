import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Phone, Clock, ShieldCheck, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function ConsultationSection() {
  const { addEstimate, setIsCartOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: 'natural-stone',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEstimate({
      type: 'quick-estimate',
      title: 'Quick Free Estimate Request',
      name: form.name,
      phone: form.phone,
      email: form.email,
      location: form.location,
      service: form.service,
      details: form.details,
    });
    setSubmitted(true);
  };

  return (
    <section id="consultation" className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-20 lg:py-24 bg-[#F4F0E8] border-b border-[#E5E0D5]">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Info & Trust Points */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#b45309]">
                  Quick & Free Estimate
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight leading-tight">
                Request Your Quick Free Estimate
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Receive a fast, preliminary digital cost breakdown and stone consultation from our master masons with zero obligation. Share your basic project scope and our estimators will calculate pricing.
              </p>
            </div>

            {/* 3 Trust Callout Blocks */}
            <div className="space-y-4 pt-2">
              {/* Callout 1 */}
              <div className="p-4 sm:p-5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center shrink-0 border border-amber-200/80">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                    Direct Estimator Line
                  </h4>
                  <a
                    href="tel:9085557866"
                    className="text-sm font-extrabold text-[#b45309] hover:underline"
                  >
                    (908) 555-STONE / (908) 555-7866
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Mon – Sat: 7:00 AM – 6:00 PM • Fast phone estimates
                  </p>
                </div>
              </div>

              {/* Callout 2 */}
              <div className="p-4 sm:p-5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center shrink-0 border border-amber-200/80">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                    Preliminary Quote in 24–48 Hours
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                    Receive initial line-item pricing, material specs, and preliminary budget ranges tailored to your project.
                  </p>
                </div>
              </div>

              {/* Callout 3 */}
              <div className="p-4 sm:p-5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center shrink-0 border border-amber-200/80">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                    Fully Licensed & Insured Protection
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                    NJ Home Improvement Contractor #13VH09823400 • $2,000,000 commercial liability & full workers comp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-md bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-lg">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-stone-900">
                    Free Estimate Request Received!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our estimating team will review your project details and deliver a preliminary cost estimate to your email within 24 business hours.
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
                      onClick={() => setSubmitted(false)}
                      className="border-stone-300 text-xs px-4 py-2.5 rounded-lg cursor-pointer"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="space-y-1 mb-2">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-stone-900">
                      Get a Quick Free Estimate
                    </h3>
                    <p className="text-xs text-stone-500">
                      Complete the brief form below to receive a fast, preliminary project estimate.
                    </p>
                  </div>

                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Full Name <span className="text-[#b45309]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Thomas Harrington"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Phone Number <span className="text-[#b45309]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(908) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address <span className="text-[#b45309]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="thomas@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Town / City, NJ <span className="text-[#b45309]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Princeton, NJ"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service needed */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Service Needed <span className="text-[#b45309]">*</span>
                    </label>
                    <Select
                      value={form.service}
                      onValueChange={(val) => setForm({ ...form, service: val })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service needed..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural-stone">Architectural Natural Stone Veneer</SelectItem>
                        <SelectItem value="bluestone-patio">Pennsylvania Bluestone Patio / Terrace</SelectItem>
                        <SelectItem value="retaining-wall">Engineered Retaining Wall</SelectItem>
                        <SelectItem value="brick-pointing">Historic Brick & Lime Mortar Tuckpointing</SelectItem>
                        <SelectItem value="chimney-fireplace">Chimney Rebuilding / Stone Hearth</SelectItem>
                        <SelectItem value="other">Other Bespoke Masonry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4: Details */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Brief Project Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      placeholder="Briefly describe what you'd like accomplished (approximate dimensions, stone preferences, or timeline)..."
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white font-bold py-3.5 rounded-xl text-sm sm:text-base shadow-md transition-colors"
                  >
                    Get Quick Free Estimate
                  </Button>

                  <p className="text-[11px] text-stone-500 text-center pt-1">
                    We respect your privacy. No spam. Preliminary estimates delivered within 24–48 business hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
