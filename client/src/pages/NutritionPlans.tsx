import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NutritionPlans() {
  const [, setLocation] = useLocation();

  const nutritionInfo = [
    {
      category: "Macro Nutrients",
      items: [
        { name: "Protein", amount: "1.6-2.2g", unit: "per kg body weight", icon: "🥩" },
        { name: "Carbohydrates", amount: "3-12g", unit: "per kg body weight", icon: "🍞" },
        { name: "Fats", amount: "0.8-1.2g", unit: "per kg body weight", icon: "🥑" }
      ]
    },
    {
      category: "Pre-Workout Nutrition",
      items: [
        { name: "Timing", amount: "1-4 hours", unit: "before exercise", icon: "⏰" },
        { name: "Carbs", amount: "1-4g", unit: "per kg body weight", icon: "🍌" },
        { name: "Protein", amount: "15-25g", unit: "recommended", icon: "🥛" }
      ]
    },
    {
      category: "Post-Workout Nutrition",
      items: [
        { name: "Recovery Window", amount: "30-60 min", unit: "after exercise", icon: "⏱️" },
        { name: "Carbs", amount: "1.0-1.2g", unit: "per kg body weight", icon: "🍇" },
        { name: "Protein", amount: "20-25g", unit: "for muscle repair", icon: "🥚" }
      ]
    }
  ];

  const mealPlans = [
    {
      title: "Endurance Athlete Plan",
      calories: "2800-3200 kcal",
      description: "High-carb plan for distance runners and cyclists",
      meals: ["Oatmeal & Berries", "Quinoa Bowl", "Pasta & Protein", "Recovery Smoothie"]
    },
    {
      title: "Strength Training Plan",
      calories: "2400-2800 kcal",
      description: "Protein-focused plan for muscle building",
      meals: ["Egg & Avocado Toast", "Chicken Salad", "Lean Beef & Vegetables", "Greek Yogurt"]
    },
    {
      title: "Weight Loss Plan",
      calories: "1800-2200 kcal",
      description: "Balanced deficit plan with adequate protein",
      meals: ["Green Smoothie", "Turkey Wrap", "Salmon & Quinoa", "Mixed Nuts"]
    }
  ];

  const hydrationTips = [
    { tip: "Drink 500-600ml water 2-3 hours before exercise", icon: "💧" },
    { tip: "Consume 200-300ml every 10-20 minutes during exercise", icon: "🏃" },
    { tip: "Replace 150% of fluid lost through sweat post-exercise", icon: "⚖️" },
    { tip: "Monitor urine color - aim for pale yellow", icon: "🟡" }
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
            onClick={() => setLocation("/resources")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🍎</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Nutrition Information</h1>
          
          <div className="space-y-6">
            {nutritionInfo.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-[20px]">{item.icon}</div>
                        <div>
                          <div className="text-[14px] font-medium text-gray-700">{item.name}</div>
                          <div className="text-[12px] text-gray-500">{item.unit}</div>
                        </div>
                      </div>
                      <div className="text-[14px] font-medium text-[#70c1e4]">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Sample Meal Plans</h3>
              <div className="space-y-3">
                {mealPlans.map((plan, index) => (
                  <div key={index} className="bg-white rounded-[15px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[15px] font-medium text-gray-800">{plan.title}</h4>
                      <span className="text-[12px] text-[#70c1e4] font-medium">{plan.calories}</span>
                    </div>
                    <p className="text-[13px] text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.meals.map((meal, idx) => (
                        <span key={idx} className="text-[11px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Hydration Guidelines</h3>
              <div className="space-y-3">
                {hydrationTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-[16px] mt-1">{tip.icon}</div>
                    <p className="text-[13px] text-gray-700 flex-1">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Tools & Calculators</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🧮 BMR Calculator
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📊 Macro Calculator
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  💧 Hydration Tracker
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🍽️ Meal Planner
                </Button>
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
                <span className="text-[10px] text-gray-600">Activity</span>
              </button>
              <button onClick={() => setLocation("/resources")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📚</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}