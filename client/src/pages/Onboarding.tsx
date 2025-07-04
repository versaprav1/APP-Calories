import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  Activity, 
  Target, 
  TrendingUp, 
  Smartphone,
  Waves,
  Bike,
  Zap,
  Trophy,
  BarChart3,
  Scale,
  Flame,
  Award
} from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate-fade-in");

  const slides = [
    {
      title: "Welcome to Your\nTriathlon Journey",
      subtitle: "The complete fitness tracking solution for swimmers, cyclists, runners, and athletes who demand more from their training.",
      icon: Activity,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      features: ["Multi-sport tracking", "Real-time analytics", "Goal achievement"],
      bgPattern: "🏊‍♂️🚴‍♂️🏃‍♂️"
    },
    {
      title: "Track Every\nStroke & Step",
      subtitle: "Log swimming sessions, cycling rides, running workouts, and badminton matches with detailed performance metrics and progress insights.",
      icon: Waves,
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      features: ["Swimming metrics", "Cycling performance", "Running pace", "Match scoring"],
      bgPattern: "💧🚴‍♀️⚡🏸"
    },
    {
      title: "Visualize Your\nProgress",
      subtitle: "Advanced analytics dashboard with personalized insights, trend analysis, and performance visualization to optimize your training.",
      icon: BarChart3,
      gradient: "from-green-400 via-blue-500 to-purple-600",
      features: ["Performance analytics", "Progress tracking", "Goal monitoring"],
      bgPattern: "📊📈🎯⭐"
    },
    {
      title: "Complete Health\nManagement",
      subtitle: "Monitor weight, track nutrition, and manage your complete fitness journey with professional-grade tools and mobile access.",
      icon: Target,
      gradient: "from-orange-400 via-red-500 to-pink-600",
      features: ["Weight tracking", "Nutrition logging", "Mobile sync"],
      bgPattern: "⚖️🍎📱💪",
      isLastSlide: true
    }
  ];

  const currentSlideData = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setAnimationClass("animate-slide-out");
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setAnimationClass("animate-slide-in");
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setAnimationClass("animate-slide-out");
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setAnimationClass("animate-slide-in");
      }, 300);
    }
  };

  const handleGetStarted = () => {
    setLocation("/register");
  };

  const handleSkip = () => {
    setLocation("/login");
  };

  useEffect(() => {
    setAnimationClass("animate-fade-in");
  }, [currentSlide]);

  return (
    <div className="flex justify-center w-full bg-transparent min-h-screen">
      <Card className="relative w-[390px] min-h-[844px] rounded-[25px] overflow-hidden border-none">
        
        {/* Dynamic Background */}
        <div className={`absolute w-full h-full bg-gradient-to-br ${currentSlideData.gradient} transition-all duration-700`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 text-8xl opacity-5 animate-float">
              {currentSlideData.bgPattern}
            </div>
            <div className="absolute top-1/3 -left-10 text-6xl opacity-10 animate-float-delayed">
              {currentSlideData.bgPattern}
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-5xl opacity-5 animate-bounce-slow">
              {currentSlideData.bgPattern}
            </div>
          </div>

          {/* Header */}
          <div className="relative px-6 pt-12 pb-6 z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-8 bg-white' 
                        : index < currentSlide 
                          ? 'w-2 bg-white/80' 
                          : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="text-white hover:bg-white/20 text-sm font-medium"
              >
                Skip
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className={`px-6 pb-8 z-10 relative ${animationClass}`}>
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
                <currentSlideData.icon className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center mb-4 leading-tight">
              {currentSlideData.title.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-center text-lg leading-relaxed mb-8 px-2">
              {currentSlideData.subtitle}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
                >
                  <div className="text-white font-medium text-sm">{feature}</div>
                </div>
              ))}
            </div>

            {/* Slide Progress Visual */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                <div className="text-white text-sm font-medium">
                  {currentSlide + 1} of {slides.length}
                </div>
                <div className="w-20 bg-white/30 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              {currentSlide > 0 ? (
                <Button
                  onClick={prevSlide}
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-10 px-4 text-sm"
                >
                  <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentSlideData.isLastSlide ? (
                <Button
                  onClick={handleGetStarted}
                  className="bg-white text-gray-900 hover:bg-white/90 h-10 px-6 rounded-xl font-semibold shadow-lg text-sm"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={nextSlide}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 h-10 px-6 rounded-xl font-semibold text-sm"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            {/* Achievement Preview */}
            {currentSlideData.isLastSlide && (
              <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Award className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-white font-semibold mb-2">Ready to achieve your goals?</div>
                <div className="text-white/80 text-sm">
                  Join thousands of athletes who trust our platform for their training success
                </div>
              </div>
            )}
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Custom CSS for animations */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-in {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slide-out {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-50px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-fade-in { animation: fade-in 0.6s ease-out; }
          .animate-slide-in { animation: slide-in 0.6s ease-out; }
          .animate-slide-out { animation: slide-out 0.3s ease-in; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        `}</style>
      </Card>
    </div>
  );
}