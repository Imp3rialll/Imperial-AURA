'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AccountPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-medium mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Account
        </motion.h1>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              We're in the process of integrating with Shopify for a seamless shopping experience.
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Soon, you'll be able to manage your orders, profile, and preferences here.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="border border-gray-200 p-6 rounded-lg hover:border-purple-400 transition-colors">
              <h3 className="text-xl font-medium mb-4">Orders</h3>
              <p className="text-gray-600 mb-4">
                View your order history and track current orders.
              </p>
              <span className="text-purple-700 font-medium">Coming soon</span>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-lg hover:border-purple-400 transition-colors">
              <h3 className="text-xl font-medium mb-4">Profile</h3>
              <p className="text-gray-600 mb-4">
                Manage your personal information and preferences.
              </p>
              <span className="text-purple-700 font-medium">Coming soon</span>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-lg hover:border-purple-400 transition-colors">
              <h3 className="text-xl font-medium mb-4">Addresses</h3>
              <p className="text-gray-600 mb-4">
                Add and manage your shipping addresses.
              </p>
              <span className="text-purple-700 font-medium">Coming soon</span>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-lg hover:border-purple-400 transition-colors">
              <h3 className="text-xl font-medium mb-4">Wishlist</h3>
              <p className="text-gray-600 mb-4">
                View and manage your saved items.
              </p>
              <span className="text-purple-700 font-medium">Coming soon</span>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 