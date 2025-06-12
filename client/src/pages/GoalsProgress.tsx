import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function GoalsProgress() {
  const [, setLocation] = useLocation();

  const goals = [
    {
      name: "Weekly Running",
      target: 150,
      current: 120,
      unit: "minutes",
      icon: "🏃",
      deadline: "End of week"
    },
    {
      name: "Monthly Swimming",
      target: 20,
      current: 14,
      unit: "sessions",
      icon: "🏊",
      deadline: "28 days left"
    },
    {
      name: "Calorie Burn",
      target: 8000,
      current: 6200,
      unit: "calories",
      icon: "🔥",
      deadline: "This week"
    },
    {
      name: "Weight Loss",
      target: 5,
      current: 2.3,
      unit: "kg",
      icon: "⚖️",
      deadline: "2 months"
    }
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Goals Progress</h1>
          
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const percentage = getProgressPercentage(goal.current, goal.target);
              return (
                <div key={index} className="bg-[#f8f9fa] rounded-[20px] p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-[24px]">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#70c1e4]">{goal.name}</h3>
                      <p className="text-[12px] text-gray-600">{goal.deadline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-bold text-[#70c1e4]">{percentage}%</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-[12px] text-gray-600 mb-1">
                      <span>{goal.current} {goal.unit}</span>
                      <span>{goal.target} {goal.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-[30px] rounded-[15px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-[30px] rounded-[15px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                    >
                      Edit Goal
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
            >
              + Add New Goal
            </Button>
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[18px] font-bold text-green-600">3</div>
                <div className="text-[12px] text-gray-600">On Track</div>
              </div>
              <div className="text-center">
                <div className="text-[18px] font-bold text-yellow-600">1</div>
                <div className="text-[12px] text-gray-600">Needs Attention</div>
              </div>
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