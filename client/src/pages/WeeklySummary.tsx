import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function WeeklySummary() {
  const [, setLocation] = useLocation();

  const weeklyStats = {
    totalWorkouts: 12,
    totalCalories: 4850,
    totalHours: 8.5,
    avgPerDay: 693
  };

  const weeklyData = [
    { day: "Mon", workouts: 2, calories: 780, duration: "90 min" },
    { day: "Tue", workouts: 1, calories: 420, duration: "45 min" },
    { day: "Wed", workouts: 3, calories: 920, duration: "120 min" },
    { day: "Thu", workouts: 1, calories: 580, duration: "60 min" },
    { day: "Fri", workouts: 2, calories: 690, duration: "75 min" },
    { day: "Sat", workouts: 2, calories: 850, duration: "90 min" },
    { day: "Sun", workouts: 1, calories: 610, duration: "65 min" }
  ];

  const topActivities = [
    { name: "Running", sessions: 5, calories: 1850, icon: "🏃" },
    { name: "Swimming", sessions: 4, calories: 1240, icon: "🏊" },
    { name: "Cycling", sessions: 2, calories: 980, icon: "🚴" },
    { name: "Badminton", sessions: 1, calories: 780, icon: "🏸" }
  ];

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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Weekly Summary</h1>
          
          <div className="bg-[#f8f9fa] rounded-[20px] p-4 mb-6">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">This Week's Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{weeklyStats.totalWorkouts}</div>
                <div className="text-[12px] text-gray-600">Total Workouts</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{weeklyStats.totalCalories}</div>
                <div className="text-[12px] text-gray-600">Calories Burned</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{weeklyStats.totalHours}h</div>
                <div className="text-[12px] text-gray-600">Active Hours</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{weeklyStats.avgPerDay}</div>
                <div className="text-[12px] text-gray-600">Avg Calories/Day</div>
              </div>
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-[20px] p-4 mb-6">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Daily Breakdown</h3>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#70c1e4] rounded-full flex items-center justify-center">
                      <span className="text-white text-[12px] font-medium">{day.day}</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-gray-700">{day.workouts} workouts</div>
                      <div className="text-[12px] text-gray-500">{day.duration}</div>
                    </div>
                  </div>
                  <div className="text-[14px] font-medium text-[#70c1e4]">{day.calories} cal</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-[20px] p-4 mb-6">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Top Activities</h3>
            <div className="space-y-3">
              {topActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-[20px]">{activity.icon}</div>
                    <div>
                      <div className="text-[14px] font-medium text-gray-700">{activity.name}</div>
                      <div className="text-[12px] text-gray-500">{activity.sessions} sessions</div>
                    </div>
                  </div>
                  <div className="text-[14px] font-medium text-[#70c1e4]">{activity.calories} cal</div>
                </div>
              ))}
            </div>
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