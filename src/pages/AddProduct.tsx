import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Sparkles, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";

const AddProduct = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    location: ""
  });

  const generateDescription = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedTitle = "Premium Cotton Kurta Set - Elegant Traditional Wear";
      const generatedDescription = "Beautiful hand-woven cotton kurta set in excellent condition. Perfect for festivals and special occasions. Features intricate embroidery work and comfortable fit. Originally purchased from a premium boutique. Worn only twice, dry cleaned and well-maintained.";
      
      setProductData({
        ...productData,
        title: generatedTitle,
        description: generatedDescription
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product submission
    console.log("Product submitted:", productData);
  };

  const categories = [
    "Fashion & Clothing",
    "Home & Garden", 
    "Electronics",
    "Books & Media",
    "Art & Crafts",
    "Baby & Kids",
    "Sports & Fitness",
    "Kitchen & Dining"
  ];

  const conditions = [
    { value: "excellent", label: "Excellent", description: "Like new, no visible wear" },
    { value: "very-good", label: "Very Good", description: "Minor signs of use" },
    { value: "good", label: "Good", description: "Some wear but fully functional" },
    { value: "fair", label: "Fair", description: "Noticeable wear but still usable" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/my-listings" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Listings
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add New Item</CardTitle>
              <CardDescription>
                List your pre-loved item and give it a new home while earning money
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Photos</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">
                      Click to upload photos or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add up to 5 photos (PNG, JPG up to 5MB each)
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* AI Enhancement */}
                <Card className="bg-gradient-to-r from-primary/5 to-success/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-medium">AI-Powered Listing Assistant</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Let AI create an attractive title and description based on your photos
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateDescription}
                      disabled={isGenerating}
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      {isGenerating ? "Generating..." : "Generate with AI"}
                      <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Leather Jacket - Size Medium"
                      value={productData.title}
                      onChange={(e) => setProductData({...productData, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={productData.category} onValueChange={(value) => setProductData({...productData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={productData.condition} onValueChange={(value) => setProductData({...productData, condition: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition.value} value={condition.value}>
                            <div>
                              <div className="font-medium">{condition.label}</div>
                              <div className="text-xs text-muted-foreground">{condition.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    placeholder="Describe your item's condition, features, and why you're selling it..."
                    className="w-full p-3 border border-border rounded-md resize-none"
                    rows={4}
                    value={productData.description}
                    onChange={(e) => setProductData({...productData, description: e.target.value})}
                    required
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Selling Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2500"
                      value={productData.price}
                      onChange={(e) => setProductData({...productData, price: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="5000"
                      value={productData.originalPrice}
                      onChange={(e) => setProductData({...productData, originalPrice: e.target.value})}
                    />
                    {productData.price && productData.originalPrice && (
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(((Number(productData.originalPrice) - Number(productData.price)) / Number(productData.originalPrice)) * 100)}% off
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={productData.location}
                    onChange={(e) => setProductData({...productData, location: e.target.value})}
                    required
                  />
                </div>

                {/* Trust & Safety Info */}
                <Card className="bg-secondary/30">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">🔒 Trust & Safety</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be honest about item condition and defects</li>
                      <li>• Use clear, well-lit photos</li>
                      <li>• Respond to messages promptly</li>
                      <li>• Meet in safe, public locations</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    List Item
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;