import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bike, MapPin, Gauge, Activity } from "lucide-react";

export default function Cycling() {
  const [, setLocation] = useLocation();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [terrain, setTerrain] = useState("road");

  const cyclingRides = [
    { date: "Today", distance: "25.5km", duration: "1h 15m", terrain: "Road", avgSpeed: "20.4 km/h", calories: 520 },
    { date: "Yesterday", distance: "18.2km", duration: "58m", terrain: "Trail", avgSpeed: "18.8 km/h", calories: 440 },
    { date: "2 days ago", distance: "32.1km", duration: "1h 45m", terrain: "Mixed", avgSpeed: "18.3 km/h", calories: 680 }
  ];

  const terrainTypes = [
    { name: "road", emoji: "🛣️", label: "Road" },
    { name: "trail", emoji: "🌲", label: "Trail" },
    { name: "mountain", emoji: "⛰️", label: "Mountain" },
    { name: "indoor", emoji: "🏠", label: "Indoor" }
  ];

  const weeklyStats = {
    totalDistance: 125.8,
    totalTime: "6h 22m",
    avgSpeed: "19.7 km/h",
    rides: 8
  };

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#8fd4e8] to-[#4a6bda] rounded-[25px] overflow-hidden">
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
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold flex items-center gap-2">
              🚴‍♂️ Cycling
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
                <Bike className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.rides}</div>
                <div className="text-[10px] text-[#707070]">Rides</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <MapPin className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalDistance}km</div>
                <div className="text-[10px] text-[#707070]">Distance</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Activity className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalTime}</div>
                <div className="text-[10px] text-[#707070]">Time</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Gauge className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.avgSpeed}</div>
                <div className="text-[10px] text-[#707070]">Avg Speed</div>
              </div>
            </div>

            {/* Add Ride Form */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Bike className="h-5 w-5" />
                Log Cycling Ride
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
                      placeholder="25.5"
                    />
                  </div>
                  <div>
                    <Label className="text-[#707070] text-[12px]">Duration</Label>
                    <Input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-[35px] rounded-[10px] text-[14px]"
                      placeholder="1h 15m"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-[#707070] text-[12px] mb-2 block">Terrain Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {terrainTypes.map((terrainOption) => (
                      <button
                        key={terrainOption.name}
                        onClick={() => setTerrain(terrainOption.name)}
                        className={`p-2 rounded-[10px] text-center transition-all ${
                          terrain === terrainOption.name 
                            ? 'bg-[#8fd4e8] text-white' 
                            : 'bg-gray-100 text-[#707070]'
                        }`}
                      >
                        <div className="text-[16px] mb-1">{terrainOption.emoji}</div>
                        <div className="text-[10px]">{terrainOption.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full h-[35px] rounded-[15px] bg-[#8fd4e8] hover:bg-[#7fc4d8] text-white text-[14px] font-medium"
                >
                  Save Ride
                </Button>
              </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[16px] font-semibold mb-3">
                Recent Rides
              </h3>
              
              <div className="space-y-2">
                {cyclingRides.map((ride, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-medium text-[#4a6bda]">
                          {ride.distance}
                        </span>
                        <span className="text-[12px] text-[#707070]">
                          in {ride.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#707070]">
                        {ride.terrain} • {ride.avgSpeed} • {ride.calories} cal • {ride.date}
                      </div>
                    </div>
                    <div className="text-[20px]">
                      {terrainTypes.find(t => t.label.toLowerCase() === ride.terrain.toLowerCase())?.emoji || "🚴‍♂️"}
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