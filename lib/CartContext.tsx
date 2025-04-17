"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';

// Define the product type
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

// Define the cart state
type CartState = {
  items: Product[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
};

// Define the cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Create context with helper functions
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  items: Product[]; // For compatibility with checkout page
  totalPrice: number; // For compatibility with checkout page
  clearCart: () => Promise<void>; // For compatibility with checkout page
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType>({
  state: initialState,
  dispatch: () => null,
  items: [],
  totalPrice: 0,
  clearCart: async () => {},
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  toggleCart: () => {},
});

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        // Item does not exist, add it
        updatedItems = [...state.items, action.payload];
      }

      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      
      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
}

// Helper function to safely load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  
  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return initialState;
    
    const parsedCart = JSON.parse(savedCart) as Partial<CartState>;
    
    // Validate the parsed data to ensure it has all required properties
    return {
      items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
      totalItems: typeof parsedCart.totalItems === 'number' ? parsedCart.totalItems : 0,
      totalPrice: typeof parsedCart.totalPrice === 'number' ? parsedCart.totalPrice : 0,
      isOpen: Boolean(parsedCart.isOpen),
    };
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return initialState;
  }
};

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Load cart from localStorage on initial render with improved error handling
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [state]);

  // Helper functions for checkout page and other components
  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, [dispatch]);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [dispatch]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, [dispatch]);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, [dispatch]);

  const clearCart = useCallback(async (): Promise<void> => {
    dispatch({ type: 'CLEAR_CART' });
    return Promise.resolve();
  }, [dispatch]);

  // Add computed properties for compatibility with checkout page
  const { items, totalPrice } = state;

  const value = {
    state,
    dispatch,
    items,
    totalPrice,
    clearCart,
    addItem,
    removeItem,
    updateQuantity,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 