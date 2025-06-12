import { Button } from "@/components/ui/button";
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
      status: "not finished"
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
    },
    {
      id: 4,
      title: "Badminton",
      description: "Track your badminton matches and skills",
      icon: "🏸",
      color: "#b8d4f0",
      route: "/badminton",
      status: "Ready"
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
      icon: "/figmaAssets/component-3.svg",
      color: "#cef3f7",
      route: "/weight-control"
    },
    {
      id: 6,
      title: "Fitness Goals",
      description: "Set and track your fitness objectives",
      icon: "/figmaAssets/component-4.svg",
      color: "#e0f8fa",
      route: "/fitness-goals"
    },
    {
      id: 7,
      title: "Nutrition Plans",
      description: "Follow personalized meal plans",
      icon: "/figmaAssets/component-5.svg",
      color: "#f0fcfd",
      route: "/nutrition-plans"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a6bda] via-[#70c1e4] to-[#8fd4e8] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-[50px] h-[50px] bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-[20px] font-bold">P</span>
            </div>
            <div>
              <h2 className="text-white text-[18px] font-semibold">Praveen</h2>
              <p className="text-white/80 text-[12px]">Triathlon Athlete</p>
            </div>
          </div>
          <div className="w-[30px] h-[30px] bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-[16px]">🔔</span>
          </div>
        </div>

        {/* Welcome */}
        <div className="text-center mb-6">
          <h1 className="text-white text-[28px] font-semibold mb-2">
            Welcome Back!
          </h1>
          <p className="text-white/80 text-[16px]">
            Choose your activity
          </p>
        </div>

        {/* Triathlon Activities */}
        <div className="mb-6">
          <h2 className="text-white text-[20px] font-medium mb-4 text-center">
            🏆 Triathlon Training
          </h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white/95 rounded-[20px] p-4 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-[24px]"
                    style={{ backgroundColor: activity.color }}
                  >
                    {activity.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#4a6bda] text-[16px] font-semibold">
                        {activity.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                        activity.status === 'Complete' ? 'bg-green-100 text-green-600' : 
                        activity.status === 'not finished' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-[#707070] text-[12px] leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setLocation(activity.route)}
                    className="w-[70px] h-[30px] rounded-[15px] text-[12px] font-medium hover:opacity-80"
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

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-white text-[18px] font-medium mb-3 text-center">
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setLocation("/workout-setup")}
              className="bg-white/90 rounded-[15px] p-3 shadow-sm cursor-pointer hover:bg-white transition-colors"
            >
              <div className="text-center">
                <div className="w-[40px] h-[40px] rounded-full bg-orange-200 flex items-center justify-center mx-auto mb-2">
                  <span className="text-[20px]">📝</span>
                </div>
                <h3 className="text-[#4a6bda] text-[14px] font-semibold mb-1">Log Workout</h3>
                <p className="text-[#707070] text-[10px] leading-tight">Add exercise data</p>
              </div>
            </div>
            
            <div 
              onClick={() => setLocation("/calorie-logging")}
              className="bg-white/90 rounded-[15px] p-3 shadow-sm cursor-pointer hover:bg-white transition-colors"
            >
              <div className="text-center">
                <div className="w-[40px] h-[40px] rounded-full bg-teal-200 flex items-center justify-center mx-auto mb-2">
                  <span className="text-[20px]">🍽️</span>
                </div>
                <h3 className="text-[#4a6bda] text-[14px] font-semibold mb-1">Log Calories</h3>
                <p className="text-[#707070] text-[10px] leading-tight">Track meals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Activities */}
        <div className="mb-6">
          <h2 className="text-white text-[18px] font-medium mb-3 text-center">
            📊 Health Tracking
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {otherActivities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white/90 rounded-[15px] p-3 shadow-sm"
              >
                <div className="text-center">
                  <div 
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: activity.color }}
                  >
                    <img
                      src={activity.icon}
                      alt={activity.title}
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                  
                  <h3 className="text-[#4a6bda] text-[14px] font-semibold mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-[#707070] text-[10px] leading-tight mb-2">
                    {activity.description}
                  </p>
                  
                  <Button
                    onClick={() => setLocation(activity.route)}
                    className="w-full h-[25px] rounded-[12px] text-[11px] font-medium hover:opacity-80"
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

        {/* Stats */}
        <div className="mb-6 bg-white/10 rounded-[20px] p-4">
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

        {/* Logout */}
        <div className="flex justify-center pb-20">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="w-[140px] h-[40px] rounded-[25px] bg-white/10 border-white/30 text-white text-[14px] font-medium hover:bg-white/20"
          >
            Logout
          </Button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around py-2">
              <button 
                onClick={() => setLocation("/dashboard")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">🏠</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Home</span>
              </button>
              
              <button 
                onClick={() => setLocation("/account")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-gray-600">Account</span>
              </button>
              
              <button 
                onClick={() => setLocation("/activity")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">📊</div>
                <span className="text-[10px] text-gray-600">Activity</span>
              </button>
              
              <button 
                onClick={() => setLocation("/resources")}
                className="flex flex-col items-center py-2 px-4"
              >
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