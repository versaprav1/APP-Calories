import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";

export default function Reminders() {
  const [, setLocation] = useLocation();
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Morning Workout",
      time: "07:00",
      enabled: true,
      days: ["Mon", "Wed", "Fri"]
    },
    {
      id: 2,
      title: "Drink Water",
      time: "14:00",
      enabled: true,
      days: ["Daily"]
    },
    {
      id: 3,
      title: "Evening Run",
      time: "18:30",
      enabled: false,
      days: ["Tue", "Thu", "Sat"]
    }
  ]);

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Reminders</h1>
          
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div 
                key={reminder.id}
                className="bg-[#f8f9fa] rounded-[20px] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-[16px] font-medium text-[#70c1e4]">
                      {reminder.title}
                    </h3>
                    <p className="text-[14px] text-gray-600">
                      {reminder.time} • {reminder.days.join(", ")}
                    </p>
                  </div>
                  <Switch 
                    checked={reminder.enabled}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                </div>
                
                {reminder.enabled && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-[35px] rounded-[17px] border-red-500 text-red-500 text-[12px]"
                      >
                        Delete
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
              + Add New Reminder
            </Button>
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Quick Reminders</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-[40px] rounded-[20px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                💧 Hydration
              </Button>
              <Button
                variant="outline"
                className="h-[40px] rounded-[20px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                🏃 Workout
              </Button>
              <Button
                variant="outline"
                className="h-[40px] rounded-[20px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                🍎 Meal Time
              </Button>
              <Button
                variant="outline"
                className="h-[40px] rounded-[20px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                💤 Sleep
              </Button>
            </div>
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Notification Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Sound alerts</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Vibration</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-gray-700">Snooze option</span>
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