import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { companyStats } from '@/data/mockData';
import { ArrowRight, Phone, ShieldCheck, Sparkles, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100/80 py-20 lg:py-28 border-b border-stone-200/80">
      {/* Background stone pattern and radial warm glow */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2">
              <Badge variant="stone" className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-amber-100/90 text-amber-950 border-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-700 mr-1.5 inline" />
                Hand-Crafted Natural Stone & Brickwork
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.1] font-heading">
              Timeless Masonry Built With{' '}
              <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                Old-World Mastery
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From architectural fieldstone facades and historic lime-mortar restorations to custom Pennsylvania bluestone terraces, Da Graca Masonry creates enduring structural beauty.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base group bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg shadow-amber-600/20"
                onClick={() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Request Project Estimate</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a href="tel:9085557866" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base border-stone-300 bg-white text-stone-800 hover:bg-stone-100 shadow-xs font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Call (908) 555-7866</span>
                </Button>
              </a>
            </div>

            {/* Credibility mini badges */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
                <span>NJ Licensed Builder #13VH09823400</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>25-Year Structural Workmanship Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Feature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative stone frame border */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-200 shadow-2xl bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
                  alt="Master stone masonry installation by Da Graca Masonry"
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                {/* Floating overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-amber-700 font-bold">Featured Craft</p>
                      <h4 className="text-stone-900 font-heading font-bold text-base">Hand-Split Fieldstone Facade</h4>
                    </div>
                    <Badge variant="stone" className="font-semibold text-xs bg-stone-100 text-stone-800 border-stone-200">
                      Bedminster, NJ
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Floating Stat card */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-amber-600 text-white px-4 py-3 rounded-xl shadow-xl font-heading font-black text-center rotate-3 border border-amber-500">
                <span className="block text-2xl font-black leading-tight">25+</span>
                <span className="text-[10px] uppercase font-bold tracking-tight">Years Heritage</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Company stats bar in luxury white card */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-stone-200 shadow-md shadow-stone-200/50 grid grid-cols-2 md:grid-cols-4 gap-6">
          {companyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="text-center md:text-left space-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black font-heading text-amber-600">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-stone-900">{stat.label}</div>
              <div className="text-xs text-stone-600">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
