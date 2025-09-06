import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground">We respect your privacy. Your data is used to improve your experience and is not shared without consent.</p>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
