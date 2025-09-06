import { ArrowRight, Recycle, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">Sustainable Shopping Made Simple</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Next
            <span className="block bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Pre-Loved Treasure
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands discovering amazing pre-owned items while making a positive impact on our planet. 
            Shop sustainably, save money, build community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/#products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Start Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/add-product">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                Sell Your Items
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                <Recycle className="w-6 h-6 text-success" />
              </div>
              <p className="text-sm font-medium text-foreground">Eco-Friendly</p>
              <p className="text-xs text-muted-foreground">Reduce waste</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-trust/10 flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-trust" />
              </div>
              <p className="text-sm font-medium text-foreground">Safe & Secure</p>
              <p className="text-xs text-muted-foreground">Protected deals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-foreground">Community</p>
              <p className="text-xs text-muted-foreground">10k+ members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;