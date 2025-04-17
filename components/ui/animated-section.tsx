"use client";

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scrollReveal, DURATIONS, EASINGS } from '@/lib/animations';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  once?: boolean;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main';
  priority?: boolean;
};

const getAnimation = (type: AnimatedSectionProps['animation']): Variants => {
  switch (type) {
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };
    case 'slideUp':
      return {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      };
    case 'slideDown':
      return {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 }
      };
    case 'slideLeft':
      return {
        hidden: { opacity: 0, x: -75 },
        visible: { opacity: 1, x: 0 }
      };
    case 'slideRight':
      return {
        hidden: { opacity: 0, x: 75 },
        visible: { opacity: 1, x: 0 }
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      };
    case 'none':
    default:
      return {
        hidden: {},
        visible: {}
      };
  }
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = DURATIONS.normal,
  animation = 'slideUp',
  once = true,
  threshold = 0.2,
  as = 'div',
  priority = false
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialRender(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const shouldAnimate = !prefersReducedMotion && (animation !== 'none');
  
  const optimizedDuration = isInitialRender && !priority ? duration * 0.6 : duration;
  
  const variants = getAnimation(animation);
  
  const MotionComponent = motion[as] as any;
  
  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: optimizedDuration,
        delay: isInitialRender && !priority ? delay * 0.7 : delay,
        ease: EASINGS.smooth,
        ...(isInitialRender && {
          type: 'tween',
          willChange: 'transform, opacity'
        })
      }}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      {children}
    </MotionComponent>
  );
} 