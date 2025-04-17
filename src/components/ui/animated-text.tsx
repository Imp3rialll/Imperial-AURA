"use client";

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DURATIONS, EASINGS } from '@/lib/animations';

type AnimatedTextProps = {
  text: string | string[];
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  animation?: 'word' | 'char' | 'line';
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  repeat?: boolean | number;
  repeatDelay?: number;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export function AnimatedText({
  text,
  className,
  wordClassName,
  charClassName,
  animation = 'word',
  delay = 0,
  stagger = 0.02,
  duration = DURATIONS.normal,
  as = 'p',
  repeat = false,
  repeatDelay = 5
}: AnimatedTextProps) {
  const Component = motion[as] as any;
  const lines = Array.isArray(text) ? text : [text];
  
  // For line animation
  if (animation === 'line') {
    return (
      <Component
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
              repeat: repeat ? (typeof repeat === 'number' ? repeat : Infinity) : 0,
              repeatDelay: repeatDelay
            }
          }
        }}
      >
        {lines.map((line, lineIndex) => (
          <motion.span
            key={`line-${lineIndex}`}
            className="block"
            variants={lineVariants}
            transition={{
              duration,
              ease: EASINGS.smooth
            }}
          >
            {line}
          </motion.span>
        ))}
      </Component>
    );
  }

  // For word or character animation
  return (
    <Component
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: animation === 'word' ? 0.05 : stagger,
            delayChildren: delay,
            repeat: repeat ? (typeof repeat === 'number' ? repeat : Infinity) : 0,
            repeatDelay: repeatDelay
          }
        }
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block">
          {animation === 'word' ? (
            // Word animation
            line.split(' ').map((word, i) => (
              <motion.span
                key={`word-${i}`}
                className={cn("inline-block mr-1", wordClassName)}
                variants={wordVariants}
                transition={{
                  duration,
                  ease: EASINGS.smooth
                }}
              >
                {word}
              </motion.span>
            ))
          ) : (
            // Character animation
            line.split('').map((char, i) => (
              <motion.span
                key={`char-${i}`}
                className={cn("inline-block", charClassName)}
                variants={charVariants}
                transition={{
                  duration,
                  ease: EASINGS.smooth
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))
          )}
        </span>
      ))}
    </Component>
  );
} 