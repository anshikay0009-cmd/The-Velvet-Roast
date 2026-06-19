/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'bakery' | 'mains' | 'desserts';
  rating: number; // e.g. 9.4
  image: string;
  tags: ('Vegan' | 'Gluten-Free' | 'Signature' | 'Best-Seller' | 'Organic' | 'Refined-Sugar-Free')[];
  prepTime: string; // e.g. "5 mins"
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'outdoor' | 'window';
  tableId: string;
  specialRequests?: string;
  preOrders: { menuItemId: string; quantity: number }[];
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface CafeTable {
  id: string;
  name: string;
  capacity: number;
  zone: 'indoor' | 'outdoor' | 'window';
  isBooked: boolean;
  // Relative position coordinates for interactive visual seating map
  row: number;
  col: number;
}

export interface UGCPost {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  tags: string[];
}
