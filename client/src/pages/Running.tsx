import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Clock, Target, TrendingUp, Plus, Trash2, Mountain, CloudSun } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { RunningWorkout, InsertRunningWorkout } from "@shared/schema";

export default function Running() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [avgPace, setAvgPace] = useState("");
  const [maxPace, setMaxPace] = useState("");
  const [elevation, setElevation] = useState("");
  const [route, setRoute] = useState("");
  const [weatherConditions, setWeatherConditions] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const userId = 1; // Using demo user ID

  // Fetch running workouts
  const { data: workouts = [], isLoading } = useQuery<RunningWorkout[]>({
    queryKey: ['/api/running-workouts', userId],
  });

  // Create workout mutation
  const createWorkoutMutation = useMutation({
    mutationFn: async (workout: InsertRunningWorkout) => {
      return await apiRequest('/api/running-workouts', 'POST', workout);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Running workout added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/running-workouts', userId] });
      resetForm();
      setShowAddForm(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add running workout. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating workout:', error);
    },
  });

  // Delete workout mutation
  const deleteWorkoutMutation = useMutation({
    mutationFn: async (workoutId: number) => {
      return await apiRequest(`/api/running-workouts/${workoutId}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Running workout deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/running-workouts', userId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete running workout. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting workout:', error);
    },
  });

  const resetForm = () => {
    setDistance("");
    setDuration("");
    setAvgPace("");
    setMaxPace("");
    setElevation("");
    setRoute("");
    setWeatherConditions("");
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

    const workoutData: InsertRunningWorkout = {
      userId,
      distance: distance,
      duration: parseInt(duration),
      avgPace: avgPace || undefined,
      maxPace: maxPace || undefined,
      elevation: elevation ? parseInt(elevation) : undefined,
      route: route || undefined,
      weatherConditions: weatherConditions || undefined,
      calories: calories ? parseInt(calories) : undefined,
      notes: notes || undefined,
    };

    createWorkoutMutation.mutate(workoutData);
  };

  // Calculate stats from real data
  const weeklyStats = {
    totalDistance: workouts.reduce((sum, workout) => sum + parseFloat(workout.distance.toString()), 0),
    totalTime: Math.round(workouts.reduce((sum, workout) => sum + workout.duration, 0)),
    runs: workouts.length,
    totalCalories: workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0),
    totalElevation: workouts.reduce((sum, workout) => sum + (workout.elevation || 0), 0)
  };

  const weatherOptions = [
    { value: "sunny", label: "Sunny ☀️" },
    { value: "cloudy", label: "Cloudy ☁️" },
    { value: "rainy", label: "Rainy 🌧️" },
    { value: "windy", label: "Windy 💨" },
    { value: "hot", label: "Hot 🔥" },
    { value: "cold", label: "Cold ❄️" },
    { value: "humid", label: "Humid 💧" }
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
              <div className="text-[18px] font-bold">{weeklyStats.totalDistance.toFixed(1)}km</div>
              <div className="text-[12px]">this week</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.runs}</div>
                <div className="text-[10px] text-[#707070]">Runs</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <MapPin className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalDistance.toFixed(1)}km</div>
                <div className="text-[10px] text-[#707070]">Distance</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Mountain className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalElevation}m</div>
                <div className="text-[10px] text-[#707070]">Elevation</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalCalories}</div>
                <div className="text-[10px] text-[#707070]">Calories</div>
              </div>
            </div>

            {/* Add Run Button */}
            <div className="mb-4">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full bg-white text-[#4a6bda] hover:bg-white/90 rounded-xl h-10 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showAddForm ? "Cancel" : "Add Running Session"}
              </Button>
            </div>

            {/* Add Session Form */}
            {showAddForm && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                  🏃‍♂️ Log Running Session
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
                        placeholder="5.0"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Duration (min)</Label>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="30"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Avg Pace (min/km)</Label>
                      <Input
                        value={avgPace}
                        onChange={(e) => setAvgPace(e.target.value)}
                        placeholder="5:30"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Best Pace (min/km)</Label>
                      <Input
                        value={maxPace}
                        onChange={(e) => setMaxPace(e.target.value)}
                        placeholder="4:45"
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
                        placeholder="150"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Calories</Label>
                      <Input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="300"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Route/Location</Label>
                      <Input
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        placeholder="Park Loop, Beach Path..."
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Weather</Label>
                      <Select value={weatherConditions} onValueChange={setWeatherConditions}>
                        <SelectTrigger className="h-10 rounded-[10px] border-gray-200">
                          <SelectValue placeholder="Select weather" />
                        </SelectTrigger>
                        <SelectContent>
                          {weatherOptions.map((weather) => (
                            <SelectItem key={weather.value} value={weather.value}>
                              {weather.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Notes (optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How you felt, training focus, observations..."
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
              <h2 className="text-[#4a6bda] text-[16px] font-semibold mb-3">Recent Runs</h2>
              
              {isLoading ? (
                <div className="text-center py-4 text-[#707070]">Loading runs...</div>
              ) : workouts.length === 0 ? (
                <div className="text-center py-4 text-[#707070]">
                  No running sessions yet. Add your first run above!
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
                          {workout.avgPace && (
                            <span className="text-[12px] text-[#707070] bg-white px-2 py-1 rounded-full">
                              {workout.avgPace} pace
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#707070] flex items-center gap-2">
                          <span>{new Date(workout.createdAt).toLocaleDateString()}</span>
                          {workout.calories && <span>• {workout.calories} cal</span>}
                          {workout.elevation && <span>• {workout.elevation}m ⛰️</span>}
                          {workout.weatherConditions && (
                            <span>• {weatherOptions.find(w => w.value === workout.weatherConditions)?.label}</span>
                          )}
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