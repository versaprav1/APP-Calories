import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trophy, TrendingUp, Calendar, Target } from "lucide-react";

export default function FitnessGoals() {
  const [, setLocation] = useLocation();
  const [activeGoal, setActiveGoal] = useState<number | null>(null);
  const [newGoalWeight, setNewGoalWeight] = useState("");
  const [newGoalSteps, setNewGoalSteps] = useState("");

  const fitnessGoals = [
    {
      id: 1,
      title: "Daily Steps",
      current: 7240,
      target: 10000,
      unit: "steps",
      icon: "👟",
      color: "#70c1e4",
      timeframe: "Daily",
      progress: 72.4
    },
    {
      id: 2,
      title: "Weight Goal",
      current: 75.2,
      target: 70.0,
      unit: "kg",
      icon: "⚖️",
      color: "#8fd4e8",
      timeframe: "12 weeks",
      progress: 68.5
    },
    {
      id: 3,
      title: "Workout Days",
      current: 4,
      target: 5,
      unit: "days/week",
      icon: "💪",
      color: "#a4e2ec",
      timeframe: "Weekly",
      progress: 80.0
    },
    {
      id: 4,
      title: "Water Intake",
      current: 1.8,
      target: 2.5,
      unit: "liters",
      icon: "💧",
      color: "#b8eaf0",
      timeframe: "Daily",
      progress: 72.0
    }
  ];

  const achievements = [
    { title: "First Week Complete", icon: "🏆", date: "2 days ago" },
    { title: "10K Steps Streak", icon: "🔥", date: "5 days ago" },
    { title: "Weight Milestone", icon: "⭐", date: "1 week ago" }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#a4e2ec] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[60px] transform -translate-x-1/2 text-white text-[24px] font-semibold">
              Fitness Goals
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <img
                src="/figmaAssets/component-4.svg"
                alt="Fitness"
                className="w-[40px] h-[40px] mx-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Goals Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {fitnessGoals.map((goal) => (
                <div 
                  key={goal.id}
                  className="bg-white rounded-[15px] p-4 shadow-sm cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setActiveGoal(activeGoal === goal.id ? null : goal.id)}
                >
                  <div className="text-center">
                    <div className="text-[24px] mb-2">{goal.icon}</div>
                    <h3 className="text-[#4a6bda] text-[14px] font-semibold mb-2">
                      {goal.title}
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${goal.progress}%`,
                          backgroundColor: goal.color 
                        }}
                      />
                    </div>
                    
                    <div className="text-[12px] text-[#707070]">
                      <div className="font-medium">{goal.current} / {goal.target}</div>
                      <div>{goal.unit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Goal Details */}
            {activeGoal && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                {(() => {
                  const goal = fitnessGoals.find(g => g.id === activeGoal);
                  if (!goal) return null;
                  
                  return (
                    <div>
                      <h3 className="text-[#4a6bda] text-[18px] font-semibold mb-3 flex items-center gap-2">
                        <span>{goal.icon}</span>
                        {goal.title} Details
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                          <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                          <div className="text-[12px] font-medium text-[#4a6bda]">Target</div>
                          <div className="text-[14px] font-bold">{goal.target}</div>
                        </div>
                        
                        <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                          <div className="text-[12px] font-medium text-[#4a6bda]">Progress</div>
                          <div className="text-[14px] font-bold">{goal.progress.toFixed(1)}%</div>
                        </div>
                        
                        <div className="text-center p-2 bg-gray-50 rounded-[10px]">
                          <Calendar className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                          <div className="text-[12px] font-medium text-[#4a6bda]">Time</div>
                          <div className="text-[14px] font-bold">{goal.timeframe}</div>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full h-[35px] rounded-[15px] text-white text-[14px] font-medium"
                        style={{ backgroundColor: goal.color }}
                      >
                        Update Progress
                      </Button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Quick Update Form */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[16px] font-semibold mb-3">
                Quick Update
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-[#707070] text-[12px]">
                    Current Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    value={newGoalWeight}
                    onChange={(e) => setNewGoalWeight(e.target.value)}
                    className="w-full h-[35px] rounded-[10px] text-[14px]"
                    placeholder="75.2"
                  />
                </div>
                
                <div>
                  <Label className="text-[#707070] text-[12px]">
                    Today's Steps
                  </Label>
                  <Input
                    type="number"
                    value={newGoalSteps}
                    onChange={(e) => setNewGoalSteps(e.target.value)}
                    className="w-full h-[35px] rounded-[10px] text-[14px]"
                    placeholder="7240"
                  />
                </div>
                
                <Button
                  className="w-full h-[35px] rounded-[15px] bg-[#4a6bda] hover:bg-[#3a5bca] text-white text-[14px] font-medium"
                >
                  Update Goals
                </Button>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[16px] font-semibold mb-3 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </h3>
              
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-[10px]">
                    <span className="text-[20px]">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="text-[#4a6bda] text-[14px] font-medium">
                        {achievement.title}
                      </div>
                      <div className="text-[#707070] text-[12px]">
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}