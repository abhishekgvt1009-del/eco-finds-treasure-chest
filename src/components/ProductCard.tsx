import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  location: string;
  rating: number;
  isLiked?: boolean;
  condition: "Excellent" | "Very Good" | "Good" | "Fair";
  ecoScore?: number;
}

const ProductCard = ({ 
  image, 
  title, 
  price, 
  originalPrice, 
  location, 
  rating, 
  isLiked = false, 
  condition,
  ecoScore 
}: ProductCardProps) => {
  const savings = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Floating badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {savings > 0 && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium">
              {savings}% off
            </Badge>
          )}
          {ecoScore && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20 px-2 py-1 text-xs font-medium">
              🌱 Eco {ecoScore}/10
            </Badge>
          )}
        </div>

        {/* Heart button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm ${
            isLiked 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-background/80 text-muted-foreground hover:text-accent'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-foreground line-clamp-2 flex-1 text-sm">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            {condition}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span className="text-xs text-muted-foreground">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground">₹{price}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;