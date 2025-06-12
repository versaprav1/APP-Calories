import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function MealPlans() {
  const [, setLocation] = useLocation();

  const mealPlans = [
    {
      title: "Endurance Athlete Plan",
      targetCalories: "2800-3200",
      protein: "140g",
      carbs: "450g",
      fat: "95g",
      description: "High-carbohydrate plan optimized for long-distance training",
      duration: "7 days",
      meals: {
        breakfast: "Oatmeal with berries, banana, and protein powder",
        snack1: "Greek yogurt with granola",
        lunch: "Quinoa bowl with chicken, vegetables, and avocado",
        snack2: "Energy balls with dates and nuts",
        dinner: "Salmon with sweet potato and steamed broccoli",
        snack3: "Recovery smoothie with milk and fruit"
      }
    },
    {
      title: "Weight Loss Plan",
      targetCalories: "1800-2200",
      protein: "130g",
      carbs: "180g",
      fat: "75g",
      description: "Balanced calorie deficit while maintaining muscle mass",
      duration: "7 days",
      meals: {
        breakfast: "Vegetable omelet with whole grain toast",
        snack1: "Apple with almond butter",
        lunch: "Grilled chicken salad with mixed vegetables",
        snack2: "Protein shake with berries",
        dinner: "Lean beef with roasted vegetables",
        snack3: "Greek yogurt with cinnamon"
      }
    },
    {
      title: "Muscle Building Plan",
      targetCalories: "2600-3000",
      protein: "180g",
      carbs: "320g",
      fat: "100g",
      description: "Protein-rich plan for strength training and muscle growth",
      duration: "7 days",
      meals: {
        breakfast: "Protein pancakes with berries and nuts",
        snack1: "Cottage cheese with fruit",
        lunch: "Turkey and quinoa power bowl",
        snack2: "Protein bar and banana",
        dinner: "Grilled steak with rice and vegetables",
        snack3: "Casein protein with almonds"
      }
    }
  ];

  const weeklySchedule = [
    { day: "Monday", focus: "High Carb", emphasis: "Pre-training fuel" },
    { day: "Tuesday", focus: "Balanced", emphasis: "Recovery nutrition" },
    { day: "Wednesday", focus: "High Protein", emphasis: "Muscle repair" },
    { day: "Thursday", focus: "Balanced", emphasis: "Steady energy" },
    { day: "Friday", focus: "High Carb", emphasis: "Weekend prep" },
    { day: "Saturday", focus: "Performance", emphasis: "Race day fuel" },
    { day: "Sunday", focus: "Recovery", emphasis: "Active rest" }
  ];

  const nutritionTips = [
    "Eat within 30 minutes post-workout for optimal recovery",
    "Hydrate with 500ml water 2 hours before training",
    "Include lean protein in every meal for muscle maintenance",
    "Time carbohydrates around training sessions",
    "Choose whole foods over processed alternatives"
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
            <div className="text-white text-[24px]">🍽️</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Meal Plans</h1>
          
          <div className="space-y-6">
            {mealPlans.map((plan, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[16px] font-medium text-[#70c1e4]">{plan.title}</h3>
                  <span className="text-[12px] bg-[#70c1e4] text-white px-2 py-1 rounded-full">{plan.duration}</span>
                </div>
                <p className="text-[13px] text-gray-600 mb-4">{plan.description}</p>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-[#70c1e4]">{plan.targetCalories}</div>
                    <div className="text-[10px] text-gray-600">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-green-600">{plan.protein}</div>
                    <div className="text-[10px] text-gray-600">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-blue-600">{plan.carbs}</div>
                    <div className="text-[10px] text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-yellow-600">{plan.fat}</div>
                    <div className="text-[10px] text-gray-600">Fat</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[12px] text-gray-700"><strong>Breakfast:</strong> {plan.meals.breakfast}</div>
                  <div className="text-[12px] text-gray-700"><strong>Lunch:</strong> {plan.meals.lunch}</div>
                  <div className="text-[12px] text-gray-700"><strong>Dinner:</strong> {plan.meals.dinner}</div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-[30px] rounded-[15px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                  >
                    View Full Plan
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-[30px] rounded-[15px] bg-[#70c1e4] text-white text-[12px]"
                  >
                    Start Plan
                  </Button>
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Weekly Focus Schedule</h3>
              <div className="space-y-2">
                {weeklySchedule.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="text-[14px] font-medium text-gray-700">{day.day}</div>
                      <div className="text-[11px] text-gray-500">{day.emphasis}</div>
                    </div>
                    <div className="text-[12px] font-medium text-[#70c1e4]">{day.focus}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Nutrition Tips</h3>
              <div className="space-y-2">
                {nutritionTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#70c1e4] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[13px] text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Meal Planning Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🛒 Shopping List
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📋 Meal Prep Guide
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🧮 Macro Calculator
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📱 Recipe App
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