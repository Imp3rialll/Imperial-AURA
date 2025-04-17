export interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface EmailPreference {
  id: string;
  name: string;
  enabled: boolean;
}

export type TabValue = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings'; 