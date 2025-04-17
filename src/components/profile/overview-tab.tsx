import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, MapPin, Heart } from "lucide-react";
import { TabValue } from "./types";

// Types for the mock data
interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OverviewTabProps {
  loading: boolean;
  orders: Order[];
  addresses: Address[];
  wishlistItems: WishlistItem[];
  onTabChange: (tab: TabValue) => void;
}

export function OverviewTab({
  loading,
  orders,
  addresses,
  wishlistItems,
  onTabChange
}: OverviewTabProps) {
  const defaultAddress = addresses.find(a => a.isDefault);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Your account dashboard at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-700" />
                <CardTitle className="text-base">Recent Orders</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : orders.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-500">Last order: {orders[0].date}</p>
                  <p className="font-medium">{orders[0].id}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                variant="link" 
                className="p-0 h-auto text-purple-700" 
                onClick={() => onTabChange("orders")}
              >
                View All Orders
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-700" />
                <CardTitle className="text-base">Shipping Address</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : defaultAddress ? (
                <div>
                  <p className="font-medium">{defaultAddress.name}</p>
                  <p className="text-sm text-gray-500 truncate">{defaultAddress.street}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No default address</p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                variant="link" 
                className="p-0 h-auto text-purple-700" 
                onClick={() => onTabChange("addresses")}
              >
                Manage Addresses
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-700" />
                <CardTitle className="text-base">Wishlist</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
                <p className="text-sm text-gray-500">{wishlistItems.length} items saved</p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                variant="link" 
                className="p-0 h-auto text-purple-700" 
                onClick={() => onTabChange("wishlist")}
              >
                View Wishlist
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
} 