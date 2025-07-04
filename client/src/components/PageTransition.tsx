import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`w-full h-full transition-transform duration-300 ease-out ${
          isTransitioning 
            ? transitionDirection === 'right' 
              ? 'transform translate-x-0' 
              : 'transform -translate-x-0'
            : 'transform translate-x-0'
        }`}
        style={{
          animation: isTransitioning ? 'slideIn 0.3s ease-out' : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
}