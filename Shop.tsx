import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, Grid, List, ChevronRight, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

interface ShopProps {
  addToCart: (p: Product, quantity?: number) => void;
  searchQuery?: string;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart, searchQuery = '', wishlist, toggleWishlist }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';
  const filterType = searchParams.get('filter'); // 'new' or 'best'
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('Featured');
  const [priceRange, setPriceRange] = useState(10000);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'All');
  }, [searchParams]);

  const categories = ['All', 'Clothing', 'Jewelry', 'Accessories', 'Shoes'];

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    
    // Filter by Special Type (New/Best)
    if (filterType === 'new') {
      result = result.filter(p => p.isNew);
    } else if (filterType === 'best') {
      result = result.filter(p => p.isBestSeller);
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }
    
    // Filter by Price
    result = result.filter(p => p.price <= priceRange);
    
    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      // Fix: variable 'p' was undefined in the sort callback; changed to 'a'.
      result.sort((a, b) => (a.isNew ? -1 : 1));
    }
    
    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery, filterType]);

  const pageTitle = useMemo(() => {
    if (filterType === 'new') return 'New Arrivals';
    if (filterType === 'best') return 'Best Sellers';
    return selectedCategory === 'All' ? 'Collection' : selectedCategory;
  }, [filterType, selectedCategory]);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
            <Link to="/" className="hover:text-[#065F46]">Home</Link>
            <ChevronRight size={10} />
            <span className="text-gray-900 font-black">{pageTitle}</span>
          </div>
          <h1 className="text-5xl font-black brand-font text-gray-900 mb-4 uppercase tracking-[0.1em]">
            {pageTitle}
          </h1>
          <p className="text-gray-500 max-w-2xl font-medium">
            Explore our curated selection of {pageTitle.toLowerCase()} designed for luxury and comfort.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-12">
            <section>
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-2">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`group w-full flex items-center justify-between text-left py-3 px-4 rounded-xl transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#065F46] text-white font-bold shadow-lg shadow-green-900/10' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <span className="uppercase text-[11px] font-black tracking-widest">{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg ${selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {cat === 'All' ? MOCK_PRODUCTS.length : MOCK_PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">Refine by Price</h3>
              <div className="px-4">
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#065F46]"
                />
                <div className="flex justify-between mt-6">
                  <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Min: 500</span>
                  <span className="text-[11px] font-black text-[#065F46] tracking-tighter uppercase">Max: {priceRange}</span>
                </div>
              </div>
            </section>

            <div className="p-8 bg-[#065F46] rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Sparkles size={100} />
               </div>
               <h4 className="font-black text-xl mb-4 relative z-10 brand-font">Join Nashwa Elite</h4>
               <p className="text-xs text-green-100/60 mb-8 relative z-10 leading-relaxed font-medium">Get exclusive access to pre-order our newest saree collections before anyone else.</p>
               <Link to="/login" className="block w-full bg-amber-400 text-[#021410] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] relative z-10 shadow-xl text-center hover:brightness-110 transition-all">Sign Up Now</Link>
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                 <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
                  Collection: <span className="text-gray-900">{filteredProducts.length} pieces</span>
                 </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#065F46] outline-none w-full sm:w-auto border-gray-200 text-gray-700 shadow-sm"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={(p) => addToCart(p)} 
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <Search size={48} className="text-gray-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black brand-font mb-4">No pieces found</h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm font-medium">Try changing your filters or category to find your perfect piece.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
};

export default Shop;