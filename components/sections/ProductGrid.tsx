import React from 'react';
import { ProductData } from '../../lib/dummyData';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: ProductData[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div className="py-10">
      {title && (
        <div 
          className="text-center mb-8"
        >
          <h2 
            className="text-3xl font-medium text-black"
          >
            {title}
          </h2>
          <div 
            className="w-20 h-1 bg-primary mx-auto mt-4"
          />
        </div>
      )}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 