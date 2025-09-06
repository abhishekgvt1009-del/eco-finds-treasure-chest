import { Leaf, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EcoFinds</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Making sustainable shopping accessible to everyone. Join our community of conscious consumers and help create a more sustainable future.
            </p>
            <div className="flex space-x-2">
              <a href="https://facebook.com/ecofinds" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://twitter.com/ecofinds" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Twitter className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://instagram.com/ecofinds" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
              <a href="mailto:hello@ecofinds.in">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">Browse Items</Link></li>
              <li><Link to="/add-product" className="text-muted-foreground hover:text-primary transition-colors">Sell Items</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors">Safety Tips</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 EcoFinds. All rights reserved. Made with 💚 for a sustainable future.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Carbon-neutral shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;