import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Share2, MessageCircle, MapPin, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import productShowcase from "@/assets/product-showcase.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: id || "1",
    images: [productShowcase, productShowcase, productShowcase],
    title: "Vintage Leather Crossbody Bag - Perfect for Daily Use",
    price: 3500,
    originalPrice: 9500,
    condition: "Excellent",
    ecoScore: 9,
    location: "Mumbai, Maharashtra",
    description: "This beautiful vintage leather crossbody bag is in excellent condition and perfect for daily use. Made from genuine leather with brass hardware. The bag features multiple compartments and a comfortable adjustable strap. Originally purchased from a premium boutique, worn only a few times. No scratches or damages, just some minor patina that adds to its vintage charm.",
    features: [
      "Genuine leather construction",
      "Adjustable crossbody strap",
      "Multiple interior compartments",
      "Brass hardware details",
      "Vintage-inspired design"
    ],
    seller: {
      name: "Rajesh Kumar",
      avatar: "/api/placeholder/150/150",
      rating: 4.8,
      totalSales: 24,
      joinedDate: "March 2023",
      responseTime: "Usually responds within 2 hours"
    },
    stats: {
      views: 89,
      likes: 24,
      watchers: 12
    },
    shipping: {
      cost: 100,
      estimated: "3-5 days",
      locations: "Ships across India"
    }
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  const relatedProducts = [
    {
      id: "2",
      image: productShowcase,
      title: "Cotton Canvas Tote Bag",
      price: 1200,
      originalPrice: 2800,
      condition: "Very Good"
    },
    {
      id: "3", 
      image: productShowcase,
      title: "Leather Wallet - Brown",
      price: 800,
      originalPrice: 2200,
      condition: "Good"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src={product.images[currentImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    currentImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{product.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-red-500 border-red-200' : ''}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline">{product.condition}</Badge>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  🌱 Eco {product.ecoScore}/10
                </Badge>
                {savingsPercent > 0 && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {savingsPercent}% off
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-success font-medium">You save ₹{savings}!</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Seller
              </Button>
            </div>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-trust" />
                    <span>Buyer Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>₹{product.shipping.cost} Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-success" />
                    <span>Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Quality Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.seller.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span>{product.seller.rating} • {product.seller.totalSales} sales</span>
                    </div>
                  </div>
                  <Link to={`/seller/${product.seller.name}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Joined {product.seller.joinedDate}</p>
                  <p>{product.seller.responseTime}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping & Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping Cost</span>
                  <span>₹{product.shipping.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span>{product.shipping.estimated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ships to</span>
                  <span>{product.shipping.locations}</span>
                </div>
                <Separator />
                <p className="text-muted-foreground text-xs">
                  Free returns within 7 days if item not as described
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedProducts.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`}>
                    <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-sm">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;