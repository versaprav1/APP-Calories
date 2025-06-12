import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Data() {
  const [, setLocation] = useLocation();

  const dataCategories = [
    {
      title: "Workout Data",
      description: "Swimming, cycling, running, and badminton activities",
      icon: "🏃",
      entries: "248 entries"
    },
    {
      title: "Nutrition Data",
      description: "Food intake, calories, and macro tracking",
      icon: "🍎",
      entries: "156 entries"
    },
    {
      title: "Health Metrics",
      description: "Weight, body composition, and vital signs",
      icon: "📊",
      entries: "89 entries"
    },
    {
      title: "Sleep Data",
      description: "Sleep duration and quality tracking",
      icon: "💤",
      entries: "72 entries"
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Your Data</h1>
          
          <div className="space-y-4">
            {dataCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-[24px]">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-medium text-[#70c1e4] mb-1">
                      {category.title}
                    </h3>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {category.description}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {category.entries}
                    </p>
                  </div>
                  <div className="text-[#70c1e4]">→</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-[#f8f9fa] rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Data Management</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                >
                  📤 Export Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                >
                  📥 Import Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                >
                  ☁️ Backup to Cloud
                </Button>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Storage Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-700">Used Storage</span>
                  <span className="text-[#70c1e4] font-medium">2.4 GB</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-700">Available</span>
                  <span className="text-[#70c1e4] font-medium">7.6 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-[#70c1e4] h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-red-500 text-red-500 text-[14px] font-medium"
                >
                  🗑️ Clear All Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-[45px] rounded-[22px] border-red-500 text-red-500 text-[14px] font-medium"
                >
                  ❌ Delete Account
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