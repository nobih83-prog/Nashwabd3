
export interface VariationOption {
  label: string;
  priceModifier?: number;
  image?: string;
}

export interface Variation {
  name: string; // e.g., "Size", "Color"
  type: 'text' | 'color'; 
  options: VariationOption[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Clothing' | 'Accessories' | 'Jewelry' | 'Shoes';
  image: string;
  images?: string[]; 
  description: string;
  variations?: Variation[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number; // Added for RetailPro
  sku?: string; // Added for RetailPro
}

export interface CartItem extends Product {
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod?: string;
}
