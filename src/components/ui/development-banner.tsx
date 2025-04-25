'use client';

import { useState } from 'react';

interface DevelopmentBannerProps {
  message?: string;
}

export default function DevelopmentBanner({ message = "You are in Shopify development portal" }: DevelopmentBannerProps) {
  const [isClosed, setIsClosed] = useState(false);
  
  if (isClosed) return null;
  
  return (
    <div className="bg-amber-500 py-2 px-4 text-center relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <p className="text-sm font-medium text-white">
          {message}
        </p>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsClosed(true)}
            className="text-white hover:text-amber-100"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 