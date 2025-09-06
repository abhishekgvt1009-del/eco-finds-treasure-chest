import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SafetyTips = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Safety Tips</h1>
      <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
        <li>Prefer payments via trusted gateways; avoid sharing OTPs.</li>
        <li>Verify product condition via photos/videos before purchase.</li>
        <li>Use in-app messaging; avoid sharing personal details.</li>
        <li>Check seller ratings and reviews.</li>
      </ul>
    </main>
    <Footer />
  </div>
);

export default SafetyTips;
