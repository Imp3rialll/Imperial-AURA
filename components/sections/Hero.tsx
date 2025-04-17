import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      {/* Hero Background - optimized for performance with slower animation */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, // Much slower fade in for dramatic effect
          ease: [0.22, 0.03, 0.26, 1.0] // Gentler easing
        }}
        style={{ 
          willChange: "transform", 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4.5, ease: [0.22, 0.03, 0.35, 1.0] }}
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
      </motion.div>

      {/* Imperial Aura Logo (centered in screen) - only shows on mobile */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Logo/branding animation - Using CSS media queries for better handling */}
        <motion.div
          className="md:hidden" // Hide on medium screens and up using Tailwind
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 2.8, 
            delay: 0.8,
            ease: [0.22, 0.03, 0.35, 1.0]
          }}
        >
          <div className="bg-black/20 backdrop-blur-sm py-6 px-4 rounded-lg">
            {/* Mobile-only text */}
            <motion.div 
              className="text-cream font-ahsing mobile-hero-text"
              initial={{ letterSpacing: "0.2em" }}
              animate={{ letterSpacing: "0.25em" }}
              transition={{ duration: 3.5, delay: 1.0, ease: [0.19, 0.13, 0.35, 0.96] }}
            >
              IMPERIAL AURA
            </motion.div>
            
            <motion.div 
              className="mt-4 text-lg tracking-widest uppercase opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 2.5, delay: 2.0 }}
            >
              Luxury Redefined
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 