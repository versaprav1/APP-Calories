import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  LogIn, 
  User, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Activity,
  Sparkles
} from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (userData: { username: string; password: string }) => {
      const response = await apiRequest("/api/login", "POST", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex justify-center w-full bg-transparent min-h-screen">
      <Card className="relative w-[390px] min-h-[844px] rounded-[25px] overflow-hidden border-none">
        
        {/* Dynamic Background */}
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 transition-all duration-700">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 text-8xl opacity-5 animate-float">
              🏊‍♂️💪🏃‍♂️
            </div>
            <div className="absolute top-1/3 -left-10 text-6xl opacity-10 animate-float-delayed">
              🚴‍♂️⚡🎯
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-5xl opacity-5 animate-bounce-slow">
              🏆📊💎
            </div>
          </div>

          {/* Header */}
          <div className="relative px-6 pt-12 pb-6 z-10">
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={() => setLocation("/")}
                variant="ghost"
                className="text-white hover:bg-white/20 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </Button>
              
              <Button
                onClick={() => setLocation("/register")}
                variant="ghost"
                className="text-white hover:bg-white/20 text-sm font-medium"
              >
                Create Account
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 z-10 relative animate-fade-in">
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
                <LogIn className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center mb-4 leading-tight">
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-center text-lg leading-relaxed mb-8 px-2">
              Sign in to continue your fitness journey and track your progress
            </p>

            {/* Demo Info */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-white font-medium">Demo Account</span>
              </div>
              <p className="text-white/90 text-sm">
                Username: <span className="font-semibold">Praveen</span> | Password: <span className="font-semibold">1234</span>
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-white/80" />
                  <Label htmlFor="username" className="text-white text-lg font-medium">
                    Username
                  </Label>
                </div>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[50px] rounded-xl bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-base px-4 focus:bg-white/20 focus:border-white/40"
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-white/80" />
                  <Label htmlFor="password" className="text-white text-lg font-medium">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] rounded-xl bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-base px-4 focus:bg-white/20 focus:border-white/40"
                  placeholder="Enter your password"
                />
              </div>

              <div className="pt-8 space-y-6">
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full h-[50px] rounded-xl bg-white text-gray-900 hover:bg-white/90 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center gap-2">
                    {loginMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </div>
                </Button>
                
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-3">Don't have an account?</p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setLocation("/register")}
                    className="text-white hover:bg-white/20 underline text-sm h-8"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </form>

            {/* Features Preview */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Activity className="h-6 w-6 text-white mx-auto mb-2" />
                <div className="text-white text-xs font-medium">Multi-Sport</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-white text-xs font-medium">Real-Time</div>
                <div className="text-white text-xs">Analytics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-white text-xs font-medium">Goal</div>
                <div className="text-white text-xs">Tracking</div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Custom CSS for animations */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-fade-in { animation: fade-in 0.6s ease-out; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        `}</style>
      </Card>
    </div>
  );
}