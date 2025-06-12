import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DailyActivities() {
  const [, setLocation] = useLocation();

  const todayActivities = [
    {
      time: "07:30",
      activity: "Morning Run",
      duration: "45 min",
      calories: "380",
      status: "completed",
      icon: "🏃"
    },
    {
      time: "12:00",
      activity: "Swimming",
      duration: "30 min",
      calories: "290",
      status: "completed",
      icon: "🏊"
    },
    {
      time: "18:00",
      activity: "Cycling",
      duration: "60 min",
      calories: "520",
      status: "scheduled",
      icon: "🚴"
    }
  ];

  const stats = {
    totalCalories: 670,
    activeMinutes: 75,
    completedActivities: 2,
    targetCalories: 1200
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Today's Activities</h1>
          
          <div className="bg-[#f8f9fa] rounded-[20px] p-4 mb-6">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Daily Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{stats.totalCalories}</div>
                <div className="text-[12px] text-gray-600">Calories Burned</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{stats.activeMinutes}</div>
                <div className="text-[12px] text-gray-600">Active Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{stats.completedActivities}</div>
                <div className="text-[12px] text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-[#70c1e4]">{Math.round((stats.totalCalories / stats.targetCalories) * 100)}%</div>
                <div className="text-[12px] text-gray-600">Goal Progress</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {todayActivities.map((activity, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-[24px]">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[16px] font-medium text-[#70c1e4]">{activity.activity}</h3>
                        <p className="text-[12px] text-gray-600">{activity.time} • {activity.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[14px] font-medium text-[#70c1e4]">{activity.calories} cal</div>
                        <span className={`text-[10px] px-2 py-1 rounded-full ${
                          activity.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
            >
              + Add New Activity
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