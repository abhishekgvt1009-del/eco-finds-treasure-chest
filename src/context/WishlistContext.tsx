import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
  loading: boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "ecofinds_wishlist";

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist data
  useEffect(() => {
    if (user) {
      loadWishlistFromDatabase();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [user]);

  const loadWishlistFromDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setIds(data?.map(item => item.product_id) || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      loadWishlistFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadWishlistFromLocalStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    }
  };

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  }, [ids, user]);

  const toggle = async (id: string) => {
    if (user) {
      // Database operation for authenticated users
      try {
        if (ids.includes(id)) {
          await supabase
            .from('wishlists')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', id);
          setIds(prev => prev.filter(x => x !== id));
        } else {
          await supabase
            .from('wishlists')
            .insert({ user_id: user.id, product_id: id });
          setIds(prev => [...prev, id]);
        }
      } catch (error) {
        console.error('Error toggling wishlist:', error);
      }
    } else {
      // Local storage for guest users
      setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    }
  };

  const isWishlisted = (id: string) => ids.includes(id);
  const clear = () => setIds([]);

  const value = useMemo(() => ({ ids, toggle, isWishlisted, clear, loading }), [ids, loading]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
