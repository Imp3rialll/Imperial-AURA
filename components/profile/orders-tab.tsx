import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

interface OrdersTabProps {
  loading: boolean;
  orders: Order[];
}

export function OrdersTab({ loading, orders }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{order.status}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 flex flex-col items-end">
                  <p className="font-medium">₹{order.total.toFixed(2)}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              When you place an order, it will appear here.
            </p>
            <Button className="mt-4" variant="default">
              Browse Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 