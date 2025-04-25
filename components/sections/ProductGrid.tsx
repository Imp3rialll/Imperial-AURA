import React from 'react';
import { ProductData } from '../../lib/dummyData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: ProductData[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-16">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4 text-sm">
            Discover our exquisite collection of luxury items crafted with precision and sophistication
          </p>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-3xl font-light text-gray-400 mb-4">No products found</div>
          <p className="text-gray-500">Check back soon for our latest additions</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow">
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 