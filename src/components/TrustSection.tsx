import { Shield, Award, Users, Truck } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Protected payments and buyer protection on every purchase",
    color: "text-trust bg-trust/10"
  },
  {
    icon: Award,
    title: "Quality Verified",
    description: "Every item is carefully reviewed and rated by our community",
    color: "text-success bg-success/10"
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "10,000+ verified sellers with stellar reputation scores",
    color: "text-accent bg-accent/10"
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Most items ship within 24 hours with tracking included",
    color: "text-primary bg-primary/10"
  }
];

const TrustSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop with Confidence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built trust into every aspect of EcoFinds to ensure safe, secure, and satisfying sustainable shopping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8 text-center border border-primary/10">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary">10,000+</span>
              <span>Happy Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-success">50,000+</span>
              <span>Items Sold</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-accent">4.9★</span>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;