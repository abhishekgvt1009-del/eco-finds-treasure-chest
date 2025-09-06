import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const ProductGrid = () => {
  // Show first 6 products on homepage
  const featuredProducts = products.slice(0, 6);

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
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/browse"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium inline-block"
          >
            View All Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;