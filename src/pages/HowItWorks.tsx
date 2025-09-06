import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">How EcoFinds Works</h1>
      <ol className="space-y-3 list-decimal pl-5 text-muted-foreground">
        <li>Browse sustainable, pre-loved items by category or search.</li>
        <li>Chat with the seller for details and negotiate if needed.</li>
        <li>Add to cart or Buy Now to proceed to secure checkout.</li>
        <li>Choose your preferred payment mode (UPI, Card, Net Banking, COD).</li>
        <li>Track delivery and enjoy your eco-friendly purchase.</li>
      </ol>
    </main>
    <Footer />
  </div>
);

export default HowItWorks;
