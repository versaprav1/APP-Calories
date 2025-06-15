import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Scale, TrendingDown, TrendingUp, Plus, Trash2, Target } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { WeightEntry, InsertWeightEntry } from "@shared/schema";

export default function WeightControl() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [weight, setWeight] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [notes, setNotes] = useState("");

  const userId = 1; // Using demo user ID

  // Fetch weight entries
  const { data: entries = [], isLoading } = useQuery<WeightEntry[]>({
    queryKey: ['/api/weight-entries', userId],
  });

  // Create weight entry mutation
  const createEntryMutation = useMutation({
    mutationFn: async (entry: InsertWeightEntry) => {
      return await apiRequest('/api/weight-entries', 'POST', entry);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Weight entry added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/weight-entries', userId] });
      resetForm();
      setShowAddForm(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add weight entry. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating entry:', error);
    },
  });

  // Delete weight entry mutation
  const deleteEntryMutation = useMutation({
    mutationFn: async (entryId: number) => {
      return await apiRequest(`/api/weight-entries/${entryId}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Weight entry deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/weight-entries', userId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete weight entry. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting entry:', error);
    },
  });

  const resetForm = () => {
    setWeight("");
    setBodyFatPercentage("");
    setMuscleMass("");
    setNotes("");
  };

  const handleSubmit = () => {
    if (!weight) {
      toast({
        title: "Error",
        description: "Please enter your weight.",
        variant: "destructive",
      });
      return;
    }

    const entryData: InsertWeightEntry = {
      userId,
      weight: weight,
      bodyFatPercentage: bodyFatPercentage || undefined,
      muscleMass: muscleMass || undefined,
      notes: notes || undefined,
    };

    createEntryMutation.mutate(entryData);
  };

  // Calculate stats from real data
  const currentWeight = entries.length > 0 ? parseFloat(entries[0].weight.toString()) : 0;
  const previousWeight = entries.length > 1 ? parseFloat(entries[1].weight.toString()) : currentWeight;
  const weightChange = currentWeight - previousWeight;
  const avgWeight = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + parseFloat(entry.weight.toString()), 0) / entries.length
    : 0;

  const stats = {
    currentWeight: currentWeight.toFixed(1),
    weightChange: weightChange.toFixed(1),
    avgWeight: avgWeight.toFixed(1),
    totalEntries: entries.length,
    trend: weightChange > 0 ? 'up' : weightChange < 0 ? 'down' : 'stable'
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
              ⚖️ Weight Control
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{stats.currentWeight}kg</div>
              <div className="text-[12px]">current</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Scale className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{stats.currentWeight}kg</div>
                <div className="text-[10px] text-[#707070]">Current</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                {stats.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-red-500" />
                ) : stats.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 mx-auto mb-1 text-green-500" />
                ) : (
                  <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                )}
                <div className={`text-[14px] font-bold ${
                  stats.trend === 'up' ? 'text-red-500' : 
                  stats.trend === 'down' ? 'text-green-500' : 'text-[#4a6bda]'
                }`}>
                  {weightChange > 0 ? '+' : ''}{stats.weightChange}kg
                </div>
                <div className="text-[10px] text-[#707070]">Change</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{stats.avgWeight}kg</div>
                <div className="text-[10px] text-[#707070]">Average</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Scale className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{stats.totalEntries}</div>
                <div className="text-[10px] text-[#707070]">Entries</div>
              </div>
            </div>

            {/* Add Entry Button */}
            <div className="mb-4">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full bg-white text-[#4a6bda] hover:bg-white/90 rounded-[15px] py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                {showAddForm ? "Cancel" : "Add Weight Entry"}
              </Button>
            </div>

            {/* Add Entry Form */}
            {showAddForm && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                  ⚖️ Log Weight Entry
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-[#707070] text-[12px]">Weight (kg)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70.5"
                      className="h-10 rounded-[10px] border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Body Fat % (optional)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={bodyFatPercentage}
                        onChange={(e) => setBodyFatPercentage(e.target.value)}
                        placeholder="15.2"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Muscle Mass (kg)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={muscleMass}
                        onChange={(e) => setMuscleMass(e.target.value)}
                        placeholder="45.8"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Notes (optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Morning weight, after workout, feeling..."
                      className="h-20 rounded-[10px] border-gray-200 resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={createEntryMutation.isPending}
                    className="w-full bg-[#4a6bda] hover:bg-[#3a5bc8] text-white rounded-[15px] py-3"
                  >
                    {createEntryMutation.isPending ? "Adding..." : "Add Entry"}
                  </Button>
                </div>
              </div>
            )}

            {/* Recent Entries */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[16px] font-semibold mb-3">Weight History</h2>
              
              {isLoading ? (
                <div className="text-center py-4 text-[#707070]">Loading entries...</div>
              ) : entries.length === 0 ? (
                <div className="text-center py-4 text-[#707070]">
                  No weight entries yet. Add your first entry above!
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.slice(0, 10).map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[16px] font-medium text-[#4a6bda]">
                            {entry.weight}kg
                          </span>
                          {index > 0 && (
                            <span className={`text-[12px] px-2 py-1 rounded-full ${
                              parseFloat(entry.weight.toString()) > parseFloat(entries[index - 1].weight.toString())
                                ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {parseFloat(entry.weight.toString()) > parseFloat(entries[index - 1].weight.toString()) ? '↗️' : '↘️'}
                              {Math.abs(parseFloat(entry.weight.toString()) - parseFloat(entries[index - 1].weight.toString())).toFixed(1)}kg
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#707070]">
                          {new Date(entry.createdAt).toLocaleDateString()}
                          {entry.bodyFatPercentage && ` • ${entry.bodyFatPercentage}% body fat`}
                          {entry.muscleMass && ` • ${entry.muscleMass}kg muscle`}
                        </div>
                        {entry.notes && (
                          <div className="text-[11px] text-[#707070] mt-1 truncate">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => deleteEntryMutation.mutate(entry.id)}
                        disabled={deleteEntryMutation.isPending}
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