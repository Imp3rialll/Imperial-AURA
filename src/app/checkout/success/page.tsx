'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Package, Home } from 'lucide-react';

// Loading fallback component
function LoadingCheckout() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="animate-pulse">
          <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-8" />
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4" /> 
          <div className="h-6 bg-gray-200 rounded-lg w-5/6 mx-auto mb-6" />
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 h-48" />
              <div className="border border-gray-200 rounded-lg p-4 h-48" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="h-12 w-40 bg-gray-200 rounded-lg" />
            <div className="h-12 w-40 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Static component for build time
function StaticCheckoutSuccess() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Order Confirmation</h1>
        
        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">What&apos;s Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-700 mx-auto mb-4">
                <Package />
              </div>
              <h3 className="text-lg font-medium mb-2">Order Processing</h3>
              <p className="text-gray-600">
                We&apos;re preparing your order for shipment. You&apos;ll receive an email with tracking 
                information once your order ships.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-700 mx-auto mb-4">
                <Home />
              </div>
              <h3 className="text-lg font-medium mb-2">Delivery</h3>
              <p className="text-gray-600">
                Standard delivery takes 3-5 business days. Premium shipping takes 1-2 business days.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center space-x-2 bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800 transition-colors"
          >
            <span>Return Home</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function CheckoutSuccessPage() {
  // During SSR/build, use static version
  if (typeof window === 'undefined') {
    return <StaticCheckoutSuccess />;
  }
  
  // In the browser, load the dynamic version
  return (
    <Suspense fallback={<LoadingCheckout />}>
      <StaticCheckoutSuccess />
    </Suspense>
  );
} 