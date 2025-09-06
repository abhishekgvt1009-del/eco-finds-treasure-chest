import { createContext, useContext, useEffect, useMemo, useState } from "react";

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "ecofinds_wishlist";

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = (id: string) => {
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const isWishlisted = (id: string) => ids.includes(id);
  const clear = () => setIds([]);

  const value = useMemo(() => ({ ids, toggle, isWishlisted, clear }), [ids]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
