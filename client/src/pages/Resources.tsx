import { useLocation } from "wouter";

export default function Resources() {
  const [, setLocation] = useLocation();

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

        {/* Logo */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        {/* Resources Content */}
        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Resources</h1>
          
          <div className="space-y-4">
            <div 
              onClick={() => setLocation("/training-guides")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Training Guides</h3>
                  <p className="text-[14px] text-gray-600">Access workout routines and training plans</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
              </div>
            </div>
            
            <div 
              onClick={() => setLocation("/nutrition-information")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Nutrition Information</h3>
                  <p className="text-[14px] text-gray-600">Learn about healthy eating and meal planning</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
              </div>
            </div>
            
            <div 
              onClick={() => setLocation("/health-articles")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Health Articles</h3>
                  <p className="text-[14px] text-gray-600">Read latest health and wellness tips</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
              </div>
            </div>
            
            <div 
              onClick={() => setLocation("/video-tutorials")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Video Tutorials</h3>
                  <p className="text-[14px] text-gray-600">Watch exercise demonstrations and form guides</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
              </div>
            </div>

            <div 
              onClick={() => setLocation("/meal-plans")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Meal Plans</h3>
                  <p className="text-[14px] text-gray-600">Discover personalized nutrition plans</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
              </div>
            </div>

            <div 
              onClick={() => setLocation("/exercise-library")}
              className="bg-[#f8f9fa] rounded-[20px] p-4 hover:bg-[#e9ecef] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#70c1e4] mb-2">Exercise Library</h3>
                  <p className="text-[14px] text-gray-600">Browse comprehensive exercise database</p>
                </div>
                <div className="text-[#70c1e4]">→</div>
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
                <span className="text-[10px] text-gray-600">Account</span>
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
                <span className="text-[10px] text-[#70c1e4] font-medium">Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}