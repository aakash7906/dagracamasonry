import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Hammer, Phone, Menu, X, ShieldCheck, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change or outside click
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToConsultation = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('consultation');
    if (el) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 108;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerHeight),
        behavior: 'smooth',
      });
    } else {
      window.location.href = '/#consultation';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <CartDrawer />

      {/* Top emergency / quick contact bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 border-b border-stone-800 w-full">
        <div className="w-full flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-14">
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
        </div>
      </div>

      {/* Main navigation bar - Light Luxury Theme */}
      <div
        className={`w-full backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-md border-b border-stone-200/90 py-3'
            : 'bg-white/90 border-b border-stone-200/80 py-3.5 sm:py-4'
        }`}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-14">
          {/* Brand Logo - Shifted to left */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#b45309] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Hammer className="h-4 w-4 sm:h-5 sm:w-5 fill-white stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-stone-950 group-hover:text-[#b45309] transition-colors leading-tight">
                DA GRACA
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#b45309] font-bold -mt-0.5">
                Masonry & Stone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Expanded across middle space */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-6 xl:mx-10 2xl:mx-14 gap-2 lg:gap-3 xl:gap-5 2xl:gap-7">
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
                  className={`text-xs xl:text-sm font-medium transition-all px-3 xl:px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap ${
                    isActive
                      ? 'text-amber-900 bg-amber-100/80 border border-amber-200/70 shadow-xs font-semibold'
                      : 'text-stone-700 hover:text-[#b45309] hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button & Icons - Shifted to right */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
            <a
              href="tel:9085557866"
              className="text-stone-700 hover:text-stone-950 transition-colors text-xs xl:text-sm font-semibold flex items-center gap-1.5 focus-visible:outline-none whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-[#b45309]" />
              <span>(908) 555-7866</span>
            </a>

            <Button
              variant="default"
              size="default"
              className="bg-[#b45309] hover:bg-[#9a3412] text-white font-bold shadow-sm text-xs xl:text-sm rounded-lg px-3.5 sm:px-4.5"
              onClick={scrollToConsultation}
            >
              Get Free Estimate
            </Button>

            {/* Cart & Account Icons Container */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              {/* Cart Icon Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-stone-900 hover:text-[#b45309] transition-colors rounded-md focus:outline-none cursor-pointer"
                title="View Samples & Cart"
                aria-label="View Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-[#b45309] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className={`p-2 rounded-md transition-colors flex items-center justify-center cursor-pointer focus:outline-none ${
                    accountDropdownOpen
                      ? 'text-[#b45309] bg-stone-100'
                      : 'text-stone-900 hover:text-[#b45309]'
                  }`}
                  title="Account Menu"
                  aria-label="Account Menu"
                >
                  <User className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {accountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-48 bg-white rounded-md border border-stone-200 shadow-xl p-3 z-50 flex flex-col gap-1 text-left"
                    >
                      {isAuthenticated && user ? (
                        <>
                          <Link
                            to="/account"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2 py-1.5 mb-1 bg-stone-50 hover:bg-amber-50/60 rounded border border-stone-200/60 block transition-colors"
                          >
                            <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wider truncate">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                          </Link>
                          <Link
                            to="/account"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            My Account
                          </Link>
                          <Link
                            to="/#consultation"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            Bookings
                          </Link>
                          <div className="my-1 border-t border-stone-200" />
                          <button
                            onClick={() => {
                              logout();
                              setAccountDropdownOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            Create Account
                          </Link>
                          <div className="my-1.5 border-t border-stone-200" />
                          <Link
                            to="/#consultation"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            Bookings
                          </Link>
                          <Link
                            to="/account"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-amber-800 hover:bg-stone-50 rounded transition-colors"
                          >
                            My Account
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu & Direct Call Toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Mobile Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-800 hover:text-amber-700"
              aria-label="View Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 bg-[#b45309] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Account Button (direct link to login/signup) */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-2 text-stone-900 hover:text-[#b45309] transition-colors rounded-md"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

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
        </div>
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
                {isAuthenticated && user ? (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-stone-900">{user.name}</p>
                        <p className="text-[11px] text-stone-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 bg-white rounded-lg border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-800 hover:bg-stone-50"
                    >
                      My Account Settings
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2.5 rounded-lg border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-800 hover:bg-stone-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800"
                      >
                        Create Account
                      </Link>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 bg-stone-100/80 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-200"
                    >
                      My Account
                    </Link>
                  </div>
                )}

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
                  onClick={scrollToConsultation}
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
