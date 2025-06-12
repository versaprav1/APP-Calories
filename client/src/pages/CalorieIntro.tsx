import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CalorieIntro() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5977e5] to-[#70c1e4]">
      <div className="max-w-md mx-auto relative">
        <div className="flex justify-between items-center px-4 py-2 text-white">
          <div className="text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-start px-8 mt-12 mb-8">
          <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-white text-[20px]">🌿</div>
          </div>
        </div>

        <div className="px-8 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="bg-white rounded-[40px] p-8 mb-12 w-full max-w-[280px]">
            <div className="text-center">
              <h1 className="text-[32px] font-bold text-gray-800 mb-4 leading-tight">
                Control
                <br />
                Calories
              </h1>
              <div className="flex justify-center space-x-6 mb-6">
                <div className="text-[#5977e5] text-[40px]">🍟</div>
                <div className="text-[#5977e5] text-[40px]">🍲</div>
                <div className="text-[#5977e5] text-[40px]">♿</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>

          <div className="w-full space-y-4">
            <Button
              onClick={() => setLocation("/register")}
              className="w-full h-[50px] rounded-[25px] bg-[#70c1e4] text-white text-[16px] font-medium hover:bg-[#5fb1d4]"
            >
              Create Account
            </Button>

            <Button
              onClick={() => setLocation("/login")}
              className="w-full h-[50px] rounded-[25px] bg-white text-[#70c1e4] text-[16px] font-medium hover:bg-gray-50"
            >
              Existing User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}