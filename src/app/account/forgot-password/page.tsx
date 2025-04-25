'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useShopifyAuth } from '../../../../lib/ShopifyContext';
import DevelopmentBanner from '../../../components/ui/development-banner';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error: contextError } = useShopifyAuth();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.');
    }
  };
  
  return (
    <>
      <DevelopmentBanner message="You are in Shopify development portal - Forgot Password" />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.h1 
            className="text-3xl font-medium mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Reset Your Password
          </motion.h1>
          
          <motion.p
            className="text-gray-600 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </motion.p>
          
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {success ? (
              <div className="text-center">
                <svg 
                  className="h-16 w-16 text-green-500 mx-auto mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-xl font-medium mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6">
                  If an account exists with {email}, you will receive a password reset link shortly.
                </p>
                <Link 
                  href="/account/login"
                  className="text-purple-700 hover:text-purple-900 font-medium"
                >
                  Return to login
                </Link>
              </div>
            ) : (
              <>
                {(error || contextError) && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm">
                    {error || contextError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
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
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-md bg-purple-700 text-white font-medium text-center ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'
                    } transition-colors`}
                  >
                    {isLoading ? 'Sending...' : 'Reset Password'}
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <Link href="/account/login" className="text-purple-700 hover:text-purple-800">
                    Back to Login
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
} 