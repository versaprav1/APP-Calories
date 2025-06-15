import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Target, Trophy, Clock, Plus, Trash2, Users, Zap } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { BadmintonSession, InsertBadmintonSession } from "@shared/schema";

export default function Badminton() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [duration, setDuration] = useState("");
  const [opponent, setOpponent] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [set1Score, setSet1Score] = useState("");
  const [set2Score, setSet2Score] = useState("");
  const [set3Score, setSet3Score] = useState("");
  const [skillsFocused, setSkillsFocused] = useState<string[]>([]);
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const userId = 1; // Using demo user ID

  // Fetch badminton sessions
  const { data: sessions = [], isLoading } = useQuery<BadmintonSession[]>({
    queryKey: ['/api/badminton-sessions', userId],
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (session: InsertBadmintonSession) => {
      return await apiRequest('/api/badminton-sessions', 'POST', session);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Badminton session added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/badminton-sessions', userId] });
      resetForm();
      setShowAddForm(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add badminton session. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating session:', error);
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      return await apiRequest(`/api/badminton-sessions/${sessionId}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Badminton session deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/badminton-sessions', userId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete badminton session. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting session:', error);
    },
  });

  const resetForm = () => {
    setDuration("");
    setOpponent("");
    setMatchResult("");
    setSet1Score("");
    setSet2Score("");
    setSet3Score("");
    setSkillsFocused([]);
    setCalories("");
    setNotes("");
  };

  const handleSubmit = () => {
    if (!duration) {
      toast({
        title: "Error",
        description: "Please fill in the duration field.",
        variant: "destructive",
      });
      return;
    }

    const sets = [];
    if (set1Score) sets.push(set1Score);
    if (set2Score) sets.push(set2Score);
    if (set3Score) sets.push(set3Score);

    const sessionData: InsertBadmintonSession = {
      userId,
      duration: parseInt(duration),
      opponent: opponent || undefined,
      matchResult: matchResult || undefined,
      sets: sets.length > 0 ? JSON.stringify(sets) : undefined,
      skillsFocused: skillsFocused.length > 0 ? skillsFocused : undefined,
      calories: calories ? parseInt(calories) : undefined,
      notes: notes || undefined,
    };

    createSessionMutation.mutate(sessionData);
  };

  const toggleSkill = (skill: string) => {
    setSkillsFocused(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const skillOptions = [
    "Smash", "Drop Shot", "Clear", "Drive", "Net Play", "Footwork", "Defense", "Service"
  ];

  // Calculate stats from real data
  const weeklyStats = {
    totalSessions: sessions.length,
    totalTime: Math.round(sessions.reduce((sum, session) => sum + session.duration, 0)),
    wins: sessions.filter(s => s.matchResult === 'win').length,
    losses: sessions.filter(s => s.matchResult === 'loss').length,
    totalCalories: sessions.reduce((sum, session) => sum + (session.calories || 0), 0)
  };

  const winRate = weeklyStats.totalSessions > 0 
    ? Math.round((weeklyStats.wins / (weeklyStats.wins + weeklyStats.losses)) * 100) || 0
    : 0;

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#b8d4f0] to-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-[140px] bg-[#b8d4f0] rounded-t-[25px]">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-[60px] text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h1 className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-white text-[24px] font-semibold flex items-center gap-2">
              🏸 Badminton
            </h1>
            
            <div className="absolute right-4 top-[50px] text-white text-center">
              <div className="text-[18px] font-bold">{winRate}%</div>
              <div className="text-[12px]">win rate</div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-[150px] left-0 w-full px-4 pb-4" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalSessions}</div>
                <div className="text-[10px] text-[#707070]">Matches</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Trophy className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.wins}</div>
                <div className="text-[10px] text-[#707070]">Wins</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalTime}m</div>
                <div className="text-[10px] text-[#707070]">Time</div>
              </div>
              <div className="bg-white/90 rounded-[12px] p-2 text-center">
                <Zap className="h-4 w-4 mx-auto mb-1 text-[#4a6bda]" />
                <div className="text-[14px] font-bold text-[#4a6bda]">{weeklyStats.totalCalories}</div>
                <div className="text-[10px] text-[#707070]">Calories</div>
              </div>
            </div>

            {/* Add Session Button */}
            <div className="mb-4">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full bg-white text-[#4a6bda] hover:bg-white/90 rounded-[15px] py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                {showAddForm ? "Cancel" : "Add Badminton Session"}
              </Button>
            </div>

            {/* Add Session Form */}
            {showAddForm && (
              <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                <h2 className="text-[#4a6bda] text-[18px] font-semibold mb-4 flex items-center gap-2">
                  🏸 Log Badminton Session
                </h2>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#707070] text-[12px]">Duration (min)</Label>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="60"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                    <div>
                      <Label className="text-[#707070] text-[12px]">Opponent</Label>
                      <Input
                        value={opponent}
                        onChange={(e) => setOpponent(e.target.value)}
                        placeholder="John Doe"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Match Result</Label>
                    <Select value={matchResult} onValueChange={setMatchResult}>
                      <SelectTrigger className="h-10 rounded-[10px] border-gray-200">
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="win">🏆 Win</SelectItem>
                        <SelectItem value="loss">😔 Loss</SelectItem>
                        <SelectItem value="draw">🤝 Draw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Set Scores (optional)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        value={set1Score}
                        onChange={(e) => setSet1Score(e.target.value)}
                        placeholder="21-15"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                      <Input
                        value={set2Score}
                        onChange={(e) => setSet2Score(e.target.value)}
                        placeholder="18-21"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                      <Input
                        value={set3Score}
                        onChange={(e) => setSet3Score(e.target.value)}
                        placeholder="21-19"
                        className="h-10 rounded-[10px] border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Skills Focused (optional)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {skillOptions.map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant={skillsFocused.includes(skill) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSkill(skill)}
                          className="h-8 text-xs"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Calories (optional)</Label>
                    <Input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="400"
                      className="h-10 rounded-[10px] border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="text-[#707070] text-[12px]">Notes (optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Match highlights, areas to improve, strategy notes..."
                      className="h-20 rounded-[10px] border-gray-200 resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={createSessionMutation.isPending}
                    className="w-full bg-[#4a6bda] hover:bg-[#3a5bc8] text-white rounded-[15px] py-3"
                  >
                    {createSessionMutation.isPending ? "Adding..." : "Add Session"}
                  </Button>
                </div>
              </div>
            )}

            {/* Recent Sessions */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm">
              <h2 className="text-[#4a6bda] text-[16px] font-semibold mb-3">Recent Matches</h2>
              
              {isLoading ? (
                <div className="text-center py-4 text-[#707070]">Loading sessions...</div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-4 text-[#707070]">
                  No badminton sessions yet. Add your first match above!
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.slice(0, 5).map((session) => {
                    const sets = session.sets ? JSON.parse(session.sets) : [];
                    const skills = session.skillsFocused || [];
                    
                    return (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[14px] font-medium text-[#4a6bda]">
                              {session.duration}min
                            </span>
                            {session.matchResult && (
                              <span className={`text-[12px] px-2 py-1 rounded-full ${
                                session.matchResult === 'win' ? 'bg-green-100 text-green-700' :
                                session.matchResult === 'loss' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {session.matchResult === 'win' ? '🏆 Win' :
                                 session.matchResult === 'loss' ? '😔 Loss' : '🤝 Draw'}
                              </span>
                            )}
                          </div>
                          <div className="text-[12px] text-[#707070]">
                            {new Date(session.createdAt).toLocaleDateString()}
                            {session.opponent && ` • vs ${session.opponent}`}
                            {session.calories && ` • ${session.calories} cal`}
                          </div>
                          {sets.length > 0 && (
                            <div className="text-[11px] text-[#707070] mt-1">
                              Sets: {sets.join(', ')}
                            </div>
                          )}
                          {skills.length > 0 && (
                            <div className="text-[11px] text-[#707070] mt-1">
                              Focus: {skills.join(', ')}
                            </div>
                          )}
                          {session.notes && (
                            <div className="text-[11px] text-[#707070] mt-1 truncate">
                              {session.notes}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => deleteSessionMutation.mutate(session.id)}
                          disabled={deleteSessionMutation.isPending}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}