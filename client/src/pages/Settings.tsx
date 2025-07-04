import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Moon, 
  Bell, 
  Volume2, 
  Vibrate,
  HardDrive,
  Fingerprint,
  RefreshCw,
  Shield,
  User,
  Palette,
  Smartphone
} from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    soundEffects: true,
    vibration: false,
    autoBackup: true,
    biometricAuth: false,
    dataSync: true,
    privacy: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsGroups = [
    {
      title: "Appearance",
      icon: Palette,
      settings: [
        { 
          key: "darkMode" as const, 
          label: "Dark Mode", 
          description: "Switch to dark theme",
          icon: Moon 
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { 
          key: "notifications" as const, 
          label: "Push Notifications", 
          description: "Receive workout reminders",
          icon: Bell 
        },
        { 
          key: "soundEffects" as const, 
          label: "Sound Effects", 
          description: "Play notification sounds",
          icon: Volume2 
        },
        { 
          key: "vibration" as const, 
          label: "Vibration", 
          description: "Vibrate for notifications",
          icon: Vibrate 
        }
      ]
    },
    {
      title: "Data & Sync",
      icon: RefreshCw,
      settings: [
        { 
          key: "autoBackup" as const, 
          label: "Auto Backup", 
          description: "Automatically backup workout data",
          icon: HardDrive 
        },
        { 
          key: "dataSync" as const, 
          label: "Cloud Sync", 
          description: "Sync data across devices",
          icon: RefreshCw 
        }
      ]
    },
    {
      title: "Security",
      icon: Shield,
      settings: [
        { 
          key: "biometricAuth" as const, 
          label: "Biometric Login", 
          description: "Use fingerprint or face ID",
          icon: Fingerprint 
        },
        { 
          key: "privacy" as const, 
          label: "Privacy Mode", 
          description: "Hide sensitive data in app switcher",
          icon: Shield 
        }
      ]
    }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent min-h-screen">
      <Card className="relative w-[390px] min-h-[844px] rounded-[25px] overflow-hidden border-none">
        
        {/* Dynamic Background */}
        <div className="absolute w-full h-full bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-800 transition-all duration-700">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 text-8xl opacity-5 animate-float">
              ⚙️🔧🛠️
            </div>
            <div className="absolute top-1/3 -left-10 text-6xl opacity-10 animate-float-delayed">
              🔒🛡️⚡
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-5xl opacity-5 animate-bounce-slow">
              📱💾🔔
            </div>
          </div>

          {/* Header */}
          <div className="relative px-6 pt-12 pb-6 z-10">
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={() => setLocation("/account")}
                variant="ghost"
                className="text-white hover:bg-white/20 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </Button>
              
              <div className="text-white text-sm font-medium">Settings</div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 z-10 relative animate-fade-in">
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
                <SettingsIcon className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center mb-4 leading-tight">
              App Settings
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-center text-lg leading-relaxed mb-8 px-2">
              Customize your app experience and preferences
            </p>

            {/* Settings Groups */}
            <div className="space-y-6">
              {settingsGroups.map((group, groupIndex) => (
                <div key={group.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <group.icon className="h-6 w-6 text-white" />
                    <h2 className="text-white text-xl font-semibold">{group.title}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {group.settings.map((setting, settingIndex) => (
                      <div 
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <setting.icon className="h-5 w-5 text-white/80" />
                          <div>
                            <div className="text-white font-medium">{setting.label}</div>
                            <div className="text-white/70 text-sm">{setting.description}</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings[setting.key]}
                          onCheckedChange={() => handleToggle(setting.key)}
                          className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/30"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* User Profile Section */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <User className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-2">Signed in as Praveen</div>
              <div className="text-white/80 text-sm mb-4">
                Triathlon Health Tracker Pro
              </div>
              <Button
                onClick={() => setLocation("/profile-setup")}
                className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 rounded-xl h-10 text-sm"
              >
                Edit Profile
              </Button>
            </div>

            {/* App Info */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Smartphone className="h-6 w-6 text-white mx-auto mb-2" />
              <div className="text-white text-sm font-medium mb-1">Triathlon Health Tracker</div>
              <div className="text-white/70 text-xs">Version 2.1.0 • Build 2025.1</div>
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