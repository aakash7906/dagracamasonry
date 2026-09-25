import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Hammer, Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top emergency / quick contact bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 border-b border-stone-800">
        <Container className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-stone-200 text-[11px] sm:text-xs truncate">
              NJ Licensed & Fully Insured Master Stonemasons
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden md:inline text-stone-400 text-xs">Serving NJ, Eastern PA & NY Metro</span>
            <a
              href="tel:9085557866"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors focus-visible:outline-none"
            >
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">(908) 555-STONE</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar - Light Luxury Theme */}
      <div
        className={`w-full backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-md border-b border-stone-200/90 py-3'
            : 'bg-white/90 border-b border-stone-200/80 py-3.5 sm:py-4'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Hammer className="h-4 w-4 sm:h-5 sm:w-5 fill-white stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-stone-950 group-hover:text-amber-700 transition-colors leading-tight">
                DA GRACA
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-700 font-bold -mt-0.5">
                Masonry & Stone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/' && !location.hash
                  : location.pathname === item.href ||
                    (item.href.startsWith('/#') && location.hash === item.href.slice(1));

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-xs xl:text-sm font-medium transition-all px-2.5 xl:px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap ${
                    isActive
                      ? 'text-amber-900 bg-amber-100/80 border border-amber-200/70 shadow-xs font-semibold'
                      : 'text-stone-700 hover:text-amber-700 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href="tel:9085557866"
              className="text-stone-700 hover:text-stone-950 transition-colors text-sm font-semibold flex items-center gap-1.5 focus-visible:outline-none whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-amber-600" />
              <span>(908) 555-7866</span>
            </a>
            <Button
              variant="default"
              size="default"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm text-xs xl:text-sm"
              onClick={() => {
                const el = document.getElementById('consultation');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#consultation';
                }
              }}
            >
              Get Free Estimate
            </Button>
          </div>

          {/* Mobile Menu & Direct Call Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:9085557866"
              className="p-2 text-stone-700 hover:text-amber-700 sm:hidden"
              aria-label="Call phone"
            >
              <Phone className="h-5 w-5 text-amber-600" />
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-700 hover:bg-stone-100 h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-stone-200 shadow-2xl px-4 sm:px-6 py-5 max-h-[calc(100vh-120px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1.5">
              {navigationLinks.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-base font-medium py-2.5 px-3.5 rounded-xl transition-colors ${
                      isActive
                        ? 'text-amber-900 bg-amber-100 font-semibold'
                        : 'text-stone-700 hover:text-amber-700 hover:bg-stone-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-stone-200 flex flex-col gap-3">
                <a
                  href="tel:9085557866"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 text-stone-800 py-3 text-sm font-semibold hover:bg-stone-200"
                >
                  <Phone className="h-4 w-4 text-amber-600" />
                  (908) 555-STONE / 555-7866
                </a>
                <Button
                  variant="default"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 text-sm rounded-xl"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('consultation');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#consultation';
                    }
                  }}
                >
                  Get Free Estimate
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
