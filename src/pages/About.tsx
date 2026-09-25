import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="py-16 lg:py-24 bg-stone-900">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider">
            Our Story & Heritage
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
            Crafting Stone Legacies for Over Two Decades
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl leading-relaxed">
            Da Graca Masonry was founded with a singular conviction: to preserve the rigorous, hand-cut stone masonry traditions brought over from Portugal and combine them with modern structural building science.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-stone-300 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              A Family Tradition of Uncompromising Masonry
            </h2>
            <p>
              Growing up surrounded by historic stone quarries and grand colonial architecture, our founder learned the art of stone masonry from master artisans who believed that every single mortar joint tells a story.
            </p>
            <p>
              Today, Da Graca Masonry stands as one of the few true artisan masonry outfits serving New Jersey and Eastern Pennsylvania. We do not use prefabricated shortcuts or faux veneer imitations when structural integrity is on the line. We hand-select our stones directly from regional quarries—inspecting density, grain alignment, and weathering characteristics.
            </p>
            <p>
              Whether we are restoring a fragile 19th-century lime-mortar historic building or designing a 4,000 sq ft custom fieldstone estate, our hands-on devotion to detail remains uncompromising.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800">
              <div className="space-y-1">
                <span className="text-amber-400 font-bold text-xl block">100%</span>
                <span className="text-xs text-stone-400">Natural Quarried Stone & Authentic Mortar</span>
              </div>
              <div className="space-y-1">
                <span className="text-amber-400 font-bold text-xl block">Zero</span>
                <span className="text-xs text-stone-400">Subcontracting of Core Artisan Stone Craft</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-stone-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80"
                alt="Master mason laying precision brick and stone"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">Certified Historical Masonry</h4>
                    <p className="text-xs text-stone-400">Trained in non-destructive lime pointing & terra cotta repairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="rounded-3xl bg-stone-950 border border-stone-800 p-8 sm:p-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Our Core Principles
            </h2>
            <p className="text-stone-400 text-sm">
              The founding values that guide every blueprint, chisel strike, and jobsite clean-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Structural Permanence</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                We engineer foundations and drainage systems to resist freeze-thaw cycles, hydraulic ground pressure, and decades of weathering.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Authentic Materials</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Only genuine Pennsylvania bluestone, Chester County fieldstone, Vermont slate, and historically accurate breathable mortars.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Owner Accountability</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Every project is directly overseen by the Da Graca family principals. You receive clear daily progress communication.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-10 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Have a specialized stone or restoration project?
          </h3>
          <Link to="/#consultation">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold">
              <span>Schedule an On-Site Consultation</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
