
import React, { useState, useEffect, useRef } from 'react';
import { X, ShoppingCart, Minus, Plus, Heart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product, quantity: number) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist 
}) => {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset quantity when product changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scroll when modal is open
      // Focus the modal for screen readers
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isInWishlist = wishlist.includes(product.id);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-fade-in-up no-scrollbar focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        aria-describedby="quick-view-description"
        tabIndex={-1}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10 focus:ring-2 focus:ring-[#065F46] outline-none"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#065F46] bg-green-50 px-3 py-1 rounded-full border border-green-100 mb-4 inline-block">
                {product.category}
              </span>
              <h2 id="quick-view-title" className="text-3xl font-bold brand-font mb-4 text-gray-900">{product.name}</h2>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-2xl font-bold text-[#065F46]" aria-label={`Price: ${product.price} Taka`}>৳ {product.price.toLocaleString()}</p>
                <span className="text-gray-400 line-through text-sm italic" aria-label={`Original price: ${product.price * 1.2} Taka`}>৳ {(product.price * 1.2).toLocaleString()}</span>
              </div>
              <p id="quick-view-description" className="text-gray-500 text-sm leading-relaxed italic mb-8 border-l-4 border-gray-100 pl-4">
                "{product.description}"
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label id="quantity-label" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Select Quantity</label>
              <div className="flex items-center border-2 border-gray-100 rounded-2xl w-fit px-4 py-2 gap-6" role="group" aria-labelledby="quantity-label">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                  className="p-1 hover:text-[#065F46] transition-colors focus:outline-none focus:text-[#065F46] disabled:opacity-30"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-bold w-4 text-center" aria-live="polite" aria-atomic="true">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)} 
                  className="p-1 hover:text-[#065F46] transition-colors focus:outline-none focus:text-[#065F46]"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="w-full bg-[#065F46] text-white py-4 rounded-2xl font-bold hover:bg-[#047857] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/10 active:scale-95 focus:ring-4 focus:ring-green-100 outline-none"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`w-full py-4 rounded-2xl font-bold transition-all border-2 flex items-center justify-center gap-3 active:scale-95 focus:outline-none focus:ring-4 ${
                  isInWishlist 
                  ? 'bg-red-50 border-red-100 text-red-500 focus:ring-red-100' 
                  : 'bg-white border-gray-100 text-gray-700 hover:border-red-100 hover:text-red-500 focus:ring-gray-100'
                }`}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                {isInWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Icons */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-50">
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck size={18} className="text-gray-400" aria-hidden="true" />
                <span className="text-[9px] uppercase font-bold text-gray-400">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <ShieldCheck size={18} className="text-gray-400" aria-hidden="true" />
                <span className="text-[9px] uppercase font-bold text-gray-400">Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RefreshCcw size={18} className="text-gray-400" aria-hidden="true" />
                <span className="text-[9px] uppercase font-bold text-gray-400">Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
