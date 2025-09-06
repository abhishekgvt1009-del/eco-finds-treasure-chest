import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const Wishlist = () => {
  const { ids } = useWishlist();
  const list = products.filter(p => ids.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        {list.length === 0 ? (
          <p className="text-muted-foreground">No items yet. Tap the heart on a product to add it here.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map(p => (<ProductCard key={p.id} {...p} />))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
