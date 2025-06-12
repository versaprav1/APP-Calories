import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Waves, Clock, Target, TrendingUp } from "lucide-react";

export default function Swimming() {
  const [, setLocation] = useLocation();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [style, setStyle] = useState("freestyle");

  const swimmingSessions = [
    { date: "Today", distance: "1000m", duration: "25:30", style: "Freestyle", calories: 320 },
    { date: "Yesterday", distance: "800m", duration: "22:15", style: "Backstroke", calories: 280 },
    { date: "2 days ago", distance: "1200m", duration: "28:45", style: "Mixed", calories: 380 }
  ];

  const swimmingStyles = [
    { name: "freestyle", emoji: "🏊‍♂️", label: "Freestyle" },
    { name: "backstroke", emoji: "🤽‍♂️", label: "Backstroke" },
    { name: "breaststroke", emoji: "🏊‍♀️", label: "Breaststroke" },
    { name: "butterfly", emoji: "🦋", label: "Butterfly" }
  ];

  const weeklyStats = {
    totalDistance: 4200,
    totalTime: "1h 45m",
    avgPace: "2:15/100m",
    sessions: 5
  };

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#70c1e4] to-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#70c1e4] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold flex items-center gap-2">
              🏊‍♂️ Swimming
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{weeklyStats.totalDistance}m</div>
              <div className="text-[12px]">this week</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Waves className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.sessions}</div>
                <div className="text-[10px] text-[#707070]">Sessions</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalDistance}m</div>
                <div className="text-[10px] text-[#707070]">Distance</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalTime}</div>
                <div className="text-[10px] text-[#707070]">Time</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.avgPace}</div>
                <div className="text-[10px] text-[#707070]">Avg Pace</div>
              </div>
            </div>

            {/* Add Session Form */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Log Swimming Session
              </h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#707070] text-[12px]">Distance (m)</Label>
                    <Input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full h-[35px] rounded-[10px] text-[14px]"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label className="text-[#707070] text-[12px]">Duration (min)</Label>
                    <Input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-[35px] rounded-[10px] text-[14px]"
                      placeholder="25:30"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-[#707070] text-[12px] mb-2 block">Swimming Style</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {swimmingStyles.map((styleOption) => (
                      <button
                        key={styleOption.name}
                        onClick={() => setStyle(styleOption.name)}
                        className={`p-2 rounded-[10px] text-center transition-all ${
                          style === styleOption.name 
                            ? 'bg-[#70c1e4] text-white' 
                            : 'bg-gray-100 text-[#707070]'
                        }`}
                      >
                        <div className="text-[16px] mb-1">{styleOption.emoji}</div>
                        <div className="text-[10px]">{styleOption.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full h-[35px] rounded-[15px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[14px] font-medium"
                >
                  Save Session
                </Button>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[16px] font-semibold mb-3">
                Recent Sessions
              </h3>
              
              <div className="space-y-2">
                {swimmingSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-medium text-[#4a6bda]">
                          {session.distance}
                        </span>
                        <span className="text-[12px] text-[#707070]">
                          in {session.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#707070]">
                        {session.style} • {session.calories} cal • {session.date}
                      </div>
                    </div>
                    <div className="text-[20px]">
                      {swimmingStyles.find(s => s.label.toLowerCase() === session.style.toLowerCase())?.emoji || "🏊‍♂️"}
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