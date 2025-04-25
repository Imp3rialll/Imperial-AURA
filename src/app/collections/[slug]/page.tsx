import React from 'react';
import Link from 'next/link';
import * as api from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { notFound } from 'next/navigation';
import { products as dummyProducts } from '../../../../lib/dummyData';

// Type for dummy product data
type DummyProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  collection: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  new: boolean;
  bestseller: boolean;
};

// Adapter function to convert dummy product to API product format
function adaptDummyProduct(dummyProduct: DummyProduct): api.Product {
  return {
    _id: dummyProduct.id,
    name: dummyProduct.name,
    slug: dummyProduct.id.toLowerCase().replace(/ /g, '-'),
    description: dummyProduct.description,
    price: dummyProduct.price,
    imageUrl: dummyProduct.image,
    isNew: dummyProduct.new,
    isBestseller: dummyProduct.bestseller,
    category: dummyProduct.category,
  };
}

// Get dummy products by collection name
function getDummyProductsByCollection(collectionName: string): DummyProduct[] {
  // Normalize the collection name for comparison
  const normalizedName = collectionName.toLowerCase().replace(/\s+/g, '-');
  
  // Define a mapping from API collection slugs to dummy data collection names
  const collectionMapping: Record<string, string> = {
    'summer-collection': 'Summer Collection',
    'winter-essentials': 'Winter Collection',
    'luxury-line': 'Limited Edition',
    'engine-heads': 'Engine Heads',
    'structured': 'Structured',
    'limited-edition': 'Limited Edition',
    'embroidered': 'Embroidered',
  };
  
  // Get the mapped collection name or use the original
  const targetCollection = collectionMapping[normalizedName] || 
                           normalizedName.split('-').map(word => 
                             word.charAt(0).toUpperCase() + word.slice(1)
                           ).join(' ');
  
  return dummyProducts.filter(product => 
    product.collection.toLowerCase() === targetCollection.toLowerCase()
  );
}

// Fetch collection data by slug
async function getCollectionData(slug: string) {
  try {
    const collection = await api.getCollectionBySlug(slug);
    
    if (!collection) {
      return null;
    }
    
    // Fetch API products for this collection
    const apiProducts = await api.getProductsByCollection(collection._id);
    
    // Get dummy products for this collection
    const dummyProductsForCollection = getDummyProductsByCollection(slug);
    
    // Convert dummy products to API format
    const adaptedDummyProducts = dummyProductsForCollection.map(adaptDummyProduct);
    
    // Combine both product sets (avoid duplicates based on ID)
    const allProductIds = new Set(apiProducts.map(p => p._id));
    const uniqueDummyProducts = adaptedDummyProducts.filter(p => !allProductIds.has(p._id));
    
    const combinedProducts = [...apiProducts, ...uniqueDummyProducts];
    
    return {
      collection,
      products: combinedProducts
    };
  } catch (error) {
    console.error(`Error fetching collection data for slug ${slug}:`, error);
    return null;
  }
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const data = await getCollectionData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  const { collection, products } = data;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <Link href="/collections" className="flex items-center text-purple-700 hover:text-purple-900 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collections
        </Link>
        
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{collection.name}</h1>
          {collection.description && (
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>
      </div>
      
      {collection.imageUrl && (
        <div className="relative h-[400px] w-full mb-12 overflow-hidden rounded-lg">
          <img 
            src={collection.imageUrl} 
            alt={collection.name} 
            className="w-full h-full object-cover object-center"
          />
          {collection.isFeatured && (
            <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Collection Products</h2>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: api.Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">No products found in this collection</h3>
            <p className="mt-2 text-gray-500">
              Check back soon as we update our inventory.
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
      
      <div className="mt-16 border-t border-gray-200 pt-10">
        <h3 className="text-xl font-semibold mb-6">You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Show other collections */}
          <Link 
            href="/collections"
            className="group block bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h4 className="font-medium">All Collections</h4>
          </Link>
          
          <Link 
            href="/products"
            className="group block bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h4 className="font-medium">All Products</h4>
          </Link>
          
          <Link 
            href="/categories"
            className="group block bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h4 className="font-medium">Categories</h4>
          </Link>
          
          <Link 
            href="/new-arrivals"
            className="group block bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h4 className="font-medium">New Arrivals</h4>
          </Link>
        </div>
      </div>
    </div>
  );
} 