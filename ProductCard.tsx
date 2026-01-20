
import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  wishlist?: string[];
  onToggleWishlist?: (id: string) => void;
  onQuickView?: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  wishlist = [], 
  onToggleWishlist,
  onQuickView
}) => {
  const isInWishlist = wishlist.includes(product.id);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => handleAction(e, () => onAddToCart(product))}
            className="bg-white text-gray-900 p-4 rounded-2xl hover:bg-[#065F46] hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-300 shadow-xl z-20"
            title="Add to Cart"
          >
            <ShoppingCart size={22} />
          </button>
          <button 
            onClick={(e) => handleAction(e, () => onQuickView?.(product))}
            className="bg-white text-gray-900 p-4 rounded-2xl hover:bg-[#065F46] hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-300 shadow-xl z-20"
            title="Quick View"
          >
            <Eye size={22} />
          </button>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/95 backdrop-blur px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-sm text-gray-700 border border-white/50">
            {product.category}
          </span>
        </div>
        
        {/* Wishlist Button on Card */}
        {onToggleWishlist && (
          <button 
            onClick={(e) => handleAction(e, () => onToggleWishlist(product.id))}
            className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all z-20 ${
              isInWishlist ? 'bg-[#065F46] text-white' : 'bg-white/95 text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#065F46] transition-colors text-lg">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-[#065F46] font-black text-xl tracking-tight">৳ {product.price.toLocaleString()}</p>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="w-1 h-1 rounded-full bg-amber-400"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
