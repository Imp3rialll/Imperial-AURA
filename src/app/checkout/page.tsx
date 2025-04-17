'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

// Define types for form fields
type ShippingAddress = {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  
  // Simple auth state (in a real app, this would be connected to your authentication system)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate additional costs
  const taxes = totalPrice * 0.18;
  const shippingCost = totalPrice > 5000 ? 0 : 299;
  const orderTotal = totalPrice + taxes + shippingCost;
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you'd create an order on your backend
      // Since we're using mock data, we'll simulate this
      const orderNumber = `ORD-${Date.now()}`;
      
      // Simulate Razorpay integration
      // In a real app, this would come from your backend
      const razorpayOrderId = `rzp_order_${Date.now()}`;
      const amountInPaise = Math.round(orderTotal * 100);
      
      // Set up Razorpay options
      const options = {
        key: "rzp_test_2ARlXKeAoxqQ2T", // Your Razorpay Key ID from .env
        amount: amountInPaise,
        currency: 'INR',
        name: 'Imperial Aura',
        description: `Order #${orderNumber}`,
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            // In a real app, you'd verify the payment with your backend
            console.log('Payment successful', response);
            
            // Clear the cart and redirect to success page
            await clearCart();
            router.push(`/checkout/success?orderId=${orderNumber}`);
          } catch (err: any) {
            setError(err.message || 'Payment verification failed');
            setLoading(false);
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
        },
        theme: {
          color: '#6B21A8',
        },
      };
      
      // Initialize Razorpay
      if (typeof window.Razorpay !== 'undefined') {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setLoading(false);
      } else {
        setError('Razorpay failed to load. Please try again.');
        setLoading(false);
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
      setLoading(false);
    }
  };
  
  if (items.length === 0) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shopping Cart Summary */}
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {items.map((item) => {
                    const itemSubtotal = item.price * item.quantity;
                    return (
                      <div key={item.productId} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                            {item.size && ` | Size: ${item.size}`}
                            {item.color && ` | Color: ${item.color}`}
                          </p>
                        </div>
                        <p className="font-medium">₹{itemSubtotal.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <p>Subtotal</p>
                    <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Taxes (18% GST)</p>
                    <p className="font-medium">₹{taxes.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Shipping</p>
                    <p className="font-medium">{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                    <p>Total</p>
                    <p>₹{orderTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Information Form */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={address.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={address.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    required
                    value={address.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={address.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={address.state}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={address.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={address.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded bg-purple-700 text-white font-medium ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'
                  } transition-colors`}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 