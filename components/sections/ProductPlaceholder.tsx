"use client";

import React from 'react';

interface ProductPlaceholderProps {
  label?: string;
  className?: string;
  width?: number;
  height?: number;
}

const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ 
  label = 'Imperial Aura', 
  className,
  width = 400,
  height = 600
}) => {
  // Modern luxury color palette
  const luxuryColors = [
    'from-purple-900 to-gray-900',
    'from-indigo-900 to-purple-900',
    'from-slate-900 to-slate-800',
    'from-gray-900 to-neutral-900',
    'from-zinc-900 to-stone-900',
  ];
  
  const randomColorClass = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
  
  return (
    <div 
      className={`flex flex-col items-center justify-center ${className} relative overflow-hidden bg-gradient-to-br ${randomColorClass}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />
      
      {/* Subtle border with glow */}
      <div className="absolute inset-0 border border-white/10 m-3 rounded-lg shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"></div>
      
      {/* Content container */}
      <div className="relative z-10 text-center px-6 py-8">
        {/* Logo mark */}
        <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white/80" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 6v12m-8-6h16" 
            />
          </svg>
        </div>
        
        {/* Product name */}
        <div className="font-medium text-white text-lg mb-2">
          {label}
        </div>
        
        {/* Brand name */}
        <div className="text-white/60 text-sm font-light">
          Imperial Aura
        </div>
        
        {/* Coming soon tag */}
        <div className="mt-4 inline-block px-3 py-1 text-xs bg-white/10 text-white/90 rounded-full">
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default ProductPlaceholder; 