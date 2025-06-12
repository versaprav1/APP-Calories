import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const activities = [
    {
      id: 1,
      title: "Food Tracking",
      description: "Monitor your daily food intake and calories",
      icon: "/figmaAssets/component-2.svg",
      color: "#70c1e4",
      route: "/food-tracking"
    },
    {
      id: 2,
      title: "Nutrition Plans",
      description: "Customize meal plans and nutritional goals",
      icon: "/figmaAssets/component-3.svg", 
      color: "#8fd4e8",
      route: "/nutrition-plans"
    },
    {
      id: 3,
      title: "Fitness Goals",
      description: "Set and track your fitness achievements",
      icon: "/figmaAssets/component-4.svg",
      color: "#a4e2ec",
      route: "/fitness-goals"
    }
  ];

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Logo */}
          <img
            className="absolute w-[78px] h-[78px] top-[51px] left-4"
            alt="Logo"
            src="/figmaAssets/group-15.svg"
          />

          {/* Status bar */}
          <div className="flex w-[84px] h-6 items-center justify-center absolute top-2.5 right-4">
            <img
              className="relative flex-[0_0_auto]"
              alt="Battery signal wifi"
              src="/figmaAssets/battery-signal-wifi-icon.svg"
            />
          </div>

          {/* Time */}
          <div className="absolute w-[90px] h-[30px] top-1 left-0">
            <div className="relative h-[30px]">
              <div className="absolute w-[90px] h-[30px] -top-px left-0 font-normal text-[10.5px] text-center tracking-[0] leading-normal text-white">
                19:09
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="absolute w-full top-[150px] px-6">
            <h1 className="text-white text-[28px] font-semibold text-center mb-2">
              Welcome Back!
            </h1>
            <p className="text-white/80 text-[16px] text-center mb-8">
              Choose your health activity
            </p>

            {/* Triathlon Activity Options */}
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="bg-white/95 rounded-[20px] p-4 shadow-lg transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                      style={{ backgroundColor: activity.color }}
                    >
                      <img
                        src={activity.icon}
                        alt={activity.title}
                        className="w-[40px] h-[40px]"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[#4a6bda] text-[18px] font-semibold mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-[#707070] text-[14px] leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => setLocation(activity.route)}
                      className="w-[80px] h-[35px] rounded-[20px] text-[14px] font-medium"
                      style={{ 
                        backgroundColor: activity.color,
                        color: "#4a6bda"
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Overview */}
            <div className="mt-8 bg-white/10 rounded-[20px] p-4">
              <h3 className="text-white text-[16px] font-medium mb-3 text-center">
                Today's Progress
              </h3>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-white text-[20px] font-bold">1,250</div>
                  <div className="text-white/70 text-[12px]">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-[20px] font-bold">65g</div>
                  <div className="text-white/70 text-[12px]">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-[20px] font-bold">2.1km</div>
                  <div className="text-white/70 text-[12px]">Distance</div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="w-[140px] h-[40px] rounded-[25px] bg-white/10 border-white/30 text-white text-[14px] font-medium hover:bg-white/20"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}