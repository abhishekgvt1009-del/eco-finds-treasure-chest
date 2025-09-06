import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import productShowcase from "@/assets/product-showcase.jpg";

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  seller: string;
  condition: string;
  ecoScore: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      image: productShowcase,
      title: "Vintage Leather Crossbody Bag",
      price: 3500,
      originalPrice: 9500,
      quantity: 1,
      seller: "Rajesh Kumar",
      condition: "Excellent",
      ecoScore: 9
    },
    {
      id: "2",
      image: productShowcase,
      title: "Organic Cotton Oversized Sweater",
      price: 2200,
      originalPrice: 6800,
      quantity: 1,
      seller: "Meera Patel",
      condition: "Very Good",
      ecoScore: 8
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shipping;

  const purchaseHistory = [
    {
      id: "order-001",
      date: "2024-01-15",
      items: 2,
      total: 4200,
      status: "Delivered"
    },
    {
      id: "order-002", 
      date: "2024-01-08",
      items: 1,
      total: 1800,
      status: "Delivered"
    },
    {
      id: "order-003",
      date: "2023-12-28",
      items: 3,
      total: 5500,
      status: "Delivered"
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
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shopping Cart ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring our sustainable marketplace
                    </p>
                    <Link to="/">
                      <Button>Browse Items</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Sold by {item.seller}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {item.condition}
                            </Badge>
                            <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                              🌱 Eco {item.ecoScore}/10
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">₹{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Purchase History */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items • {new Date(order.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.total}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-success">
                        <span>You save</span>
                        <span>-₹{savings}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      Proceed to Checkout
                    </Button>
                    <Link to="/" className="block">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-trust" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>Free shipping on orders ₹2000+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;