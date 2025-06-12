import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Timer, MapPin, Zap, Trophy } from "lucide-react";

export default function Running() {
  const [, setLocation] = useLocation();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [runType, setRunType] = useState("easy");

  const runningWorkouts = [
    { date: "Today", distance: "5.2km", duration: "26:15", type: "Easy Run", pace: "5:03/km", calories: 310 },
    { date: "Yesterday", distance: "8.0km", duration: "38:24", type: "Tempo", pace: "4:48/km", calories: 480 },
    { date: "2 days ago", distance: "3.5km", duration: "15:45", type: "Intervals", pace: "4:30/km", calories: 220 }
  ];

  const runTypes = [
    { name: "easy", emoji: "🚶‍♂️", label: "Easy Run" },
    { name: "tempo", emoji: "🏃‍♂️", label: "Tempo" },
    { name: "intervals", emoji: "⚡", label: "Intervals" },
    { name: "long", emoji: "🏃‍♀️", label: "Long Run" }
  ];

  const weeklyStats = {
    totalDistance: 28.7,
    totalTime: "2h 25m",
    avgPace: "5:04/km",
    runs: 6
  };

  const achievements = [
    { title: "5K Personal Best", date: "This week", icon: "🏆" },
    { title: "Weekly Distance Goal", date: "Completed", icon: "🎯" },
    { title: "Consistency Streak", date: "7 days", icon: "🔥" }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#a4e2ec] to-[#4a6bda] rounded-[25px] overflow-hidden">
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
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold flex items-center gap-2">
              🏃‍♂️ Running
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{weeklyStats.totalDistance}km</div>
              <div className="text-[12px]">this week</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Timer className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.runs}</div>
                <div className="text-[10px] text-[#707070]">Runs</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <MapPin className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalDistance}km</div>
                <div className="text-[10px] text-[#707070]">Distance</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Timer className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalTime}</div>
                <div className="text-[10px] text-[#707070]">Time</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Zap className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.avgPace}</div>
                <div className="text-[10px] text-[#707070]">Avg Pace</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[16px] font-semibold mb-3 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </h2>
              
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-[10px]">
                    <span className="text-[20px]">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-[#4a6bda]">
                        {achievement.title}
                      </div>
                      <div className="text-[12px] text-[#707070]">
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Run Form */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Log Running Workout
              </h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#707070] text-[12px]">Distance (km)</Label>
                    <Input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full h-[35px] rounded-[10px] text-[14px]"
                      placeholder="5.2"
                    />
                  </div>
                  <div>
                    <Label className="text-[#707070] text-[12px]">Duration</Label>
                    <Input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-[35px] rounded-[10px] text-[14px]"
                      placeholder="26:15"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-[#707070] text-[12px] mb-2 block">Run Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {runTypes.map((typeOption) => (
                      <button
                        key={typeOption.name}
                        onClick={() => setRunType(typeOption.name)}
                        className={`p-2 rounded-[10px] text-center transition-all ${
                          runType === typeOption.name 
                            ? 'bg-[#a4e2ec] text-white' 
                            : 'bg-gray-100 text-[#707070]'
                        }`}
                      >
                        <div className="text-[16px] mb-1">{typeOption.emoji}</div>
                        <div className="text-[10px]">{typeOption.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full h-[35px] rounded-[15px] bg-[#a4e2ec] hover:bg-[#94d2dc] text-white text-[14px] font-medium"
                >
                  Save Workout
                </Button>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[16px] font-semibold mb-3">
                Recent Workouts
              </h3>
              
              <div className="space-y-2">
                {runningWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-medium text-[#4a6bda]">
                          {workout.distance}
                        </span>
                        <span className="text-[12px] text-[#707070]">
                          in {workout.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#707070]">
                        {workout.type} • {workout.pace} • {workout.calories} cal • {workout.date}
                      </div>
                    </div>
                    <div className="text-[20px]">
                      {runTypes.find(t => t.label.toLowerCase() === workout.type.toLowerCase())?.emoji || "🏃‍♂️"}
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