
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, Smartphone, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem, CustomerDetails, Order } from '../types';
import { RetailProDB } from '../services/database';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  removeFromCart: (id: string, options?: Record<string, string>) => void;
  updateQuantity: (id: string, delta: number, options?: Record<string, string>) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Rocket'>('COD');
  
  const [details, setDetails] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 5000 ? 0 : 120;
  const total = subtotal + delivery;

  const paymentNumbers = {
    bKash: "01718952852",
    Nagad: "01718952852",
    Rocket: "017189528526"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    setTimeout(() => {
      const order: Order = {
        id: `RD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        customer: details,
        items: cart,
        total: total,
        date: new Date().toISOString(),
        status: 'Pending',
        paymentMethod: paymentMethod
      };

      // Use RetailProDB instead of direct localStorage manipulation
      RetailProDB.createOrder(order);

      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-green-100 text-[#065F46] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-4xl font-bold mb-4 brand-font">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-10 text-lg">
          Thank you for choosing Nashwa. Your order will be processed shortly by our RetailPro system.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#065F46] text-white px-10 py-4 rounded-full font-bold hover:bg-[#047857] transition-all shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-10 brand-font">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-12">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <User className="text-[#065F46]" /> Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input required type="text" placeholder="E.g. Jarin Tasnim" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all" value={details.fullName} onChange={e => setDetails({...details, fullName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <input required type="tel" placeholder="017XXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Complete Address</label>
                  <textarea required rows={3} placeholder="Apartment, Street, House No..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all" value={details.address} onChange={e => setDetails({...details, address: e.target.value})} />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Smartphone className="text-[#065F46]" /> Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['COD', 'bKash', 'Nagad', 'Rocket'].map(method => (
                  <label key={method} className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === method ? 'border-[#065F46] bg-green-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method as any)} className="hidden" />
                    <div className="font-bold flex items-center gap-2">{method === 'COD' ? 'Cash on Delivery' : method}</div>
                  </label>
                ))}
              </div>
            </section>

            <button disabled={loading || cart.length === 0} className="w-full bg-[#065F46] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#047857] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-green-900/10 active:scale-95">
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : `Place Order (৳ ${total.toLocaleString()})`}
            </button>
          </form>
        </div>

        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
            <h2 className="text-2xl font-bold mb-8 brand-font">Order Summary</h2>
            <div className="space-y-6 mb-8 border-b pb-8">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4">
                  <img src={item.image} className="w-12 h-16 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-[#065F46] font-bold">{item.quantity} x ৳ {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span className="font-bold">৳ {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-2xl font-bold pt-4 text-gray-900 border-t mt-4 brand-font"><span>Total</span><span>৳ {total.toLocaleString()}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
