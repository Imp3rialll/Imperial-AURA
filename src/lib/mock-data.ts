// Mock data to replace backend API calls

// Define the types first for better type safety
export interface MockProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  collections?: string[];
  category?: string;
  sizes?: string[];
  colors?: Array<{ name: string; value: string }>;
  material?: string;
  isInStock?: boolean;
  isFeatured?: boolean;
}

export interface MockCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface MockCollection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  name: string;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: any;
  notes?: string;
  status: string;
  createdAt: string;
  total: number;
  paymentDetails?: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    amount: number;
  };
}

export const mockProducts: MockProduct[] = [
  {
    _id: '101',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-tshirt',
    description: 'Essential white t-shirt made from premium cotton',
    price: 29.99,
    imageUrl: '/images/products/white-tshirt.jpg',
    isNew: true,
    collections: ['summer-collection', 'luxury-line'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#000000' }
    ],
    material: 'Cotton',
    isInStock: true,
    isFeatured: true
  },
  {
    _id: '102',
    name: 'Black Denim Jeans',
    slug: 'black-denim-jeans',
    description: 'Slim-fit black denim jeans with stretch',
    price: 79.99,
    imageUrl: '/images/products/black-jeans.jpg',
    isBestseller: true,
    collections: ['winter-essentials', 'luxury-line'],
    category: 'Jeans',
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    material: 'Denim',
    isInStock: true,
    isFeatured: false
  },
  {
    _id: '103',
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'Light and breezy floral dress for summer days',
    price: 59.99,
    imageUrl: '/images/products/summer-dress.jpg',
    isNew: true,
    collections: ['summer-collection'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Floral', value: '#ff9cce' }
    ],
    material: 'Cotton',
    isInStock: true,
    isFeatured: true
  },
  {
    _id: '104',
    name: 'Cashmere Sweater',
    slug: 'cashmere-sweater',
    description: 'Luxurious cashmere sweater for ultimate comfort',
    price: 149.99,
    imageUrl: '/images/products/cashmere-sweater.jpg',
    collections: ['winter-essentials', 'luxury-line'],
    category: 'Sweaters',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Beige', value: '#f5f5dc' },
      { name: 'Gray', value: '#808080' }
    ],
    material: 'Cashmere',
    isInStock: true,
    isFeatured: false
  },
  {
    _id: '105',
    name: 'Linen Shorts',
    slug: 'linen-shorts',
    description: 'Comfortable linen shorts for hot summer days',
    price: 45.99,
    imageUrl: '/images/products/linen-shorts.jpg',
    collections: ['summer-collection'],
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Khaki', value: '#c3b091' },
      { name: 'Navy', value: '#000080' }
    ],
    material: 'Linen',
    isInStock: true,
    isFeatured: false
  }
];

export const mockCategories: MockCategory[] = [
  {
    _id: '201',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Comfortable t-shirts for everyday wear',
    imageUrl: '/images/categories/tshirts.jpg',
    featured: true
  },
  {
    _id: '202',
    name: 'Jeans',
    slug: 'jeans',
    description: 'Denim jeans in various styles and fits',
    imageUrl: '/images/categories/jeans.jpg',
    featured: true
  },
  {
    _id: '203',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for all occasions',
    imageUrl: '/images/categories/dresses.jpg',
    featured: true
  },
  {
    _id: '204',
    name: 'Sweaters',
    slug: 'sweaters',
    description: 'Warm and cozy sweaters for the colder months',
    imageUrl: '/images/categories/sweaters.jpg',
    featured: false
  },
  {
    _id: '205',
    name: 'Shorts',
    slug: 'shorts',
    description: 'Comfortable shorts for warm weather',
    imageUrl: '/images/categories/shorts.jpg',
    featured: false
  }
];

export const mockCollections: MockCollection[] = [
  {
    _id: '301',
    name: 'Summer Collection',
    slug: 'summer-collection',
    description: 'Our latest summer styles for 2023',
    imageUrl: '/images/collections/summer.jpg',
    startDate: '2023-05-01',
    endDate: '2023-08-31',
    isFeatured: true
  },
  {
    _id: '302',
    name: 'Winter Essentials',
    slug: 'winter-essentials',
    description: 'Stay warm and stylish this winter season',
    imageUrl: '/images/collections/winter.jpg',
    startDate: '2023-11-01',
    endDate: '2024-02-28',
    isFeatured: true
  },
  {
    _id: '303', 
    name: 'Luxury Line',
    slug: 'luxury-line',
    description: 'Premium clothing crafted with the finest materials',
    imageUrl: '/images/collections/luxury.jpg',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    isFeatured: true
  }
];

// Mock user cart data
export const mockCart: Cart = {
  items: [],
  total: 0
};

// Mock orders data
export const mockOrders: Order[] = []; 