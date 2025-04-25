import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imagePath?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle = "Luxury Redefined", 
  imagePath = "/images/hero-placeholder.jpg" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the image for smoother transitions
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => setIsLoaded(true);
    
    // Set a fallback in case the image takes too long
    const timeout = setTimeout(() => setIsLoaded(true), 1200); // Increased timeout
    
    return () => {
      clearTimeout(timeout);
    };
  }, [imagePath]);
  
  return (
    <div className="relative h-screen w-full overflow-hidden will-change-transform">
      {/* Hero Background */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          willChange: "transform", 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        <div 
          className={`transition-transform duration-[4500ms] ease-in-out ${isLoaded ? 'scale-100' : 'scale-105'}`}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        <div 
          className="absolute inset-0 bg-black/5"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      {/* Imperial Aura Logo (centered in screen) - only shows on mobile */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Logo/branding - Using CSS for animation */}
        <div
          className={`md:hidden transition-all duration-[2800ms] ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="bg-black/20 backdrop-blur-sm py-6 px-4 rounded-lg">
            {/* Mobile-only text */}
            <div 
              className="text-cream font-ahsing mobile-hero-text transition-all duration-[3500ms]"
              style={{ 
                letterSpacing: "0.25em",
                transitionDelay: '1000ms',
                transitionProperty: 'letter-spacing'
              }}
            >
              IMPERIAL AURA
            </div>
            
            <div 
              className={`mt-4 text-lg tracking-widest uppercase transition-opacity duration-[2500ms] ease-in-out ${isLoaded ? 'opacity-80' : 'opacity-0'}`}
              style={{ transitionDelay: '2000ms' }}
            >
              Luxury Redefined
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 