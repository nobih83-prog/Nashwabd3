
import React, { useEffect } from 'react';
import { Truck, Clock, RefreshCcw, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const ShippingPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold brand-font mb-12 text-gray-900 border-b pb-8 uppercase tracking-widest">Shipping_&_Logistics</h1>
      
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-2xl flex items-center justify-center mb-6">
               <Truck size={24} />
             </div>
             <h3 className="robotic-font font-bold text-sm mb-4">Dhaka_Metro_Delivery</h3>
             <ul className="text-gray-500 text-sm space-y-3 font-medium">
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full" /> Same day or Next day delivery.</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full" /> Flat Rate: ৳80</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full" /> Free over ৳5000</li>
             </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
               <MapPin size={24} />
             </div>
             <h3 className="robotic-font font-bold text-sm mb-4">Nationwide_Express</h3>
             <ul className="text-gray-500 text-sm space-y-3 font-medium">
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Delivery within 3-5 days.</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Delivery Fee: ৳150</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Via SA Paribahan or Sundarban</li>
             </ul>
          </div>
        </div>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">03. RETURN_PROTOCOL</h2>
          <div className="p-10 bg-[#021410] rounded-[2.5rem] text-gray-300 relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-4 mb-6">
                 <RefreshCcw className="text-amber-500" />
                 <h3 className="text-xl font-bold text-white brand-font">7-Day Hassle Free Returns</h3>
               </div>
               <p className="leading-relaxed mb-6 opacity-80">
                 If you're not completely enamored with your Nashwa piece, we offer a 7-day return policy. Items must be unworn, in original packaging, and with all tags attached. Please contact our concierge at <a href={`tel:${CONTACT_INFO.phone}`} className="text-amber-400 font-bold hover:underline">{CONTACT_INFO.phone}</a> to initiate a return.
               </p>
               <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs robotic-font text-amber-500/80">
                 * Hygiene products like jewelry are non-returnable.
               </div>
             </div>
             <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
               <Truck size={120} />
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
