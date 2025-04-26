'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useShopifyAuth } from '../../../lib/ShopifyContext';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Package, User, MapPin, Heart, LogOut, Loader2 } from 'lucide-react';
import DevelopmentBanner from '@/components/ui/development-banner';

// Define types for order node and address node
interface OrderNode {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

interface AddressNode {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
}

export default function AccountPage() {
  const { isAuthenticated, isLoading, customer, logout, refreshCustomerData } = useShopifyAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle refresh of customer data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshCustomerData();
    } finally {
      setRefreshing(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/account/login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <DevelopmentBanner />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center mb-6">
            <Loader2 className="h-12 w-12 text-purple-700 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Loading your account...</p>
          </div>
          
          {/* Add debug information */}
          <div className="mt-8 text-gray-500 text-sm max-w-md">
            <p>If this message persists for more than a few seconds:</p>
            <ol className="list-decimal pl-6 mt-2">
              <li className="mb-2">Check if you're logged in. If not, please <Link href="/account/login" className="text-purple-600 hover:underline">sign in</Link>.</li>
              <li className="mb-2">Visit the <Link href="/account/test" className="text-purple-600 hover:underline">test page</Link> to diagnose connection issues.</li>
              <li className="mb-2">Try clearing your browser cache and cookies.</li>
            </ol>
            <button 
              onClick={() => router.push('/account/login')}
              className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }
  
  // Show not authenticated state
  if (!isAuthenticated) {
    return (
      <>
        <DevelopmentBanner />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium mb-4">Not logged in</h2>
            <p className="text-gray-600 mb-6">Please log in to view your account details.</p>
            <button 
              onClick={() => router.push('/account/login')}
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DevelopmentBanner />
      <div className="min-h-screen py-12 px-4 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-medium mb-2">My Account</h1>
              {customer && (
                <p className="text-gray-600">
                  Welcome back, {customer.firstName} {customer.lastName}
                </p>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="flex items-center text-sm text-purple-700 hover:text-purple-900"
              >
                {refreshing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </button>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200">
                <TabsList className="flex w-full h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="overview" 
                    className={`flex-1 py-4 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "overview" 
                        ? "border-purple-700 text-purple-700" 
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="orders" 
                    className={`flex-1 py-4 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "orders" 
                        ? "border-purple-700 text-purple-700" 
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Orders
                  </TabsTrigger>
                  <TabsTrigger 
                    value="addresses" 
                    className={`flex-1 py-4 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "addresses" 
                        ? "border-purple-700 text-purple-700" 
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Addresses
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wishlist" 
                    className={`flex-1 py-4 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "wishlist" 
                        ? "border-purple-700 text-purple-700" 
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Wishlist
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Profile Information */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <User className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Profile Information</h3>
                        <p className="text-sm text-gray-600">Manage your personal details</p>
                      </div>
                    </div>
                    
                    {customer && (
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button className="text-sm text-purple-700 font-medium hover:text-purple-900">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Recent Orders */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Package className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Recent Orders</h3>
                        <p className="text-sm text-gray-600">Track your recent purchases</p>
                      </div>
                    </div>
                    
                    {customer && customer.orders && customer.orders.edges.length > 0 ? (
                      <div className="space-y-4">
                        {customer.orders.edges.slice(0, 3).map(({ node }) => (
                          <div key={node.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Order #{node.orderNumber}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                node.financialStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {node.financialStatus}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {new Date(node.processedAt).toLocaleDateString()}
                              </span>
                              <p className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-medium">
                                  ₹{parseFloat(node.totalPrice.amount).toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <button 
                          onClick={() => setActiveTab("orders")}
                          className="text-sm text-purple-700 font-medium hover:text-purple-900"
                        >
                          View All Orders
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                        <Link
                          href="/collections"
                          className="text-sm bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors"
                        >
                          Browse Collections
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  {/* Default Address */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Default Address</h3>
                        <p className="text-sm text-gray-600">Your shipping address</p>
                      </div>
                    </div>
                    
                    {customer && customer.defaultAddress ? (
                      <div className="mb-4">
                        <p className="mb-1">{customer.firstName} {customer.lastName}</p>
                        <p className="mb-1">{customer.defaultAddress.address1}</p>
                        {customer.defaultAddress.address2 && <p className="mb-1">{customer.defaultAddress.address2}</p>}
                        <p className="mb-1">
                          {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
                        </p>
                        <p>{customer.defaultAddress.country}</p>
                        {customer.defaultAddress.phone && <p className="mt-1">{customer.defaultAddress.phone}</p>}
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="text-gray-500">No default address set</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        onClick={() => setActiveTab("addresses")}
                        className="text-sm text-purple-700 font-medium hover:text-purple-900"
                      >
                        Manage Addresses
                      </button>
                    </div>
                  </div>
                  
                  {/* Account Settings */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <svg className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Account Settings</h3>
                        <p className="text-sm text-gray-600">Manage your account preferences</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <button className="w-full text-left flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">Change Password</span>
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-full text-left flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">Email Preferences</span>
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left flex justify-between items-center py-2 text-red-600 hover:text-red-800"
                      >
                        <span>Log Out</span>
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="p-6">
                <h3 className="text-xl font-medium mb-6">Order History</h3>
                
                {customer && customer.orders && customer.orders.edges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {customer.orders.edges.map(({ node }) => (
                          <tr key={node.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              #{node.orderNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(node.processedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                                node.financialStatus === 'PAID' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {node.financialStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <p className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-medium">
                                  ₹{parseFloat(node.totalPrice.amount).toFixed(2)}
                                </span>
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-purple-700 hover:text-purple-900">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-gray-200 rounded-lg">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                    <p className="text-gray-500 mb-6">When you place orders, they will appear here</p>
                    <Link
                      href="/collections"
                      className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="addresses" className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium">Your Addresses</h3>
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800 transition-colors">
                    Add New Address
                  </button>
                </div>
                
                {customer && customer.addresses && customer.addresses.edges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {customer.addresses.edges.map(({ node }) => (
                      <div key={node.id} className="border border-gray-200 rounded-lg p-6 relative">
                        {customer.defaultAddress && customer.defaultAddress.id === node.id && (
                          <span className="absolute top-2 right-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <p className="font-medium mb-1">{customer.firstName} {customer.lastName}</p>
                        <p className="mb-1">{node.address1}</p>
                        {node.address2 && <p className="mb-1">{node.address2}</p>}
                        <p className="mb-1">
                          {node.city}, {node.province} {node.zip}
                        </p>
                        <p>{node.country}</p>
                        {node.phone && <p className="mt-1">{node.phone}</p>}
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4">
                          <button className="text-sm text-purple-700 hover:text-purple-900">
                            Edit
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-900">
                            Delete
                          </button>
                          {customer.defaultAddress && customer.defaultAddress.id !== node.id && (
                            <button className="text-sm text-gray-600 hover:text-gray-900">
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-gray-200 rounded-lg">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h4>
                    <p className="text-gray-500 mb-6">Add an address to make checkout easier</p>
                    <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors">
                      Add Your First Address
                    </button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="wishlist" className="p-6">
                <h3 className="text-xl font-medium mb-6">Your Wishlist</h3>
                
                <div className="text-center py-12 border border-gray-200 rounded-lg">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h4>
                  <p className="text-gray-500 mb-6">Save your favorite items to purchase later</p>
                  <Link
                    href="/collections"
                    className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors"
                  >
                    Explore Collections
                  </Link>
                </div>
                
                {/* Future implementation for wishlist items */}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
} 