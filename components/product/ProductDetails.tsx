"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductData } from '../../lib/dummyData';
import { useCart } from '@/lib/CartContext';
import ProductPlaceholder from '../sections/ProductPlaceholder';
import ProductCard from '../sections/ProductCard';

type ProductDetailsProps = {
  product: ProductData;
  relatedProducts: ProductData[];
};

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [activeImage, setActiveImage] = useState(0);
  
  const { addToCart } = useCart();
  
  // Create mock gallery images
  const galleryImages = product?.image 
    ? [product.image, product.image, product.image, product.image] 
    : [];
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    try {
      setLoading(true);
      // Convert the product ID to the format expected by addToCart
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
    <div className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.collection.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors">
            {product.collection}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 dark:text-gray-300">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div>
            <div className="sticky top-24">
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                {imageError || !product.image ? (
                  <ProductPlaceholder 
                    label={product.name} 
                    className="h-full w-full"
                  />
                ) : (
                  <img
                    src={galleryImages[activeImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={() => setImageError(true)}
                  />
                )}
                
                {product.new && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-semibold rounded-md">
                    NEW
                  </div>
                )}
                
                {product.bestseller && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-md">
                    BESTSELLER
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {galleryImages.map((image, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-md cursor-pointer overflow-hidden transition-all ${
                        i === activeImage 
                          ? 'ring-2 ring-primary scale-[0.96]' 
                          : 'hover:opacity-80 hover:scale-[0.98]'
                      }`}
                    >
                      {imageError || !image ? (
                        <ProductPlaceholder className="h-full w-full" />
                      ) : (
                        <img
                          src={image}
                          alt={`${product.name} view ${i+1}`}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2 text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-2xl text-primary font-medium mb-2">₹{product.price.toFixed(2)}</p>
            
            {/* Product reviews preview */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.0 (24 reviews)</span>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Product details */}
            <div className="border-t border-gray-200 dark:border-gray-700 py-6 mb-6">
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/3 text-gray-600 dark:text-gray-400">Collection</div>
                <div className="w-full md:w-2/3 dark:text-gray-300">{product.collection}</div>
                
                <div className="w-full md:w-1/3 text-gray-600 dark:text-gray-400">Category</div>
                <div className="w-full md:w-2/3 dark:text-gray-300">{product.category}</div>
                
                <div className="w-full md:w-1/3 text-gray-600 dark:text-gray-400">Availability</div>
                <div className="w-full md:w-2/3">
                  <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
                </div>
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                <button className="text-sm text-primary underline">Size Guide</button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Size error message */}
              {!selectedSize && loading && (
                <p className="text-red-500 text-sm mt-2">Please select a size</p>
              )}
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color</label>
              
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      selectedColor === color 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              
              {/* Color error message */}
              {!selectedColor && loading && (
                <p className="text-red-500 text-sm mt-2">Please select a color</p>
              )}
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden w-36">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full h-12 text-center focus:outline-none bg-white dark:bg-gray-900 dark:text-gray-300"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-md transition-colors text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : success 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {loading ? 'Adding to Cart...' : success ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
            
            {/* Additional buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="w-full md:w-auto border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-md py-3 px-6 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
              
              <button className="w-full md:w-auto border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-md py-3 px-6 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
            
            {/* Product info tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
              {/* Tab navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 mr-8 text-sm font-medium ${
                    activeTab === 'details' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-3 mr-8 text-sm font-medium ${
                    activeTab === 'fabric' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Fabric & Care
                </button>
                <button 
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-3 mr-8 text-sm font-medium ${
                    activeTab === 'delivery' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Delivery & Returns
                </button>
              </div>
              
              {/* Tab content */}
              <div className="text-gray-600 dark:text-gray-400">
                {activeTab === 'details' && (
                  <div>
                    <p>
                      This premium {product.category.toLowerCase()} from our {product.collection} Collection 
                      exemplifies luxury craftsmanship with meticulous attention to detail. 
                      Made from the finest materials and designed for both comfort and style, 
                      this piece reflects Imperial Aura's commitment to exceptional quality.
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-1">
                      <li>Exclusive to Imperial Aura</li>
                      <li>Premium construction and materials</li>
                      <li>Designed for long-lasting wear</li>
                      <li>Part of the {product.collection} Collection</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'fabric' && (
                  <div>
                    <ul className="space-y-2">
                      <li>Premium fabric composition</li>
                      <li>Expertly tailored for comfort and durability</li>
                      <li>Dry clean recommended</li>
                      <li>Iron on low heat if needed</li>
                      <li>Store in a cool, dry place</li>
                      <li>Avoid exposure to direct sunlight for extended periods</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'delivery' && (
                  <div>
                    <p>
                      Free standard shipping on orders over $200. Express shipping available.
                      Easy returns within 14 days. See our <a href="#" className="text-primary underline">return policy</a> for details.
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Free Standard Delivery</h4>
                          <p className="text-sm">Delivered in 3-5 business days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Express Delivery</h4>
                          <p className="text-sm">Delivered in 1-2 business days ($15 fee)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Easy Returns</h4>
                          <p className="text-sm">14 day return policy for unworn items</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-medium mb-8 text-gray-900 dark:text-white">You May Also Like</h2>
          
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="group">
                  <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                    <ProductPlaceholder className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors dark:text-gray-300">Related Product {i+1}</h3>
                  <p className="text-primary font-medium">$149.99</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 