import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Phone, Mail, CheckCircle2, Send, Calendar } from 'lucide-react';

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'natural-stone',
    timeline: 'immediate',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consultation" className="py-24 bg-stone-900 border-t border-stone-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="rounded-3xl bg-stone-950 border border-stone-800 p-8 sm:p-12 lg:p-16 shadow-2xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Information */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="stone" className="uppercase font-semibold tracking-wider">
                Schedule a Consultation
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
                Ready to Bring Enduring Stone Artistry to Your Property?
              </h2>
              <p className="text-stone-300 leading-relaxed">
                Contact our master stonemasons today for an on-site consultation, architectural drawing review, or historic restoration survey. We provide detailed, itemized estimates with 3D concepts.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="tel:9085557866"
                  className="flex items-center gap-4 p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Direct Phone Inquiries</p>
                    <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      (908) 555-STONE / (908) 555-7866
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:estimates@dagracamasonry.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Email Blueprints & Specs</p>
                    <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      estimates@dagracamasonry.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span>Typical on-site estimate visits booked within 48–72 hours across NJ & Eastern PA.</span>
              </div>
            </div>

            {/* Right Column Interactive Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 backdrop-blur-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Estimate Request Received!
                    </h3>
                    <p className="text-stone-300 text-sm max-w-md mx-auto">
                      Thank you for contacting Da Graca Masonry. Our lead estimator will review your project details and contact you within 24 business hours to schedule an on-site consultation.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                      className="mt-4"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-heading font-bold text-white">
                      Request Your Free Estimate
                    </h3>
                    <p className="text-xs text-stone-400">
                      Fill out the form below and an estimator will contact you promptly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Robert Smith"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(908) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Primary Service
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="natural-stone">Natural Stone Masonry</option>
                          <option value="brick-pointing">Historic Brick & Tuckpointing</option>
                          <option value="patios-walkways">Bluestone Patio / Terrace</option>
                          <option value="retaining-walls">Retaining Wall Construction</option>
                          <option value="fireplaces-chimneys">Chimney & Fireplace Work</option>
                          <option value="commercial">Commercial / Multi-Unit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Estimated Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="immediate">Immediate / Urgent Repair</option>
                          <option value="1-3-months">Next 1–3 Months</option>
                          <option value="planning">Future Season / Planning</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Project Scope & Location
                      </label>
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Briefly describe the stone/brick work needed, location/town, and any specific preferences..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Consultation Request
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
