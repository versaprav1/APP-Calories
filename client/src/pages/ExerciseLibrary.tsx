import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ExerciseLibrary() {
  const [, setLocation] = useLocation();

  const exerciseCategories = [
    {
      category: "Swimming",
      exercises: [
        { name: "Freestyle", muscle: "Full Body", difficulty: "Beginner", equipment: "Pool", calories: "400-600/hr" },
        { name: "Backstroke", muscle: "Back, Arms", difficulty: "Intermediate", equipment: "Pool", calories: "300-500/hr" },
        { name: "Butterfly", muscle: "Core, Shoulders", difficulty: "Advanced", equipment: "Pool", calories: "500-700/hr" },
        { name: "Breaststroke", muscle: "Chest, Legs", difficulty: "Beginner", equipment: "Pool", calories: "350-550/hr" }
      ]
    },
    {
      category: "Running",
      exercises: [
        { name: "Easy Run", muscle: "Legs, Cardio", difficulty: "Beginner", equipment: "None", calories: "300-500/hr" },
        { name: "Interval Training", muscle: "Full Body", difficulty: "Advanced", equipment: "Track", calories: "500-800/hr" },
        { name: "Hill Repeats", muscle: "Legs, Glutes", difficulty: "Intermediate", equipment: "Hills", calories: "400-600/hr" },
        { name: "Tempo Run", muscle: "Cardio", difficulty: "Intermediate", equipment: "None", calories: "400-650/hr" }
      ]
    },
    {
      category: "Cycling",
      exercises: [
        { name: "Endurance Ride", muscle: "Legs, Cardio", difficulty: "Beginner", equipment: "Bike", calories: "300-500/hr" },
        { name: "Sprint Intervals", muscle: "Legs, Core", difficulty: "Advanced", equipment: "Bike", calories: "500-700/hr" },
        { name: "Hill Climbing", muscle: "Legs, Glutes", difficulty: "Intermediate", equipment: "Bike", calories: "400-600/hr" },
        { name: "Recovery Ride", muscle: "Legs", difficulty: "Beginner", equipment: "Bike", calories: "200-350/hr" }
      ]
    },
    {
      category: "Strength Training",
      exercises: [
        { name: "Squats", muscle: "Legs, Glutes", difficulty: "Beginner", equipment: "Bodyweight", calories: "200-300/hr" },
        { name: "Deadlifts", muscle: "Back, Legs", difficulty: "Intermediate", equipment: "Barbell", calories: "250-400/hr" },
        { name: "Pull-ups", muscle: "Back, Arms", difficulty: "Intermediate", equipment: "Pull-up Bar", calories: "300-450/hr" },
        { name: "Planks", muscle: "Core", difficulty: "Beginner", equipment: "None", calories: "150-250/hr" }
      ]
    },
    {
      category: "Badminton",
      exercises: [
        { name: "Singles Match", muscle: "Full Body", difficulty: "Intermediate", equipment: "Racket, Court", calories: "350-550/hr" },
        { name: "Doubles Match", muscle: "Full Body", difficulty: "Beginner", equipment: "Racket, Court", calories: "250-400/hr" },
        { name: "Footwork Drills", muscle: "Legs, Agility", difficulty: "Intermediate", equipment: "Court", calories: "300-450/hr" },
        { name: "Smash Practice", muscle: "Arms, Core", difficulty: "Advanced", equipment: "Racket, Court", calories: "400-600/hr" }
      ]
    }
  ];

  const workoutTemplates = [
    {
      name: "Full Body Circuit",
      duration: "45 min",
      exercises: ["Squats", "Push-ups", "Planks", "Burpees"],
      difficulty: "Intermediate"
    },
    {
      name: "Cardio Blast",
      duration: "30 min",
      exercises: ["Running", "Jump Rope", "Mountain Climbers", "High Knees"],
      difficulty: "Advanced"
    },
    {
      name: "Recovery Session",
      duration: "20 min",
      exercises: ["Light Stretching", "Foam Rolling", "Walking", "Breathing"],
      difficulty: "Beginner"
    }
  ];

  const muscleGroups = ["Full Body", "Legs", "Arms", "Core", "Back", "Chest", "Shoulders"];
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600";
      case "Intermediate": return "text-yellow-600";
      case "Advanced": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative pb-20">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center px-4 py-4">
          <Button
            onClick={() => setLocation("/resources")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">💪</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Exercise Library</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Quick Filters</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {muscleGroups.slice(0, 4).map((muscle, index) => (
                  <span 
                    key={index} 
                    className="text-[11px] bg-white border border-[#70c1e4] text-[#70c1e4] px-2 py-1 rounded-full cursor-pointer hover:bg-[#70c1e4] hover:text-white transition-colors"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map((level, index) => (
                  <span 
                    key={index} 
                    className="text-[11px] bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded-full cursor-pointer hover:border-[#70c1e4] hover:text-[#70c1e4] transition-colors"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            {exerciseCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="bg-white rounded-[12px] p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-[14px] font-medium text-gray-800">{exercise.name}</h4>
                        <span className={`text-[11px] font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 mb-2">
                        <div><strong>Target:</strong> {exercise.muscle}</div>
                        <div><strong>Equipment:</strong> {exercise.equipment}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-[#70c1e4] font-medium">{exercise.calories}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-[24px] rounded-[12px] border-[#70c1e4] text-[#70c1e4] text-[10px] px-2"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Workout Templates</h3>
              <div className="space-y-3">
                {workoutTemplates.map((template, index) => (
                  <div key={index} className="bg-white rounded-[12px] p-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[14px] font-medium text-gray-800">{template.name}</h4>
                      <span className="text-[11px] text-[#70c1e4] font-medium">{template.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {template.exercises.map((exercise, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {exercise}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-[11px] font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                      <Button
                        size="sm"
                        className="h-[24px] rounded-[12px] bg-[#70c1e4] text-white text-[10px] px-2"
                      >
                        Start Workout
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Library Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🔍 Advanced Search
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  ⭐ Favorites
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📋 Create Workout
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📱 Exercise Timer
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around py-2">
              <button onClick={() => setLocation("/dashboard")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">🏠</div>
                <span className="text-[10px] text-gray-600">Home</span>
              </button>
              <button onClick={() => setLocation("/account")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-gray-600">Account</span>
              </button>
              <button onClick={() => setLocation("/activity")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📊</div>
                <span className="text-[10px] text-gray-600">Activity</span>
              </button>
              <button onClick={() => setLocation("/resources")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📚</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}