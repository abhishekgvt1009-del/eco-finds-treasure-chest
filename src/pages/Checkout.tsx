import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useLocation, Link } from "react-router-dom";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const params = new URLSearchParams(useLocation().search);
  const buyNowId = params.get('buyNow');
  const list = buyNowId ? items.filter(i => i.product.id === buyNowId) : items;

  const subtotal = list.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="rounded-md border border-border bg-background p-3" placeholder="Full Name" />
              <input className="rounded-md border border-border bg-background p-3" placeholder="Phone (India)" />
              <input className="rounded-md border border-border bg-background p-3 sm:col-span-2" placeholder="Address Line 1" />
              <input className="rounded-md border border-border bg-background p-3 sm:col-span-2" placeholder="Address Line 2" />
              <input className="rounded-md border border-border bg-background p-3" placeholder="City" />
              <input className="rounded-md border border-border bg-background p-3" placeholder="State" />
              <input className="rounded-md border border-border bg-background p-3" placeholder="PIN Code" />
              <input className="rounded-md border border-border bg-background p-3" placeholder="Email" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="upi" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI (Google Pay, PhonePe, Paytm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking">Net Banking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {list.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.title} className="w-12 h-12 rounded-md object-cover" />
                      <div>
                        <p className="font-medium text-sm">{product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span>₹{product.price * quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
              <Button className="w-full" onClick={() => { alert('Checkout requires backend integration. Please connect Supabase & Stripe for payments.'); clearCart(); }}>
                Pay Securely
              </Button>
              <Link to="/browse" className="block text-center text-sm text-muted-foreground">Continue Shopping</Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
