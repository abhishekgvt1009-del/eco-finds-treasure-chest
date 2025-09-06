import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3, Star, MapPin, Calendar, Package, TrendingUp, Award, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Passionate about sustainable living and finding unique pre-loved treasures. Love giving items a second life!",
    joinedDate: "March 2024",
    rating: 4.9,
    totalSales: 47,
    totalPurchases: 23,
    ecoScore: 87
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const recentActivity = [
    { type: "sale", item: "Vintage Kurta Set", amount: 2500, date: "2 days ago" },
    { type: "purchase", item: "Ceramic Plant Pot", amount: 800, date: "5 days ago" },
    { type: "sale", item: "Wooden Bookshelf", amount: 4200, date: "1 week ago" },
    { type: "purchase", item: "Cotton Throw Pillow", amount: 650, date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="/api/placeholder/150/150" />
                    <AvatarFallback className="text-xl">PS</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </div>
                <CardTitle className="mt-4">{profileData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="font-medium">{profileData.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Eco Score</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    🌱 {profileData.ecoScore}/100
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm font-medium">{profileData.joinedDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <Package className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-xl font-bold text-primary">{profileData.totalSales}</div>
                    <div className="text-xs text-muted-foreground">Items Sold</div>
                  </div>
                  <div className="text-center p-3 bg-success/5 rounded-lg">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1 text-success" />
                    <div className="text-xl font-bold text-success">{profileData.totalPurchases}</div>
                    <div className="text-xs text-muted-foreground">Purchases</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            className="w-full p-3 border border-border rounded-md"
                            rows={3}
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSave}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Bio</Label>
                          <p className="mt-1">{profileData.bio}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Email</Label>
                            <p className="mt-1">{profileData.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Phone</Label>
                            <p className="mt-1">{profileData.phone}</p>
                          </div>
                        </div>
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest transactions and interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.type === 'sale' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                            }`}>
                              {activity.type === 'sale' ? <TrendingUp className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{activity.item}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.type === 'sale' ? 'Sold' : 'Purchased'} • {activity.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{activity.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                    <CardDescription>
                      Your sustainable shopping milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Award className="w-8 h-8 mx-auto mb-2 text-success" />
                        <h3 className="font-medium">Eco Warrior</h3>
                        <p className="text-sm text-muted-foreground">50+ sustainable purchases</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Trusted Seller</h3>
                        <p className="text-sm text-muted-foreground">4.5+ rating with 25+ sales</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center opacity-50">
                        <Star className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium">Community Champion</h3>
                        <p className="text-sm text-muted-foreground">100+ items sold (47/100)</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center opacity-50">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium">One Year Strong</h3>
                        <p className="text-sm text-muted-foreground">Active for 1 year (8 months)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;