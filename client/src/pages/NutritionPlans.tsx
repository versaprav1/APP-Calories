import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Target, Clock, Users } from "lucide-react";

export default function NutritionPlans() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const nutritionPlans = [
    {
      id: 1,
      title: "Weight Loss Plan",
      description: "Balanced meals with calorie deficit for healthy weight loss",
      calories: "1,200-1,500 cal/day",
      duration: "4-8 weeks",
      difficulty: "Beginner",
      color: "#70c1e4",
      features: ["High protein", "Low carb", "Meal prep friendly", "Snack options"]
    },
    {
      id: 2,
      title: "Muscle Gain Plan",
      description: "High protein nutrition to support muscle building",
      calories: "2,200-2,800 cal/day",
      duration: "8-12 weeks",
      difficulty: "Intermediate",
      color: "#8fd4e8",
      features: ["High protein", "Pre/post workout", "Supplements guide", "Bulk meals"]
    },
    {
      id: 3,
      title: "Maintenance Plan",
      description: "Balanced nutrition for maintaining current weight",
      calories: "1,800-2,200 cal/day",
      duration: "Ongoing",
      difficulty: "Beginner",
      color: "#a4e2ec",
      features: ["Flexible eating", "Balanced macros", "Cheat meals", "Easy recipes"]
    }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#8fd4e8] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[60px] transform -translate-x-1/2 text-white text-[24px] font-semibold">
              Nutrition Plans
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <img
                src="/figmaAssets/component-3.svg"
                alt="Nutrition"
                className="w-[40px] h-[40px] mx-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            <div className="space-y-4">
              {nutritionPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-[20px] p-5 shadow-sm transition-all duration-300 ${
                    selectedPlan === plan.id ? 'ring-2 ring-blue-400 scale-105' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-[#4a6bda] text-[20px] font-semibold mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-[#707070] text-[14px] leading-relaxed mb-4">
                        {plan.description}
                      </p>
                    </div>
                    
                    <div 
                      className="w-[50px] h-[50px] rounded-full flex items-center justify-center ml-3"
                      style={{ backgroundColor: plan.color }}
                    >
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                      <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                      <div className="text-[12px] font-medium text-[#4a6bda]">{plan.calories}</div>
                    </div>
                    
                    <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                      <div className="text-[12px] font-medium text-[#4a6bda]">{plan.duration}</div>
                    </div>
                    
                    <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                      <Users className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                      <div className="text-[12px] font-medium text-[#4a6bda]">{plan.difficulty}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-[#4a6bda] text-[14px] font-medium mb-2">Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-[#4a6bda] text-[12px] rounded-[8px] font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                      variant="outline"
                      className="flex-1 h-[35px] rounded-[15px] border-2"
                      style={{ 
                        borderColor: plan.color,
                        color: selectedPlan === plan.id ? 'white' : plan.color,
                        backgroundColor: selectedPlan === plan.id ? plan.color : 'transparent'
                      }}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                    
                    <Button
                      className="h-[35px] px-4 rounded-[15px] text-white text-[14px] font-medium"
                      style={{ backgroundColor: plan.color }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Start Button */}
            {selectedPlan && (
              <div className="mt-6 p-4 bg-white rounded-[20px] shadow-sm">
                <Button
                  onClick={() => {
                    // Navigate to selected plan details or start plan
                    setLocation("/dashboard");
                  }}
                  className="w-full h-[45px] rounded-[20px] bg-[#4a6bda] hover:bg-[#3a5bca] text-white text-[16px] font-medium"
                >
                  Start Selected Plan
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}