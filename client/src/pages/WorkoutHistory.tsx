import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function WorkoutHistory() {
  const [, setLocation] = useLocation();

  const workoutHistory = [
    {
      date: "Today",
      workouts: [
        { time: "07:30", activity: "Running", duration: "45 min", calories: 380, icon: "🏃" },
        { time: "12:00", activity: "Swimming", duration: "30 min", calories: 290, icon: "🏊" }
      ]
    },
    {
      date: "Yesterday",
      workouts: [
        { time: "18:00", activity: "Cycling", duration: "60 min", calories: 520, icon: "🚴" },
        { time: "19:30", activity: "Badminton", duration: "40 min", calories: 310, icon: "🏸" }
      ]
    },
    {
      date: "Dec 11",
      workouts: [
        { time: "08:00", activity: "Running", duration: "35 min", calories: 320, icon: "🏃" }
      ]
    },
    {
      date: "Dec 10",
      workouts: [
        { time: "07:45", activity: "Swimming", duration: "45 min", calories: 410, icon: "🏊" },
        { time: "17:00", activity: "Cycling", duration: "50 min", calories: 450, icon: "🚴" }
      ]
    }
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Workout History</h1>
          
          <div className="space-y-6">
            {workoutHistory.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3 className="text-[16px] font-medium text-gray-700 mb-3">{day.date}</h3>
                <div className="space-y-3">
                  {day.workouts.map((workout, workoutIndex) => (
                    <div key={workoutIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-[24px]">{workout.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[16px] font-medium text-[#70c1e4]">{workout.activity}</h4>
                              <p className="text-[12px] text-gray-600">{workout.time} • {workout.duration}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-[14px] font-medium text-[#70c1e4]">{workout.calories} cal</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Filter Options</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                Last 7 Days
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                Last Month
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                By Activity
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                Export Data
              </Button>
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