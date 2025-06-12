import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";

export default function ActivitySettings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState({
    autoTrackWorkouts: true,
    gpsTracking: true,
    heartRateMonitoring: false,
    calorieTracking: true,
    socialSharing: false,
    weeklyGoalReminders: true,
    restDayReminders: true,
    achievementNotifications: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative pb-20">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center px-4 py-4">
          <Button
            onClick={() => setLocation("/activity")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Activity Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Tracking Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Auto-track workouts</span>
                  <Switch 
                    checked={settings.autoTrackWorkouts}
                    onCheckedChange={() => handleToggle('autoTrackWorkouts')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">GPS tracking</span>
                  <Switch 
                    checked={settings.gpsTracking}
                    onCheckedChange={() => handleToggle('gpsTracking')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Heart rate monitoring</span>
                  <Switch 
                    checked={settings.heartRateMonitoring}
                    onCheckedChange={() => handleToggle('heartRateMonitoring')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Calorie tracking</span>
                  <Switch 
                    checked={settings.calorieTracking}
                    onCheckedChange={() => handleToggle('calorieTracking')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Weekly goal reminders</span>
                  <Switch 
                    checked={settings.weeklyGoalReminders}
                    onCheckedChange={() => handleToggle('weeklyGoalReminders')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Rest day reminders</span>
                  <Switch 
                    checked={settings.restDayReminders}
                    onCheckedChange={() => handleToggle('restDayReminders')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Achievement notifications</span>
                  <Switch 
                    checked={settings.achievementNotifications}
                    onCheckedChange={() => handleToggle('achievementNotifications')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Privacy</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-700">Social sharing</span>
                  <Switch 
                    checked={settings.socialSharing}
                    onCheckedChange={() => handleToggle('socialSharing')}
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
            >
              Save Settings
            </Button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around py-2">
              <button onClick={() => setLocation("/dashboard")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">🏠</div>
                <span className="text-[10px] text-gray-600">Home</span>
              </button>
              <button onClick={() => setLocation("/account")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-gray-600">Account</span>
              </button>
              <button onClick={() => setLocation("/activity")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📊</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Activity</span>
              </button>
              <button onClick={() => setLocation("/resources")} className="flex flex-col items-center py-2 px-4">
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