import { useClerk } from '@clerk/nextjs';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from 'react';

interface EmailPreference {
  id: string;
  name: string;
  enabled: boolean;
}

interface SettingsTabProps {
  emailPreferences: EmailPreference[];
  onUpdateEmailPreferences: (preferences: EmailPreference[]) => void;
  onDeleteAccount: () => void;
}

export function SettingsTab({ 
  emailPreferences,
  onUpdateEmailPreferences,
  onDeleteAccount
}: SettingsTabProps) {
  const clerk = useClerk();
  const [preferences, setPreferences] = useState<EmailPreference[]>(emailPreferences);
  
  const handlePreferenceChange = (id: string, checked: boolean) => {
    const updatedPreferences = preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: checked } : pref
    );
    setPreferences(updatedPreferences);
    onUpdateEmailPreferences(updatedPreferences);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <p className="text-sm text-gray-500 mb-4">
            Update your personal details and how we can reach you
          </p>
          <Button onClick={() => clerk.openUserProfile()}>
            Manage Profile
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Password & Security</h3>
          <p className="text-sm text-gray-500 mb-4">
            Manage your password and security settings
          </p>
          <Button variant="outline" onClick={() => clerk.openUserProfile()}>
            Security Settings
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Email Preferences</h3>
          <p className="text-sm text-gray-500 mb-4">
            Manage the emails you want to receive
          </p>
          <div className="space-y-2">
            {preferences.map((preference) => (
              <div key={preference.id} className="flex items-center justify-between">
                <label htmlFor={preference.id} className="text-sm font-medium">
                  {preference.name}
                </label>
                <input 
                  id={preference.id}
                  type="checkbox" 
                  checked={preference.enabled}
                  onChange={(e) => handlePreferenceChange(preference.id, e.target.checked)}
                  className="accent-purple-700" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium text-red-600 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all associated data
          </p>
          <Button 
            variant="destructive"
            onClick={onDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 