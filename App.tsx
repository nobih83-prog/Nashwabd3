
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, ArrowUp, Heart, Sparkles, Home as HomeIcon, ShoppingBag, History, RotateCcw, ChevronRight, Trash2, Minus, Plus, LayoutDashboard, ChevronDown, Eye } from 'lucide-react';
import { Product, CartItem, Order } from './types';
import { MOCK_PRODUCTS, CONTACT_INFO, COLORS, LOGO_URL } from './constants';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Ethics from './pages/Ethics';
import ShippingPolicy from './pages/ShippingPolicy';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartJump, setCartJump] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('nashwa_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    const savedRecent = localStorage.getItem('nashwa_recent_views');
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    
    if (localStorage.getItem('nashwa_auth') === 'true') {
      setIsLoggedIn(true);
      if (localStorage.getItem('nashwa_role') === 'admin') setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nashwa_cart', window.JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', window.JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nashwa_recent_views', window.JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 12); 
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (status: boolean, role: string = 'customer') => {
    setIsLoggedIn(status);
    setIsAdmin(role === 'admin');
    localStorage.setItem('nashwa_auth', status.toString());
    localStorage.setItem('nashwa_role', role);
  };

  const addToCart = (product: Product, quantity: number = 1, selectedOptions?: Record<string, string>) => {
    let finalPrice = product.price;
    if (product.variations && selectedOptions) {
      product.variations.forEach(v => {
        const option = v.options.find(o => o.label === selectedOptions[v.name]);
        if (option?.priceModifier) finalPrice += option.priceModifier;
      });
    }
    setCart(prev => {
      const optionsKey = JSON.stringify(selectedOptions || {});
      const existing = prev.find(item => item.id === product.id && JSON.stringify(item.selectedOptions || {}) === optionsKey);
      if (existing) {
        return prev.map(item => (item.id === product.id && JSON.stringify(item.selectedOptions || {}) === optionsKey) ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, price: finalPrice, quantity, selectedOptions }];
    });
    
    setCartJump(true);
    setTimeout(() => setCartJump(false), 500);
  };

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const removeFromCart = (id: string, options?: Record<string, string>) => {
    const optionsKey = JSON.stringify(options || {});
    setCart(prev => prev.filter(item => !(item.id === id && JSON.stringify(item.selectedOptions || {}) === optionsKey)));
  };

  const updateQuantity = (id: string, delta: number, options?: Record<string, string>) => {
    const optionsKey = JSON.stringify(options || {});
    setCart(prev => prev.map(item => (item.id === id && JSON.stringify(item.selectedOptions || {}) === optionsKey) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const scrollToTopFunc = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigation = [
    { name: 'Clothing', cat: 'Clothing', sub: ['Sarees', 'Lehengas', 'Party Wear', 'Kurtas'] },
    { name: 'Jewelry', cat: 'Jewelry', sub: ['Earrings', 'Necklaces', 'Bangles'] },
    { name: 'Accessories', cat: 'Accessories', sub: ['Clutches', 'Handbags'] },
    { name: 'Shoes', cat: 'Shoes', sub: ['Stilettos', 'Flats'] }
  ];

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Top Info Bar */}
        <div className="bg-[#021410] text-white py-4 px-8 flex justify-between items-center z-[60] border-b border-white/5 font-bold shadow-lg">
          <div className="flex items-center gap-4 shrink-0">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 group">
              <div className="p-1.5 bg-amber-400 rounded-full shadow-inner group-hover:scale-110 transition-transform">
                <Phone size={16} className="text-[#021410]" />
              </div>
              <span className="text-sm md:text-lg tracking-wide group-hover:text-amber-400 transition-colors">{CONTACT_INFO.phone}</span>
            </a>
          </div>
          
          <div className="flex-grow overflow-hidden relative mx-6 h-6 flex items-center">
            <div className="animate-marquee whitespace-nowrap absolute w-full right-0">
              <span className="inline-flex items-center gap-6 uppercase tracking-[0.25em] text-[11px] md:text-sm font-black">
                <Sparkles size={14} className="text-amber-400" /> Premium Collection Live &nbsp;&nbsp;&nbsp;&nbsp;
                <Sparkles size={14} className="text-amber-400" /> Fast Delivery in Dhaka City &nbsp;&nbsp;&nbsp;&nbsp;
                <Sparkles size={14} className="text-amber-400" /> Handcrafted Heritage Fashion &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
             <a href="#" className="hover:text-amber-400 transition-all hover:scale-125"><Instagram size={22} /></a>
             <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-all hover:scale-125"><Facebook size={22} /></a>
          </div>
        </div>

        {/* Header */}
        <header className="bg-[#065F46] text-white sticky top-0 z-50 shadow-xl transition-all duration-500">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-16 md:h-20 lg:h-24 flex items-center justify-between">
            {/* Left Section: Menu Button (Mobile) or Nav (Desktop) */}
            <div className="flex-1 flex items-center">
              <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                  <Menu size={28} />
                </button>
              </div>
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                <Link to="/shop?filter=new" className="text-[12px] xl:text-[13px] font-black uppercase tracking-widest text-amber-400 hover:brightness-125 transition-all">New Arrivals</Link>
                <Link to="/shop?filter=best" className="text-[12px] xl:text-[13px] font-black uppercase tracking-widest hover:text-amber-400 transition-all">Best Sellers</Link>
                {navigation.slice(0, 2).map((nav) => (
                  <div key={nav.name} className="relative group py-4">
                    <Link to={`/shop?cat=${nav.cat}`} className="text-[12px] xl:text-[13px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:text-amber-400 transition-all">
                      {nav.name} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                    </Link>
                    <div className="absolute top-[90%] left-0 w-48 bg-white shadow-2xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 z-[100] border border-gray-100">
                      <div className="p-3">
                        {nav.sub.map(sub => (
                          <Link key={sub} to={`/shop?cat=${nav.cat}`} className="block px-3 py-2 text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:text-[#065F46] rounded-lg transition-all">{sub}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Middle Section: Logo (Center aligned, shrink-0 prevents cutting) */}
            <div className="flex-shrink-0 px-2 flex justify-center">
              <Link to="/" className="flex flex-col items-center group">
                <img 
                  src={LOGO_URL} 
                  alt={CONTACT_INFO.name} 
                  className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full object-contain shadow-2xl border-2 border-amber-400 bg-white group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="text-[6px] md:text-[8px] tracking-[0.3em] opacity-50 uppercase mt-1 font-black whitespace-nowrap">Nashwa Premium</span>
              </Link>
            </div>

            {/* Right Section: Action Icons */}
            <div className="flex-1 flex items-center justify-end gap-1 md:gap-4">
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className={`p-2 rounded-lg transition-all transform hover:scale-110 ${isSearchActive ? 'bg-amber-400 text-[#065F46]' : 'hover:bg-white/10'}`}
              >
                <Search size={20} className="md:w-[22px] md:h-[22px]" />
              </button>
              
              <Link to="/wishlist" className="relative p-2 hover:bg-white/10 rounded-lg transition-all transform hover:scale-110">
                <Heart size={20} className="md:w-[22px] md:h-[22px]" />
                {wishlist.length > 0 && <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[8px] font-black h-3.5 w-3.5 flex items-center justify-center rounded-full shadow-md">{wishlist.length}</span>}
              </Link>
              
              <Link to="/login" className="p-2 hover:bg-white/10 rounded-lg transform hover:scale-110 transition-all">
                <User size={20} className="md:w-[22px] md:h-[22px]" />
              </Link>
            </div>
          </div>

          {/* Search Bar Slide Down */}
          <div ref={searchRef} className={`search-slide-down absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden ${isSearchActive ? 'max-h-[300px] border-t opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="max-w-[1440px] mx-auto px-6 py-6">
              <div className="relative max-w-2xl mx-auto">
                <input 
                  autoFocus={isSearchActive}
                  type="text" 
                  placeholder="Search our luxury collection..."
                  className="w-full bg-gray-50 text-gray-900 border-b-2 border-gray-100 py-3 px-10 focus:border-[#065F46] outline-none text-base font-medium transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Rest of the component follows... */}
        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 z-[110] transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`absolute left-0 top-0 bottom-0 w-full max-w-[280px] bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="p-6 bg-[#065F46] text-white flex justify-between items-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img src={LOGO_URL} alt={CONTACT_INFO.name} className="h-10 w-10 rounded-full object-contain shadow-lg border-2 border-amber-400 bg-white" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
              </div>
              <nav className="flex-grow overflow-y-auto py-8 px-6">
                <ul className="space-y-6">
                  <li><Link to="/shop?filter=new" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-amber-600">New Arrivals</Link></li>
                  <li><Link to="/shop?filter=best" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-[#065F46]">Best Sellers</Link></li>
                  <div className="h-px bg-gray-100 my-4"></div>
                  {navigation.map(nav => (
                    <li key={nav.name}><Link to={`/shop?cat=${nav.cat}`} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-700">{nav.name}</Link></li>
                  ))}
                  {isAdmin && <li><Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2"><LayoutDashboard size={14} /> Admin Panel</Link></li>}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Side Cart (unchanged) */}
        <div className={`fixed inset-0 z-[120] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-full max-w-[450px] bg-white shadow-2xl transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="p-6 bg-[#065F46] text-white flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-3">
                  <img src={LOGO_URL} className="h-10 w-10 rounded-full bg-white p-0.5 border border-amber-400" alt="Nashwa" />
                  <span className="text-xl font-bold brand-font uppercase tracking-widest">Shopping Bag</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black">{cartItemCount}</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
              </div>
              <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4 group animate-fade-in pb-4 border-b border-gray-50">
                      <img src={item.image} className="w-20 h-28 object-cover rounded-xl shadow-sm border border-gray-100" alt={item.name} />
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id, item.selectedOptions)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1, item.selectedOptions)} className="text-gray-400 hover:text-[#065F46]" disabled={item.quantity <= 1}><Minus size={14} /></button>
                            <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1, item.selectedOptions)} className="text-gray-400 hover:text-[#065F46]"><Plus size={14} /></button>
                          </div>
                          <span className="text-[#065F46] font-black text-sm">৳ {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag size={48} className="text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Bag is empty</p>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t bg-gray-50 space-y-4 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Value</span>
                    <span className="text-2xl font-black text-[#065F46] brand-font">৳ {cartTotal.toLocaleString()}</span>
                  </div>
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-[#065F46] text-white py-4 rounded-xl font-bold text-center hover:bg-black transition-all shadow-xl uppercase tracking-widest text-xs">Place Order</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="flex-grow max-w-[1440px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} searchQuery={searchQuery} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} addToRecentlyViewed={addToRecentlyViewed} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
          </Routes>
        </main>

        {/* Global Recently Viewed (unchanged) */}
        {recentlyViewed.length > 0 && (
          <section className="bg-gray-50/50 py-16 border-t border-gray-100 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#065F46] text-white rounded-xl shadow-lg">
                    <History size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black brand-font uppercase tracking-widest text-gray-900">Recently Viewed</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">Pick up where you left off</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setRecentlyViewed([]); localStorage.removeItem('nashwa_recent_views'); }}
                  className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors"
                >
                  Clear History <RotateCcw size={12} />
                </button>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                {recentlyViewed.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="snap-start shrink-0 w-40 sm:w-48 bg-white p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-50 group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white text-[#065F46] p-2 rounded-full shadow-lg">
                          <Eye size={18} />
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1 mb-1">{product.name}</h4>
                    <p className="text-[#065F46] font-black text-sm">৳ {product.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer (unchanged) */}
        <footer className="bg-[#021410] text-gray-400 pt-20 pb-16 px-8 border-t-8 border-amber-600">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8 text-center sm:text-left">
              <Link to="/" className="inline-block group">
                <img 
                  src={LOGO_URL} 
                  alt={CONTACT_INFO.name} 
                  className="h-24 w-24 rounded-full bg-white p-1 shadow-2xl border-2 border-amber-500 transition-transform duration-300 group-hover:scale-110" 
                />
              </Link>
              <p className="text-base leading-relaxed opacity-70">Nashwa: Redefining premium fashion for the modern woman of Bangladesh. Crafted with heritage and elegance.</p>
              <div className="flex justify-center sm:justify-start gap-6">
                 <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-amber-600 transition-all"><Facebook size={24} className="text-white" /></a>
                 <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-amber-600 transition-all"><Instagram size={24} className="text-white" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[13px] border-b border-amber-600/30 pb-3">Collections</h4>
              <ul className="space-y-5 text-sm font-bold uppercase tracking-widest opacity-60">
                <li><Link to="/shop?filter=new" className="hover:text-amber-500 transition-colors">New Arrivals</Link></li>
                <li><Link to="/shop?filter=best" className="hover:text-amber-500 transition-colors">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[13px] border-b border-amber-600/30 pb-3">Connect</h4>
              <ul className="space-y-6 text-base font-medium">
                <li className="flex items-center gap-4 text-xs sm:text-base"><MapPin size={18} className="text-amber-600 shrink-0" /> <span>{CONTACT_INFO.address}</span></li>
                <li className="flex items-center gap-4 text-xs sm:text-base"><Phone size={18} className="text-amber-600 shrink-0" /> <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-amber-400 transition-colors">{CONTACT_INFO.phone}</a></li>
              </ul>
            </div>
            <div>
               <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[13px] border-b border-amber-600/30 pb-3">Quick Access</h4>
               <div className="flex flex-wrap gap-2">
                 <Link to="/privacy" className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Privacy</Link>
                 <Link to="/shipping-policy" className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Shipping</Link>
               </div>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black">
             <p className="opacity-40 text-center sm:text-left">&copy; {new Date().getFullYear()} Nashwa. All Rights Reserved.</p>
          </div>
        </footer>

        {/* Floating Actions */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
          <button onClick={scrollToTopFunc} className={`bg-white text-[#065F46] p-4 rounded-full shadow-2xl transition-all transform ${showScrollTop ? 'scale-100' : 'scale-0'}`}><ArrowUp size={24} /></button>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className={`bg-[#065F46] text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-90 relative ${cartJump ? 'animate-bounce' : ''}`}
          >
            <ShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-full shadow-md ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
