"use client";

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '../../../../lib/dummyData';
import { useCart } from '@/lib/CartContext';
import ProductPlaceholder from '../../../../components/sections/ProductPlaceholder';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { addToCart } = useCart();
  
  if (!product) {
    notFound();
  }
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    try {
      setLoading(true);
      // Convert the product ID to the format expected by addToCart
      // Note: This is a temporary fix - ideally your data models should be consistent
      await addToCart(product.id, quantity, selectedSize, selectedColor);
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-primary">Collections</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.collection.toLowerCase()}`} className="hover:text-primary">
            {product.collection}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div>
            <div className="sticky top-24">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                {imageError || !product.image ? (
                  <ProductPlaceholder 
                    label={product.name} 
                    className="h-full w-full"
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
                
                {product.new && (
                  <div className="absolute top-4 left-4 bg-accent text-white px-4 py-1 text-sm font-medium">
                    NEW
                  </div>
                )}
                
                {product.bestseller && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 text-sm font-medium">
                    BESTSELLER
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery placeholder */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square bg-gray-100 rounded cursor-pointer overflow-hidden ${i === 0 ? 'ring-2 ring-primary' : 'hover:opacity-80'}`}
                  >
                    {imageError || !product.image ? (
                      <ProductPlaceholder className="h-full w-full" />
                    ) : (
                      <img
                        src={product.image}
                        alt={`${product.name} view ${i+1}`}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2">{product.name}</h1>
            <p className="text-2xl text-primary font-medium mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Product details */}
            <div className="border-t border-gray-200 py-6 mb-6">
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/3 text-gray-600">Collection</div>
                <div className="w-full md:w-2/3">{product.collection}</div>
                
                <div className="w-full md:w-1/3 text-gray-600">Category</div>
                <div className="w-full md:w-2/3">{product.category}</div>
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <button className="text-sm text-primary underline">Size Guide</button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
              
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === color 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border border-gray-300 rounded-md overflow-hidden w-36">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full h-12 text-center focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors disabled:opacity-70"
              >
                {loading ? 'Adding to Cart...' : success ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
            
            {/* Additional buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="w-full md:w-auto border border-gray-300 hover:border-gray-400 rounded-md py-3 px-6 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
              
              <button className="w-full md:w-auto border border-gray-300 hover:border-gray-400 rounded-md py-3 px-6 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
            
            {/* Product info tabs */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Details</h3>
                <p className="text-gray-600">
                  This premium {product.category.toLowerCase()} from our {product.collection} Collection 
                  exemplifies luxury craftsmanship with meticulous attention to detail. 
                  Made from the finest materials and designed for both comfort and style, 
                  this piece reflects Imperial Aura's commitment to exceptional quality.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Fabric & Care</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Premium fabric composition</li>
                  <li>Expertly tailored for comfort and durability</li>
                  <li>Dry clean recommended</li>
                  <li>Iron on low heat if needed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Delivery & Returns</h3>
                <p className="text-gray-600">
                  Free standard shipping on orders over $200. Express shipping available.
                  Easy returns within 14 days. See our <a href="#" className="text-primary underline">return policy</a> for details.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Placeholder */}
        <div className="mt-20">
          <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <ProductPlaceholder className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">Related Product {i+1}</h3>
                <p className="text-primary font-medium">$149.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 