import { useState } from "react";
import { Search, Filter, SortAsc, Grid3X3, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import leatherBag from "@/assets/leather-bag.jpg";
import cottonSweater from "@/assets/cotton-sweater.jpg";
import plantStand from "@/assets/plant-stand.jpg";
import ceramicMugs from "@/assets/ceramic-mugs.jpg";
import bambooOrganizer from "@/assets/bamboo-organizer.jpg";
import denimJacket from "@/assets/denim-jacket.jpg";

const allProducts = [
  {
    image: leatherBag,
    title: "Vintage Leather Crossbody Bag - Perfect for Daily Use",
    price: 3500,
    originalPrice: 9500,
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    condition: "Excellent" as const,
    ecoScore: 9,
    isLiked: true,
    category: "Fashion",
  },
  {
    image: cottonSweater,
    title: "Organic Cotton Oversized Sweater",
    price: 2200,
    originalPrice: 6800,
    location: "Bangalore, Karnataka",
    rating: 4.6,
    condition: "Very Good" as const,
    ecoScore: 8,
    category: "Fashion",
  },
  {
    image: plantStand,
    title: "Mid-Century Modern Plant Stand",
    price: 2800,
    originalPrice: 7500,
    location: "Pune, Maharashtra",
    rating: 4.9,
    condition: "Good" as const,
    ecoScore: 7,
    category: "Home & Garden",
  },
  {
    image: ceramicMugs,
    title: "Handmade Ceramic Coffee Mug Set",
    price: 1800,
    originalPrice: 4800,
    location: "Delhi, NCR",
    rating: 4.7,
    condition: "Excellent" as const,
    ecoScore: 9,
    isLiked: true,
    category: "Home & Garden",
  },
  {
    image: bambooOrganizer,
    title: "Sustainable Bamboo Desk Organizer",
    price: 1400,
    originalPrice: 3600,
    location: "Chennai, Tamil Nadu",
    rating: 4.5,
    condition: "Very Good" as const,
    ecoScore: 10,
    category: "Electronics",
  },
  {
    image: denimJacket,
    title: "Vintage Denim Jacket - Size Medium",
    price: 2500,
    originalPrice: 7200,
    location: "Hyderabad, Telangana",
    rating: 4.8,
    condition: "Good" as const,
    ecoScore: 8,
    category: "Fashion",
  },
];

const BrowseProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Browse All Items</h1>
          <p className="text-muted-foreground">
            Discover amazing pre-loved treasures from our sustainable community
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home & garden">Home & Garden</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books & media">Books & Media</SelectItem>
                <SelectItem value="art & crafts">Art & Crafts</SelectItem>
                <SelectItem value="baby & kids">Baby & Kids</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
                <SelectItem value="eco-score">Best Eco Score</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-2">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("all")}>×</button>
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="secondary" className="gap-2">
              "{searchTerm}"
              <button onClick={() => setSearchTerm("")}>×</button>
            </Badge>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No items found matching your criteria.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BrowseProducts;