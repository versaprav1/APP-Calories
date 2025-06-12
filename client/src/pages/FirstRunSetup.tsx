import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function FirstRunSetup() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    motivation: "",
    eatingHabits: "",
    dietType: "",
    monitoring: ""
  });

  const questions = [
    {
      id: "motivation",
      title: "Q1: What is your Motivation?",
      options: ["Weight loss", "Weight gain", "Sleep Better", "Write your response"]
    },
    {
      id: "eatingHabits", 
      title: "Q2: What are your eating Habits?",
      options: ["I eat Healthy", "I am an emotional eater", "I eat as i like", "I like to eat Healthy"]
    },
    {
      id: "dietType",
      title: "Q3: What is your diet usually?",
      options: ["Vegetarian", "Classic meat eater", "Mixed diet", "Random"]
    },
    {
      id: "monitoring",
      title: "Q4: Do you like to monitor and log your diet and have control?",
      options: ["Yes", "No", "I will try", "Don't know"]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({ ...prev, [questionId]: answer }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setLocation("/workout-setup");
    }
  };

  const currentQuestion = questions[step - 1];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">🌿</div>
          </div>
        </div>

        <div className="px-8 mt-16">
          <div className="bg-[#5977e5] rounded-[30px] p-8 text-center min-h-[400px] flex flex-col justify-center">
            <h2 className="text-white text-[20px] font-medium mb-8 leading-relaxed">
              {currentQuestion.title}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className="w-full h-[50px] rounded-[25px] bg-white text-[#70c1e4] text-[16px] font-medium hover:bg-gray-50"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 === step ? "bg-[#70c1e4]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}