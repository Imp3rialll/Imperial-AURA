"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from './api';

// Import the CartItem type from api to ensure consistency
import { CartItem } from './api';

// Add the subtotal property to make our local CartItem compatible
type CartItemWithSubtotal = CartItem & {
  subtotal: number;
};

type CartContextType = {
  items: CartItemWithSubtotal[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>;
  removeItem: (productId: string, size?: string, color?: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Add a utility function to debug and reset cart storage
// Add this near the top of the file, after the imports

// Debug function to reset cart (exposed to window for debugging)
function resetCartStorage() {
  console.log('Resetting cart storage');
  localStorage.removeItem('cart');
  localStorage.setItem('cart', '[]');
  console.log('Cart storage reset to empty array');
  return true;
}

// Make it available to the browser console
if (typeof window !== 'undefined') {
  // @ts-ignore - Expose for debugging
  window.resetCartStorage = resetCartStorage;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Replace Clerk auth with a temporary implementation until Shopify integration
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Always initialize items as an empty array with explicit type
  const [items, setItems] = useState<CartItemWithSubtotal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Initialize localStorage with a valid empty array if it doesn't exist
  useEffect(() => {
    if (localStorage.getItem('cart') === null) {
      console.log('Initializing empty cart in localStorage');
      localStorage.setItem('cart', '[]');
    }
  }, []);

  // Check for existing cart in localStorage on component mount
  useEffect(() => {
    // This will eventually be replaced with Shopify customer authentication
    // For now, we're using localStorage to persist cart data
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        // Log the raw value for debugging
        console.log('Raw stored cart value:', storedCart);
        
        try {
          // Make sure we parse and validate the data as an array
          const parsedCart = JSON.parse(storedCart);
          console.log('Parsed cart type:', typeof parsedCart, Array.isArray(parsedCart));
          
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart);
          } else {
            // If not an array, reset to empty array
            console.error('Stored cart is not an array, resetting cart. Value:', parsedCart);
            setItems([]);
            localStorage.removeItem('cart');
          }
        } catch (parseError) {
          console.error('Failed to parse cart JSON:', parseError, 'Raw value:', storedCart);
          setItems([]);
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Reset to empty array on error
      setItems([]);
      localStorage.removeItem('cart');
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      // Only save if items is an array
      if (Array.isArray(items)) {
        // Log what we're about to save for debugging
        console.log('Saving cart to localStorage, count:', items.length);
        
        // Make sure we're storing the array directly
        localStorage.setItem('cart', JSON.stringify(items));
      } else {
        console.error('Cannot save cart: items is not an array', typeof items);
        // Reset localStorage to an empty array if items is invalid
        localStorage.setItem('cart', '[]');
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      // Ensure localStorage has a valid array in case of error
      localStorage.setItem('cart', '[]');
    }
  }, [items]);

  // Toggle cart open/closed
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Helper function to calculate subtotal
  const calculateSubtotal = (item: CartItem): CartItemWithSubtotal => {
    return {
      ...item,
      subtotal: Number((item.price * item.quantity).toFixed(2))
    };
  };

  // Safely calculate totals with array check
  const totalItems = Array.isArray(items) ? 
    items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    
  const totalPrice = Array.isArray(items) ? 
    Number(items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)) : 0;

  // Add item to cart (localStorage implementation for now)
  const addToCart = async (productId: string, quantity: number, size?: string, color?: string) => {
    try {
      setLoading(true);
      
      // Ensure items is an array
      const currentItems = Array.isArray(items) ? [...items] : [];
      
      // Find if the item already exists with the same options
      const existingItemIndex = currentItems.findIndex(
        item => 
          item.productId === productId && 
          item.size === size && 
          item.color === color
      );
      
      const newItems = [...currentItems];
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        
        // Recalculate subtotal
        newItems[existingItemIndex] = calculateSubtotal(newItems[existingItemIndex]);
      } else {
        try {
          // Get product details from API or use dummy data for now
          const product = await api.getProductById(productId);
          
          // Create new cart item
          const newItem: CartItemWithSubtotal = calculateSubtotal({
            productId,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || '/images/products/placeholder.jpg',
            quantity,
            size,
            color
          });
          
          newItems.push(newItem);
        } catch (error) {
          console.error('Error getting product details:', error);
          // Create a fallback item if product not found
          const fallbackItem: CartItemWithSubtotal = calculateSubtotal({
            productId,
            name: `Product ${productId}`,
            price: 99.99, // Default price
            imageUrl: '/images/products/placeholder.jpg',
            quantity,
            size,
            color
          });
          
          newItems.push(fallbackItem);
        }
      }
      
      setItems(newItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // The rest of the methods should also check for array
  const updateQuantity = async (productId: string, quantity: number, size?: string, color?: string) => {
    try {
      setLoading(true);
      
      // Ensure items is an array
      const currentItems = Array.isArray(items) ? [...items] : [];
      
      // Ensure quantity is at least 1 or 0 (to remove)
      const validQuantity = Math.max(0, quantity);
      
      if (validQuantity === 0) {
        // Remove item if quantity is 0
        return removeItem(productId, size, color);
      }
      
      // Find the item to update
      const itemIndex = currentItems.findIndex(
        item => 
          item.productId === productId && 
          item.size === size && 
          item.color === color
      );
      
      if (itemIndex !== -1) {
        const newItems = [...currentItems];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: validQuantity
        };
        
        // Recalculate subtotal
        newItems[itemIndex] = calculateSubtotal(newItems[itemIndex]);
        
        setItems(newItems);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string, size?: string, color?: string) => {
    try {
      setLoading(true);
      
      // Ensure items is an array
      const currentItems = Array.isArray(items) ? [...items] : [];
      
      // Filter out the item to be removed
      const newItems = currentItems.filter(
        item => 
          !(item.productId === productId && 
            item.size === size && 
            item.color === color)
      );
      
      setItems(newItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: Array.isArray(items) ? items : [],
        totalItems,
        totalPrice,
        loading,
        isCartOpen,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 