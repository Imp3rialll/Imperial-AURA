import { Variants } from "framer-motion";

// Durations for animations in seconds
export const DURATIONS = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
  extraSlow: 1.2
};

// Easing functions for animations
export const EASINGS = {
  // Standard easing functions
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  
  // Custom easing functions
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.22, 1.2, 0.36, 1],
  gentle: [0.4, 0.0, 0.2, 1],
  snappy: [0.16, 1, 0.3, 1]
};

// Animation variants for common animations
export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  },
  
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 }
  }
};

// Function to create staggered children animations
export function createStaggeredChildren(
  childVariants: Variants,
  staggerTime = 0.05,
  delayChildren = 0
): Record<string, any> {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerTime,
        delayChildren: delayChildren
      }
    },
    children: childVariants
  };
}

// Function to create hover animation variants
export function createHoverAnimation(
  initialScale = 1,
  hoverScale = 1.05,
  tap = 0.98
): Record<string, any> {
  return {
    initial: { scale: initialScale },
    whileHover: { scale: hoverScale },
    whileTap: { scale: tap },
    transition: { duration: 0.2, ease: EASINGS.smooth }
  };
}

// Function to create scroll-triggered animation variants
export function createScrollAnimation(
  type: keyof typeof VARIANTS,
  duration = DURATIONS.normal, 
  ease = EASINGS.smooth
): Variants {
  const variants = VARIANTS[type];
  
  return {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: { duration, ease }
    }
  };
}

// Staggered children timing
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
};

// Default transition for most animations
export const defaultTransition = {
  duration: DURATIONS.normal,
  ease: EASINGS.smooth,
};

// Seamless page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: DURATIONS.normal,
    ease: EASINGS.easeInOut,
  },
};

// Slide up animation variants
export const slideUp: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    y: 20, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// Slide down animation variants
export const slideDown: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    y: -20, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// Slide in from left animation variants
export const slideInLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    x: -20, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// Slide in from right animation variants
export const slideInRight: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    x: 20, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// Scale animation variants
export const scale: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    scale: 0.98, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// List item animation (for staggered children)
export const listItem: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { ...defaultTransition }
  },
  exit: { 
    y: 10, 
    opacity: 0, 
    transition: { ...defaultTransition, duration: DURATIONS.fast } 
  },
};

// Container for staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    }
  },
  exit: {
    transition: {
      staggerChildren: STAGGER.fast,
      staggerDirection: -1,
    }
  }
};

// Hover scale animation
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: DURATIONS.fast, ease: EASINGS.bounce }
};

// Image zoom on hover
export const imageZoom = {
  initial: { scale: 1 },
  whileHover: { scale: 1.1 },
  transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut }
};

// Button press animation
export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: { duration: DURATIONS.fast, ease: EASINGS.easeOut }
};

// Scroll-triggered animation (for scroll reveal effects)
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth
    }
  }
};

// Text character-by-character animation
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut
    }
  })
};

// Path drawing animation for SVGs
export const pathDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { 
        duration: DURATIONS.slow,
        ease: EASINGS.easeInOut
      },
      opacity: { 
        duration: DURATIONS.fast, 
        ease: EASINGS.easeInOut 
      }
    }
  }
}; 