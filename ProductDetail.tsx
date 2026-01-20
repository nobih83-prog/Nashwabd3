
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RefreshCcw, ChevronRight, Heart, Share2, ZoomIn, ZoomOut, Maximize, Plus, Minus, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

interface ProductDetailProps {
  addToCart: (p: Product, quantity: number, selectedOptions?: Record<string, string>) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  addToRecentlyViewed: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart, wishlist, toggleWishlist, addToRecentlyViewed }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'shipping'>('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const buySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      addToRecentlyViewed(found); // Track the view
      window.scrollTo(0, 0);
      setQuantity(1);
      setActiveImageIndex(0);
      resetZoom();
      
      if (found.variations) {
        const defaults: Record<string, string> = {};
        found.variations.forEach(v => {
          defaults[v.name] = v.options[0].label;
        });
        setSelectedOptions(defaults);
      }
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (buySectionRef.current) {
      observer.observe(buySectionRef.current);
    }

    return () => {
      if (buySectionRef.current) {
        observer.unobserve(buySectionRef.current);
      }
    };
  }, [product]);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.price;
    if (product.variations) {
      product.variations.forEach(v => {
        const selectedValue = selectedOptions[v.name];
        const option = v.options.find(o => o.label === selectedValue);
        if (option?.priceModifier) {
          price += option.priceModifier;
        }
      });
    }
    return price;
  }, [product, selectedOptions]);

  const handleOptionChange = (varName: string, optionLabel: string, optionImage?: string) => {
    setSelectedOptions(prev => ({ ...prev, [varName]: optionLabel }));
    
    if (optionImage && product) {
      const gallery = product.images || [product.image];
      const index = gallery.indexOf(optionImage);
      if (index !== -1) {
        setActiveImageIndex(index);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const adjustZoom = (delta: number) => {
    setZoomScale(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 3) return 3;
      return next;
    });
    if (zoomScale === 1 && delta > 0) setIsZooming(true);
  };

  const resetZoom = () => {
    setZoomScale(1);
    setIsZooming(false);
    setZoomPos({ x: 50, y: 50 });
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (!product) return null;

  const galleryImages = product.images || [product.image];
  const relatedProducts = MOCK_PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const isInWishlist = wishlist.includes(product.id);

  return (
    <div className="bg-white relative pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-50">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-[#065F46]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#065F46]">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          <div className="space-y-6">
            <div className="relative group">
              <div 
                ref={imageContainerRef}
                className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-2xl shadow-gray-200/50 relative cursor-zoom-in"
                onMouseEnter={() => { setIsZooming(true); if (zoomScale === 1) setZoomScale(2); }}
                onMouseLeave={() => resetZoom()}
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={galleryImages[activeImageIndex]} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out pointer-events-none" 
                  style={{ 
                    transform: `scale(${zoomScale})`,
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` 
                  }}
                  alt={product.name} 
                />
                
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.preventDefault(); adjustZoom(0.5); }} className="p-3 bg-white/95 backdrop-blur rounded-xl shadow-lg hover:bg-[#065F46] hover:text-white transition-all active:scale-90">
                    <ZoomIn size={20} />
                  </button>
                  <button onClick={(e) => { e.preventDefault(); adjustZoom(-0.5); }} className="p-3 bg-white/95 backdrop-blur rounded-xl shadow-lg hover:bg-[#065F46] hover:text-white transition-all active:scale-90">
                    <ZoomOut size={20} />
                  </button>
                </div>

                <div className="absolute top-6 right-6 z-20">
                  <button onClick={() => toggleWishlist(product.id)} className={`p-3 backdrop-blur rounded-full shadow-lg transition-all hover:scale-110 active:scale-90 ${isInWishlist ? 'bg-[#065F46] text-white' : 'bg-white/90 text-gray-700 hover:text-red-500'}`}>
                    <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative shrink-0 w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImageIndex === i ? 'border-[#065F46] shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block bg-green-50 text-[#065F46] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm border border-green-100">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold brand-font text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-[#065F46]">
                  ৳ {currentPrice.toLocaleString()}
                </p>
                <span className="text-lg font-medium text-gray-400 line-through">৳ {(currentPrice * 1.2).toLocaleString()}</span>
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">20% OFF</span>
              </div>
            </div>

            <div className="mb-8 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative shadow-inner">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-4 py-1 rounded-full border text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Stylist Note
              </div>
              <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">
                "{product.description}"
              </p>
            </div>

            {product.variations && (
              <div className="mb-10 space-y-8">
                {product.variations.map((v) => (
                  <div key={v.name}>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{v.name}</label>
                      <span className="text-xs font-bold text-gray-900">
                        {v.type === 'color' ? `Selected: ${selectedOptions[v.name]}` : selectedOptions[v.name]}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {v.options.map((opt) => {
                        const isSelected = selectedOptions[v.name] === opt.label;
                        
                        if (v.type === 'color') {
                          return (
                            <button
                              key={opt.label}
                              onClick={() => handleOptionChange(v.name, opt.label, opt.image)}
                              className={`relative w-10 h-10 rounded-full transition-all border-2 flex items-center justify-center p-0.5 ${
                                isSelected 
                                ? 'border-[#065F46] scale-110 shadow-md ring-2 ring-[#065F46]/20' 
                                : 'border-gray-100 hover:border-gray-300'
                              }`}
                            >
                              <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: opt.label }} />
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <Check size={14} className={['#ffffff', '#fff', 'white', 'yellow'].includes(opt.label.toLowerCase()) ? 'text-black' : 'text-white'} />
                                </div>
                              )}
                            </button>
                          );
                        }

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleOptionChange(v.name, opt.label, opt.image)}
                            className={`min-w-[60px] px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                              isSelected
                                ? 'border-[#065F46] bg-[#065F46]/5 text-[#065F46] shadow-sm'
                                : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:text-gray-900'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div ref={buySectionRef}>
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Quantity</label>
                <div className="flex items-center border-2 border-gray-100 rounded-2xl w-fit px-4 py-3 gap-8 bg-white shadow-sm">
                  <button onClick={() => handleQuantityChange(-1)} className="p-1 hover:text-[#065F46] disabled:opacity-30" disabled={quantity <= 1}><Minus size={20} /></button>
                  <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="p-1 hover:text-[#065F46]"><Plus size={20} /></button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => addToCart(product, quantity, selectedOptions)}
                  className="flex-grow bg-[#065F46] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#047857] transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-900/20 active:scale-95 group"
                >
                  <ShoppingCart size={24} className="group-hover:translate-x-1 transition-transform" /> Add to Collection
                </button>
                
                <button onClick={() => toggleWishlist(product.id)} className={`flex-grow sm:flex-grow-0 sm:min-w-[200px] py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 border-2 active:scale-95 group ${isInWishlist ? 'bg-[#065F46]/5 border-[#065F46] text-[#065F46]' : 'bg-white border-gray-200 text-gray-700 hover:border-[#065F46] hover:text-[#065F46]'}`}>
                  <Heart size={24} className={isInWishlist ? "fill-current" : "group-hover:scale-110 transition-transform"} /> {isInWishlist ? 'Saved' : 'Wishlist'}
                </button>
              </div>
            </div>

            <div className="border-b mb-8 flex gap-8">
              <button onClick={() => setActiveTab('description')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'description' ? 'text-[#065F46]' : 'text-gray-400 hover:text-gray-600'}`}>
                Details
                {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#065F46] rounded-full" />}
              </button>
              <button onClick={() => setActiveTab('shipping')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'shipping' ? 'text-[#065F46]' : 'text-gray-400 hover:text-gray-600'}`}>
                Delivery & Returns
                {activeTab === 'shipping' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#065F46] rounded-full" />}
              </button>
            </div>

            <div className="mb-12 min-h-[120px]">
              {activeTab === 'description' ? (
                <div className="text-sm text-gray-500 leading-relaxed space-y-4">
                  <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#065F46]"></span> Premium quality hand-picked fabric for maximum comfort.</p>
                  <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#065F46]"></span> Exquisite attention to detail in every stitch and seam.</p>
                </div>
              ) : (
                <div className="text-sm text-gray-500 leading-relaxed space-y-4">
                  <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#065F46]"></span> Free inside-Dhaka shipping for orders over ৳5,000.</p>
                  <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#065F46]"></span> Easy 7-day hassle-free return policy if tags are intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24 md:mt-32">
            <div className="flex flex-col items-center mb-16">
              <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-amber-100 flex items-center gap-2">
                <Sparkles size={12} /> Curated for you
              </div>
              <h2 className="text-3xl md:text-5xl font-bold brand-font text-gray-900 text-center">You might also like</h2>
              <div className="w-24 h-1 bg-[#065F46] mt-6 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onAddToCart={(p) => addToCart(p, 1)} 
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] z-40 transition-transform duration-500 ease-in-out ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={galleryImages[activeImageIndex]} className="w-12 h-16 object-cover rounded-lg hidden sm:block" alt={product.name} />
            <div>
              <p className="text-[#065F46] font-black text-xl">৳ {currentPrice.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => addToCart(product, quantity, selectedOptions)}
              className="bg-[#065F46] text-white px-6 sm:px-10 py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-[#047857] transition-all flex items-center gap-2 shadow-lg shadow-green-900/10 active:scale-95 whitespace-nowrap"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
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

export default ProductDetail;
