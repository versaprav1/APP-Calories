import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Plus, Target, TrendingUp, Calendar } from "lucide-react";

interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  quantity: number;
  userId: number;
  createdAt: string;
}

export default function CalorieControl() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("1");

  const { data: foodEntries = [], isLoading } = useQuery<FoodEntry[]>({
    queryKey: ['/api/food-entries'],
    enabled: true
  });

  const addFoodMutation = useMutation({
    mutationFn: async (foodData: { name: string; calories: number; quantity: number }) => {
      const response = await apiRequest('/api/food-entries', 'POST', foodData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Food entry added successfully!',
      });
      setFoodName('');
      setCalories('');
      setQuantity('1');
      queryClient.invalidateQueries({ queryKey: ['/api/food-entries'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to add food entry',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim() || !calories.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    addFoodMutation.mutate({
      name: foodName,
      calories: parseInt(calories),
      quantity: parseInt(quantity)
    });
  };

  const totalCalories = foodEntries.reduce((sum, entry) => 
    sum + (entry.calories * entry.quantity), 0
  );

  const dailyGoal = 2000;
  const caloriesRemaining = dailyGoal - totalCalories;
  const progressPercentage = (totalCalories / dailyGoal) * 100;

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#b8eaf0] to-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#b8eaf0] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold">
              Calorie Control
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{totalCalories}</div>
              <div className="text-[12px]">of {dailyGoal}</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Daily Progress */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Progress
              </h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] text-[#707070]">Calories Consumed</span>
                  <span className="text-[16px] font-bold text-[#4a6bda]">{totalCalories} / {dailyGoal}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(progressPercentage, 100)}%`,
                      backgroundColor: progressPercentage > 100 ? '#ef4444' : '#b8eaf0'
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[14px] font-medium ${caloriesRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {caloriesRemaining >= 0 ? `${caloriesRemaining} calories remaining` : `${Math.abs(caloriesRemaining)} calories over`}
                  </span>
                  <span className="text-[12px] text-[#707070]">{progressPercentage.toFixed(1)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded-[10px]">
                  <div className="text-[16px] font-bold text-[#4a6bda]">{foodEntries.length}</div>
                  <div className="text-[10px] text-[#707070]">Meals</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-[10px]">
                  <div className="text-[16px] font-bold text-green-600">{Math.max(0, caloriesRemaining)}</div>
                  <div className="text-[10px] text-[#707070]">Remaining</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-[10px]">
                  <div className="text-[16px] font-bold text-orange-600">{totalCalories > 0 ? Math.round(totalCalories / Math.max(foodEntries.length, 1)) : 0}</div>
                  <div className="text-[10px] text-[#707070]">Avg/Meal</div>
                </div>
              </div>
            </div>

            {/* Add Food Form */}
            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Food
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="foodName" className="text-[#707070] text-[14px]">
                    Food Name
                  </Label>
                  <Input
                    id="foodName"
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full h-[40px] rounded-[15px] text-[14px]"
                    placeholder="e.g., Grilled chicken breast"
                  />
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="calories" className="text-[#707070] text-[14px]">
                      Calories per serving
                    </Label>
                    <Input
                      id="calories"
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full h-[40px] rounded-[15px] text-[14px]"
                      placeholder="250"
                    />
                  </div>
                  
                  <div className="w-20">
                    <Label htmlFor="quantity" className="text-[#707070] text-[14px]">
                      Servings
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full h-[40px] rounded-[15px] text-[14px]"
                      min="1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={addFoodMutation.isPending}
                  className="w-full h-[40px] rounded-[15px] bg-[#b8eaf0] hover:bg-[#a8dae0] text-white text-[14px] font-medium"
                >
                  {addFoodMutation.isPending ? "Adding..." : "Add Food"}
                </Button>
              </form>
            </div>

            {/* Food Log */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h3 className="text-[#4a6bda] text-[18px] font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Food Log
              </h3>
              
              {isLoading ? (
                <div className="text-center text-[#707070] py-8">Loading...</div>
              ) : foodEntries.length === 0 ? (
                <div className="text-center text-[#707070] py-8">
                  <img
                    src="/figmaAssets/component-2.svg"
                    alt="No food entries"
                    className="w-[60px] h-[60px] mx-auto mb-4 opacity-50"
                  />
                  <p>No food entries yet</p>
                  <p className="text-[12px] mt-1">Add your first meal above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {foodEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-[15px]">
                      <div className="flex-1">
                        <h3 className="text-[#4a6bda] text-[16px] font-medium">
                          {entry.name}
                        </h3>
                        <p className="text-[#707070] text-[12px]">
                          {entry.calories} cal × {entry.quantity} = {entry.calories * entry.quantity} cal
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-[#4a6bda]">
                          {entry.calories * entry.quantity}
                        </div>
                        <div className="text-[10px] text-[#707070]">calories</div>
                      </div>
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