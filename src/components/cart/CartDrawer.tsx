import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { items, itemCount, isCartOpen, setIsCartOpen, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-stone-900 text-base sm:text-lg">
                      Sample Kit & Cart
                    </h2>
                    <p className="text-xs text-stone-500">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'} in your inquiry bag
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-stone-800 text-base">
                        Your sample kit is empty
                      </h3>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Explore our gallery and services to request complimentary natural stone swatches and masonry blueprints.
                      </p>
                    </div>
                    <Link
                      to="/gallery"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block mt-2"
                    >
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                        Browse Stone Gallery
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3.5 p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-400/60 transition-all shadow-2xs"
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-lg bg-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                            <ShoppingBag className="h-6 w-6" />
                          </div>
                        )}

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-heading font-bold text-stone-900 text-sm leading-tight truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] text-amber-800 font-medium mt-0.5">
                              {item.category} {item.finish ? `• ${item.finish}` : ''}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 text-xs font-semibold text-stone-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-stone-800">
                              {item.price === 0 ? 'Complimentary' : `$${item.price}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      Free courier delivery to NJ & Eastern PA
                    </span>
                    <span className="font-bold text-stone-900">$0.00</span>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setIsCartOpen(false)}
                    className="block"
                  >
                    <Button className="w-full bg-[#b45309] hover:bg-[#9a3412] text-white font-bold py-3 text-sm rounded-xl shadow-md flex items-center justify-center gap-2">
                      <span>Request Sample Box & Consultation</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <p className="text-[11px] text-center text-stone-500">
                    Direct delivery to homeowners & landscape architects.
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
