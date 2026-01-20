
import React, { useEffect } from 'react';

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold brand-font mb-12 text-gray-900 border-b pb-8 uppercase tracking-widest">Terms_Conditions</h1>
      
      <div className="space-y-16">
        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">01. USAGE_LICENSE</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            By accessing the Nashwa digital boutique, you agree to comply with our terms of service. All content, including designs, images, and text, is the exclusive property of Nashwa Premium Fashion Ltd and protected by copyright laws of Bangladesh.
          </div>
        </section>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">02. PRODUCT_INTEGRITY</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            While we strive for absolute accuracy in our product displays, colors and textures may vary slightly due to digital rendering and screen variations. Each Nashwa piece is handcrafted, making it uniquely yours.
          </div>
        </section>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">03. PURCHASE_CONTRACT</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            Order confirmation occurs once payment (via bKash/Nagad/Rocket) or Cash on Delivery is verified. Nashwa reserves the right to cancel orders in case of stock discrepancies or logistical constraints.
          </div>
        </section>

        <div className="text-center pt-10">
           <p className="robotic-font text-[10px] text-gray-400 font-bold">LAST_REVISION_DATE: OCT_2024</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
