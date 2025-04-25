'use client';

import { useViewMode } from '../contexts/ViewModeContext';
import styles from '../styles/mobile.module.css';

export function useMobileStyles() {
  const { isMobileView } = useViewMode();
  
  // Helper functions to get the right class based on the view mode
  const getMobileClass = (mobileClassName: keyof typeof styles) => {
    return isMobileView ? styles[mobileClassName] : '';
  };
  
  return {
    // General container class
    mobileContainer: getMobileClass('mobileContainer'),
    
    // Layout classes
    section: getMobileClass('section'),
    reducedPadding: getMobileClass('reducedPadding'),
    smallerGap: getMobileClass('smallerGap'),
    smallerPadding: getMobileClass('smallerPadding'),
    shorterSection: getMobileClass('shorterSection'),
    
    // Text classes
    betterText: getMobileClass('betterText'),
    smallerHeading: getMobileClass('smallerHeading'),
    
    // Image classes
    fullWidthImage: getMobileClass('fullWidthImage'),
    
    // Background classes
    improvedBackground: getMobileClass('improvedBackground'),
    
    // Helper function for combining multiple mobile classes
    combineClasses: (...classNames: Array<keyof typeof styles>) => {
      if (!isMobileView) return '';
      return classNames.map(className => styles[className]).join(' ');
    }
  };
}
