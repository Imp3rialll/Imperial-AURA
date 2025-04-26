'use client';

import { useState, useEffect } from 'react';
import { useShopifyAuth } from '../../../../lib/ShopifyContext';
import Link from 'next/link';

export default function TestAuth() {
  const { isAuthenticated, isLoading, customer, error } = useShopifyAuth();
  const [envInfo, setEnvInfo] = useState<any>({});
  const [localStorage, setLocalStorage] = useState<any>({});
  
  useEffect(() => {
    // Check environment variables (only public ones are accessible)
    setEnvInfo({
      shopifyDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? 'Set' : 'Not set',
      shopifyToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Set' : 'Not set',
      nodeEnv: process.env.NODE_ENV,
    });
    
    // Check localStorage
    if (typeof window !== 'undefined') {
      setLocalStorage({
        token: window.localStorage.getItem('shopifyCustomerAccessToken') ? 'Present' : 'Not found',
        expiry: window.localStorage.getItem('shopifyCustomerTokenExpiry'),
      });
    }
  }, []);
  
  // Test API connection
  const [apiStatus, setApiStatus] = useState<string>('Not tested');
  const [apiResponse, setApiResponse] = useState<any>(null);
  
  const testApiConnection = async () => {
    setApiStatus('Testing...');
    try {
      const response = await fetch('/api/auth/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              shop {
                name
              }
            }
          `,
          variables: {}
        }),
      });
      
      const data = await response.json();
      setApiResponse(data);
      setApiStatus(response.ok ? 'Success' : 'Failed');
    } catch (error: any) {
      setApiStatus('Error');
      setApiResponse({ error: error.message });
    }
  };
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Auth Status</h2>
        <div className="space-y-2">
          <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
        <div className="space-y-2">
          <p><strong>NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:</strong> {envInfo.shopifyDomain}</p>
          <p><strong>NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:</strong> {envInfo.shopifyToken}</p>
          <p><strong>NODE_ENV:</strong> {envInfo.nodeEnv}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">LocalStorage</h2>
        <div className="space-y-2">
          <p><strong>Token:</strong> {localStorage.token}</p>
          <p><strong>Expiry:</strong> {localStorage.expiry || 'Not found'}</p>
          {localStorage.expiry && (
            <p><strong>Expired:</strong> {new Date(localStorage.expiry) < new Date() ? 'Yes' : 'No'}</p>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Test API Connection</h2>
        <button 
          onClick={testApiConnection}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
        >
          Test Connection
        </button>
        <p><strong>Status:</strong> {apiStatus}</p>
        {apiResponse && (
          <div className="mt-4">
            <h3 className="font-semibold">Response:</h3>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto text-xs">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      {isAuthenticated && customer && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>ID:</strong> {customer.id}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Link href="/account/login" className="text-purple-600 hover:underline mr-4">
          Go to Login
        </Link>
        <Link href="/account" className="text-purple-600 hover:underline">
          Go to Account
        </Link>
      </div>
    </div>
  );
} 