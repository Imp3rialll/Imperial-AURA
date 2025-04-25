'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileTextWrapperProps {
  children: ReactNode;
  className?: string;
  type?: 'paragraph' | 'heading' | 'description';
  animateIn?: boolean;
}

/**
 * MobileTextWrapper component for better text wrapping and styling on mobile devices
 * 
 * @param children - The text content to be wrapped
 * @param className - Additional classes to apply
 * @param type - The type of text (paragraph, heading, or description)
 * @param animateIn - Whether to animate the text when it enters the viewport
 */
const MobileTextWrapper: React.FC<MobileTextWrapperProps> = ({
  children,
  className = '',
  type = 'paragraph',
  animateIn = false
}) => {
  // Base classes for different text types
  const baseClasses = {
    paragraph: 'text-clip-fix leading-relaxed',
    heading: 'text-clip-fix font-medium',
    description: 'product-description text-clip-fix text-gray-600'
  };

  // Combine base classes with additional classes
  const combinedClasses = `${baseClasses[type]} ${className}`;

  // If animation is enabled, wrap in motion component
  if (animateIn) {
    return (
      <motion.div
        className={combinedClasses}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        viewport={{ once: false, amount: 0.7 }}
      >
        {children}
      </motion.div>
    );
  }

  // Otherwise, return a simple div
  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default MobileTextWrapper; 