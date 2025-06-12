import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Badminton() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a6bda] via-[#70c1e4] to-[#8fd4e8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-transparent border-none shadow-none overflow-hidden">
        <div className="relative h-[600px] bg-gradient-to-br from-[#4a6bda] via-[#70c1e4] to-[#8fd4e8] rounded-[25px] shadow-2xl">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setLocation("/dashboard")}
                className="w-[40px] h-[40px] rounded-full bg-white/20 p-0 hover:bg-white/30"
              >
                <span className="text-white text-[20px]">←</span>
              </Button>
              <h1 className="text-white text-[20px] font-semibold">Badminton</h1>
              <div className="w-[40px]"></div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute w-full top-[100px] px-6">
            <div className="text-center mb-8">
              <div className="w-[80px] h-[80px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[40px]">🏸</span>
              </div>
              <h2 className="text-white text-[24px] font-semibold mb-2">Badminton Training</h2>
              <p className="text-white/80 text-[14px]">Track your badminton matches and improve your skills</p>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4 mb-8">
              <div className="bg-white/90 rounded-[20px] p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#4a6bda] text-[16px] font-semibold">Matches Played</h3>
                    <p className="text-[#707070] text-[12px]">This week</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#4a6bda] text-[24px] font-bold">8</div>
                    <div className="text-[#707070] text-[10px]">matches</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 rounded-[20px] p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#4a6bda] text-[16px] font-semibold">Win Rate</h3>
                    <p className="text-[#707070] text-[12px]">Overall performance</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#4a6bda] text-[24px] font-bold">75%</div>
                    <div className="text-[#707070] text-[10px]">win rate</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 rounded-[20px] p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#4a6bda] text-[16px] font-semibold">Training Hours</h3>
                    <p className="text-[#707070] text-[12px]">This month</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#4a6bda] text-[24px] font-bold">24</div>
                    <div className="text-[#707070] text-[10px]">hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-[50px] rounded-[25px] bg-white/90 text-[#4a6bda] text-[16px] font-semibold hover:bg-white shadow-lg"
              >
                Start Training Session
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-[50px] rounded-[25px] bg-white/10 border-white/30 text-white text-[16px] font-semibold hover:bg-white/20"
              >
                View Match History
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}