import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function TrainingGuides() {
  const [, setLocation] = useLocation();

  const trainingCategories = [
    {
      title: "Beginner Programs",
      guides: [
        { name: "Start Running", duration: "4 weeks", difficulty: "Beginner", icon: "🏃" },
        { name: "Learn to Swim", duration: "6 weeks", difficulty: "Beginner", icon: "🏊" },
        { name: "Basic Cycling", duration: "3 weeks", difficulty: "Beginner", icon: "🚴" }
      ]
    },
    {
      title: "Intermediate Training",
      guides: [
        { name: "5K Training Plan", duration: "8 weeks", difficulty: "Intermediate", icon: "🏃" },
        { name: "Sprint Swimming", duration: "6 weeks", difficulty: "Intermediate", icon: "🏊" },
        { name: "Hill Cycling", duration: "5 weeks", difficulty: "Intermediate", icon: "🚴" }
      ]
    },
    {
      title: "Advanced Programs",
      guides: [
        { name: "Marathon Prep", duration: "16 weeks", difficulty: "Advanced", icon: "🏃" },
        { name: "Open Water Swimming", duration: "10 weeks", difficulty: "Advanced", icon: "🏊" },
        { name: "Century Ride", duration: "12 weeks", difficulty: "Advanced", icon: "🚴" }
      ]
    }
  ];

  const featuredGuides = [
    {
      title: "Triathlon Training Plan",
      description: "Complete 12-week program for your first triathlon",
      duration: "12 weeks",
      activities: ["Swimming", "Cycling", "Running"],
      featured: true
    },
    {
      title: "Weight Loss Program",
      description: "Effective combination of cardio and strength training",
      duration: "8 weeks",
      activities: ["Running", "Strength", "Badminton"],
      featured: true
    }
  ];

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
            <div className="text-white text-[24px]">📚</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Training Guides</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Featured Programs</h3>
              <div className="space-y-3">
                {featuredGuides.map((guide, index) => (
                  <div key={index} className="bg-white rounded-[15px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[15px] font-medium text-gray-800">{guide.title}</h4>
                      <span className="text-[12px] bg-[#70c1e4] text-white px-2 py-1 rounded-full">Featured</span>
                    </div>
                    <p className="text-[13px] text-gray-600 mb-3">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {guide.activities.map((activity, idx) => (
                          <span key={idx} className="text-[11px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {activity}
                          </span>
                        ))}
                      </div>
                      <span className="text-[12px] text-[#70c1e4] font-medium">{guide.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {trainingCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">{category.title}</h3>
                <div className="space-y-3">
                  {category.guides.map((guide, guideIndex) => (
                    <div key={guideIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-[20px]">{guide.icon}</div>
                        <div>
                          <div className="text-[14px] font-medium text-gray-700">{guide.name}</div>
                          <div className="text-[12px] text-gray-500">{guide.duration} • {guide.difficulty}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-[28px] rounded-[14px] border-[#70c1e4] text-[#70c1e4] text-[11px] px-3"
                      >
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📝 Create Plan
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📊 Track Progress
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