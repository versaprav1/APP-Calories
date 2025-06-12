import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Scale, TrendingDown, TrendingUp, Target } from "lucide-react";

export default function WeightControl() {
  const [, setLocation] = useLocation();
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("70");
  const [timeframe, setTimeframe] = useState("12");

  const weightEntries = [
    { date: "Today", weight: 75.2, change: -0.3, note: "Morning weigh-in" },
    { date: "Yesterday", weight: 75.5, change: -0.1, note: "After workout" },
    { date: "2 days ago", weight: 75.6, change: 0.2, note: "Evening" },
    { date: "3 days ago", weight: 75.4, change: -0.4, note: "Morning" },
    { date: "4 days ago", weight: 75.8, change: 0.1, note: "After meal" }
  ];

  const currentWeightValue = 75.2;
  const targetWeightValue = 70.0;
  const startWeight = 78.5;
  const weightLost = startWeight - currentWeightValue;
  const weightToGo = currentWeightValue - targetWeightValue;
  const progressPercentage = ((startWeight - currentWeightValue) / (startWeight - targetWeightValue)) * 100;

  const bmiCalculation = {
    height: 175, // cm
    bmi: (currentWeightValue / Math.pow(1.75, 2)).toFixed(1),
    category: "Normal"
  };

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#c8f0f4] to-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#c8f0f4] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold">
              Weight Control
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{currentWeightValue}kg</div>
              <div className="text-[12px]">current</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Weight Progress Overview */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Weight Goal Progress
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-[12px]">
                  <div className="text-[18px] font-bold text-[#4a6bda]">{weightLost.toFixed(1)}kg</div>
                  <div className="text-[11px] text-[#707070]">Lost</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-[12px]">
                  <div className="text-[18px] font-bold text-green-600">{weightToGo.toFixed(1)}kg</div>
                  <div className="text-[11px] text-[#707070]">To Go</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-[12px]">
                  <div className="text-[18px] font-bold text-orange-600">{progressPercentage.toFixed(0)}%</div>
                  <div className="text-[11px] text-[#707070]">Progress</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] text-[#707070]">Goal Progress</span>
                  <span className="text-[14px] font-medium text-[#4a6bda]">{currentWeightValue}kg → {targetWeightValue}kg</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-[#c8f0f4] transition-all duration-500"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                  <div className="text-[14px] font-medium text-[#4a6bda]">BMI</div>
                  <div className="text-[16px] font-bold">{bmiCalculation.bmi}</div>
                  <div className="text-[10px] text-green-600">{bmiCalculation.category}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                  <div className="text-[14px] font-medium text-[#4a6bda]">Target Date</div>
                  <div className="text-[16px] font-bold">{timeframe} weeks</div>
                  <div className="text-[10px] text-[#707070]">Estimated</div>
                </div>
              </div>
            </div>

            {/* Log Weight */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Log Weight
              </h2>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-[#707070] text-[14px]">Current Weight (kg)</Label>
                  <Input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="w-full h-[40px] rounded-[15px] text-[14px]"
                    placeholder="75.2"
                    step="0.1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#707070] text-[14px]">Target Weight (kg)</Label>
                    <Input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      className="w-full h-[40px] rounded-[15px] text-[14px]"
                      placeholder="70"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label className="text-[#707070] text-[14px]">Timeframe (weeks)</Label>
                    <Input
                      type="number"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full h-[40px] rounded-[15px] text-[14px]"
                      placeholder="12"
                    />
                  </div>
                </div>

                <Button
                  className="w-full h-[40px] rounded-[15px] bg-[#c8f0f4] hover:bg-[#b8e0e4] text-white text-[14px] font-medium"
                >
                  Save Weight Entry
                </Button>
              </div>
            </div>

            {/* Weight History */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[18px] font-semibold mb-3">
                Weight History
              </h3>
              
              <div className="space-y-2">
                {weightEntries.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[16px] font-bold text-[#4a6bda]">
                          {entry.weight}kg
                        </span>
                        <span className={`flex items-center gap-1 text-[12px] font-medium ${
                          entry.change > 0 ? 'text-red-500' : 'text-green-500'
                        }`}>
                          {entry.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {entry.change > 0 ? '+' : ''}{entry.change}kg
                        </span>
                      </div>
                      <div className="text-[11px] text-[#707070]">
                        {entry.note} • {entry.date}
                      </div>
                    </div>
                    
                    <div className="text-[20px]">
                      {entry.change > 0 ? '📈' : '📉'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-[12px] text-center">
                <div className="text-[12px] text-[#4a6bda] mb-1">Weekly Average</div>
                <div className="text-[16px] font-bold text-[#4a6bda]">
                  {(weightEntries.slice(0, 7).reduce((sum, entry) => sum + entry.weight, 0) / Math.min(7, weightEntries.length)).toFixed(1)}kg
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}