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
  logout: () => Promise<{ success: boolean; error?: string }>;
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
  logout: async () => ({ success: false }),
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        expiresAt,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to set auth cookies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error setting auth cookies:', error);
    // Continue even if cookie setting fails, as we have localStorage as a fallback
  }
}

// Helper function to remove auth cookies
async function removeAuthCookies() {
  try {
    const response = await fetch('/api/auth/shopify', {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove auth cookies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error removing auth cookies:', error);
    // Continue even if cookie removal fails
  }
}

// Provider component
export function ShopifyAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [customerAccessToken, setCustomerAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Load auth state from localStorage and cookies
  const loadAuthState = async () => {
    if (typeof window === 'undefined') {
      return;
    }
    
    // Set a timeout to prevent infinite loading state
    const loadingTimeout = setTimeout(() => {
      console.log('Auth loading timed out after 10 seconds');
      setIsLoading(false);
      setError('Authentication loading timed out. Please try logging in again.');
      setInitialized(true);
    }, 10000); // 10 second timeout
    
    try {
      // Check for token in localStorage first
      const storedToken = localStorage.getItem('shopifyCustomerAccessToken');
      const tokenExpiry = localStorage.getItem('shopifyCustomerTokenExpiry');
      
      if (!storedToken || !tokenExpiry) {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        setInitialized(true);
        return;
      }
      
      // Check if token is expired
      const expiry = new Date(tokenExpiry);
      if (expiry < new Date()) {
        // Token is expired, log out
        await logout();
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        setInitialized(true);
        return;
      }
      
      // Token is valid, set it
      setCustomerAccessToken(storedToken);
      setIsAuthenticated(true);
      
      // Load customer data
      try {
        // Use API route to avoid CORS issues
        const query = `
          query getCustomer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
              id
              firstName
              lastName
              email
              phone
              defaultAddress {
                id
                address1
                address2
                city
                province
                zip
                country
                phone
              }
              addresses(first: 10) {
                edges {
                  node {
                    id
                    address1
                    address2
                    city
                    province
                    zip
                    country
                    phone
                  }
                }
              }
              orders(first: 5) {
                edges {
                  node {
                    id
                    orderNumber
                    processedAt
                    financialStatus
                    fulfillmentStatus
                    totalPrice {
                      amount
                      currencyCode
                    }
                    lineItems(first: 5) {
                      edges {
                        node {
                          title
                          quantity
                          variant {
                            price {
                              amount
                              currencyCode
                            }
                            image {
                              originalSrc
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const variables = {
          customerAccessToken: storedToken,
        };
        
        console.log('Fetching customer data...');
        const response = await fetch('/api/auth/shopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
          cache: 'no-store'
        });
        
        console.log('Customer data response:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error data:', errorData);
          throw new Error('Failed to load customer data');
        }
        
        const data = await response.json();
        console.log('Customer data received:', data ? 'Yes' : 'No');
        
        if (data.customer) {
          setCustomer(data.customer);
        } else {
          console.error('No customer data in response');
          // No customer data returned, logout
          await logout();
        }
      } catch (error) {
        console.error('Error loading customer data:', error);
        // If there's an error, we'll log the user out to be safe
        await logout();
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      await logout();
    } finally {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      setInitialized(true);
    }
  };

  // Load auth state on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Debug info for login
    console.log(`Attempting login for email: ${email.substring(0, 3)}...`);
    console.log('Auth initialized:', initialized);
    
    try {
      // Check for network
      if (typeof window !== 'undefined' && !navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      
      // Use API route to avoid CORS issues
      const query = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          email,
          password,
        },
      };
      
      console.log('Sending request to API route...');
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API route error:', errorData);
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      console.log('API response received');
      
      if (data.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
        const error = data.customerAccessTokenCreate.customerUserErrors[0];
        console.error('Customer error:', error);
        throw new Error(error.message);
      }
      
      if (!data.customerAccessTokenCreate?.customerAccessToken) {
        console.error('Missing token in response:', data);
        throw new Error('Authentication failed - no token received');
      }
      
      const { accessToken, expiresAt } = data.customerAccessTokenCreate.customerAccessToken;
      console.log('Token received, saving...');
      
      // Save token to localStorage and cookies
      localStorage.setItem('shopifyCustomerAccessToken', accessToken);
      localStorage.setItem('shopifyCustomerTokenExpiry', expiresAt);
      await setAuthCookies(accessToken, expiresAt);
      
      setCustomerAccessToken(accessToken);
      setIsAuthenticated(true);
      
      // Fetch customer data with the token
      await refreshCustomerData();
      console.log('Login process completed successfully');
    } catch (error: any) {
      console.error('Login error details:', error);
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
      // Use API route to avoid CORS issues
      const query = `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              firstName
              lastName
              email
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          firstName,
          lastName,
          email,
          password,
          phone,
          acceptsMarketing: true,
        },
      };
      
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }
      
      const data = await response.json();
      
      if (data.customerCreate?.customerUserErrors?.length > 0) {
        throw new Error(data.customerCreate.customerUserErrors[0].message);
      }
      
      // Login with the new credentials
      await login(email, password);
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    console.log('Logging out...');
    
    try {
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shopifyCustomerAccessToken');
        localStorage.removeItem('shopifyCustomerTokenExpiry');
        
        // For extra safety, check if items were actually removed
        const tokenCheck = localStorage.getItem('shopifyCustomerAccessToken');
        const expiryCheck = localStorage.getItem('shopifyCustomerTokenExpiry');
        if (tokenCheck || expiryCheck) {
          console.warn('Failed to remove items from localStorage:', { 
            tokenRemoved: !tokenCheck, 
            expiryRemoved: !expiryCheck 
          });
        }
      }
      
      // Clear from cookies
      try {
        const cookieResponse = await removeAuthCookies();
        console.log('Cookie removal response:', cookieResponse?.success ? 'Success' : 'Failed');
      } catch (cookieError) {
        console.error('Failed to remove auth cookies:', cookieError);
        // Continue despite cookie removal failure
      }
      
      // Clear state
      setCustomerAccessToken(null);
      setCustomer(null);
      setIsAuthenticated(false);
      setError(null);
      
      console.log('Logout completed successfully');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if there's an error, try to reset the auth state
      setCustomerAccessToken(null);
      setCustomer(null);
      setIsAuthenticated(false);
      
      return { success: false, error: 'An error occurred during logout' };
    }
  };

  // Refresh customer data function
  const refreshCustomerData = async () => {
    if (!customerAccessToken) {
      setError('Not authenticated');
      return;
    }
    
    setIsLoading(true);
    
    // Set a timeout to prevent infinite loading
    const refreshTimeout = setTimeout(() => {
      console.log('Refresh customer data timed out after 10 seconds');
      setIsLoading(false);
      setError('Data refresh timed out. Please try again later.');
    }, 10000); // 10 second timeout
    
    try {
      // Use API route to avoid CORS issues
      const query = `
        query getCustomer($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            email
            phone
            defaultAddress {
              id
              address1
              address2
              city
              province
              zip
              country
              phone
            }
            addresses(first: 10) {
              edges {
                node {
                  id
                  address1
                  address2
                  city
                  province
                  zip
                  country
                  phone
                }
              }
            }
            orders(first: 5) {
              edges {
                node {
                  id
                  orderNumber
                  processedAt
                  financialStatus
                  fulfillmentStatus
                  totalPrice {
                    amount
                    currencyCode
                  }
                  lineItems(first: 5) {
                    edges {
                      node {
                        title
                        quantity
                        variant {
                          price {
                            amount
                            currencyCode
                          }
                          image {
                            originalSrc
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        customerAccessToken,
      };
      
      console.log('Refreshing customer data...');
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
      });
      
      console.log('Refresh response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Refresh error data:', errorData);
        throw new Error(errorData.error || 'Failed to fetch customer data');
      }
      
      const data = await response.json();
      
      if (!data.customer) {
        console.error('No customer data in refresh response:', data);
        throw new Error('Customer data not found');
      }
      
      setCustomer(data.customer);
      console.log('Customer data refreshed successfully');
    } catch (error: any) {
      console.error('Error refreshing customer data:', error);
      setError(error.message || 'Failed to refresh customer data');
      
      // If the token is invalid, log out
      if (error.message?.includes('access token')) {
        console.log('Invalid token detected, logging out');
        await logout();
      }
    } finally {
      clearTimeout(refreshTimeout);
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const query = `
        mutation customerRecover($email: String!) {
          customerRecover(email: $email) {
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const variables = { email };
      
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password recovery failed');
      }
      
      const data = await response.json();
      
      if (data.customerRecover?.customerUserErrors?.length > 0) {
        throw new Error(data.customerRecover.customerUserErrors[0].message);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Password recovery error:', error);
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
      const query = `
        mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
          customerResetByUrl(resetUrl: $resetUrl, password: $password) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      // Shopify requires the full reset URL
      const resetUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account/reset/${resetToken}`;
      const variables = { resetUrl, password };
      
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password reset failed');
      }
      
      const data = await response.json();
      
      if (data.customerResetByUrl?.customerUserErrors?.length > 0) {
        throw new Error(data.customerResetByUrl.customerUserErrors[0].message);
      }
      
      const { accessToken, expiresAt } = data.customerResetByUrl.customerAccessToken;
      
      // Save token to localStorage and cookies
      localStorage.setItem('shopifyCustomerAccessToken', accessToken);
      localStorage.setItem('shopifyCustomerTokenExpiry', expiresAt);
      await setAuthCookies(accessToken, expiresAt);
      
      setCustomerAccessToken(accessToken);
      setIsAuthenticated(true);
      
      // Fetch customer data
      await refreshCustomerData();
    } catch (error: any) {
      console.error('Password reset error:', error);
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