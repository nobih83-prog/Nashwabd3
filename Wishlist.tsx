
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface WishlistProps {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  addToCart: (p: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist, toggleWishlist, addToCart }) => {
  const [sortBy, setSortBy] = useState('Date Added: Newest');

  const wishlistItems = useMemo(() => {
    // Get the base products in the order they exist in the wishlist array (which preserves addition order)
    const baseItems = wishlist.map(id => MOCK_PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[];

    if (sortBy === 'Price: Low to High') {
      return [...baseItems].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      return [...baseItems].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Date Added: Oldest') {
      return baseItems; // Original order is oldest first based on how we append in App.tsx
    } else {
      // Default: Date Added: Newest
      return [...baseItems].reverse();
    }
  }, [wishlist, sortBy]);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold mb-4 brand-font">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Save items you love to find them later and keep track of what you're eyeing!</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#065F46] text-white px-10 py-4 rounded-full font-bold hover:bg-[#047857] transition-all shadow-lg">
          <ArrowLeft size={20} /> Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 brand-font">My Wishlist</h1>
          <p className="text-gray-500">You have {wishlistItems.length} items saved in your collection.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
              <ArrowUpDown size={14} /> Sort By
            </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#065F46] w-full sm:w-auto border-gray-200 text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option>Date Added: Newest</option>
              <option>Date Added: Oldest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          
          <Link to="/shop" className="text-[#065F46] font-bold flex items-center gap-2 hover:underline whitespace-nowrap ml-auto">
            <ShoppingBag size={20} /> Back to Shopping
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {wishlistItems.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
