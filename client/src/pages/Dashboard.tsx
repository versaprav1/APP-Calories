import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Activity, 
  TrendingUp, 
  Target, 
  Calendar,
  ChevronRight,
  Waves,
  Bike,
  Zap,
  Trophy,
  Clock,
  Flame,
  User,
  Settings,
  BarChart3,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [greeting, setGreeting] = useState("");

  const userId = 1; // Demo user ID

  // Fetch real data for dashboard stats
  const { data: swimmingStats } = useQuery({
    queryKey: ['/api/swimming-workouts', userId],
  });

  const { data: cyclingStats } = useQuery({
    queryKey: ['/api/cycling-workouts', userId],
  });

  const { data: runningStats } = useQuery({
    queryKey: ['/api/running-workouts', userId],
  });

  const { data: badmintonStats } = useQuery({
    queryKey: ['/api/badminton-sessions', userId],
  });

  const { data: weightStats } = useQuery({
    queryKey: ['/api/weight-entries', userId],
  });

  // Set dynamic greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Calculate weekly stats
  const weeklyStats = {
    totalWorkouts: (swimmingStats?.length || 0) + (cyclingStats?.length || 0) + (runningStats?.length || 0) + (badmintonStats?.length || 0),
    totalCalories: 
      (swimmingStats?.reduce((sum: number, w: any) => sum + (w.calories || 0), 0) || 0) +
      (cyclingStats?.reduce((sum: number, w: any) => sum + (w.calories || 0), 0) || 0) +
      (runningStats?.reduce((sum: number, w: any) => sum + (w.calories || 0), 0) || 0) +
      (badmintonStats?.reduce((sum: number, w: any) => sum + (w.calories || 0), 0) || 0),
    currentWeight: weightStats?.[0]?.weight || "75.0",
    weeklyGoal: 5,
  };

  const activities = [
    {
      title: "Swimming",
      icon: Waves,
      count: swimmingStats?.length || 0,
      recent: swimmingStats?.[0] ? `${swimmingStats[0].distance}m • ${swimmingStats[0].duration}min` : "No sessions yet",
      color: "from-blue-400 to-cyan-500",
      route: "/swimming",
      bgIcon: "💧"
    },
    {
      title: "Cycling",
      icon: Bike,
      count: cyclingStats?.length || 0,
      recent: cyclingStats?.[0] ? `${cyclingStats[0].distance}km • ${cyclingStats[0].duration}min` : "No rides yet",
      color: "from-green-400 to-emerald-500",
      route: "/cycling",
      bgIcon: "🚴‍♂️"
    },
    {
      title: "Running",
      icon: Zap,
      count: runningStats?.length || 0,
      recent: runningStats?.[0] ? `${runningStats[0].distance}km • ${runningStats[0].duration}min` : "No runs yet",
      color: "from-orange-400 to-red-500",
      route: "/running",
      bgIcon: "🏃‍♂️"
    },
    {
      title: "Badminton",
      icon: Trophy,
      count: badmintonStats?.length || 0,
      recent: badmintonStats?.[0] ? `${badmintonStats[0].duration}min match` : "No matches yet",
      color: "from-purple-400 to-pink-500",
      route: "/badminton",
      bgIcon: "🏸"
    }
  ];

  const quickActions = [
    { title: "Weight Control", icon: Target, route: "/weight-control", color: "bg-blue-500" },
    { title: "Analytics", icon: BarChart3, route: "/analytics", color: "bg-green-500" },
    { title: "Nutrition", icon: Flame, route: "/food-tracking", color: "bg-orange-500" },
    { title: "Goals", icon: Trophy, route: "/goals-progress", color: "bg-purple-500" },
  ];

  return (
    <div className="flex justify-center w-full bg-transparent min-h-screen">
      <Card className="relative w-[390px] min-h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          
          {/* Header */}
          <div className="relative px-6 pt-12 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{greeting}, Praveen</h1>
                <p className="text-gray-600 text-sm">Ready for your next workout?</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setLocation("/account")}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white"
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
                <Button
                  onClick={() => setLocation("/settings")}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white"
                >
                  <Settings className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
                <Activity className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalWorkouts}</div>
                <div className="text-xs text-gray-600">Workouts</div>
                <div className="text-xs text-blue-600 mt-1">Goal: {weeklyStats.weeklyGoal}/week</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
                <Flame className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalCalories}</div>
                <div className="text-xs text-gray-600">Calories</div>
                <div className="text-xs text-green-600 mt-1">+12% vs last week</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{weeklyStats.currentWeight}kg</div>
                <div className="text-xs text-gray-600">Weight</div>
                <div className="text-xs text-blue-600 mt-1">-0.5kg this week</div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Activities</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => setLocation("/analytics")}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  onClick={() => setLocation(activity.route)}
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-200`} />
                  
                  {/* Background icon */}
                  <div className="absolute -top-2 -right-2 text-6xl opacity-5">
                    {activity.bgIcon}
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <activity.icon className="h-6 w-6 text-gray-700" />
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {activity.count} this week
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{activity.recent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  onClick={() => setLocation(action.route)}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className={`${action.color} rounded-xl p-3 mx-auto mb-2 w-fit group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs font-medium text-gray-700">{action.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Progress</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Workout
              </Button>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-2">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Daily Goal Progress</h3>
                    <p className="text-xs text-gray-600">Stay consistent with your training</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">
                    {Math.round((weeklyStats.totalWorkouts / weeklyStats.weeklyGoal) * 100)}%
                  </div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((weeklyStats.totalWorkouts / weeklyStats.weeklyGoal) * 100, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{weeklyStats.totalWorkouts}</div>
                  <div className="text-xs text-gray-600">Workouts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{Math.round(weeklyStats.totalCalories / 7)}</div>
                  <div className="text-xs text-gray-600">Avg Calories</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {weeklyStats.totalWorkouts > 0 ? Math.round(weeklyStats.totalWorkouts * 7 / 7) : 0}
                  </div>
                  <div className="text-xs text-gray-600">Streak Days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Section */}
          <div className="px-6 pb-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Keep Pushing Forward!</h3>
                  <p className="text-sm opacity-90 mb-3">
                    You're doing great! Every workout brings you closer to your goals.
                  </p>
                  <Button
                    onClick={() => setLocation("/swimming")}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Start Workout
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="text-6xl opacity-20">
                  🏆
                </div>
              </div>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}