
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS, CONTACT_INFO, LOGO_URL } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

interface HomeProps {
  addToCart: (p: Product, quantity?: number) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const AD_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    title: "Special Discount",
    subtitle: "Up to 30% Off"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    title: "New Eid Collection",
    subtitle: "Shop the Heritage"
  },
  {
    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    title: "Free Delivery",
    subtitle: "On orders over 5000"
  }
];

const Home: React.FC<HomeProps> = ({ addToCart, wishlist, toggleWishlist }) => {
  const featured = MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-slide for the Hero Ad
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % AD_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-32">
      {/* Enhanced Hero Section with Ad Slider */}
      <section className="relative w-full bg-[#FDF1D3] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-0 min-h-[600px] lg:h-[750px] flex flex-col lg:flex-row items-center gap-10">
          
          <div className="absolute top-20 right-[10%] w-32 h-32 border-8 border-white opacity-20 rotate-12 hidden lg:block"></div>

          {/* Left: Main Hero Image */}
          <div className="w-full lg:w-[40%] relative z-10 h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[3rem] overflow-hidden lg:overflow-visible">
              <div className="absolute inset-0 bg-[#F59E0B] -translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8 rounded-[3rem] opacity-90 shadow-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
                className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl z-20 border-4 lg:border-8 border-white"
                alt="Nashwa Summer Collection"
              />
            </div>
          </div>

          {/* Middle: Hero Text Area */}
          <div className="w-full lg:w-[40%] text-center lg:text-left z-20">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-3 bg-amber-400/10 px-4 py-2 rounded-full mb-6 border border-amber-400/20">
                <Sparkles size={16} className="text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Luxury Awaits You</span>
              </div>
              <h2 className="script-font text-5xl md:text-7xl lg:text-8xl text-gray-900 mb-6 drop-shadow-xl">
                Luxe.
              </h2>
              
              <div className="bg-white inline-flex p-6 md:p-8 mb-8 shadow-xl rounded-[2.5rem] items-center justify-center border-4 border-amber-400 transform -rotate-2 hover:rotate-0 transition-all">
                <img 
                  src={LOGO_URL} 
                  alt="Nashwa" 
                  className="h-16 w-16 md:h-24 md:w-24 object-contain" 
                />
              </div>

              <div className="flex flex-col items-center lg:items-start gap-8">
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link 
                    to="/shop?filter=new" 
                    className="hero-3d-button bg-[#26B8C5] hover:bg-[#1D8A95] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl active:scale-95"
                  >
                    New Arrivals
                  </Link>
                  <Link 
                    to="/shop?filter=best" 
                    className="bg-white text-[#065F46] border-2 border-[#065F46] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#065F46] hover:text-white transition-all shadow-lg active:scale-95"
                  >
                    Best Sellers
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Promotional Ad Slider */}
          <div className="w-full lg:w-[20%] h-full flex items-center">
            <div className="w-full bg-white p-2 rounded-[2rem] shadow-2xl border-2 border-amber-400/30 relative overflow-hidden group animate-fade-in">
              <div className="absolute top-4 left-4 z-30">
                <span className="bg-amber-400 text-[#021410] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Exclusive Offer</span>
              </div>
              
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem]">
                {AD_IMAGES.map((ad, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      idx === currentAdIndex ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-110 translate-x-full pointer-events-none'
                    }`}
                  >
                    <img src={ad.url} className="w-full h-full object-cover" alt={ad.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-black brand-font text-lg mb-1">{ad.title}</h4>
                      <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">{ad.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex justify-center gap-2 mt-4 pb-2">
                {AD_IMAGES.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentAdIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === currentAdIndex ? 'w-6 bg-[#065F46]' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl font-black mb-4 text-gray-900 brand-font uppercase tracking-widest">Editor's Choice</h2>
            <p className="text-gray-400 font-medium text-lg uppercase tracking-widest">The finest pieces of this season</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[#065F46] font-black text-sm uppercase tracking-[0.3em] pb-2 border-b-4 border-[#065F46]">
            View All Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featured.map(product => (
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
      </section>

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

export default Home;
