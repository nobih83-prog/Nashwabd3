
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string, options?: Record<string, string>) => void;
  updateQuantity: (id: string, delta: number, options?: Record<string, string>) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 5000 ? 0 : 120;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Looks like you haven't added anything yet. Discover our latest collections and find something you love!</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#065F46] text-white px-10 py-4 rounded-full font-bold hover:bg-[#047857] transition-all">
          <ArrowLeft size={20} /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 brand-font">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-grow space-y-6">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 items-center border border-gray-50">
              <img src={item.image} className="w-32 h-40 object-cover rounded-xl" alt={item.name} />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">{item.category}</p>
                
                {/* Display Selected Variations */}
                {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                    {Object.entries(item.selectedOptions).map(([key, value]) => (
                      <span key={key} className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg font-bold text-gray-500">
                        {key}: <span className="text-gray-800">{value}</span>
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-[#065F46] font-bold text-lg">৳ {item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full px-4 py-2 bg-white">
                  <button onClick={() => updateQuantity(item.id, -1, item.selectedOptions)} className="p-1 hover:text-[#065F46] disabled:opacity-30" disabled={item.quantity <= 1}><Minus size={18} /></button>
                  <span className="w-12 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1, item.selectedOptions)} className="p-1 hover:text-[#065F46]"><Plus size={18} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id, item.selectedOptions)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <aside className="w-full lg:w-96 shrink-0">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
            <h2 className="text-2xl font-bold mb-8 brand-font">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Delivery</span>
                <span className="font-bold text-[#065F46]">
                  {deliveryFee === 0 ? 'Free' : `৳ ${deliveryFee}`}
                </span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900 brand-font">
                <span>Total</span>
                <span>৳ {(subtotal + deliveryFee).toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full bg-[#065F46] text-white text-center py-4 rounded-full font-bold text-lg hover:bg-[#047857] transition-all shadow-lg shadow-green-900/10 active:scale-95">
              Proceed to Checkout
            </Link>
            <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-[0.2em] font-bold">
              Premium Quality Guaranteed
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
