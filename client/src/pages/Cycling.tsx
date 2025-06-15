import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bike, MapPin, Gauge, Activity, Plus, Trash2, Clock, Target, TrendingUp } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CyclingWorkout, InsertCyclingWorkout } from "@shared/schema";

export default function Cycling() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("");
  const [elevation, setElevation] = useState("");
  const [route, setRoute] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const userId = 1; // Using demo user ID

  // Fetch cycling workouts
  const { data: workouts = [], isLoading } = useQuery<CyclingWorkout[]>({
    queryKey: ['/api/cycling-workouts', userId],
  });

  // Create workout mutation
  const createWorkoutMutation = useMutation({
    mutationFn: async (workout: InsertCyclingWorkout) => {
      return await apiRequest('/api/cycling-workouts', 'POST', workout);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Cycling workout added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cycling-workouts', userId] });
      resetForm();
      setShowAddForm(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add cycling workout. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating workout:', error);
    },
  });

  // Delete workout mutation
  const deleteWorkoutMutation = useMutation({
    mutationFn: async (workoutId: number) => {
      return await apiRequest(`/api/cycling-workouts/${workoutId}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Cycling workout deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cycling-workouts', userId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete cycling workout. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting workout:', error);
    },
  });

  const resetForm = () => {
    setDistance("");
    setDuration("");
    setAvgSpeed("");
    setMaxSpeed("");
    setElevation("");
    setRoute("");
    setCalories("");
    setNotes("");
  };

  const handleSubmit = () => {
    if (!distance || !duration) {
      toast({
        title: "Error",
        description: "Please fill in distance and duration fields.",
        variant: "destructive",
      });
      return;
    }

    const workoutData: InsertCyclingWorkout = {
      userId,
      distance: distance,
      duration: parseInt(duration),
      avgSpeed: avgSpeed || undefined,
      maxSpeed: maxSpeed || undefined,
      elevation: elevation ? parseInt(elevation) : undefined,
      route: route || undefined,
      calories: calories ? parseInt(calories) : undefined,
      notes: notes || undefined,
    };

    createWorkoutMutation.mutate(workoutData);
  };

  // Calculate stats from real data
  const weeklyStats = {
    totalDistance: workouts.reduce((sum, workout) => sum + parseFloat(workout.distance.toString()), 0),
    totalTime: Math.round(workouts.reduce((sum, workout) => sum + workout.duration, 0)),
    rides: workouts.length,
    avgSpeed: workouts.length > 0 
      ? (workouts.reduce((sum, workout) => sum + (parseFloat(workout.avgSpeed?.toString() || '0')), 0) / workouts.length).toFixed(1)
      : '0',
    totalCalories: workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0)
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
              <div className="text-[18px] font-bold">{weeklyStats.totalDistance.toFixed(1)}km</div>
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
                <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalDistance.toFixed(1)}km</div>
                <div className="text-[10px] text-[#707070]">Distance</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Gauge className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.avgSpeed}</div>
                <div className="text-[10px] text-[#707070]">Avg Speed</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Activity className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalCalories}</div>
                <div className="text-[10px] text-[#707070]">Calories</div>
              </div>
            </div>

            {/* Add Ride Button */}
            <div className="mb-4">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full bg-white text-[#4a6bda] hover:bg-white/90 rounded-[15px] py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                {showAddForm ? "Cancel" : "Add Cycling Session"}
              </Button>
            </div>

            {/* Add Session Form */}
            {showAddForm && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                  <Bike className="h-5 w-5" />
                  Log Cycling Session
                </h2>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Distance (km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="25.5"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Duration (min)</Label>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="75"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Avg Speed (km/h)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={avgSpeed}
                        onChange={(e) => setAvgSpeed(e.target.value)}
                        placeholder="20.4"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Max Speed (km/h)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={maxSpeed}
                        onChange={(e) => setMaxSpeed(e.target.value)}
                        placeholder="45.2"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Elevation (m)</Label>
                      <Input
                        type="number"
                        value={elevation}
                        onChange={(e) => setElevation(e.target.value)}
                        placeholder="350"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Calories</Label>
                      <Input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="520"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Route/Location</Label>
                    <Input
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      placeholder="Central Park Loop, City Trail..."
                      className="h-10 rounded-[10px] border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Notes (optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Weather conditions, bike performance, how you felt..."
                      className="h-20 rounded-[10px] border-gray-200 resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={createWorkoutMutation.isPending}
                    className="w-full bg-[#4a6bda] hover:bg-[#3a5bc8] text-white rounded-[15px] py-3"
                  >
                    {createWorkoutMutation.isPending ? "Adding..." : "Add Session"}
                  </Button>
                </div>
              </div>
            )}

            {/* Recent Sessions */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[16px] font-semibold mb-3">Recent Rides</h2>
              
              {isLoading ? (
                <div className="text-center py-4 text-[#707070]">Loading rides...</div>
              ) : workouts.length === 0 ? (
                <div className="text-center py-4 text-[#707070]">
                  No cycling sessions yet. Add your first ride above!
                </div>
              ) : (
                <div className="space-y-3">
                  {workouts.slice(0, 5).map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[14px] font-medium text-[#4a6bda]">
                            {workout.distance}km • {workout.duration}min
                          </span>
                          {workout.avgSpeed && (
                            <span className="text-[12px] text-[#707070] bg-white px-2 py-1 rounded-full">
                              {workout.avgSpeed} km/h avg
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#707070]">
                          {new Date(workout.createdAt).toLocaleDateString()}
                          {workout.calories && ` • ${workout.calories} cal`}
                          {workout.elevation && ` • ${workout.elevation}m elevation`}
                        </div>
                        {workout.route && (
                          <div className="text-[11px] text-[#707070] mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {workout.route}
                          </div>
                        )}
                        {workout.notes && (
                          <div className="text-[11px] text-[#707070] mt-1 truncate">
                            {workout.notes}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => deleteWorkoutMutation.mutate(workout.id)}
                        disabled={deleteWorkoutMutation.isPending}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}