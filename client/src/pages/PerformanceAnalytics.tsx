import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, Activity, Target, Clock, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function PerformanceAnalytics() {
  const [, setLocation] = useLocation();
  const [timeRange, setTimeRange] = useState("7");
  const [activityType, setActivityType] = useState("all");

  const userId = 1; // Using demo user ID

  // Calculate date range
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - parseInt(timeRange) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Fetch workout analytics
  const { data: swimmingStats } = useQuery({
    queryKey: ['/api/analytics/workout-stats', userId, 'swimming', startDate, endDate],
    enabled: activityType === 'all' || activityType === 'swimming',
  });

  const { data: cyclingStats } = useQuery({
    queryKey: ['/api/analytics/workout-stats', userId, 'cycling', startDate, endDate],
    enabled: activityType === 'all' || activityType === 'cycling',
  });

  const { data: runningStats } = useQuery({
    queryKey: ['/api/analytics/workout-stats', userId, 'running', startDate, endDate],
    enabled: activityType === 'all' || activityType === 'running',
  });

  const { data: badmintonStats } = useQuery({
    queryKey: ['/api/analytics/workout-stats', userId, 'badminton', startDate, endDate],
    enabled: activityType === 'all' || activityType === 'badminton',
  });

  // Fetch calorie analytics
  const { data: calorieStats } = useQuery({
    queryKey: ['/api/analytics/calorie-stats', userId, startDate, endDate],
  });

  // Calculate combined stats
  const totalWorkouts = (swimmingStats?.totalWorkouts || 0) + 
                       (cyclingStats?.totalWorkouts || 0) + 
                       (runningStats?.totalWorkouts || 0) + 
                       (badmintonStats?.totalWorkouts || 0);

  const totalDuration = (swimmingStats?.totalDuration || 0) + 
                       (cyclingStats?.totalDuration || 0) + 
                       (runningStats?.totalDuration || 0) + 
                       (badmintonStats?.totalDuration || 0);

  const totalCaloriesBurned = (swimmingStats?.totalCalories || 0) + 
                             (cyclingStats?.totalCalories || 0) + 
                             (runningStats?.totalCalories || 0) + 
                             (badmintonStats?.totalCalories || 0);

  const avgWorkoutsPerDay = totalWorkouts / parseInt(timeRange);

  const activityBreakdown = [
    { name: 'Swimming', count: swimmingStats?.totalWorkouts || 0, color: '#70c1e4' },
    { name: 'Cycling', count: cyclingStats?.totalWorkouts || 0, color: '#8fd4e8' },
    { name: 'Running', count: runningStats?.totalWorkouts || 0, color: '#a4e2ec' },
    { name: 'Badminton', count: badmintonStats?.totalWorkouts || 0, color: '#b8d4f0' },
  ];

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
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold">
              📊 Analytics
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{totalWorkouts}</div>
              <div className="text-[12px]">workouts</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Time Range Selector */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-white/90 border-0 h-12 rounded-[15px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger className="bg-white/90 border-0 h-12 rounded-[15px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4">Performance Overview</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="h-6 w-6 text-[#4a6bda] mr-2" />
                    <span className="text-[24px] font-bold text-[#4a6bda]">{totalWorkouts}</span>
                  </div>
                  <div className="text-[12px] text-[#707070]">Total Workouts</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-[#4a6bda] mr-2" />
                    <span className="text-[24px] font-bold text-[#4a6bda]">{Math.round(totalDuration / 60)}h</span>
                  </div>
                  <div className="text-[12px] text-[#707070]">Total Time</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-[#4a6bda] mr-2" />
                    <span className="text-[24px] font-bold text-[#4a6bda]">{totalCaloriesBurned}</span>
                  </div>
                  <div className="text-[12px] text-[#707070]">Calories Burned</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-[#4a6bda] mr-2" />
                    <span className="text-[24px] font-bold text-[#4a6bda]">{avgWorkoutsPerDay.toFixed(1)}</span>
                  </div>
                  <div className="text-[12px] text-[#707070]">Avg/Day</div>
                </div>
              </div>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4">Activity Breakdown</h2>
              
              <div className="space-y-3">
                {activityBreakdown.map((activity) => (
                  <div key={activity.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: activity.color }}
                      />
                      <span className="text-[14px] font-medium">{activity.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#4a6bda]">{activity.count}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: activity.color,
                            width: `${totalWorkouts > 0 ? (activity.count / totalWorkouts) * 100 : 0}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stats */}
            {activityType !== 'all' && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4">
                  {activityType.charAt(0).toUpperCase() + activityType.slice(1)} Details
                </h2>
                
                {activityType === 'swimming' && swimmingStats && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{swimmingStats.totalWorkouts}</div>
                      <div className="text-[10px] text-[#707070]">Sessions</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{swimmingStats.totalDuration}m</div>
                      <div className="text-[10px] text-[#707070]">Duration</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{swimmingStats.totalCalories}</div>
                      <div className="text-[10px] text-[#707070]">Calories</div>
                    </div>
                  </div>
                )}

                {activityType === 'cycling' && cyclingStats && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{cyclingStats.totalWorkouts}</div>
                      <div className="text-[10px] text-[#707070]">Rides</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{cyclingStats.totalDuration}m</div>
                      <div className="text-[10px] text-[#707070]">Duration</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{cyclingStats.totalCalories}</div>
                      <div className="text-[10px] text-[#707070]">Calories</div>
                    </div>
                  </div>
                )}

                {activityType === 'running' && runningStats && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{runningStats.totalWorkouts}</div>
                      <div className="text-[10px] text-[#707070]">Runs</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{runningStats.totalDuration}m</div>
                      <div className="text-[10px] text-[#707070]">Duration</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{runningStats.totalCalories}</div>
                      <div className="text-[10px] text-[#707070]">Calories</div>
                    </div>
                  </div>
                )}

                {activityType === 'badminton' && badmintonStats && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{badmintonStats.totalWorkouts}</div>
                      <div className="text-[10px] text-[#707070]">Matches</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{badmintonStats.totalDuration}m</div>
                      <div className="text-[10px] text-[#707070]">Duration</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-[#4a6bda]">{badmintonStats.totalCalories}</div>
                      <div className="text-[10px] text-[#707070]">Calories</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Nutrition Stats */}
            {calorieStats && (
              <div className="bg-white rounded-[20px] p-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4">Nutrition Summary</h2>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-[18px] font-bold text-[#4a6bda]">{calorieStats.totalEntries}</div>
                    <div className="text-[10px] text-[#707070]">Food Entries</div>
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#4a6bda]">{calorieStats.totalCalories}</div>
                    <div className="text-[10px] text-[#707070]">Total Calories</div>
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#4a6bda]">{Math.round(calorieStats.avgCaloriesPerDay)}</div>
                    <div className="text-[10px] text-[#707070]">Avg/Day</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}