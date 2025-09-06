import { Search, Heart, ShoppingCart, User, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">EcoFinds</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for pre-loved treasures..."
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="w-5 h-5 md:hidden" />
            <Heart className="w-5 h-5 hidden md:block" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;