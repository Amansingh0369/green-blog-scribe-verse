
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Landing = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <header className="w-full py-6 px-4 md:px-6 lg:px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-green-700">Green Blog</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("login")}
            className={activeTab === "login" ? "text-green-700" : "text-gray-500"}
          >
            Login
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("signup")}
            className={activeTab === "signup" ? "text-green-700" : "text-gray-500"}
          >
            Sign Up
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12 p-6 md:p-12">
        {/* Left side - Welcome Message */}
        <div className="w-full md:w-1/2 max-w-2xl space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Leaf className="h-10 w-10 text-green-600 mr-3 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-green-800">
                Green Blog
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-green-700">
              Share Your Environmental Journey
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join our community of environmental enthusiasts sharing ideas, stories, and solutions 
              for a greener planet. Connect with like-minded individuals and make a positive impact together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
            <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
              <h3 className="font-medium text-green-700">Share Ideas</h3>
              <p className="text-gray-600 text-sm">Post your environmental tips and experiences</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
              <h3 className="font-medium text-green-700">Connect</h3>
              <p className="text-gray-600 text-sm">Like and comment on other's stories</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
              <h3 className="font-medium text-green-700">Make Impact</h3>
              <p className="text-gray-600 text-sm">Inspire others with your environmental journey</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <Card className="border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-green-800">
                {activeTab === "login" ? "Welcome Back" : "Join Our Community"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login" 
                  ? "Sign in to continue your green journey" 
                  : "Create an account to share your environmental stories"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="email" 
                        placeholder="Your email" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="email" 
                        placeholder="Your email" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="password" 
                        placeholder="Create password" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="password" 
                        placeholder="Confirm password" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t border-green-100 pt-4">
              {activeTab === "login" ? (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setActiveTab("signup")} 
                    className="text-green-600 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button 
                    onClick={() => setActiveTab("login")} 
                    className="text-green-600 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-6 border-t border-green-100 shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} <span className="text-green-600 font-medium">Green Blog</span>. 
            Committed to a greener planet.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
