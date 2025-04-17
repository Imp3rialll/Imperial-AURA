import { useClerk, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileHeaderProps {
  loading?: boolean;
}

export function ProfileHeader({ loading = false }: ProfileHeaderProps) {
  const clerk = useClerk();
  const { user } = useUser();
  
  if (!user && !loading) return null;
  
  const userInitials = user?.firstName 
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`
    : 'U';
    
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        {loading ? (
          <Skeleton className="h-10 w-24" />
        ) : (
          <Button variant="outline" onClick={() => clerk.signOut()}>
            Sign Out
          </Button>
        )}
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {loading ? (
              <Skeleton className="h-20 w-20 rounded-full" />
            ) : (
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl} alt={user?.firstName || 'User'} />
                <AvatarFallback className="text-lg bg-purple-100 text-purple-700">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-purple-700"
                    onClick={() => clerk.openUserProfile()}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 