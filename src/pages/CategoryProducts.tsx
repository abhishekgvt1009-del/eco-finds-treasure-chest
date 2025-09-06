import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import leatherBag from "@/assets/leather-bag.jpg";
import cottonSweater from "@/assets/cotton-sweater.jpg";
import plantStand from "@/assets/plant-stand.jpg";
import ceramicMugs from "@/assets/ceramic-mugs.jpg";
import bambooOrganizer from "@/assets/bamboo-organizer.jpg";
import denimJacket from "@/assets/denim-jacket.jpg";

const categoryProducts = {
  fashion: [
    {
      image: cottonSweater,
      title: "Organic Cotton Oversized Sweater - Sustainable Fashion",
      price: 2200,
      originalPrice: 6800,
      location: "Mumbai, Maharashtra",
      rating: 4.6,
      condition: "Very Good" as const,
      ecoScore: 8,
    },
    {
      image: denimJacket,
      title: "Vintage Denim Jacket - Size Medium - Classic Blue",
      price: 2500,
      originalPrice: 7200,
      location: "Delhi, NCR",
      rating: 4.8,
      condition: "Good" as const,
      ecoScore: 8,
    },
    {
      image: leatherBag,
      title: "Vintage Leather Crossbody Bag - Perfect for Daily Use",
      price: 3500,
      originalPrice: 9500,
      location: "Bangalore, Karnataka",
      rating: 4.8,
      condition: "Excellent" as const,
      ecoScore: 9,
      isLiked: true,
    },
  ],
  "home-garden": [
    {
      image: plantStand,
      title: "Mid-Century Modern Plant Stand - Wooden Design",
      price: 2800,
      originalPrice: 7500,
      location: "Pune, Maharashtra",
      rating: 4.9,
      condition: "Good" as const,
      ecoScore: 7,
    },
    {
      image: ceramicMugs,
      title: "Handmade Ceramic Coffee Mug Set - Artisanal Pottery",
      price: 1800,
      originalPrice: 4800,
      location: "Chennai, Tamil Nadu",
      rating: 4.7,
      condition: "Excellent" as const,
      ecoScore: 9,
      isLiked: true,
    },
  ],
  electronics: [
    {
      image: bambooOrganizer,
      title: "Sustainable Bamboo Desk Organizer - Eco Office",
      price: 1400,
      originalPrice: 3600,
      location: "Hyderabad, Telangana",
      rating: 4.5,
      condition: "Very Good" as const,
      ecoScore: 10,
    },
  ],
};

const categoryNames = {
  fashion: "Fashion",
  "home-garden": "Home & Garden",
  "books-media": "Books & Media",
  electronics: "Electronics",
  "art-crafts": "Art & Crafts",
  "baby-kids": "Baby & Kids",
};

const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>();
  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const categoryName = categoryNames[category as keyof typeof categoryNames] || "Category";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
            <p className="text-muted-foreground">
              {products.length} sustainable items available
            </p>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
                <SelectItem value="eco-score">Best Eco Score</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products available in this category yet.
            </p>
            <Link to="/add-product">
              <Button className="mt-4">List Your Item</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;