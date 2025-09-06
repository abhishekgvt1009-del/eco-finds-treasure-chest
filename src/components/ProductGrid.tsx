import ProductCard from "./ProductCard";
import productShowcase from "@/assets/product-showcase.jpg";

// Mock data for demonstration
const mockProducts = [
  {
    image: productShowcase,
    title: "Vintage Leather Crossbody Bag - Perfect for Daily Use",
    price: 45,
    originalPrice: 120,
    location: "Brooklyn, NY",
    rating: 4.8,
    condition: "Excellent" as const,
    ecoScore: 9,
    isLiked: true,
  },
  {
    image: productShowcase,
    title: "Organic Cotton Oversized Sweater",
    price: 28,
    originalPrice: 85,
    location: "Portland, OR",
    rating: 4.6,
    condition: "Very Good" as const,
    ecoScore: 8,
  },
  {
    image: productShowcase,
    title: "Mid-Century Modern Plant Stand",
    price: 35,
    originalPrice: 95,
    location: "Austin, TX",
    rating: 4.9,
    condition: "Good" as const,
    ecoScore: 7,
  },
  {
    image: productShowcase,
    title: "Handmade Ceramic Coffee Mug Set",
    price: 22,
    originalPrice: 60,
    location: "Seattle, WA",
    rating: 4.7,
    condition: "Excellent" as const,
    ecoScore: 9,
    isLiked: true,
  },
  {
    image: productShowcase,
    title: "Sustainable Bamboo Desk Organizer",
    price: 18,
    originalPrice: 45,
    location: "San Francisco, CA",
    rating: 4.5,
    condition: "Very Good" as const,
    ecoScore: 10,
  },
  {
    image: productShowcase,
    title: "Vintage Denim Jacket - Size Medium",
    price: 32,
    originalPrice: 90,
    location: "Denver, CO",
    rating: 4.8,
    condition: "Good" as const,
    ecoScore: 8,
  },
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending Pre-Loved Items
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover unique finds from our community of conscious sellers. Every purchase helps reduce waste and supports sustainable living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;