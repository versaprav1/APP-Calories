import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function AddEditEmail() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("muster@muster.com");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (email !== confirmEmail) {
      toast({
        title: "Emails don't match",
        description: "Please ensure both email fields match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Email updated successfully",
      description: "Your email has been saved.",
    });
    setIsEditing(false);
  };

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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Email Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Current Email</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[14px] text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-center text-[16px]"
                  />
                </div>
                
                {isEditing && (
                  <div>
                    <label className="block text-[14px] text-gray-700 mb-2">Confirm Email Address</label>
                    <Input
                      type="email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="Re-enter your email"
                      className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-center text-[16px]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-6">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Email Preferences</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="notifications" className="mr-3" defaultChecked />
                  <label htmlFor="notifications" className="text-[14px] text-gray-700">
                    Receive workout notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="updates" className="mr-3" defaultChecked />
                  <label htmlFor="updates" className="text-[14px] text-gray-700">
                    Receive app updates
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="marketing" className="mr-3" />
                  <label htmlFor="marketing" className="text-[14px] text-gray-700">
                    Receive promotional emails
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
                >
                  Edit Email
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleSave}
                    className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
                  >
                    Save Changes
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setConfirmEmail("");
                    }}
                    variant="outline"
                    className="w-full h-[50px] rounded-[25px] border-[#70c1e4] text-[#70c1e4] text-[16px] font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              )}
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