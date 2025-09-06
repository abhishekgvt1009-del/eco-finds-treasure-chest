import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground">By using EcoFinds, you agree to our community guidelines and platform terms.</p>
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
