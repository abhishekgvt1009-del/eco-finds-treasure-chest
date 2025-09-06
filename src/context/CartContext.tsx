import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import type { Product } from "@/types/product";

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "ecofinds_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart data
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      loadCartFromLocalStorage();
    }
  }, [user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          products:product_id (
            id,
            title,
            description,
            price,
            original_price,
            image_url,
            category,
            condition,
            location,
            rating,
            eco_score
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      const formattedItems = cartItems?.map(item => ({
        product: item.products as Product,
        quantity: item.quantity
      })) || [];
      
      setItems(formattedItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  };

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (user) {
      // Database operation for authenticated users
      try {
        const { data: existing } = await supabase
          .from('cart_items')
          .select('quantity')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .single();

        if (existing) {
          await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + quantity })
            .eq('user_id', user.id)
            .eq('product_id', product.id);
        } else {
          await supabase
            .from('cart_items')
            .insert({ user_id: user.id, product_id: product.id, quantity });
        }
        
        // Reload cart from database
        loadCartFromDatabase();
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Local storage for guest users
      setItems(prev => {
        const existing = prev.find(i => i.product.id === product.id);
        if (existing) {
          return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
        }
        return [...prev, { product, quantity }];
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        setItems(prev => prev.filter(i => i.product.id !== productId));
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
    setItems([]);
  };

  const value = useMemo(() => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, loading }), [items, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
