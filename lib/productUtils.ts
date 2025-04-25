import { getProductsByCollection } from './dummyData';
import type { ProductData } from './dummyData';

// Helper function to get products with fallback
export async function getProductsWithFallback(
  collectionHandle: string, 
  shopifyCollectionName: string
): Promise<ProductData[]> {
  try {
    // Dynamic import to avoid affecting server components
    const { getCollectionByHandle, transformProducts } = await import('./shopify');
    
    // Try to fetch from Shopify
    const collection = await getCollectionByHandle(collectionHandle);
    const products = transformProducts(collection);
    
    // If we got products, return them
    if (products && products.length > 0) {
      return products;
    }
    
    // Otherwise fall back to dummy data
    console.log(`Falling back to dummy data for ${collectionHandle}`);
    return getProductsByCollection(shopifyCollectionName);
  } catch (error) {
    console.error(`Error fetching products for ${collectionHandle}:`, error);
    return getProductsByCollection(shopifyCollectionName);
  }
} 