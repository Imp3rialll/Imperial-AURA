import React from 'react';
import Link from 'next/link';
import * as api from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Collections | Imperial Aura',
  description: 'Explore all luxury clothing collections from Imperial Aura - Engine Heads, Structured, Embroidered, Limited Edition, and Animex.',
};

// Fetch all collections
async function getCollections() {
  try {
    const collections = await api.getAllCollections();
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Collections</h1>
      
      {collections && collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection: any) => (
            <Link 
              href={`/collections/${collection.slug.current}`} 
              key={collection._id}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                {collection.imageUrl ? (
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-40 transition-colors flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">{collection.name}</h2>
                  
                  {collection.description && (
                    <p className="text-white text-sm line-clamp-3">{collection.description}</p>
                  )}
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <span className="bg-white text-purple-800 px-4 py-2 rounded-md font-medium">
                      View Collection
                    </span>
                  </div>
                </div>
                
                {collection.isFeatured && (
                  <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-medium text-gray-600">No collections found</h3>
          <p className="mt-2 text-gray-500">
            Please check back later for our exclusive collections.
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
  );
} 