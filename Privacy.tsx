
import React, { useEffect } from 'react';

const Privacy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold brand-font mb-12 text-gray-900 border-b pb-8 uppercase tracking-widest">Privacy_Policy</h1>
      
      <div className="space-y-16">
        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">01. DATA_COLLECTION</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            At Nashwa, we respect your privacy. We collect personal information such as your name, email, phone number, and address exclusively for processing your orders and enhancing your shopping experience. We use industry-standard encryption to protect all sensitive data.
          </div>
        </section>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">02. COOKIE_TERMINAL</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            Our website uses cookies to remember your preferences, track items in your shopping bag, and understand how you interact with our collections. This helps us provide a seamless and personalized experience. You can manage cookie settings through your browser terminals at any time.
          </div>
        </section>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">03. THIRD_PARTY_PROTOCOLS</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            We do not sell your personal information. We only share necessary data with trusted partners (like bKash or our delivery agents) to complete your transactions and deliver your premium items.
          </div>
        </section>

        <section className="bg-[#065F46] p-10 rounded-3xl text-white">
          <h2 className="robotic-font font-bold mb-4 text-xs opacity-50">SECURITY_COMMITMENT</h2>
          <p className="text-xl font-bold brand-font italic">"Your security is our signature. Every transaction at Nashwa is protected by elite-level SSL encryption."</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
