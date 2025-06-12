import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to\nHealthy Living",
      subtitle: "Start your journey to better health with our comprehensive nutrition tracking app",
      image: "/figmaAssets/component-2.svg",
      primaryColor: "#4a6bda",
    },
    {
      title: "Track Your\nDaily Nutrition",
      subtitle: "Monitor calories, macros, and nutrients to reach your health goals effectively",
      image: "/figmaAssets/component-3.svg",
      primaryColor: "#5a7aec",
    },
    {
      title: "Achieve Your\nFitness Goals",
      subtitle: "Set personalized targets and get insights to maintain a balanced lifestyle",
      image: "/figmaAssets/component-4.svg",
      primaryColor: "#6a8afc",
    },
    {
      title: "Control\nCalories",
      subtitle: "Take charge of your health with smart calorie management and meal planning",
      image: "/figmaAssets/component-2.svg",
      primaryColor: "#4a6bda",
      isLastSlide: true,
    }
  ];

  const currentSlideData = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex justify-center w-full bg-transparent">
      <Card className="relative w-[390px] h-[844px] rounded-[25px] overflow-hidden border-none">
        <div 
          className="absolute w-full h-full rounded-[25px] overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: currentSlideData.primaryColor }}
        >
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
              <div className="absolute w-[90px] h-[30px] -top-px left-0 font-normal text-[10.5px] text-center tracking-[0] leading-normal text-white">
                19:09
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          {currentSlide > 0 && (
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {currentSlide < slides.length - 1 && (
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Main content with curved background - only on last slide */}
          {currentSlideData.isLastSlide ? (
            <div className="absolute w-[390px] h-[365px] top-[201px] left-0 bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%]">
              <h1 className="absolute h-24 top-11 left-[127px] font-semibold text-[40px] text-center tracking-[0] leading-normal text-black">
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
          ) : (
            /* Regular slide content */
            <div className="absolute w-full top-[180px] px-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-[200px] h-[200px] mb-8 flex items-center justify-center">
                  <img
                    className="w-[150px] h-[150px] object-contain"
                    alt="Slide illustration"
                    src={currentSlideData.image}
                  />
                </div>
                
                <h1 className="text-white text-[36px] font-semibold leading-tight mb-6">
                  {currentSlideData.title.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < currentSlideData.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                
                <p className="text-white/90 text-[18px] leading-relaxed max-w-[300px]">
                  {currentSlideData.subtitle}
                </p>
              </div>
            </div>
          )}

          {/* Pagination dots */}
          <div className="absolute flex gap-8 justify-center w-[114px] h-3 top-[641px] left-[138px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-white w-3 h-3" 
                    : "bg-black/40 w-[7px] h-[7px] hover:bg-black/60"
                }`}
              />
            ))}
          </div>

          {/* Buttons - only show on last slide */}
          {currentSlideData.isLastSlide && (
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
          )}

          {/* Skip button for non-last slides */}
          {!currentSlideData.isLastSlide && (
            <div className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2">
              <Button
                onClick={() => setCurrentSlide(slides.length - 1)}
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 text-[16px]"
              >
                Skip
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}