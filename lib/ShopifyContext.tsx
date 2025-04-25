'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  customerLogin, 
  customerSignup, 
  getCustomerProfile, 
  customerRecoverPassword, 
  customerResetPassword, 
  ShopifyCustomer 
} from './shopify';

// Define the auth context types
interface ShopifyAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: ShopifyCustomer | null;
  customerAccessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  refreshCustomerData: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean }>;
  resetPassword: (resetToken: string, password: string) => Promise<void>;
  error: string | null;
}

// Create the context with default values
const ShopifyAuthContext = createContext<ShopifyAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  customer: null,
  customerAccessToken: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshCustomerData: async () => {},
  forgotPassword: async () => ({ success: false }),
  resetPassword: async () => {},
  error: null,
});

// Hook to use the Shopify auth context
export const useShopifyAuth = () => useContext(ShopifyAuthContext);

// Helper function to set auth cookies
async function setAuthCookies(accessToken: string, expiresAt: string) {
  try {
    const response = await fetch('/api/auth/shopify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, expiresAt }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to set authentication cookies');
    }
    
    return true;
  } catch (error) {
    console.error('Error setting auth cookies:', error);
    return false;
  }
}

// Helper function to remove auth cookies
async function removeAuthCookies() {
  try {
    const response = await fetch('/api/auth/shopify', {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove authentication cookies');
    }
    
    return true;
  } catch (error) {
    console.error('Error removing auth cookies:', error);
    return false;
  }
}

// Provider component
export function ShopifyAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [customerAccessToken, setCustomerAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('shopifyCustomerAccessToken');
        const tokenExpiry = localStorage.getItem('shopifyCustomerTokenExpiry');
        
        if (token && tokenExpiry) {
          // Check if the token is expired
          if (new Date(tokenExpiry) > new Date()) {
            setCustomerAccessToken(token);
            setIsAuthenticated(true);
            
            // Fetch the customer data
            const customerData = await getCustomerProfile(token);
            setCustomer(customerData);
          } else {
            // Token is expired, clear it
            localStorage.removeItem('shopifyCustomerAccessToken');
            localStorage.removeItem('shopifyCustomerTokenExpiry');
            await removeAuthCookies();
          }
        }
      } catch (error) {
        console.error('Error loading Shopify auth state:', error);
        setError('Failed to load authentication state');
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { accessToken, expiresAt } = await customerLogin(email, password);
      
      // Save token to localStorage and cookies
      localStorage.setItem('shopifyCustomerAccessToken', accessToken);
      localStorage.setItem('shopifyCustomerTokenExpiry', expiresAt);
      await setAuthCookies(accessToken, expiresAt);
      
      setCustomerAccessToken(accessToken);
      setIsAuthenticated(true);
      
      // Fetch customer data
      const customerData = await getCustomerProfile(accessToken);
      setCustomer(customerData);
    } catch (error: any) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create the customer
      await customerSignup(firstName, lastName, email, password, phone);
      
      // Then login with the new account
      await login(email, password);
    } catch (error: any) {
      setError(error.message || 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    // Clear from localStorage
    localStorage.removeItem('shopifyCustomerAccessToken');
    localStorage.removeItem('shopifyCustomerTokenExpiry');
    
    // Clear from cookies
    await removeAuthCookies();
    
    setCustomerAccessToken(null);
    setCustomer(null);
    setIsAuthenticated(false);
  };

  // Refresh customer data function
  const refreshCustomerData = async () => {
    if (!customerAccessToken) {
      setError('Not authenticated');
      return;
    }
    
    setIsLoading(true);
    try {
      const customerData = await getCustomerProfile(customerAccessToken);
      setCustomer(customerData);
    } catch (error: any) {
      setError(error.message || 'Failed to refresh customer data');
      
      // If the token is invalid, log out
      if (error.message.includes('access token')) {
        await logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await customerRecoverPassword(email);
    } catch (error: any) {
      setError(error.message || 'Password recovery failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (resetToken: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { accessToken, expiresAt } = await customerResetPassword(resetToken, password);
      
      // Save token to localStorage and cookies
      localStorage.setItem('shopifyCustomerAccessToken', accessToken);
      localStorage.setItem('shopifyCustomerTokenExpiry', expiresAt);
      await setAuthCookies(accessToken, expiresAt);
      
      setCustomerAccessToken(accessToken);
      setIsAuthenticated(true);
      
      // Fetch customer data
      const customerData = await getCustomerProfile(accessToken);
      setCustomer(customerData);
    } catch (error: any) {
      setError(error.message || 'Password reset failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    customer,
    customerAccessToken,
    login,
    signup,
    logout,
    refreshCustomerData,
    forgotPassword,
    resetPassword,
    error,
  };

  return (
    <ShopifyAuthContext.Provider value={value}>
      {children}
    </ShopifyAuthContext.Provider>
  );
} 