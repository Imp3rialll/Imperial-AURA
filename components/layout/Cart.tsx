"use client";

import React from 'react';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DevelopmentBanner from '@/components/ui/development-banner';

const Cart = () => {
  const { items, totalPrice, removeItem, updateQuantity, clearCart, isCartOpen, toggleCart } = useCart();
  const router = useRouter();
  
  const handleRemoveItem = (productId: string, size?: string, color?: string) => {
    removeItem(productId, size, color);
  };
  
  const handleUpdateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity, size, color);
  };
  
  const handleCloseCart = () => {
    toggleCart();
  };

  const handleCheckout = () => {
    handleCloseCart(); // Close the cart
    router.push('/checkout'); // Navigate to checkout
  };
  
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay with smooth fade transition */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-500 ease-in-out"
        onClick={handleCloseCart}
      />
      
      {/* Cart Panel with smooth slide animation */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto animate-slide-in transition-transform duration-500 ease-in-out">
        <DevelopmentBanner message="You are in Shopify development portal - Cart" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-black">Shopping Cart</h2>
            <button
              className="text-2xl text-black hover:text-primary transition-colors"
              onClick={handleCloseCart}
            >
              ✕
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => {
                  const itemSubtotal = Number((item.price * item.quantity).toFixed(2));
                  return (
                    <div key={item.productId} className="flex items-center py-4 border-b border-gray-200">
                      <div className="relative w-20 h-20 mr-4 bg-gray-100">
                        <Image
                          src={item.imageUrl || '/placeholder.jpg'}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-black">{item.name}</h3>
                        {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                        {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                        <p className="text-xs text-gray-500">₹{item.price.toFixed(2)} × {item.quantity}</p>
                        <p className="text-sm font-medium text-primary">₹{itemSubtotal}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          className={`w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-primary hover:text-primary transition-colors ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-primary hover:text-primary transition-colors"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="ml-4 text-gray-500 hover:text-primary transition-colors"
                        onClick={() => handleRemoveItem(item.productId, item.size, item.color)}
                      >
                        <span className="sr-only">Remove</span>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">₹{Number(totalPrice).toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                <button 
                  className="w-full py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <button 
                  className="w-full py-3 mt-2 border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                  onClick={handleCloseCart}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 