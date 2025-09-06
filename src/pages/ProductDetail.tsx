import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Heart, Share2, MessageCircle, MapPin, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getProductById, products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggle, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The item you are looking for may have been removed.</p>
          <Link to="/browse"><Button>Browse Items</Button></Link>
        </div>
      </div>
    );
  }

  const images = product.images ?? [product.image];
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;
  const liked = isWishlisted(product.id);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, text: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      }
    } catch {}
  };

  const buyNow = () => {
    addToCart(product, 1);
    navigate(`/checkout?buyNow=${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/browse" 
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
                src={images[currentImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
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
            )}
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
                    onClick={() => toggle(product.id)}
                    className={liked ? 'text-red-500 border-red-200' : ''}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline">{product.condition}</Badge>
                {product.ecoScore && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    🌱 Eco {product.ecoScore}/10
                  </Badge>
                )}
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
              <Button className="flex-1" onClick={() => addToCart(product, 1)}>
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1" onClick={buyNow}>
                Buy Now
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Seller
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message {product.seller}</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Message sent to seller'); }}>
                    <textarea className="w-full min-h-[120px] rounded-md border border-border bg-background p-3" placeholder="Hi! Is this still available? Can you share more photos?" />
                    <Button type="submit">Send Message</Button>
                  </form>
                </DialogContent>
              </Dialog>
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
                    <span>Ships across India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-success" />
                    <span>7-day returns</span>
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
                    <AvatarImage src={"/api/placeholder/150/150"} />
                    <AvatarFallback>{product.seller.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.seller}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span>{product.rating} • Trusted Seller</span>
                    </div>
                  </div>
                  <Link to={`/seller/${product.seller}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Joined recently</p>
                  <p>Usually responds within 2 hours</p>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping & Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span>3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ships to</span>
                  <span>Across India</span>
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
