"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ProductData } from '../../lib/dummyData';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductSliderProps {
  products: ProductData[];
  title: string;
  viewAllLink?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, title, viewAllLink }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Check scroll position to update button states
  const checkScrollPosition = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      
      // Check if content is enough to scroll
      setCanScrollRight(slider.scrollWidth > slider.clientWidth);
    }
    
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [products]);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-medium text-black">{title}</h2>
            <div className="w-20 h-1 bg-primary mt-4"></div>
          </div>
          
          <div className="flex items-center gap-4">
            {viewAllLink && (
              <Link 
                href={viewAllLink}
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                View All
              </Link>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="border border-gray-300 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="border border-gray-300 hover:bg-gray-100"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div 
          ref={sliderRef} 
          className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="flex-none w-[280px] snap-start"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider; 