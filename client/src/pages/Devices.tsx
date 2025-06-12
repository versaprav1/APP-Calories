import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";

export default function Devices() {
  const [, setLocation] = useLocation();
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      type: "phone",
      connected: true,
      lastSync: "2 minutes ago"
    },
    {
      id: 2,
      name: "Apple Watch Series 9",
      type: "watch",
      connected: true,
      lastSync: "5 minutes ago"
    },
    {
      id: 3,
      name: "Fitbit Charge 5",
      type: "fitness",
      connected: false,
      lastSync: "2 days ago"
    }
  ]);

  const toggleDevice = (id: number) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, connected: !device.connected } : device
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone': return '📱';
      case 'watch': return '⌚';
      case 'fitness': return '🏃';
      default: return '📱';
    }
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Connected Devices</h1>
          
          <div className="space-y-4">
            {devices.map((device) => (
              <div 
                key={device.id}
                className="bg-[#f8f9fa] rounded-[20px] p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-[24px]">{getDeviceIcon(device.type)}</div>
                    <div>
                      <h3 className="text-[16px] font-medium text-[#70c1e4]">
                        {device.name}
                      </h3>
                      <p className="text-[12px] text-gray-600">
                        Last sync: {device.lastSync}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={device.connected}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>
                
                {device.connected && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                      >
                        Sync Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                      >
                        Settings
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
            >
              + Add New Device
            </Button>
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Sync Options</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Auto-sync when connected</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Sync over cellular</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Background sync</span>
                <Switch defaultChecked />
              </div>
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