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
    
    try {
      // Check for token in localStorage first
      const storedToken = localStorage.getItem('shopifyCustomerAccessToken');
      const tokenExpiry = localStorage.getItem('shopifyCustomerTokenExpiry');
      
      if (!storedToken || !tokenExpiry) {
        return;
      }
      
      // Check if token is expired
      const expiry = new Date(tokenExpiry);
      if (expiry < new Date()) {
        // Token is expired, log out
        await logout();
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
        
        const response = await fetch('/api/auth/shopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to load customer data');
        }
        
        const data = await response.json();
        if (data.customer) {
          setCustomer(data.customer);
        } else {
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
      
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch customer data');
      }
      
      const data = await response.json();
      setCustomer(data.customer);
    } catch (error: any) {
      console.error('Error refreshing customer data:', error);
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