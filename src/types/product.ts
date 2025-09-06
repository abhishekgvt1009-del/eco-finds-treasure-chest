export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  original_price?: number;
  originalPrice?: number; // Legacy support
  image: string;
  image_url?: string; // Database field
  category: string;
  condition: "Excellent" | "Like New" | "Very Good" | "Good" | "Fair";
  location: string;
  rating: number;
  eco_score?: number;
  ecoScore?: number; // Legacy support
  seller?: string;
  seller_id?: string;
  isLiked?: boolean;
  images?: string[];
}