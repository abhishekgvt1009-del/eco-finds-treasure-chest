import { Shirt, Home, Book, Gamepad2, Palette, Baby } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Fashion", icon: Shirt, count: "2.4k items", color: "text-accent" },
  { name: "Home & Garden", icon: Home, count: "1.8k items", color: "text-primary" },
  { name: "Books & Media", icon: Book, count: "950 items", color: "text-success" },
  { name: "Electronics", icon: Gamepad2, count: "720 items", color: "text-trust" },
  { name: "Art & Crafts", icon: Palette, count: "480 items", color: "text-accent" },
  { name: "Baby & Kids", icon: Baby, count: "650 items", color: "text-success" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find exactly what you're looking for in our curated categories of pre-loved treasures.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              className="group cursor-pointer p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 block"
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;