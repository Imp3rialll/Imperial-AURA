"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from '../../lib/dummyData';
import { useCart } from '@/lib/CartContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        {product.new && (
          <Badge 
            variant="secondary"
            className="absolute top-2 left-2 bg-accent text-white z-10"
          >
            NEW
          </Badge>
        )}
        
        {product.bestseller && (
          <Badge 
            variant="default"
            className="absolute top-2 right-2 bg-primary text-white z-10"
          >
            BESTSELLER
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 
            className="text-lg font-medium mb-1 text-black hover:text-primary transition-colors"
          >
            {product.name}
          </h3>
        </Link>
        <CardDescription className="mb-3">
          {product.description}
        </CardDescription>
        <p 
          className="font-medium text-lg text-primary"
        >
          ${product.price.toFixed(2)}
        </p>
        
        {isHovered && (
          <div 
            className="mt-4"
          >
            {/* Size Selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-black">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="px-3 py-1 h-auto"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="px-3 py-1 h-auto"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="default"
              className="w-full py-2 bg-primary hover:bg-primary-dark"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? 'Adding...' : success ? 'Added to Cart!' : 'Add to Cart'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard; 