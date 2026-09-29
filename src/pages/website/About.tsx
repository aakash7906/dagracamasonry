import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-stone-50 text-stone-900">
      <Container size="full" className="max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-950 font-heading tracking-tight leading-[1.15]">
            Crafting Stone Legacies for Over Two Decades
          </h1>
          <p className="text-stone-600 text-base sm:text-lg lg:text-xl leading-relaxed">
            Da Graca Masonry was founded with a singular conviction: to preserve the rigorous, hand-cut stone masonry traditions brought over from Portugal and combine them with modern structural building science.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-stone-600 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 font-heading">
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

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="space-y-1">
                <span className="text-amber-700 font-bold text-xl sm:text-2xl block">100%</span>
                <span className="text-xs sm:text-sm text-stone-500">Natural Quarried Stone & Authentic Mortar</span>
              </div>
              <div className="space-y-1">
                <span className="text-amber-700 font-bold text-xl sm:text-2xl block">Zero</span>
                <span className="text-xs sm:text-sm text-stone-500">Subcontracting of Core Artisan Stone Craft</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white">
              <img
                src="/images/masonry/craftsman-work.png"
                alt="Master stone mason craftsman laying precision natural fieldstone with mortar"
                className="w-full h-[300px] sm:h-[420px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-stone-900 text-sm sm:text-base">Certified Historical Masonry</h4>
                    <p className="text-xs text-stone-500">Trained in non-destructive lime pointing & terra cotta repairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-8 lg:p-12 mb-12 sm:mb-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading">
              Our Core Principles
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              The founding values that guide every blueprint, chisel strike, and jobsite clean-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Structural Permanence</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We engineer foundations and drainage systems to resist freeze-thaw cycles, hydraulic ground pressure, and decades of weathering.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Authentic Materials</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Only genuine Pennsylvania bluestone, Chester County fieldstone, Vermont slate, and historically accurate breathable mortars.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Owner Accountability</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Every project is directly overseen by the Da Graca family principals. You receive clear daily progress communication.
              </p>
            </div>
          </div>
        </div>

        {/* What sets us apart */}
        <div className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-8 lg:p-12 mb-12 sm:mb-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading">
              Here&apos;s what sets us apart:
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Experience the difference of a multi-generation family artisan masonry contractor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Unwavering Expertise</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Our team of highly skilled and experienced masons possess the knowledge and craftsmanship to tackle any project, big or small. We understand the intricacies of working with diverse materials like stone, brick, and concrete, ensuring exceptional quality and longevity in your project.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Transparency and Communication</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We believe in open communication every step of the way. We&apos;ll answer your questions in a friendly and knowledgeable manner, explaining every process and its significance. We value your understanding and treat every project with the same level of importance.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Commitment to You</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Your satisfaction is our top priority. We offer complimentary estimates at your convenience, allowing you to explore your options and ask any questions you might have. The owner personally oversees every job, ensuring meticulous attention to detail and direct communication.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/80 transition-all">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg">Comprehensive Services</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Whether you&apos;re building a new patio, restoring a historic structure, or waterproofing your basement, we offer a full spectrum of masonry services. We handle everything from patios and pavers to chimneys, walls, and foundations, ensuring a seamless experience.
              </p>
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="py-8 sm:py-12 mb-12 sm:mb-16">
          <div className="text-center space-y-4 sm:space-y-5 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-heading">
              Brands We Work With
            </h2>
            <div className="w-12 h-1 bg-amber-600 rounded-full mx-auto" />
            <p className="text-base sm:text-lg text-stone-700 font-sans max-w-xl mx-auto">
              From classic quarried stonework to modern high-performance hardscape systems.
            </p>
          </div>

          <div className="overflow-hidden relative w-full flex items-center opacity-90 before:absolute before:inset-y-0 before:left-0 before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-stone-50 before:to-transparent before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-stone-50 after:to-transparent after:z-10 py-4">
            <div className="flex flex-nowrap min-w-full gap-10 sm:gap-14 lg:gap-20 items-center animate-marquee pl-10 sm:pl-14 lg:pl-20 hover:[animation-play-state:paused] w-max select-none">
              {/* Brand Item Set 1 */}
              <div className="flex shrink-0 items-center gap-10 sm:gap-14 lg:gap-20">
                <div className="text-4xl sm:text-5xl font-serif text-[#8c7355] font-bold tracking-tighter">
                  MSI
                </div>
                <div className="flex flex-col items-center justify-center text-stone-800">
                  <div className="text-lg sm:text-xl font-serif tracking-widest font-bold">CAMBRIDGE</div>
                  <div className="text-xs sm:text-sm font-serif tracking-widest mt-0.5 text-stone-600">ARMORTEC</div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                  UNILOCK<span className="text-xs align-super">&reg;</span>
                </div>
                <div className="flex flex-col items-center justify-center text-stone-800">
                  <div className="text-2xl sm:text-3xl font-black tracking-tighter lowercase">
                    nicolock<span className="text-xs align-super">&reg;</span>
                  </div>
                  <div className="text-[0.55rem] font-sans font-bold tracking-tight mt-0.5 uppercase text-center leading-tight text-stone-600">
                    Paving Stones &bull; Retaining Walls &bull; Outdoor Living<br />
                    paver-shield&trade;
                  </div>
                </div>
                <div className="flex flex-col text-stone-800 font-serif font-bold text-xl sm:text-2xl tracking-widest leading-none">
                  <div>TECHO</div>
                  <div>&mdash;BLOC</div>
                </div>
              </div>

              {/* Brand Item Set 2 (Duplicate for infinite seamless scroll) */}
              <div className="flex shrink-0 items-center gap-10 sm:gap-14 lg:gap-20">
                <div className="text-4xl sm:text-5xl font-serif text-[#8c7355] font-bold tracking-tighter">
                  MSI
                </div>
                <div className="flex flex-col items-center justify-center text-stone-800">
                  <div className="text-lg sm:text-xl font-serif tracking-widest font-bold">CAMBRIDGE</div>
                  <div className="text-xs sm:text-sm font-serif tracking-widest mt-0.5 text-stone-600">ARMORTEC</div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                  UNILOCK<span className="text-xs align-super">&reg;</span>
                </div>
                <div className="flex flex-col items-center justify-center text-stone-800">
                  <div className="text-2xl sm:text-3xl font-black tracking-tighter lowercase">
                    nicolock<span className="text-xs align-super">&reg;</span>
                  </div>
                  <div className="text-[0.55rem] font-sans font-bold tracking-tight mt-0.5 uppercase text-center leading-tight text-stone-600">
                    Paving Stones &bull; Retaining Walls &bull; Outdoor Living<br />
                    paver-shield&trade;
                  </div>
                </div>
                <div className="flex flex-col text-stone-800 font-serif font-bold text-xl sm:text-2xl tracking-widest leading-none">
                  <div>TECHO</div>
                  <div>&mdash;BLOC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-10 sm:py-14 space-y-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 max-w-xl mx-auto">
            Have a specialized stone or restoration project?
          </h3>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto">
            Request an itemized preliminary quote or arrange an on-site survey with our master mason.
          </p>
          <div className="pt-2">
            <Link to="/#consultation">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20 cursor-pointer">
                <span>Schedule an On-Site Consultation</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
