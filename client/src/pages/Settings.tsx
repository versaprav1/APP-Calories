import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative pb-20">
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <Button
            onClick={() => setLocation("/account")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Appearance</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Dark Mode</span>
                  <Switch 
                    checked={settings.darkMode}
                    onCheckedChange={() => handleToggle('darkMode')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Push Notifications</span>
                  <Switch 
                    checked={settings.notifications}
                    onCheckedChange={() => handleToggle('notifications')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Sound Effects</span>
                  <Switch 
                    checked={settings.soundEffects}
                    onCheckedChange={() => handleToggle('soundEffects')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Vibration</span>
                  <Switch 
                    checked={settings.vibration}
                    onCheckedChange={() => handleToggle('vibration')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Security & Privacy</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Biometric Authentication</span>
                  <Switch 
                    checked={settings.biometricAuth}
                    onCheckedChange={() => handleToggle('biometricAuth')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Privacy Mode</span>
                  <Switch 
                    checked={settings.privacy}
                    onCheckedChange={() => handleToggle('privacy')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Data & Storage</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Auto Backup</span>
                  <Switch 
                    checked={settings.autoBackup}
                    onCheckedChange={() => handleToggle('autoBackup')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Data Sync</span>
                  <Switch 
                    checked={settings.dataSync}
                    onCheckedChange={() => handleToggle('dataSync')}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium"
              >
                Clear Cache
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-[50px] rounded-[25px] border-red-500 text-red-500 text-[16px] font-medium"
              >
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around py-2">
              <button 
                onClick={() => setLocation("/dashboard")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">🏠</div>
                <span className="text-[10px] text-gray-600">Home</span>
              </button>
              
              <button 
                onClick={() => setLocation("/account")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Account</span>
              </button>
              
              <button 
                onClick={() => setLocation("/activity")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">📊</div>
                <span className="text-[10px] text-gray-600">Activity</span>
              </button>
              
              <button 
                onClick={() => setLocation("/resources")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">📚</div>
                <span className="text-[10px] text-gray-600">Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}