
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Shield, FileText, Users } from "lucide-react";
import CountrySelector from "@/components/CountrySelector";
import PassportForm from "@/components/PassportForm";
import PassportPreview from "@/components/PassportPreview";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState("login");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [passportData, setPassportData] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    // Simple mock authentication
    if (email && password) {
      setUser({ email, name: email.split("@")[0] });
      setIsAuthenticated(true);
      setCurrentStep("country-selection");
    }
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    
    if (email && password && name) {
      setUser({ email, name });
      setIsAuthenticated(true);
      setCurrentStep("country-selection");
    }
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setCurrentStep("passport-form");
  };

  const handlePassportSubmit = (data: any) => {
    setPassportData({ ...data, country: selectedCountry, user });
    setCurrentStep("passport-preview");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentStep("login");
    setSelectedCountry(null);
    setPassportData(null);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Globe className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">PassportGen</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Create official digital passports for any country in the world
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure & Official</h3>
                <p className="text-gray-600">Bank-level security with official document standards</p>
              </div>
              <div className="text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All Countries</h3>
                <p className="text-gray-600">Generate passports for any country worldwide</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
                <p className="text-gray-600">Simple process, professional results</p>
              </div>
            </div>
          </div>

          {/* Auth Forms */}
          <Card className="w-full max-w-md mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to PassportGen</CardTitle>
              <CardDescription>Sign in or create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PassportGen</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "country-selection" && (
          <CountrySelector onSelect={handleCountrySelect} />
        )}
        
        {currentStep === "passport-form" && (
          <PassportForm
            country={selectedCountry}
            onSubmit={handlePassportSubmit}
            onBack={() => setCurrentStep("country-selection")}
          />
        )}
        
        {currentStep === "passport-preview" && (
          <PassportPreview
            passportData={passportData}
            onBack={() => setCurrentStep("passport-form")}
            onEdit={() => setCurrentStep("passport-form")}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
