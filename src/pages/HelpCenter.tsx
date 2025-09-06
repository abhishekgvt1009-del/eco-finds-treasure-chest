import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpCenter = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-muted-foreground">Find answers to common questions about orders, returns, and safety.</p>
    </main>
    <Footer />
  </div>
);

export default HelpCenter;
