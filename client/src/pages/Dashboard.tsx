import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const activities = [
    {
      id: 1,
      title: "Swimming",
      description: "Track your swimming sessions and technique",
      icon: "🏊‍♂️",
      color: "#70c1e4",
      route: "/swimming",
      status: "Ready"
    },
    {
      id: 2,
      title: "Cycling",
      description: "Monitor cycling distance and performance",
      icon: "🚴‍♂️", 
      color: "#8fd4e8",
      route: "/cycling",
      status: "Ready"
    },
    {
      id: 3,
      title: "Running",
      description: "Track running pace and achievements",
      icon: "🏃‍♂️",
      color: "#a4e2ec",
      route: "/running",
      status: "Complete"
    }
  ];

  const otherActivities = [
    {
      id: 4,
      title: "Calorie Control",
      description: "Monitor daily calorie intake and nutrition",
      icon: "/figmaAssets/component-2.svg",
      color: "#b8eaf0",
      route: "/calorie-control"
    },
    {
      id: 5,
      title: "Weight Control",
      description: "Track weight goals and body composition",
      icon: "/figmaAssets/component-4.svg",
      color: "#c8f0f4",
      route: "/weight-control"
    },
    {
      id: 6,
      title: "Fitness Goals",
      description: "Set and achieve comprehensive fitness targets",
      icon: "/figmaAssets/component-3.svg",
      color: "#d8f6f8",
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
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            <h1 className="text-white text-[24px] font-semibold text-center mb-1">
              Welcome Back!
            </h1>
            <p className="text-white/80 text-[14px] text-center mb-3">
              Choose your activity
            </p>

            {/* Triathlon Activities */}
            <div className="mb-3">
              <h2 className="text-white text-[18px] font-medium mb-2 text-center">
                🏆 Triathlon Training
              </h2>
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="bg-white/95 rounded-[16px] p-3 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[20px]"
                        style={{ backgroundColor: activity.color }}
                      >
                        {activity.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#4a6bda] text-[14px] font-semibold">
                            {activity.title}
                          </h3>
                          <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
                            activity.status === 'Complete' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-[#707070] text-[10px] leading-tight">
                          {activity.description}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => setLocation(activity.route)}
                        className="w-[55px] h-[24px] rounded-[12px] text-[10px] font-medium"
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
            </div>

            {/* Other Health Activities */}
            <div className="mb-3">
              <h2 className="text-white text-[16px] font-medium mb-2 text-center">
                📊 Health Tracking
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {otherActivities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="bg-white/90 rounded-[12px] p-2 shadow-sm"
                  >
                    <div className="text-center">
                      <div 
                        className="w-[30px] h-[30px] rounded-full flex items-center justify-center mx-auto mb-1"
                        style={{ backgroundColor: activity.color }}
                      >
                        <img
                          src={activity.icon}
                          alt={activity.title}
                          className="w-[18px] h-[18px]"
                        />
                      </div>
                      
                      <h3 className="text-[#4a6bda] text-[12px] font-semibold mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-[#707070] text-[9px] leading-tight mb-2">
                        {activity.description}
                      </p>
                      
                      <Button
                        onClick={() => setLocation(activity.route)}
                        className="w-full h-[20px] rounded-[10px] text-[9px] font-medium"
                        style={{ 
                          backgroundColor: activity.color,
                          color: "#4a6bda"
                        }}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="mb-3 bg-white/10 rounded-[16px] p-3">
              <h3 className="text-white text-[14px] font-medium mb-2 text-center">
                Today's Progress
              </h3>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-white text-[16px] font-bold">1,250</div>
                  <div className="text-white/70 text-[10px]">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-[16px] font-bold">65g</div>
                  <div className="text-white/70 text-[10px]">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-[16px] font-bold">2.1km</div>
                  <div className="text-white/70 text-[10px]">Distance</div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="w-[120px] h-[30px] rounded-[20px] bg-white/10 border-white/30 text-white text-[12px] font-medium hover:bg-white/20"
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