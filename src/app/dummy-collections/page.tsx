'use client';

import React from 'react';
import Link from 'next/link';
import { products as dummyProducts, ProductData } from '../../../lib/dummyData';
import DummyProductCard from '../../../components/sections/ProductCard';
import { motion } from 'framer-motion';

export default function DummyCollectionsPage() {
  // Group products by collection
  const productsByCollection: Record<string, ProductData[]> = {};
  
  dummyProducts.forEach(product => {
    if (!productsByCollection[product.collection]) {
      productsByCollection[product.collection] = [];
    }
    productsByCollection[product.collection].push(product);
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Dummy Collections</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Explore our exclusive demo collections showcasing our unique designs and premium quality.
        </p>
      </motion.div>
      
      {Object.entries(productsByCollection).map(([collection, products]) => (
        <motion.div 
          key={collection}
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="border-b border-gray-200 mb-6 pb-2 flex justify-between items-end">
            <h2 className="text-2xl font-semibold text-gray-900">{collection}</h2>
            <Link 
              href={`/collections/${collection.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-purple-700 hover:text-purple-900 transition-colors"
            >
              View Collection
            </Link>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {products.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <DummyProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
      
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Find Your Style</h2>
          <p className="text-gray-600">Explore our diverse collections and find the perfect pieces to express your unique style.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600">Each piece crafted with attention to detail and premium materials.</p>
          </div>
          
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Exclusive Designs</h3>
            <p className="text-sm text-gray-600">Unique styles you won't find anywhere else in limited quantities.</p>
          </div>
          
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Personal Style</h3>
            <p className="text-sm text-gray-600">Express yourself with our carefully curated selection of unique pieces.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 