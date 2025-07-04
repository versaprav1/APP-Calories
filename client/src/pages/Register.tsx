import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: async (userData: { username: string; password: string }) => {
      const response = await apiRequest("/api/register", "POST", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account created successfully!",
        description: "Please complete your profile setup.",
      });
      setLocation("/first-run-setup");
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
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
    registerMutation.mutate({ username, password });
  };

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Logo */}
          <img
            className="absolute w-[78px] h-[78px] top-[51px] left-4"
            alt="Logo"
            src="/figmaAssets/group-15.svg"
          />

          {/* Status bar */}
          <div className="flex w-[84px] h-6 items-center justify-center absolute top-2.5 right-4">
            <img
              className="relative flex-[0_0_auto]"
              alt="Battery signal wifi"
              src="/figmaAssets/battery-signal-wifi-icon.svg"
            />
          </div>

          {/* Time */}
          <div className="absolute w-[90px] h-[30px] top-1 left-0">
            <div className="relative h-[30px]">
              <div className="absolute w-[90px] h-[30px] -top-px left-0 font-normal text-[10.5px] text-center tracking-[0] leading-normal">
                19:09
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="absolute w-[350px] top-[200px] left-5">
            <h1 className="text-white text-[32px] font-semibold text-center mb-8">
              Create Account
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white text-lg">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[50px] rounded-[25px] bg-white text-black text-lg px-4"
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-lg">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] rounded-[25px] bg-white text-black text-lg px-4"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex flex-col items-center gap-4 pt-8">
                <Button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-[180px] h-[50px] rounded-[100px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-[#707070] text-[20px] font-medium"
                >
                  {registerMutation.isPending ? "Creating..." : "Create Account"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="w-[180px] h-[50px] rounded-[100px] bg-white border-[#0679ab] text-[#0679ab] text-[20px] font-medium hover:bg-gray-50"
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}