import React from 'react';
import Image from 'next/image';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  heading: string;
  subheading?: string;
  features: Feature[];
  alignment?: 'left' | 'center';
  background?: 'light' | 'dark';
}

const Features = ({
  heading,
  subheading,
  features,
  alignment = 'center',
  background = 'light'
}: FeaturesProps) => {
  const bgClasses = background === 'light' 
    ? 'bg-gray-light dark:bg-gray' 
    : 'bg-gray-900 text-white';
  
  const headingAlignment = alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <section className={`py-20 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} mb-16`}>
          <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${headingAlignment}`}>
            {heading}
          </h2>
          {subheading && (
            <p className={`text-lg ${headingAlignment} ${background === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {subheading}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 h-full">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Image 
                  src={feature.icon} 
                  alt={feature.title}
                  width={40}
                  height={40}
                  className={background === 'dark' ? 'invert' : ''}
                />
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">{feature.title}</h3>
              <p className={`text-center ${background === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 