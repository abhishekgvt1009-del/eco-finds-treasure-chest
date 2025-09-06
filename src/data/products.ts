import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/product";

// Fetch products from Supabase
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(product => ({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      originalPrice: product.original_price ? Number(product.original_price) : undefined,
      image: product.image_url || '',
      image_url: product.image_url,
      location: product.location,
      rating: Number(product.rating),
      condition: product.condition as any,
      ecoScore: product.eco_score,
      eco_score: product.eco_score,
      category: product.category,
      description: product.description,
    })) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      price: Number(data.price),
      originalPrice: data.original_price ? Number(data.original_price) : undefined,
      image: data.image_url || '',
      image_url: data.image_url,
      location: data.location,
      rating: Number(data.rating),
      condition: data.condition as any,
      ecoScore: data.eco_score,
      eco_score: data.eco_score,
      category: data.category,
      description: data.description,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
};

// Legacy static products for fallback
export const products: Product[] = [];