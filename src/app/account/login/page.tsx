'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useShopifyAuth } from '../../../../lib/ShopifyContext';
import DevelopmentBanner from '../../../components/ui/development-banner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { login } = useShopifyAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Check if we're online first
      if (typeof window !== 'undefined' && !navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      
      // Development mode convenience - use test credentials
      const loginEmail = process.env.NODE_ENV === 'development' ? 
        'test@example.com' : email;
      const loginPassword = process.env.NODE_ENV === 'development' ? 
        'password123' : password;
        
      console.log('Attempting login...');
      await login(loginEmail, loginPassword);
      
      console.log('Login successful, redirecting...');
      router.push('/account');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more helpful error messages
      if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError('Connection error. Please check your internet connection and try again.');
      } else if (err.message?.includes('customer') && err.message?.includes('not found')) {
        setError('Account not found. Please check your email or create a new account.');
      } else if (err.message?.includes('password')) {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (err.message?.includes('timeout')) {
        setError('Login request timed out. Please try again later.');
      } else if (err.message?.includes('Missing Shopify API configuration')) {
        setError('Server configuration error. Please contact support.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <DevelopmentBanner message="You are in Shopify development portal - Login" />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.h1 
            className="text-3xl font-medium mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sign In to Your Account
          </motion.h1>
          
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm">
                <p className="mb-2">{error}</p>
                {error.includes('connection') && (
                  <p className="text-xs">
                    <Link href="/account/test" className="underline">
                      Visit the diagnostic page
                    </Link> to check API connectivity.
                  </p>
                )}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/account/forgot-password" className="text-sm text-purple-700 hover:text-purple-800">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md bg-purple-700 text-white font-medium text-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'
                } transition-colors`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/account/register" className="text-purple-700 hover:text-purple-800 font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 