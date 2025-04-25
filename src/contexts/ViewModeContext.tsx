'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViewMode } from '../config/viewMode';

type ViewModeContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMobileView: boolean;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('global');
  
  const isMobileView = viewMode === 'mobile';

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        isMobileView,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

