import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug?: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isNew?: boolean;
    isBestseller?: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productUrl = `/products/${product.slug || product._id}`;

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
      <Link href={productUrl} className="block relative h-64 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">{product.name.charAt(0)}</span>
          </div>
        )}
        
        {product.isNew && (
          <Badge 
            className="absolute top-2 left-2 bg-purple-600 text-white"
          >
            NEW
          </Badge>
        )}
        
        {product.isBestseller && (
          <Badge 
            className="absolute top-2 right-2 bg-amber-600 text-white"
          >
            BESTSELLER
          </Badge>
        )}
      </Link>

      <div className="p-4">
        <Link href={productUrl}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-purple-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <p className="font-medium text-lg text-purple-700">
            ₹{product.price.toFixed(2)}
          </p>
          
          <Link 
            href={productUrl}
            className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-purple-100 hover:text-purple-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 