'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

type AddToCartButtonProps = {
  productId: string;
  initialQuantity?: number;
};

export default function AddToCartButton({ productId, initialQuantity = 1 }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await addToCart(productId, quantity);
      // Success message can be shown here if needed
    } catch (err: any) {
      setError(err.message || 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-900"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || loading}
          >
            -
          </button>
          <span className="px-3 py-2 text-gray-900 min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-900"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10 || loading}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 