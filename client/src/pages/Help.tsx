import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Help() {
  const [, setLocation] = useLocation();

  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using the app",
      icon: "🚀"
    },
    {
      title: "Tracking Activities",
      description: "How to log and monitor your workouts",
      icon: "📊"
    },
    {
      title: "Setting Goals",
      description: "Create and manage your fitness objectives",
      icon: "🎯"
    },
    {
      title: "Nutrition Tracking",
      description: "Monitor your daily nutrition intake",
      icon: "🥗"
    },
    {
      title: "Data Sync",
      description: "Sync data across devices",
      icon: "🔄"
    },
    {
      title: "Troubleshooting",
      description: "Common issues and solutions",
      icon: "🔧"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative pb-20">
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <Button
            onClick={() => setLocation("/account")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Help Center</h1>
          
          <div className="space-y-4">
            {helpTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-[24px]">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-medium text-[#70c1e4] mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-[14px] text-gray-600">
                      {topic.description}
                    </p>
                  </div>
                  <div className="text-[#70c1e4]">→</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-[#f8f9fa] rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Contact Support</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                >
                  📧 Email Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                >
                  💬 Live Chat
                </Button>
              </div>
            </div>
          </div>
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
                <span className="text-[10px] text-gray-600">Home</span>
              </button>
              
              <button 
                onClick={() => setLocation("/account")}
                className="flex flex-col items-center py-2 px-4"
              >
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Account</span>
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