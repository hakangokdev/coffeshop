export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  availability: boolean;
  rating: number;
  reviewCount: number;
  size?: ProductSize[];
}

export interface ProductSize {
  name: string;
  price: number;
  calories?: number;
}

export interface NutritionalInfo {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  sugar: number;
  caffeine?: number;
}

export enum ProductCategory {
  COFFEE = 'coffee',
  TEA = 'tea',
  COLD_DRINKS = 'cold_drinks',
  PASTRIES = 'pastries',
  SANDWICHES = 'sandwiches',
  DESSERTS = 'desserts',
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
  customizations?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favoriteProducts: string[];
  orderHistory: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum DeliveryType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
  DINE_IN = 'dine_in',
} 