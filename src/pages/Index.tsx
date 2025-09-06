import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import WelcomeOverlay from "@/components/WelcomeOverlay";

const Index = () => {
  return (
    <div className="min-h-screen">
      <WelcomeOverlay />
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
