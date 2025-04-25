import { Product } from './CartContext';

// Types for our products
export type ProductData = {
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

// Dummy product data
export const products: ProductData[] = [
  {
    id: 'engine-head-1',
    name: 'Royal Phoenix Engine Head Shirt',
    description: 'Luxurious embroidered shirt with subtle gold accents.',
    price: 189.99,
    image: '/images/engine-heads-placeholder.jpg',
    category: 'Shirts',
    collection: 'Engine Heads',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy Blue', 'Burgundy'],
    featured: true,
    new: true,
    bestseller: false,
  },
  {
    id: 'engine-head-2',
    name: 'Imperial Crown Casual Shirt',
    description: 'Elegant casual shirt with crown motif embroidery.',
    price: 169.99,
    image: '/images/engine-heads-placeholder.jpg',
    category: 'Shirts',
    collection: 'Engine Heads',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Cream'],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: 'structured-1',
    name: 'Aura Structured Blazer',
    description: 'Sharp silhouette with modern cut and premium fabric.',
    price: 349.99,
    image: '/images/structured-placeholder.jpg',
    category: 'Blazers',
    collection: 'Structured',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: 'structured-2',
    name: 'Imperial Structured Pants',
    description: 'Tailored pants with perfect drape and comfort.',
    price: 179.99,
    image: '/images/structured-placeholder.jpg',
    category: 'Pants',
    collection: 'Structured',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Black', 'Navy', 'Charcoal', 'Beige'],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: 'lowers-1',
    name: 'Royal Comfort Lounge Pants',
    description: 'Premium cotton lounge pants with signature elastic waistband.',
    price: 129.99,
    image: '/images/lowers-section-placeholder.jpg',
    category: 'Loungewear',
    collection: 'Limited Edition',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: 'lowers-2',
    name: 'Imperial Athletic Shorts',
    description: 'Performance shorts with moisture-wicking technology.',
    price: 89.99,
    image: '/images/lowers-section-placeholder.jpg',
    category: 'Activewear',
    collection: 'Limited Edition',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Blue'],
    featured: false,
    new: false,
    bestseller: true,
  },
  {
    id: 'embroidered-1',
    name: 'Golden Peacock Embroidered Kurta',
    description: 'Handcrafted embroidery on premium silk-blend fabric.',
    price: 259.99,
    image: '/images/embroidered-placeholder.jpg',
    category: 'Ethnic',
    collection: 'Embroidered',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black with Gold', 'Navy with Silver', 'Maroon with Gold'],
    featured: true,
    new: true,
    bestseller: false,
  },
  {
    id: 'embroidered-2',
    name: 'Royal Crest Embroidered Shirt',
    description: 'Subtle embroidered crest with contrast stitching.',
    price: 199.99,
    image: '/images/embroidered-placeholder.jpg',
    category: 'Shirts',
    collection: 'Embroidered',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Light Blue'],
    featured: true,
    new: false,
    bestseller: true,
  },
];

// Function to get product by ID
export const getProductById = (id: string): ProductData | undefined => {
  return products.find((product) => product.id === id);
};

// Function to get products by collection
export const getProductsByCollection = (collection: string): ProductData[] => {
  return products.filter((product) => product.collection === collection);
};

// Function to get featured products
export const getFeaturedProducts = (): ProductData[] => {
  return products.filter((product) => product.featured);
};

// Function to get new products
export const getNewProducts = (): ProductData[] => {
  return products.filter((product) => product.new);
};

// Function to get bestseller products
export const getBestsellerProducts = (): ProductData[] => {
  return products.filter((product) => product.bestseller);
};

// Function to get all products
export const getAllProducts = (): ProductData[] => {
  return products;
};

// Function to get related products (excluding the current product)
export const getRelatedProducts = (
  currentProductId: string, 
  collection: string,
  limit: number = 4
): ProductData[] => {
  // First try to get products from the same collection
  const sameCollection = products.filter(
    product => product.collection === collection && product.id !== currentProductId
  );
  
  // If we have enough products from the same collection, return them
  if (sameCollection.length >= limit) {
    return sameCollection.slice(0, limit);
  }
  
  // Otherwise, add some other products to reach the limit
  const otherProducts = products.filter(
    product => product.collection !== collection && product.id !== currentProductId
  );
  
  // Combine the two arrays and return the required number of products
  return [...sameCollection, ...otherProducts].slice(0, limit);
}; 