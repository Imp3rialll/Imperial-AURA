import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: string;
  imagePath: string;
  slug: string;
}

interface CollectionShowcaseProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink?: string;
  collectionType: string;
}

const CollectionShowcase = ({
  title,
  description,
  products,
  viewAllLink,
  collectionType
}: CollectionShowcaseProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">{title}</h2>
            {description && <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>}
          </div>
          
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-primary hover:text-primary-dark font-medium transition-colors flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Link 
              href={`/${collectionType}/${product.slug}`} 
              key={product.id}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                <div className="absolute inset-0 bg-gray-200"></div>
                {product.imagePath && (
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
              </div>
              <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase; 