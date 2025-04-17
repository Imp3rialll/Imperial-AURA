"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  content: string;
  authorName: string;
  authorRole?: string;
  authorImage?: string;
}

interface TestimonialsProps {
  heading: string;
  subheading?: string;
  testimonials: Testimonial[];
}

const Testimonials = ({
  heading,
  subheading,
  testimonials
}: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-gray-light dark:bg-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">{heading}</h2>
          {subheading && <p className="text-gray-600 dark:text-gray-300 text-lg">{subheading}</p>}
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial */}
          <div className="bg-white dark:bg-gray-800 shadow-lg p-8 md:p-12 rounded-lg text-center">
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-[family-name:var(--font-playfair)]">
              {testimonials[activeIndex].content}
            </p>
            
            <div className="flex items-center justify-center">
              {testimonials[activeIndex].authorImage && (
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonials[activeIndex].authorImage}
                    alt={testimonials[activeIndex].authorName}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <h4 className="font-medium text-lg">{testimonials[activeIndex].authorName}</h4>
                {testimonials[activeIndex].authorRole && (
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].authorRole}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handlePrev}
              className="bg-white dark:bg-gray-800 shadow-md rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="bg-white dark:bg-gray-800 shadow-md rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 