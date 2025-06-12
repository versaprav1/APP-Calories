import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export default function ProfileSetup() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Muster", 
    birthDate: "13.04.2000",
    gender: "Male",
    mobile: "4875968639",
    email: "muster@muster.com",
    macros: "Macros",
    running: "Running",
    swimming: "Swimming",
    cycling: "Cycling"
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const steps = [
    {
      title: "Profile Setup",
      subtitle: "Step 1 of 4",
      fields: ["firstName", "lastName", "birthDate", "gender", "mobile", "email", "macros", "running", "swimming", "cycling"]
    }
  ];

  const fieldLabels: Record<string, string> = {
    firstName: "John",
    lastName: "Muster",
    birthDate: "13.04.2000", 
    gender: "Male",
    mobile: "Mobile number",
    email: "Email",
    macros: "Macros",
    running: "Running",
    swimming: "Swimming",
    cycling: "Cycling"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInput = (field: string) => {
    const isActive = activeField === field;
    const isGender = field === "gender";
    const isMobile = field === "mobile";
    const isEmail = field === "email";
    
    return (
      <div key={field} className="mb-4">
        <div 
          className={`w-full h-[50px] rounded-[25px] border-2 transition-all duration-200 ${
            isActive 
              ? 'bg-[#70c1e4] border-[#70c1e4]' 
              : 'bg-white border-[#70c1e4]'
          }`}
        >
          <Input
            type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
            value={formData[field as keyof typeof formData]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onFocus={() => setActiveField(field)}
            onBlur={() => setActiveField(null)}
            placeholder={fieldLabels[field]}
            className={`w-full h-full border-0 rounded-[25px] text-center text-[16px] font-medium transition-all duration-200 ${
              isActive 
                ? 'text-white placeholder:text-white/80 bg-transparent' 
                : 'text-[#70c1e4] placeholder:text-[#70c1e4] bg-transparent'
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative">
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

        {/* Form */}
        <div className="px-8">
          {steps[currentStep].fields.map(field => renderInput(field))}

          {/* Save Button */}
          <div className="flex justify-center mt-8 mb-8">
            <Button
              onClick={() => setLocation("/account")}
              className="w-[120px] h-[40px] rounded-[20px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-white text-[16px] font-medium"
            >
              Save
            </Button>
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