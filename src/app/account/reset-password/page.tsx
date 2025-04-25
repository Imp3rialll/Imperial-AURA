'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useShopifyAuth } from '../../../../lib/ShopifyContext';
import DevelopmentBanner from '../../../components/ui/development-banner';

// Client component to handle search params
function ResetPasswordContent() {
  const { resetPassword, isLoading, error: contextError } = useShopifyAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const token = searchParams.get('token');
  
  useEffect(() => {
    // Validate that we have a token
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user types
    setValidationError(null);
  };
  
  const validatePasswords = () => {
    if (passwords.newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return false;
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords() || !token) {
      return;
    }
    
    setError(null);
    
    try {
      await resetPassword(token, passwords.newPassword);
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/account/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    }
  };
  
  return (
    <>
      <DevelopmentBanner message="You are in Shopify development portal - Reset Password" />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.h1 
            className="text-3xl font-medium mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Set New Password
          </motion.h1>
          
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {(error || contextError) && !isLoading && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                <p>{error || contextError}</p>
                <p className="mt-2">
                  <Link href="/account/forgot-password" className="text-red-700 font-medium underline">
                    Request a new reset link
                  </Link>
                </p>
              </div>
            )}
            
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
                <h3 className="text-xl font-medium mb-2">Password Reset Successful</h3>
                <p className="text-gray-600 mb-6">
                  Your password has been updated. You will be redirected to the login page.
                </p>
                <Link 
                  href="/account/login"
                  className="text-purple-700 hover:text-purple-900 font-medium"
                >
                  Go to login now
                </Link>
              </div>
            ) : (
              <>
                {!error && !contextError && (
                  <form onSubmit={handleSubmit}>
                    {validationError && (
                      <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm">
                        {validationError}
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Confirm new password"
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
                      {isLoading ? 'Updating...' : 'Reset Password'}
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 px-4">
        <DevelopmentBanner message="You are in Shopify development portal - Reset Password" />
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

// This tells Next.js this is a dynamic route that should be rendered at request time
export const dynamic = 'force-dynamic'; 