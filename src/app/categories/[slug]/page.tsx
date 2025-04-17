import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as api from '@/lib/api';

// Fetch categories and products
async function getCategoryData(slug: string) {
  try {
    // First get all categories
    const categories = await api.getAllCategories();
    
    // Find the current category by slug
    const category = categories.find((cat: any) => cat.slug.current === slug);
    
    if (!category) {
      return null;
    }
    
    // Then get all products
    const products = await api.getAllProducts();
    
    // Filter products by category
    const categoryProducts = products.filter(
      (product: any) => product.category === category.name
    );
    
    return {
      category,
      products: categoryProducts
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  const { category, products } = data;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <div className="mb-12 text-center">
          {category.imageUrl && (
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-6">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              </div>
            </div>
          )}
          
          {!category.imageUrl && (
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          )}
          
          {category.description && (
            <p className="text-gray-600 max-w-3xl mx-auto">{category.description}</p>
          )}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <Link href={`/products/${product._id}`} key={product._id}>
                <div className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all rounded-lg">
                  {/* Product Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-purple-800">₹{product.price}</span>
                        {product.compareAtPrice && (
                          <span className="ml-2 text-sm line-through text-gray-400">
                            ₹{product.compareAtPrice}
                          </span>
                        )}
                      </div>
                      
                      {!product.isInStock && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Out of stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-2xl font-medium text-gray-600">No products found in this category</h3>
              <p className="mt-2 text-gray-500">
                Please check back later for our latest collection.
              </p>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-block bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 