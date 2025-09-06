import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, Edit, Eye, Trash2, MessageCircle, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import productShowcase from "@/assets/product-showcase.jpg";

interface Listing {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  status: "active" | "sold" | "draft" | "paused";
  views: number;
  likes: number;
  messages: number;
  listedDate: string;
  condition: string;
  ecoScore: number;
}

const MyListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings] = useState<Listing[]>([
    {
      id: "1",
      image: productShowcase,
      title: "Handwoven Cotton Kurta Set - Traditional Wear",
      price: 2800,
      originalPrice: 7500,
      status: "active",
      views: 47,
      likes: 12,
      messages: 3,
      listedDate: "2024-01-10",
      condition: "Excellent",
      ecoScore: 9
    },
    {
      id: "2", 
      image: productShowcase,
      title: "Vintage Wooden Study Table",
      price: 4200,
      originalPrice: 12000,
      status: "active",
      views: 89,
      likes: 24,
      messages: 7,
      listedDate: "2024-01-05",
      condition: "Very Good",
      ecoScore: 8
    },
    {
      id: "3",
      image: productShowcase,
      title: "Designer Ceramic Dinner Set",
      price: 3500,
      status: "sold",
      views: 156,
      likes: 31,
      messages: 12,
      listedDate: "2023-12-20",
      condition: "Good",
      ecoScore: 7
    },
    {
      id: "4",
      image: productShowcase,
      title: "Organic Cotton Baby Clothes Bundle",
      price: 1800,
      originalPrice: 5200,
      status: "draft",
      views: 0,
      likes: 0,
      messages: 0,
      listedDate: "2024-01-15",
      condition: "Excellent",
      ecoScore: 10
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "sold": return "bg-primary/10 text-primary";
      case "draft": return "bg-muted text-muted-foreground";
      case "paused": return "bg-yellow-100 text-yellow-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeListings = filteredListings.filter(l => l.status === "active");
  const soldListings = filteredListings.filter(l => l.status === "sold");
  const draftListings = filteredListings.filter(l => l.status === "draft");

  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const totalLikes = listings.reduce((sum, listing) => sum + listing.likes, 0);
  const totalEarnings = soldListings.reduce((sum, listing) => sum + listing.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/profile" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Listings</h1>
            <p className="text-muted-foreground">Manage your items and track performance</p>
          </div>
          <Link to="/add-product">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Item
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{listings.length}</div>
              <div className="text-sm text-muted-foreground">Total Listings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{soldListings.length}</div>
              <div className="text-sm text-muted-foreground">Items Sold</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{totalViews}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-trust">₹{totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Listings Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All ({listings.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
            <TabsTrigger value="sold">Sold ({soldListings.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftListings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <ListingGrid listings={filteredListings} />
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <ListingGrid listings={activeListings} />
          </TabsContent>
          
          <TabsContent value="sold" className="mt-6">
            <ListingGrid listings={soldListings} />
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-6">
            <ListingGrid listings={draftListings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ListingGrid = ({ listings }: { listings: Listing[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "sold": return "bg-primary/10 text-primary";
      case "draft": return "bg-muted text-muted-foreground";
      case "paused": return "bg-yellow-100 text-yellow-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No listings found</h3>
          <p className="text-muted-foreground mb-4">
            Start selling your pre-loved items today
          </p>
          <Link to="/add-product">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <Badge 
              className={`absolute top-3 left-3 text-xs capitalize ${getStatusColor(listing.status)}`}
            >
              {listing.status}
            </Badge>
            {listing.ecoScore && (
              <Badge 
                variant="secondary" 
                className="absolute top-3 right-3 bg-success/10 text-success text-xs"
              >
                🌱 {listing.ecoScore}/10
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-2 line-clamp-2">
              {listing.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg">₹{listing.price}</span>
              {listing.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{listing.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {listing.views}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {listing.messages}
                </div>
              </div>
              <span>{new Date(listing.listedDate).toLocaleDateString('en-IN')}</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyListings;