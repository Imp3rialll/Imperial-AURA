// API client using mock data instead of backend server
import { 
  mockProducts, 
  mockCategories, 
  mockCollections, 
  mockCart, 
  mockOrders,
  MockProduct,
  MockCategory,
  MockCollection,
  CartItem as MockCartItem,
  Cart as MockCart,
  Order as MockOrder
} from './mock-data';

// We're no longer using the backend API URL
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Export the types for use elsewhere in the application
export type Product = MockProduct;
export type Category = MockCategory;
export type Collection = MockCollection;
export type CartItem = MockCartItem;
export type Cart = MockCart;
export type Order = MockOrder;

// Product endpoints
export async function getAllProducts(): Promise<Product[]> {
  // Return mock data instead of fetching from API
  return Promise.resolve(mockProducts);
}

export async function getProductById(id: string): Promise<Product> {
  // Find the product in our mock data
  const product = mockProducts.find(p => p._id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return Promise.resolve(product);
}

export async function getAllCategories(): Promise<Category[]> {
  // Return mock categories
  return Promise.resolve(mockCategories);
}

export async function getAllCollections(): Promise<Collection[]> {
  // Return mock collections
  return Promise.resolve(mockCollections);
}

// Cart endpoints
export async function getCart(userId: string): Promise<Cart> {
  // Return mock cart data
  return Promise.resolve(mockCart);
}

export async function addToCart(userId: string, productId: string, quantity: number, size?: string, color?: string): Promise<{success: boolean, cart: Cart}> {
  // First try to find the product in the mock data
  let product = mockProducts.find(p => p._id === productId);
  
  // If not found, it might be from the dummyData - try to handle different ID prefixes
  if (!product) {
    // Try to match by prefix from dummyData
    if (productId.startsWith('engine-head-')) {
      product = mockProducts.find(p => p.category === 'Shirts' || p._id === '101');
    } else if (productId.startsWith('structured-')) {
      product = mockProducts.find(p => p.category === 'Jeans' || p._id === '102');
    } else if (productId.startsWith('lowers-')) {
      product = mockProducts.find(p => p.category === 'Shorts' || p._id === '105');
    } else if (productId.startsWith('embroidered-')) {
      product = mockProducts.find(p => p.category === 'Dresses' || p._id === '103');
    }
  }
  
  // If still not found, create a dummy product based on the ID
  if (!product) {
    console.error('Product not found:', productId);
    
    // Create a dummy product
    const dummyProduct: MockProduct = {
      _id: productId,
      name: 'Product ' + productId,
      slug: 'product-' + productId,
      price: 199.99, // Default price
      imageUrl: '/placeholder.jpg'
    };
    
    // Create a new cart item
    const newItem: MockCartItem = {
      productId,
      quantity,
      size,
      color,
      price: dummyProduct.price,
      name: dummyProduct.name,
      imageUrl: dummyProduct.imageUrl
    };
    
    // Add to mock cart (or update if it exists)
    const existingItemIndex = mockCart.items.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );
    
    if (existingItemIndex > -1) {
      // Update existing item quantity - set it directly instead of adding to it
      if (quantity === 0) {
        // Remove item if quantity is 0
        mockCart.items.splice(existingItemIndex, 1);
      } else {
        mockCart.items[existingItemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      // Add new item only if quantity is greater than 0
      mockCart.items.push(newItem);
    }
    
    // Recalculate total
    mockCart.total = mockCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return Promise.resolve({ success: true, cart: mockCart });
  }
  
  // Create a new cart item from the found product
  const newItem: MockCartItem = {
    productId,
    quantity,
    size,
    color,
    price: product.price,
    name: product.name,
    imageUrl: product.imageUrl
  };
  
  // Find if this item already exists in the cart
  const existingItemIndex = mockCart.items.findIndex(
    item => item.productId === productId && item.size === size && item.color === color
  );
  
  if (existingItemIndex > -1) {
    // Update existing item quantity - set it directly instead of adding to it
    if (quantity === 0) {
      // Remove item if quantity is 0
      mockCart.items.splice(existingItemIndex, 1);
    } else {
      mockCart.items[existingItemIndex].quantity = quantity;
    }
  } else if (quantity > 0) {
    // Add new item only if quantity is greater than 0
    mockCart.items.push(newItem);
  }
  
  // Recalculate total
  mockCart.total = mockCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return Promise.resolve({ success: true, cart: mockCart });
}

// Order endpoints
export async function createOrder(userId: string, items: MockCartItem[], shippingAddress: any, notes?: string): Promise<{order: Order, payment: {id: string, amount: number, currency: string}}> {
  // Create a new order
  const newOrder: MockOrder = {
    id: `order-${Date.now()}`,
    userId,
    items,
    shippingAddress,
    notes,
    status: 'pending',
    createdAt: new Date().toISOString(),
    total: items.reduce((total, item) => total + (item.price * item.quantity), 0)
  };
  
  // Add to mock orders
  mockOrders.push(newOrder);
  
  // Return the order with payment initiation data
  return Promise.resolve({
    order: newOrder,
    payment: {
      id: `pay-${Date.now()}`,
      amount: newOrder.total,
      currency: 'INR'
    }
  });
}

export async function verifyPayment(
  userId: string, 
  razorpayOrderId: string, 
  razorpayPaymentId: string, 
  razorpaySignature: string, 
  orderId: string,
  amount: number
): Promise<{success: boolean}> {
  // Find the order
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex > -1) {
    // Update the order status
    mockOrders[orderIndex].status = 'paid';
    mockOrders[orderIndex].paymentDetails = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount
    };
    
    // Clear the cart
    mockCart.items = [];
    mockCart.total = 0;
    
    return Promise.resolve({ success: true });
  }
  
  throw new Error('Order not found');
}

/**
 * Fetch a collection by its slug
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collection = mockCollections.find(c => c.slug === slug);
  return Promise.resolve(collection || null);
}

/**
 * Fetch products by collection slug
 */
export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  return Promise.resolve(
    mockProducts.filter(product => 
      product.collections && product.collections.includes(collectionSlug)
    )
  );
} 