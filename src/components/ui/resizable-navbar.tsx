"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useMotionValue,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
  brandName?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className, brandName = "Imperial Aura" }: NavbarProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  
  // Add a ref to the SVG element
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Track scroll position
  const { scrollY } = useScroll();
  
  // Create motion values for animating the brand text
  const fontSize = useMotionValue("5rem");
  const textY = useMotionValue("0px");
  const textColor = useMotionValue("#FFFFFF");
  
  // SVG animation control
  const pathLength = useMotionValue(0);
  const svgOpacity = useMotionValue(0.5);
  
  // Monitor path changes to restart animation when returning to home page
  useEffect(() => {
    // Check if we navigated to home from another page
    const isHomePage = pathname === '/';
    const navigatedToHome = isHomePage && prevPathRef.current && prevPathRef.current !== '/';
    
    if (navigatedToHome) {
      // Reset animation states to replay the animation
      setHasScrolled(false);
      setAnimationComplete(false);
      setInitialRender(true);
      
      // Lock scrolling temporarily
      document.body.style.overflow = 'hidden';
      
      // Reset initialRender to false after a small delay to restart animation
      setTimeout(() => setInitialRender(false), 100);
    }
    
    // Update the previous path reference
    prevPathRef.current = pathname;
  }, [pathname]);
  
  // Handle scroll events to trigger animation
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only trigger animation on first scroll
    if (!hasScrolled && latest > 10) {
      setHasScrolled(true);
    }
    
    // Add shadow to navbar when scrolling down
    if (latest > 80 && animationComplete) {
      // Add shadow or additional effects when scrolled
    }
  });
  
  // Handle animation completion
  useEffect(() => {
    if (hasScrolled) {
      // Set a timer to mark animation as complete
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        // Re-enable scrolling after animation completes
        document.body.style.overflow = 'auto';
        
        // Scroll to main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          window.scrollTo({ 
            top: 0, 
            behavior: 'instant'
          });
        }
      }, 1000); // Reduced animation duration for better UX
      
      return () => clearTimeout(timer);
    }
  }, [hasScrolled]);
  
  // Remove initial render state after component mounts
  useEffect(() => {
    if (initialRender) {
      setTimeout(() => setInitialRender(false), 100);
    }
  }, [initialRender]);
  
  // Prevent scrolling until animation completes on homepage
  useEffect(() => {
    // Only apply scroll lock on homepage and when animation is in progress
    if (pathname === '/' && !hasScrolled) {
      // Lock scrolling initially
      document.body.style.overflow = 'hidden';
      
      // Handle first scroll to trigger animation
      const handleFirstScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true);
        }
      };
      
      window.addEventListener('wheel', handleFirstScroll, { passive: true });
      window.addEventListener('touchmove', handleFirstScroll, { passive: true });
      
      // Add keyboard event for accessibility
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'Space') {
          handleFirstScroll();
        }
      });
      
      return () => {
        // Cleanup
        document.body.style.overflow = 'auto';
        window.removeEventListener('wheel', handleFirstScroll);
        window.removeEventListener('touchmove', handleFirstScroll);
        window.removeEventListener('keydown', handleFirstScroll);
      };
    } else {
      // Always enable scrolling on non-homepage routes
      document.body.style.overflow = 'auto';
    }
  }, [hasScrolled, pathname]);
  
  return (
    <>
      {/* Container for logo and SVG animation */}
      <div className="fixed z-50 pointer-events-none select-none" style={{
        top: hasScrolled ? "32px" : "50%", // Moved up from 37.5px to 32px
        left: "50%",
        transform: hasScrolled ? "translate(-50%, 0)" : "translate(-50%, -50%)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        width: hasScrolled ? "auto" : "100%",
        maxWidth: hasScrolled ? "400px" : "800px" // Increased from 350px to 400px for more space
      }}>
        {/* Text animation with SVG outline effect */}
        <div className="relative">
          {/* Add defs with enhanced glow filter */}
          <svg width="0" height="0">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="white" floodOpacity="0.7" result="glow-color" />
                <feComposite in="glow-color" in2="blur" operator="in" result="glow-blur" />
                <feComposite in="SourceGraphic" in2="glow-blur" operator="over" />
              </filter>
            </defs>
          </svg>

          <motion.h1
            className="text-center font-ahsing select-none opacity-0"
            initial={{ 
              scale: 0.95, 
              fontSize: "5rem",
              letterSpacing: "0.05em"
            }}
            animate={{ 
              scale: 1,
              fontSize: hasScrolled ? "2rem" : "5rem", // Increased from 1.75rem to 2rem
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              WebkitFontSmoothing: "antialiased",
              position: "relative",
              zIndex: 1
            }}
          >
            {brandName}
          </motion.h1>
          
          {/* SVG text with integrated line drawing effect */}
          <motion.svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 400 100"
            style={{ zIndex: 2 }}
            initial={{ opacity: initialRender ? 0 : 1 }}
            animate={{ 
              opacity: 1,
              scale: hasScrolled ? 0.75 : 1, // Increased from 0.65 to 0.75
              y: hasScrolled ? -12 : 0, // Adjusted from -10 to -12 to move it more upward
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Text fill that fades in */}
            <motion.text
              x="200"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontSize="55"
              className="font-ahsing"
              letterSpacing="2px"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                fill: hasScrolled ? "#000000" : "#FFFFFF"
              }}
              transition={{ duration: 1 }}
              style={{
                filter: hasScrolled ? "none" : "url(#glow)",
                textRendering: "geometricPrecision",
                fontWeight: hasScrolled ? "600" : "normal"
              }}
            >
              Imperial Aura
            </motion.text>
            
            {/* Animated stroke overlay */}
            {!hasScrolled && (
              <motion.text
                x="200"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="transparent"
                stroke="#FFFFFF"
                strokeWidth="0.75"
                fontSize="55"
                className="font-ahsing"
                letterSpacing="2px"
                initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
      animate={{
                  strokeDashoffset: 0,
                  strokeOpacity: 1
      }}
      transition={{
                  duration: 2.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.5 
      }}
      style={{
                  textRendering: "geometricPrecision"
                }}
              >
                Imperial Aura
              </motion.text>
            )}
            
            {/* Horizontal line that draws under the text */}
            {!hasScrolled && (
              <motion.line
                x1="80"
                y1="65"
                x2="320"
                y2="65"
                stroke="#FFFFFF"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1.5
                }}
              />
            )}
          </motion.svg>
        </div>
      </div>
      
      {/* Scroll hint - only shown until first scroll */}
      {!hasScrolled && (
    <motion.div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => setHasScrolled(true)}
        >
          <span className="text-sm uppercase tracking-widest mb-2 font-medium">Scroll to explore</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white animate-bounce" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 13l-7 7-7-7" 
            />
          </svg>
        </motion.div>
      )}
      
      {/* Fixed navbar - Gucci-style sticky navbar */}
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[40] transition-all duration-300 border-none outline-none",
          hasScrolled || animationComplete ? "bg-white/90 backdrop-blur-md" : "bg-transparent",
          className
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hasScrolled || animationComplete ? 0 : -100,
          opacity: hasScrolled || animationComplete ? 1 : 0,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }}
        style={{
          borderBottom: "none",
          boxShadow: hasScrolled ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
          outlineWidth: 0,
          height: "75px"
        }}
      >
        <div className="container h-full mx-auto border-none px-4">
          <div className="flex h-full items-center justify-between">
            {/* Left section */}
            <div className="flex-1 flex justify-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hasScrolled || animationComplete ? 1 : 0
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5
                }}
                className="flex items-center"
              >
                {/* Left navigation items */}
                <div className="flex items-center gap-1">
                  {/* Primary left content - NavBody's first child */}
                  {React.Children.toArray(children)
                    .filter(child => React.isValidElement(child) && child.type === NavBody)
                    .map((navBody, index) => {
                      if (React.isValidElement(navBody)) {
                        const typedNavBody = navBody as React.ReactElement<NavBodyProps>;
                        if (typedNavBody.props.children) {
                          // Find left children (first child)
                          const navChildren = React.Children.toArray(typedNavBody.props.children);
                          if (navChildren.length > 0 && React.isValidElement(navChildren[0])) {
                            return React.cloneElement(navChildren[0] as React.ReactElement, {
                              key: `left-nav-${index}`
                            });
                          }
                        }
                      }
                      return null;
                    })}
                </div>
              </motion.div>
            </div>
            
            {/* Center brand section - empty because we're animating the brand separately */}
            <div className="flex-1 flex justify-center relative">
              {/* Brand name animated separately */}
              <div className="h-16 flex items-center justify-center">
                {/* Spacer for the floating brand name */}
              </div>
            </div>
            
            {/* Right section */}
            <div className="flex-1 flex justify-end items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hasScrolled || animationComplete ? 1 : 0
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5
                }}
                className="flex items-center space-x-2"
              >
                {/* Right side elements - NavBody's second child */}
                {React.Children.toArray(children)
                  .filter(child => React.isValidElement(child) && child.type === NavBody)
                  .map((navBody, index) => {
                    if (React.isValidElement(navBody)) {
                      const typedNavBody = navBody as React.ReactElement<NavBodyProps>;
                      if (typedNavBody.props.children) {
                        // Find right children (second child)
                        const navChildren = React.Children.toArray(typedNavBody.props.children);
                        if (navChildren.length > 1 && React.isValidElement(navChildren[1])) {
                          return React.cloneElement(navChildren[1] as React.ReactElement, {
                            key: `right-nav-${index}`
                          });
                        }
                      }
                    }
                    return null;
                  })}

                {/* Mobile element - always last */}
                <div className="flex items-center ml-4">
                  {/* Mobile cart button - NavBody's third child */}
                  {React.Children.toArray(children)
                    .filter(child => React.isValidElement(child) && child.type === NavBody)
                    .map((navBody, index) => {
                      if (React.isValidElement(navBody)) {
                        const typedNavBody = navBody as React.ReactElement<NavBodyProps>;
                        if (typedNavBody.props.children) {
                          // Find mobile child (third child)
                          const navChildren = React.Children.toArray(typedNavBody.props.children);
                          if (navChildren.length > 2 && React.isValidElement(navChildren[2])) {
                            return React.cloneElement(navChildren[2] as React.ReactElement, {
                              key: `mobile-nav-${index}`
                            });
                          }
                        }
                      }
                      return null;
                    })}
                    
                  {/* Mobile menu hamburger */}
                  {React.Children.toArray(children).filter(child => 
                    React.isValidElement(child) && child.type === MobileNav
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Full-screen black intro that fades away */}
      <motion.div 
        className="fixed inset-0 bg-black z-[39] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: hasScrolled ? 0 : 1
        }}
        transition={{ 
          opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        {/* Optional subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
    </motion.div>
    </>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {children}
    </div>
  );
};

export const NavItems = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {children}
    </div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={cn("md:hidden", className)}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 text-purple-800 transition-colors hover:text-purple-600"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
      </button>
      
      {/* Mobile Menu Dropdown */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[75px] left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-100 shadow-lg z-50"
            transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export const NavLink = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-purple-800 hover:text-purple-600 transition duration-150 px-3 py-2", 
        className
      )}
    >
      {children}
    </Link>
  );
};

export const NavButton = ({
  href,
  children,
  className,
  variant = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-medium transition-all duration-150";

  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-purple-200 text-purple-800 hover:bg-purple-300",
    outline: "border border-purple-800 text-purple-800 hover:bg-purple-100",
  };
  
  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  );
};
