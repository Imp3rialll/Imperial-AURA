'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  price: number;
  compareAtPrice?: number;
  categories?: string[];
  isInStock?: boolean;
  isFeatured?: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Use the custom products endpoint instead
        const response = await fetch('http://localhost:4000/api/custom-products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e: any) {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center py-10">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))
      ) : products.length > 0 ? (
        products.map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <CardHeader className="p-0">
              {product.imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              {product.isFeatured && (
                <div className="absolute top-2 right-2 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-lg font-semibold truncate">{product.title}</CardTitle>
              {product.categories && product.categories.length > 0 && (
                <CardDescription className="text-sm text-gray-600">
                  {product.categories.join(', ')}
                </CardDescription>
              )}
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-lg font-bold text-purple-700">₹{product.price.toFixed(2)}</p>
                {product.compareAtPrice && (
                  <p className="text-sm text-gray-500 line-through">₹{product.compareAtPrice.toFixed(2)}</p>
                )}
              </div>
              {product.isInStock === false && (
                <p className="mt-1 text-xs inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                  Out of stock
                </p>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
          <h3 className="text-2xl font-medium text-gray-600">No products found</h3>
          <p className="mt-2 text-gray-500">
            Add some products in your Sanity Studio to see them here.
          </p>
        </div>
      )}
    </div>
  );
} 