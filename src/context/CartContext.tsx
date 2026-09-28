import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  finish?: string;
  price?: number;
  quantity: number;
  imageUrl?: string;
}

export interface EstimateInquiry {
  id: string;
  type: 'quick-estimate' | 'onsite-survey';
  title: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  details?: string;
  surveyDate?: string;
  surveyTimeSlot?: string;
  siteAccessNotes?: string;
  propertyType?: string;
  budgetRange?: string;
  timeline?: string;
  fileName?: string;
  referralSource?: string;
  createdAt: string;
}

interface CartContextType {
  items: CartItem[];
  estimates: EstimateInquiry[];
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  addEstimate: (estimate: Omit<EstimateInquiry, 'id' | 'createdAt'>) => void;
  removeEstimate: (id: string) => void;
  clearEstimates: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dagraca_cart_items';
const ESTIMATES_STORAGE_KEY = 'dagraca_cart_estimates';

// Cart only contains inquiries and items that the user actually submitted
const DEFAULT_INITIAL_ITEMS: CartItem[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((i: CartItem) => i.id !== 'sample-bluestone');
        }
      }
      return DEFAULT_INITIAL_ITEMS;
    } catch {
      return DEFAULT_INITIAL_ITEMS;
    }
  });

  const [estimates, setEstimates] = useState<EstimateInquiry[]>(() => {
    try {
      const stored = localStorage.getItem(ESTIMATES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ESTIMATES_STORAGE_KEY, JSON.stringify(estimates));
    } catch {
      // ignore
    }
  }, [estimates]);

  // Responsive UX: Lock background scroll on mobile/desktop when cart drawer is active
  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCartOpen]);

  // Responsive UX: Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  const itemCount =
    items.reduce((acc, item) => acc + item.quantity, 0) + estimates.length;

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const addEstimate = (estimate: Omit<EstimateInquiry, 'id' | 'createdAt'>) => {
    const newEstimate: EstimateInquiry = {
      ...estimate,
      id: 'est_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setEstimates((prev) => [newEstimate, ...prev]);
    setIsCartOpen(true);
  };

  const removeEstimate = (id: string) => {
    setEstimates((prev) => prev.filter((e) => e.id !== id));
  };

  const clearEstimates = () => {
    setEstimates([]);
  };

  const clearCart = () => {
    setItems([]);
    setEstimates([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        estimates,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        addEstimate,
        removeEstimate,
        clearEstimates,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
