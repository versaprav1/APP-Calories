import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CalorieLogging() {
  const [, setLocation] = useLocation();
  const [selectedMeal, setSelectedMeal] = useState("");

  const handleMealSelect = (meal: string) => {
    setSelectedMeal(meal);
  };

  const handleSave = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        <div className="px-8 mt-16">
          <div className="bg-[#5977e5] rounded-[30px] p-8 min-h-[500px] flex flex-col">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-[20px]">🍽️</span>
              </div>
            </div>

            <Button
              className="w-full h-[50px] rounded-[25px] bg-white text-[#70c1e4] text-[16px] font-medium mb-4 hover:bg-gray-50"
              disabled
            >
              Log Calories
            </Button>

            <div className="space-y-4 flex-1">
              <Button
                onClick={() => handleMealSelect("breakfast")}
                className={`w-full h-[50px] rounded-[25px] text-[16px] font-medium hover:bg-gray-50 ${
                  selectedMeal === "breakfast" 
                    ? "bg-[#70c1e4] text-white" 
                    : "bg-white text-[#70c1e4]"
                }`}
              >
                Break fast
              </Button>

              <Button
                onClick={() => handleMealSelect("lunch")}
                className={`w-full h-[50px] rounded-[25px] text-[16px] font-medium hover:bg-gray-50 ${
                  selectedMeal === "lunch" 
                    ? "bg-[#70c1e4] text-white" 
                    : "bg-white text-[#70c1e4]"
                }`}
              >
                Lunch
              </Button>

              <Button
                onClick={() => handleMealSelect("dinner")}
                className={`w-full h-[50px] rounded-[25px] text-[16px] font-medium hover:bg-gray-50 ${
                  selectedMeal === "dinner" 
                    ? "bg-[#70c1e4] text-white" 
                    : "bg-white text-[#70c1e4]"
                }`}
              >
                Dinner
              </Button>

              <Button
                onClick={() => handleMealSelect("extra")}
                className={`w-full h-[50px] rounded-[25px] text-[16px] font-medium hover:bg-gray-50 ${
                  selectedMeal === "extra" 
                    ? "bg-[#70c1e4] text-white" 
                    : "bg-white text-[#70c1e4]"
                }`}
              >
                Extra
              </Button>
            </div>

            <Button
              onClick={handleSave}
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] text-white text-[16px] font-medium mt-8 hover:bg-[#5fb1d4]"
            >
              Save
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
              <button className="flex flex-col items-center py-2 px-4">
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