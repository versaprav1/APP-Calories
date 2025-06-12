import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div className="absolute w-full h-full bg-[#4a6bda] rounded-[25px] overflow-hidden">
          {/* Logo */}
          <img
            className="absolute w-[78px] h-[78px] top-[51px] left-4"
            alt="Logo"
            src="/figmaAssets/group-15.svg"
          />

          {/* Status bar */}
          <div className="flex w-[84px] h-6 items-center justify-center absolute top-2.5 right-4">
            <img
              className="relative flex-[0_0_auto]"
              alt="Battery signal wifi"
              src="/figmaAssets/battery-signal-wifi-icon.svg"
            />
          </div>

          {/* Time */}
          <div className="absolute w-[90px] h-[30px] top-1 left-0">
            <div className="relative h-[30px]">
              <div className="absolute w-[90px] h-[30px] -top-px left-0 font-normal text-[10.5px] text-center tracking-[0] leading-normal">
                19:09
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="absolute w-[350px] top-[200px] left-5">
            <h1 className="text-white text-[32px] font-semibold text-center mb-8">
              Welcome to Your Dashboard
            </h1>
            
            <div className="bg-white/10 rounded-[25px] p-6 mb-6">
              <h2 className="text-white text-[24px] font-medium mb-4">
                Calorie Control Features
              </h2>
              <p className="text-white/80 text-[16px] leading-relaxed">
                Track your daily calorie intake, monitor your nutrition goals, and maintain a healthy lifestyle with our comprehensive calorie management system.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-8">
              <Button
                onClick={() => setLocation("/calories")}
                className="w-[200px] h-[50px] rounded-[100px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-[#707070] text-[18px] font-medium"
              >
                Start Tracking
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="w-[200px] h-[50px] rounded-[100px] bg-white border-[#0679ab] text-[#0679ab] text-[18px] font-medium hover:bg-gray-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}