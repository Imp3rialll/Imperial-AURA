// View mode types for the application
export type ViewMode = 'global' | 'mobile';

// Current active view mode
export const CURRENT_VIEW_MODE: ViewMode = 'mobile';

// Helper functions
export const isMobileViewMode = () => CURRENT_VIEW_MODE === 'mobile';
export const isGlobalViewMode = () => CURRENT_VIEW_MODE === 'global';
