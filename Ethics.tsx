
import React, { useEffect } from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

const Ethics: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold brand-font mb-12 text-gray-900 border-b pb-8 uppercase tracking-widest">Ethics_&_Values</h1>
      
      <div className="space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center p-8 bg-amber-50 rounded-3xl">
             <Heart className="text-amber-600 mx-auto mb-4" size={32} />
             <h3 className="robotic-font font-bold text-xs mb-2">Artisan_Support</h3>
             <p className="text-[11px] text-gray-500 font-medium">Supporting 500+ local weavers.</p>
           </div>
           <div className="text-center p-8 bg-green-50 rounded-3xl">
             <ShieldCheck className="text-[#065F46] mx-auto mb-4" size={32} />
             <h3 className="robotic-font font-bold text-xs mb-2">Sustainable_Sourcing</h3>
             <p className="text-[11px] text-gray-500 font-medium">100% natural silk and cotton.</p>
           </div>
           <div className="text-center p-8 bg-blue-50 rounded-3xl">
             <Sparkles className="text-blue-600 mx-auto mb-4" size={32} />
             <h3 className="robotic-font font-bold text-xs mb-2">Ethical_Craft</h3>
             <p className="text-[11px] text-gray-500 font-medium">Fair wages and safe workspace.</p>
           </div>
        </div>

        <section>
          <h2 className="robotic-font text-gray-900 font-bold mb-6 text-sm">MISSION_LOG</h2>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-gray-100 text-gray-600 leading-relaxed text-lg italic brand-font">
            "At Nashwa, ethics are as important as elegance. We believe fashion should empower not just the wearer, but every artisan whose hands bring our designs to life. Our commitment is to preserve Bangladeshi heritage through fair trade and sustainable innovation."
          </div>
        </section>

        <section>
          <h2 className="robotic-font text-amber-600 font-bold mb-6 text-sm">02. ENVIRONMENTAL_IMPACT</h2>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 leading-relaxed">
            We minimize waste by using leftover premium fabrics for our accessory collections. Our packaging is 100% recyclable, ensuring that your luxury purchase doesn't cost the Earth.
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ethics;
