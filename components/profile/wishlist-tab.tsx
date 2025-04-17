import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistTabProps {
  loading: boolean;
  wishlistItems: WishlistItem[];
  onAddToCart: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
}

export function WishlistTab({ 
  loading, 
  wishlistItems,
  onAddToCart,
  onRemoveItem
}: WishlistTabProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Items you've saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 relative h-16 w-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {imageErrors[item.id] ? (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  ) : (
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority={false}
                      onError={() => handleImageError(item.id)}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-purple-700">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => onAddToCart(item.id)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">
              Items added to your wishlist will show here.
            </p>
            <Button className="mt-4">
              Browse Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 