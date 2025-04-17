import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategorySectionProps {
  title: string;
  description: string;
  imagePath: string;
  buttonText?: string;
  buttonLink: string;
  imagePosition?: 'left' | 'right';
  features?: string[];
}

const CategorySection = ({
  title,
  description,
  imagePath,
  buttonText = 'Explore Collection',
  buttonLink,
  imagePosition = 'right',
  features
}: CategorySectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center ${
          imagePosition === 'left' ? 'md:flex-row-reverse' : ''
        }`}>
          {/* Text Content */}
          <div className={`${imagePosition === 'left' ? 'md:order-2' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {description}
            </p>
            
            {features && features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <Link 
              href={buttonLink}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 transition-colors inline-block text-lg"
            >
              {buttonText}
            </Link>
          </div>
          
          {/* Image */}
          <div className={`relative aspect-[4/5] ${imagePosition === 'left' ? 'md:order-1' : ''}`}>
            <div className="absolute inset-0 bg-gray-200 rounded-lg"></div>
            {imagePath && (
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 