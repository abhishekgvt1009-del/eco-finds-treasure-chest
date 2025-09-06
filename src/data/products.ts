import leatherBag from "@/assets/leather-bag.jpg";
import cottonSweater from "@/assets/cotton-sweater.jpg";
import plantStand from "@/assets/plant-stand.jpg";
import ceramicMugs from "@/assets/ceramic-mugs.jpg";
import bambooOrganizer from "@/assets/bamboo-organizer.jpg";
import denimJacket from "@/assets/denim-jacket.jpg";

export type Product = {
  id: string;
  image: string;
  images?: string[];
  title: string;
  price: number;
  originalPrice?: number;
  location: string;
  rating: number;
  condition: "Excellent" | "Very Good" | "Good" | "Fair";
  ecoScore?: number;
  category: "fashion" | "home-garden" | "electronics" | "books-media" | "art-crafts" | "baby-kids";
  seller: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "p1",
    image: leatherBag,
    images: [leatherBag],
    title: "Vintage Leather Crossbody Bag - Perfect for Daily Use",
    price: 3500,
    originalPrice: 9500,
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    condition: "Excellent",
    ecoScore: 9,
    category: "fashion",
    seller: "Rajesh Kumar",
    description: "Genuine leather crossbody bag with brass hardware and multiple compartments. Excellent condition with minor patina."
  },
  {
    id: "p2",
    image: cottonSweater,
    images: [cottonSweater],
    title: "Organic Cotton Oversized Sweater",
    price: 2200,
    originalPrice: 6800,
    location: "Bengaluru, Karnataka",
    rating: 4.6,
    condition: "Very Good",
    ecoScore: 8,
    category: "fashion",
    seller: "Meera Patel",
    description: "Soft organic cotton sweater, breathable and cozy for all seasons. Sustainably sourced materials."
  },
  {
    id: "p3",
    image: plantStand,
    images: [plantStand],
    title: "Mid-Century Modern Plant Stand",
    price: 2800,
    originalPrice: 7500,
    location: "Pune, Maharashtra",
    rating: 4.9,
    condition: "Good",
    ecoScore: 7,
    category: "home-garden",
    seller: "Anita Sharma",
    description: "Elegant wooden plant stand that fits 8-12 inch pots. Adds a premium touch to your living room."
  },
  {
    id: "p4",
    image: ceramicMugs,
    images: [ceramicMugs],
    title: "Handmade Ceramic Coffee Mug Set",
    price: 1800,
    originalPrice: 4800,
    location: "Delhi, NCR",
    rating: 4.7,
    condition: "Excellent",
    ecoScore: 9,
    category: "home-garden",
    seller: "Rahul Verma",
    description: "Artisanal ceramic mugs, microwave-safe and lead-free glaze. Ideal for gifting."
  },
  {
    id: "p5",
    image: bambooOrganizer,
    images: [bambooOrganizer],
    title: "Sustainable Bamboo Desk Organizer",
    price: 1400,
    originalPrice: 3600,
    location: "Chennai, Tamil Nadu",
    rating: 4.5,
    condition: "Very Good",
    ecoScore: 10,
    category: "electronics",
    seller: "Sanjay Iyer",
    description: "Eco-friendly bamboo organizer with compartments for stationery, phones, and cables."
  },
  {
    id: "p6",
    image: denimJacket,
    images: [denimJacket],
    title: "Vintage Denim Jacket - Size Medium",
    price: 2500,
    originalPrice: 7200,
    location: "Hyderabad, Telangana",
    rating: 4.8,
    condition: "Good",
    ecoScore: 8,
    category: "fashion",
    seller: "Aarav Singh",
    description: "Classic blue denim jacket with a timeless fit. Lightly used, washed, and ready to wear."
  },
  // Additional products for a richer catalog
  {
    id: "p7",
    image: cottonSweater,
    images: [cottonSweater],
    title: "Handwoven Khadi Cotton Sweater",
    price: 1999,
    originalPrice: 3499,
    location: "Ahmedabad, Gujarat",
    rating: 4.4,
    condition: "Very Good",
    ecoScore: 8,
    category: "fashion",
    seller: "Khadi Collective",
    description: "Ethically woven khadi sweater with breathable comfort and natural dyes."
  },
  {
    id: "p8",
    image: ceramicMugs,
    images: [ceramicMugs],
    title: "Terracotta Tea Cup Pair",
    price: 650,
    originalPrice: 1200,
    location: "Jaipur, Rajasthan",
    rating: 4.3,
    condition: "Excellent",
    ecoScore: 9,
    category: "home-garden",
    seller: "Rajasthan Crafts",
    description: "Traditional terracotta cups with a rustic finish, perfect for chai lovers."
  },
  {
    id: "p9",
    image: bambooOrganizer,
    images: [bambooOrganizer],
    title: "Bamboo Charging Dock Station",
    price: 1599,
    originalPrice: 2999,
    location: "Kochi, Kerala",
    rating: 4.5,
    condition: "Excellent",
    ecoScore: 10,
    category: "electronics",
    seller: "GreenLeaf",
    description: "All-in-one bamboo charging dock for phone, watch, earbuds with cable management."
  },
  {
    id: "p10",
    image: plantStand,
    images: [plantStand],
    title: "Indoor Plant Stand - Teak Finish",
    price: 2199,
    originalPrice: 3999,
    location: "Nagpur, Maharashtra",
    rating: 4.6,
    condition: "Good",
    ecoScore: 7,
    category: "home-garden",
    seller: "Urban Greens",
    description: "Sturdy stand suitable for indoor planters up to 15kg."
  }
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (slug: Product["category"]) => products.filter(p => p.category === slug);
