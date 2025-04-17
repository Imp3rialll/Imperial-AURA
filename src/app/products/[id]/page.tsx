import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as api from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

// Server component to fetch product data
async function getProduct(id: string) {
  try {
    const product = await api.getProductById(id);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex text-sm text-gray-500">
            <li className="mr-2">
              <Link href="/" className="hover:text-purple-700">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="mr-2">
              <Link href="/products" className="hover:text-purple-700">Products</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="font-medium text-gray-900">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].url} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image: any, index: number) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-purple-800">
                  ₹{product.price}
                </span>
                
                {product.compareAtPrice && (
                  <span className="text-lg line-through text-gray-400">
                    ₹{product.compareAtPrice}
                  </span>
                )}
                
                {product.compareAtPrice && (
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Product Info */}
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {product.category && (
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="text-sm text-gray-900">{product.category}</dd>
                  </div>
                )}
                
                {product.material && (
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Material</dt>
                    <dd className="text-sm text-gray-900">{product.material}</dd>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Availability</dt>
                  <dd className="text-sm text-gray-900">
                    {product.isInStock ? 'In Stock' : 'Out of Stock'}
                  </dd>
                </div>
              </div>
            </div>
            
            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Size</h2>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size: string) => (
                    <div
                      key={size}
                      className="border border-gray-300 rounded-md py-2 px-4 text-center hover:border-purple-500 cursor-pointer"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Color</h2>
                <div className="flex space-x-2">
                  {product.colors.map((color: any) => (
                    <div
                      key={color.name}
                      className="border border-gray-300 rounded-full w-10 h-10 cursor-pointer overflow-hidden"
                      title={color.name}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: color.value }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add to Cart */}
            <div className="mt-8">
              <AddToCartButton productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 