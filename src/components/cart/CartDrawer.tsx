import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Phone,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const {
    items,
    estimates,
    itemCount,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    removeEstimate,
  } = useCart();

  const hasAnyItems = items.length > 0 || estimates.length > 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Slide-over panel: Edge-to-edge on mobile (<640px), max-w-md with margin on tablet/desktop */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6 md:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-full sm:w-[420px] md:w-[460px] max-w-full bg-white shadow-2xl flex flex-col justify-between h-full"
            >
              {/* Drawer Header - Responsive Padding & Touch Targets */}
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs shrink-0">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-heading font-bold text-stone-900 text-base sm:text-lg leading-tight truncate">
                      Cart & Inquiries
                    </h2>
                    <p className="text-xs text-stone-500 truncate">
                      {itemCount} {itemCount === 1 ? 'inquiry' : 'inquiries'} in your cart
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900 px-2.5 py-1.5 rounded-lg hover:bg-amber-100/60 transition-colors flex items-center gap-1 min-h-[36px]"
                    title="Open full cart page"
                  >
                    <span className="hidden xs:inline">Full Page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                    aria-label="Close cart drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content - Responsive Scroll Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 space-y-5">
                {!hasAnyItems ? (
                  <div className="py-12 sm:py-16 text-center space-y-4 px-2">
                    <div className="h-16 w-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-stone-800 text-base sm:text-lg">
                        Your cart & inquiries list is empty
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                        Submit a Quick Free Estimate or book an On-Site Survey to review your project inquiries here.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-3 max-w-xs mx-auto">
                      <Link
                        to="/contact"
                        onClick={() => setIsCartOpen(false)}
                        className="w-full"
                      >
                        <Button size="sm" className="bg-[#b45309] hover:bg-[#9a3412] text-white text-xs font-semibold w-full py-2.5">
                          Book On-Site Survey
                        </Button>
                      </Link>
                      <Link
                        to="/#consultation-form"
                        onClick={() => setIsCartOpen(false)}
                        className="w-full"
                      >
                        <Button size="sm" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold w-full py-2.5">
                          Quick Free Estimate
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* SECTION 1: ESTIMATES & SURVEY REQUESTS */}
                    {estimates.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-xs font-bold tracking-wider uppercase text-stone-500">
                            Estimates & Surveys ({estimates.length})
                          </span>
                        </div>

                        <div className="space-y-3">
                          {estimates.map((est) => {
                            const isOnSite = est.type === 'onsite-survey';

                            return (
                              <div
                                key={est.id}
                                className={`p-3.5 sm:p-4 rounded-xl border transition-all shadow-2xs relative ${
                                  isOnSite
                                    ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400 hover:bg-emerald-50/60'
                                    : 'border-amber-300 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50/60'
                                }`}
                              >
                                {/* Top Badge & Delete */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <span
                                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                      isOnSite
                                        ? 'bg-emerald-700 text-white'
                                        : 'bg-amber-700 text-white'
                                    }`}
                                  >
                                    {isOnSite && <Calendar className="h-3 w-3 shrink-0" />}
                                    <span>{isOnSite ? 'On-Site Survey Booking' : 'Quick Free Estimate'}</span>
                                  </span>

                                  <button
                                    onClick={() => removeEstimate(est.id)}
                                    className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
                                    title="Remove from cart"
                                    aria-label="Remove inquiry"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>

                                {/* Title & Client */}
                                <h4 className="font-heading font-bold text-stone-900 text-sm leading-snug break-words">
                                  {est.title}
                                </h4>
                                <p className="text-xs font-medium text-stone-700 mt-0.5">
                                  Requested by: <span className="font-semibold text-stone-900">{est.name}</span>
                                </p>

                                {/* Specific Details Box */}
                                <div className="mt-2.5 space-y-1.5 text-xs text-stone-600 bg-white/90 p-2.5 sm:p-3 rounded-lg border border-stone-200/80">
                                  {isOnSite && est.surveyDate && (
                                    <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                                      <Calendar className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                                      <span>Date: {est.surveyDate}</span>
                                    </div>
                                  )}
                                  {isOnSite && est.surveyTimeSlot && (
                                    <div className="flex items-center gap-1.5 text-stone-700">
                                      <Clock className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                                      <span>Window: {est.surveyTimeSlot}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 text-stone-700">
                                    <MapPin className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                                    <span className="truncate">{est.location || 'NJ Service Area'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-stone-600">
                                    <Phone className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                                    <span>{est.phone}</span>
                                  </div>
                                  {est.details && (
                                    <p className="text-[11px] text-stone-500 italic mt-1 line-clamp-2 border-t border-stone-100 pt-1.5">
                                      "{est.details}"
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: MATERIAL SWATCHES & SAMPLES */}
                    {items.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-xs font-bold tracking-wider uppercase text-stone-500 flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-amber-600" />
                            Stone Samples ({items.length})
                          </span>
                        </div>

                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 p-3 sm:p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-amber-400/60 transition-all shadow-2xs"
                            >
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="h-16 w-16 sm:h-18 sm:w-18 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                                />
                              ) : (
                                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-lg bg-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                                  <ShoppingBag className="h-5 w-5" />
                                </div>
                              )}

                              <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                  <div className="flex items-start justify-between gap-1">
                                    <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm leading-tight truncate">
                                      {item.name}
                                    </h4>
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="text-stone-400 hover:text-red-500 p-1 transition-colors shrink-0"
                                      title="Remove item"
                                      aria-label="Remove swatch"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                  <p className="text-[11px] text-amber-800 font-medium mt-0.5 truncate">
                                    {item.category} {item.finish ? `• ${item.finish}` : ''}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="p-1 sm:p-1.5 hover:bg-stone-100 text-stone-600 transition-colors min-w-[28px] sm:min-w-[32px] flex items-center justify-center"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="px-2 text-xs font-semibold text-stone-800">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 sm:p-1.5 hover:bg-stone-100 text-stone-600 transition-colors min-w-[28px] sm:min-w-[32px] flex items-center justify-center"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Drawer Footer - Responsive Buttons & Safe Area */}
              {hasAnyItems && (
                <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      Inquiries Direct to Master Masons
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-stone-300 hover:bg-stone-100 text-stone-800 font-bold py-2.5 text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span>View Cart Page</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full"
                    >
                      <Button className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white font-bold py-2.5 text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5">
                        <span>Review & Transmit</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>

                  <p className="text-[11px] text-center text-stone-500">
                    Review your submitted inquiries or transmit them to our estimator.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
