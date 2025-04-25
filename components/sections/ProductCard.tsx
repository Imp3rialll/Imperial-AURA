"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductData } from '../../lib/dummyData';
import { useCart } from '@/lib/CartContext';
import ProductPlaceholder from './ProductPlaceholder';

interface ProductCardProps {
  product: ProductData;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    try {
      setLoading(true);
      await addToCart(product.id, 1, selectedSize, selectedColor);
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      
      // Reset selections after adding to cart
      setSelectedSize(null);
      setSelectedColor(null);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ opacity: 1, transform: 'none' }}
    >
      {/* Product Image */}
      <div className="relative h-80 overflow-hidden">
        {imageError || !product.image ? (
          <ProductPlaceholder 
            label={product.name} 
            className="h-full w-full"
          />
        ) : (
          <div className="relative h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </div>
        )}
        
        {/* Quick Shop Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <Link href={`/product/${product.id}`}>
            <button className="w-full py-2 text-sm font-medium text-white rounded-md backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-colors">
              Quick View
            </button>
          </Link>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-black text-white rounded-md">
              NEW
            </span>
          )}
          
          {product.bestseller && (
            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary text-white rounded-md">
              BESTSELLER
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-medium mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-primary">
            ₹{product.price.toFixed(2)}
          </p>
          
          <div className="text-sm text-gray-600">
            {product.sizes.length} sizes
          </div>
        </div>
        
        {/* Product Options - Shown on Hover */}
        <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            {/* Size Selection */}
            <div className="mb-3">
              <div className="flex justify-between">
                <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">Size</label>
                <span className="text-xs text-primary">{selectedSize || 'Select'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      selectedSize === size 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <div className="flex justify-between">
                <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">Color</label>
                <span className="text-xs text-primary">{selectedColor || 'Select'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      selectedColor === color 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`w-full py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                loading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : success 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary hover:bg-primary-dark text-white'
              }`}
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? 'Adding...' : success ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 