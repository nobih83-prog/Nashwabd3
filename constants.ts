
import { Product } from './types';

export const COLORS = {
  primary: '#065F46', 
  accent: '#D97706', 
};

export const LOGO_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%23065F46" stroke="%23D97706" stroke-width="2"/><text x="50" y="65" font-family="Playfair Display, Georgia, serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">N</text></svg>`;

export const CONTACT_INFO = {
  name: "Nashwa",
  phone: "01718952852",
  email: "nobih83@gmail.com",
  address: "Dhaka, Bangladesh",
  facebookUrl: "https://www.facebook.com/damkotochai/"
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Embroidered Saree',
    price: 4500,
    category: 'Clothing',
    isNew: true,
    // Fix: Added required stock property
    stock: 25,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Beautifully handcrafted silk saree with intricate embroidery work.',
    variations: [
      {
        name: 'Size',
        type: 'text',
        options: [{ label: 'Standard', priceModifier: 0 }]
      }
    ]
  },
  {
    id: '2',
    name: 'Gold Plated Jhumka',
    price: 1200,
    category: 'Jewelry',
    isBestSeller: true,
    // Fix: Added required stock property
    stock: 15,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional gold-plated jhumka earrings for elegant occasions.'
  },
  {
    id: '3',
    name: 'Luxury Designer Bag',
    price: 5500,
    category: 'Accessories',
    isBestSeller: true,
    isNew: true,
    // Fix: Added required stock property
    stock: 10,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
    description: 'A masterpiece of structural design and premium leather.'
  },
  {
    id: '4',
    name: 'Chiffon Party Wear',
    price: 3800,
    category: 'Clothing',
    isNew: true,
    // Fix: Added required stock property
    stock: 30,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
    description: 'Flowy chiffon dress perfect for evening gatherings.'
  },
  {
    id: '5',
    name: 'Pearl Necklace Set',
    price: 1800,
    category: 'Jewelry',
    isBestSeller: true,
    // Fix: Added required stock property
    stock: 20,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant freshwater pearl necklace with matching earrings.'
  },
  {
    id: '6',
    name: 'Stiletto Heels',
    price: 3200,
    category: 'Shoes',
    isBestSeller: true,
    // Fix: Added required stock property
    stock: 12,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek black stilettos with comfortable cushioning.'
  },
  {
    id: '7',
    name: 'Silk Evening Scarf',
    price: 850,
    category: 'Accessories',
    isNew: true,
    // Fix: Added required stock property
    stock: 45,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious silk scarf with botanical prints.'
  },
  {
    id: '8',
    name: 'Hand-woven Tote Bag',
    price: 1800,
    category: 'Accessories',
    // Fix: Added required stock property
    stock: 8,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-friendly and stylish hand-woven tote.'
  }
];
