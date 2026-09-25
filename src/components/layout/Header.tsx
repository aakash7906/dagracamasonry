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
      <div className="bg-stone-950 text-stone-300 text-xs py-2 border-b border-stone-800">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium text-stone-200">NJ Licensed & Fully Insured Master Stonemasons</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-stone-400">Serving NJ, Eastern PA & NY Metro</span>
            <a
              href="tel:9085557866"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors focus-visible:outline-none"
            >
              <Phone className="h-3 w-3" />
              <span>(908) 555-STONE</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <div
        className={`w-full backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-900/95 shadow-lg border-b border-stone-800 py-3'
            : 'bg-stone-900/90 border-b border-stone-800/80 py-4'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-md group-hover:scale-105 transition-transform">
              <Hammer className="h-5 w-5 fill-stone-950 stroke-stone-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                DA GRACA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold -mt-1">
                Masonry & Stone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
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
                  className={`text-sm font-medium transition-all px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isActive
                      ? 'text-amber-400 bg-stone-800/90 shadow-sm font-semibold'
                      : 'text-stone-300 hover:text-amber-400 hover:bg-stone-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9085557866"
              className="text-stone-300 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5 focus-visible:outline-none"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              <span>(908) 555-7866</span>
            </a>
            <Button
              variant="default"
              size="default"
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-200 hover:bg-stone-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="lg:hidden bg-stone-900 border-b border-stone-800 shadow-2xl px-6 py-6"
          >
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-amber-400 bg-stone-800 font-semibold'
                        : 'text-stone-200 hover:text-amber-400 hover:bg-stone-800/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-stone-800 flex flex-col gap-3">
                <a
                  href="tel:9085557866"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-800 text-stone-200 py-2.5 text-sm font-semibold"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  (908) 555-7866
                </a>
                <Button
                  variant="default"
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
