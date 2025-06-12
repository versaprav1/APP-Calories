import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Account() {
  const [, setLocation] = useLocation();
  const [currentView, setCurrentView] = useState("main"); // main, profile, training, health

  const MainAccountView = () => (
    <div className="px-8 pt-8">
      <div className="space-y-4">
        <Button
          onClick={() => setCurrentView("profile")}
          className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
        >
          Profile
        </Button>
        
        <Button
          onClick={() => setLocation("/data")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Data
        </Button>
        
        <Button
          onClick={() => setLocation("/dashboard-setup")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Dashboard setup
        </Button>
        
        <Button
          onClick={() => setLocation("/add-edit-email")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Add/edit email
        </Button>
        
        <Button
          onClick={() => setLocation("/help")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Help
        </Button>
        
        <Button
          onClick={() => setLocation("/settings")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Settings
        </Button>
        
        <Button
          onClick={() => setLocation("/devices")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Devices
        </Button>
        
        <Button
          onClick={() => setLocation("/reminders")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Reminders
        </Button>
        
        <Button
          onClick={() => setLocation("/faq")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          FAQ
        </Button>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="px-8 pt-8">
      <div className="space-y-4">
        <Button
          onClick={() => setCurrentView("health")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Health Data profile
        </Button>
        
        <Button
          onClick={() => setCurrentView("training")}
          variant="outline"
          className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium hover:bg-[#70c1e4]/10"
        >
          Training profile
        </Button>
        
        <Button
          onClick={() => setLocation("/profile-setup")}
          className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
        >
          Add/edit profile
        </Button>
      </div>
    </div>
  );

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

        {/* Content based on current view */}
        {currentView === "main" && <MainAccountView />}
        {currentView === "profile" && <ProfileView />}

        {/* Back button for sub-views */}
        {currentView !== "main" && (
          <div className="absolute top-20 left-4">
            <Button
              onClick={() => setCurrentView("main")}
              variant="ghost"
              className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
            >
              ← Back
            </Button>
          </div>
        )}

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