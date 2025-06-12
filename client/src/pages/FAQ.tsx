import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function FAQ() {
  const [, setLocation] = useLocation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I track my workouts?",
      answer: "Navigate to the activity section and select the sport you want to track. You can log details like duration, distance, and intensity for each workout session."
    },
    {
      id: 2,
      question: "Can I sync data with other fitness apps?",
      answer: "Yes, you can connect various fitness devices and apps through the Devices section in your account settings. We support popular platforms like Apple Health, Google Fit, and Fitbit."
    },
    {
      id: 3,
      question: "How do I set up nutrition goals?",
      answer: "Go to the nutrition section and set your daily calorie and macro targets. You can customize these based on your fitness goals and dietary preferences."
    },
    {
      id: 4,
      question: "What if I forget to log my activities?",
      answer: "You can set up reminders in the Reminders section to get notifications for workouts, meals, and hydration. You can also manually add past activities anytime."
    },
    {
      id: 5,
      question: "How do I change my profile information?",
      answer: "Access your profile through Account > Profile > Add/edit profile. You can update personal details, fitness goals, and preferences there."
    },
    {
      id: 6,
      question: "Is my data secure and private?",
      answer: "Yes, we use industry-standard encryption to protect your data. You can review and adjust your privacy settings in the Settings section."
    },
    {
      id: 7,
      question: "How do I reset my password?",
      answer: "Use the 'Forgot Password' link on the login screen, or contact support through the Help section if you need additional assistance."
    },
    {
      id: 8,
      question: "Can I export my fitness data?",
      answer: "Yes, you can export your data through the Data section in your account. We support various formats including CSV and PDF reports."
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">FAQ</h1>
          
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-[#f8f9fa] rounded-[20px] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-[#e9ecef] transition-colors"
                >
                  <span className="text-[14px] font-medium text-[#70c1e4] pr-4">
                    {faq.question}
                  </span>
                  <span className="text-[#70c1e4] text-[18px] font-bold">
                    {expandedFaq === faq.id ? '−' : '+'}
                  </span>
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#f8f9fa] rounded-[20px] p-6">
            <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4 text-center">
              Still need help?
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
                onClick={() => setLocation("/help")}
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="w-full h-[45px] rounded-[22px] border-[#70c1e4] text-[#70c1e4] text-[14px] font-medium"
              >
                Send Feedback
              </Button>
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