import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Settings } from "lucide-react";

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

interface AddressesTabProps {
  loading: boolean;
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (addressId: string) => void;
}

export function AddressesTab({ 
  loading, 
  addresses, 
  onAddAddress,
  onEditAddress
}: AddressesTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipping Addresses</CardTitle>
          <CardDescription>Manage your shipping addresses</CardDescription>
        </div>
        <Button size="sm" onClick={onAddAddress}>
          Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{address.name}</CardTitle>
                    {address.isDefault && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onEditAddress(address.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm">{address.street}</p>
                  <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                  <p className="text-sm">{address.country}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No addresses saved</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a shipping address to make checkout faster.
            </p>
            <Button className="mt-4" onClick={onAddAddress}>
              Add Address
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 