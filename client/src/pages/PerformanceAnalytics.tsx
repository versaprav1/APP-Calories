import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PerformanceAnalytics() {
  const [, setLocation] = useLocation();

  const performanceMetrics = [
    {
      category: "Running",
      metrics: [
        { name: "Best Pace", value: "4:32", unit: "min/km", trend: "+5%" },
        { name: "Avg Distance", value: "8.2", unit: "km", trend: "+12%" },
        { name: "Weekly Volume", value: "42", unit: "km", trend: "+8%" }
      ],
      icon: "🏃"
    },
    {
      category: "Swimming",
      metrics: [
        { name: "Best Time (100m)", value: "1:42", unit: "min", trend: "-3%" },
        { name: "Avg Sessions", value: "4.2", unit: "/week", trend: "+15%" },
        { name: "Total Distance", value: "3.8", unit: "km/week", trend: "+10%" }
      ],
      icon: "🏊"
    },
    {
      category: "Cycling",
      metrics: [
        { name: "Max Speed", value: "45.2", unit: "km/h", trend: "+7%" },
        { name: "Avg Power", value: "285", unit: "watts", trend: "+4%" },
        { name: "Weekly Distance", value: "156", unit: "km", trend: "+18%" }
      ],
      icon: "🚴"
    }
  ];

  const monthlyTrends = [
    { month: "Nov", calories: 3200, workouts: 18, hours: 12.5 },
    { month: "Oct", calories: 2890, workouts: 16, hours: 11.2 },
    { month: "Sep", calories: 2650, workouts: 15, hours: 10.8 },
    { month: "Aug", calories: 2420, workouts: 14, hours: 9.5 }
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Performance Analytics</h1>
          
          <div className="space-y-6">
            {performanceMetrics.map((category, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-[24px]">{category.icon}</div>
                  <h3 className="text-[18px] font-medium text-[#70c1e4]">{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center">
                      <div>
                        <div className="text-[14px] font-medium text-gray-700">{metric.name}</div>
                        <div className="text-[12px] text-gray-500">vs last month</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-[#70c1e4]">
                          {metric.value} <span className="text-[12px] font-normal">{metric.unit}</span>
                        </div>
                        <div className={`text-[12px] font-medium ${
                          metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Monthly Trends</h3>
            <div className="space-y-3">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="w-12">
                    <div className="text-[14px] font-medium text-gray-700">{month.month}</div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex justify-between text-[12px] text-gray-600">
                      <span>{month.calories} cal</span>
                      <span>{month.workouts} workouts</span>
                      <span>{month.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-[#f8f9fa] rounded-[20px] p-4">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Analysis Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                📊 Detailed Report
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                📈 Trend Analysis
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                🎯 Goal Insights
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
              >
                📋 Export Data
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