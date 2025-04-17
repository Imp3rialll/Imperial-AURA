'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, MOCK_USER, User } from '../hooks/useAuth';

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    // In a real implementation, you would check for an existing token in localStorage
    // or cookies and validate it against your backend
    const checkExistingSession = async () => {
      try {
        // For development, we'll simulate a logged-in user
        // In production, you would verify the token with your backend
        if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
          setUser(MOCK_USER);
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to your auth endpoint
      // and receive a token and user data in response
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      if (email === MOCK_USER.email && password === 'password') {
        setUser(MOCK_USER);
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', 'mock-token-123');
        }
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // In a real app, you would make an API call to invalidate the token
      
      // Remove token and user data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'An error occurred during sign out' };
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to register the user
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always "succeed" in development
      const newUser: User = {
        id: 'new-user-' + Date.now(),
        firstName,
        lastName,
        email,
        imageUrl: '/images/avatars/default.png',
      };
      
      setUser(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
      }
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An error occurred during sign up' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 