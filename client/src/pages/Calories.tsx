import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Calories = (): JSX.Element => {
  const [, setLocation] = useLocation();
  // Data for pagination dots
  const paginationDots = [
    { active: false },
    { active: false },
    { active: false },
    { active: true },
  ];

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

          {/* Main content with curved background */}
          <div className="absolute w-[390px] h-[365px] top-[201px] left-0 bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%]">
            <h1 className="absolute h-24 top-11 left-[127px] font-semibold text-[40px] text-center tracking-[0] leading-normal">
              Control&nbsp;&nbsp;
              <br />
              Calories
            </h1>

            {/* Food icons */}
            <img
              className="absolute w-[100px] h-[100px] top-[200px] left-6"
              alt="French fries"
              src="/figmaAssets/component-2.svg"
            />

            <div className="absolute w-[196px] h-[181px] top-[150px] left-[134px]">
              <img
                className="absolute w-[100px] h-[100px] top-0 left-0"
                alt="Food bowl"
                src="/figmaAssets/component-3.svg"
              />

              <img
                className="absolute w-[100px] h-[100px] top-[81px] left-24"
                alt="Chicken dish"
                src="/figmaAssets/component-4.svg"
              />
            </div>
          </div>

          {/* Pagination dots */}
          <div className="absolute flex gap-8 justify-center w-[114px] h-3 top-[641px] left-[138px]">
            {paginationDots.map((dot, index) => (
              <div
                key={index}
                className={`w-[7px] h-[7px] rounded-full ${dot.active ? "bg-white w-3 h-3 relative" : "bg-black"}`}
              >
                {dot.active && (
                  <div className="absolute left-[3px] top-[3px] bg-white w-[7px] h-[7px] rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="absolute flex flex-col items-center gap-5 bottom-[22px] left-1/2 transform -translate-x-1/2">
            <Button 
              onClick={() => setLocation("/register")}
              className="w-[180px] h-[50px] rounded-[100px] bg-[#70c1e4] hover:bg-[#5fb1d4] text-[#707070] text-[22px] font-medium"
            >
              Create Account
            </Button>

            <Button
              onClick={() => setLocation("/login")}
              variant="outline"
              className="w-[180px] h-[50px] rounded-[100px] bg-white border-[#0679ab] text-[#0679ab] text-[22px] font-medium hover:bg-gray-50"
            >
              Existing User
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
