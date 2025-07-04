import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  User, 
  Database, 
  LayoutDashboard, 
  Mail, 
  HelpCircle,
  Settings as SettingsIcon,
  LogOut,
  Shield,
  Crown,
  UserCircle,
  Sparkles
} from "lucide-react";

export default function Account() {
  const [, setLocation] = useLocation();

  const accountOptions = [
    {
      icon: UserCircle,
      label: "Profile Settings",
      description: "Update personal info and preferences",
      route: "/profile-setup",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Database,
      label: "Data Management",
      description: "Backup and manage your workout data",
      route: "/data",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard Setup",
      description: "Customize your dashboard layout",
      route: "/dashboard-setup",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Mail,
      label: "Email Settings",
      description: "Add or update your email address",
      route: "/add-edit-email",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: SettingsIcon,
      label: "App Settings",
      description: "Notifications, privacy, and more",
      route: "/settings",
      color: "from-gray-500 to-slate-600"
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      route: "/help",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent min-h-screen">
      <Card className="relative w-[390px] min-h-[844px] rounded-[25px] overflow-hidden border-none">
        
        {/* Dynamic Background */}
        <div className="absolute w-full h-full bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 transition-all duration-700">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 text-8xl opacity-5 animate-float">
              👤⚙️🛡️
            </div>
            <div className="absolute top-1/3 -left-10 text-6xl opacity-10 animate-float-delayed">
              📊📧🎯
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-5xl opacity-5 animate-bounce-slow">
              💎🔧✨
            </div>
          </div>

          {/* Header */}
          <div className="relative px-5 pt-10 pb-4 z-10">
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => setLocation("/dashboard")}
                variant="ghost"
                className="text-white hover:bg-white/20 flex items-center gap-2 h-8 px-3 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              
              <div className="text-white text-sm font-medium">Account</div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-6 z-10 relative animate-fade-in">
            
            {/* Profile Header */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Praveen</h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-white font-medium text-sm">Pro Member</span>
              </div>
              <p className="text-white/80 text-xs">
                Triathlon Health Tracker • Member since 2024
              </p>
            </div>

            {/* Account Options */}
            <div className="space-y-3">
              {accountOptions.map((option, index) => (
                <Button
                  key={option.label}
                  onClick={() => setLocation(option.route)}
                  className="w-full h-auto p-0 bg-transparent hover:bg-transparent"
                >
                  <div className={`w-full bg-gradient-to-r ${option.color} rounded-xl p-3 hover:scale-105 transition-all duration-300 shadow-lg`}>
                    <div className="flex items-center gap-3 text-left">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                        <option.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-base">{option.label}</div>
                        <div className="text-white/80 text-xs">{option.description}</div>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-white" />
                <h2 className="text-white text-base font-semibold">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setLocation("/settings")}
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-lg h-10 flex flex-col items-center justify-center gap-1"
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span className="text-xs">Settings</span>
                </Button>
                <Button
                  onClick={() => setLocation("/data")}
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-lg h-10 flex flex-col items-center justify-center gap-1"
                >
                  <Database className="h-4 w-4" />
                  <span className="text-xs">Data</span>
                </Button>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Shield className="h-5 w-5 text-green-400 mx-auto mb-2" />
              <div className="text-white text-sm font-medium mb-1">Account Secure</div>
              <div className="text-white/70 text-xs">Last login: Today at 10:02 AM</div>
            </div>

            {/* Logout */}
            <div className="mt-4">
              <Button
                onClick={() => setLocation("/api/logout")}
                className="w-full bg-red-500/20 backdrop-blur-sm text-red-200 hover:bg-red-500/30 border border-red-500/30 rounded-xl h-9 text-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
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