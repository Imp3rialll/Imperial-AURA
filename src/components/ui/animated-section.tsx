"use client";

import { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
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
  as = 'div'
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });
  
  const variants = getAnimation(animation);
  
  const MotionComponent = motion[as] as any; // Type assertion for dynamic component
  
  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: EASINGS.smooth
      }}
    >
      {children}
    </MotionComponent>
  );
} 