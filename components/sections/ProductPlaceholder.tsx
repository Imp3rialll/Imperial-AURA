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
  // Generate a random background color from a luxurious palette
  const luxuryColors = [
    '#2C3E50', // Dark blue
    '#6B21A8', // Purple
    '#1E293B', // Slate
    '#8B4513', // Saddle brown
    '#4A5568', // Gray
    '#2D3748', // Darker Gray
  ];
  
  const randomColor = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundColor: randomColor,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Luxury pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Golden border */}
      <div className="absolute inset-0 border border-[#d4af37] border-opacity-30 m-3"></div>
      
      {/* Text content */}
      <div className="text-center z-10 px-4">
        <div className="font-medium text-white text-xl">{label}</div>
        <div className="text-[#d4af37] text-sm mt-2 font-ahsing">Imperial Aura</div>
      </div>
    </div>
  );
};

export default ProductPlaceholder; 