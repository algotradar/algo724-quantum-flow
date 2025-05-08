
import React from 'react';
import { Shield, Award, QrCode } from 'lucide-react';

const TrustIndicators = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/5 p-4 z-20">
      <div className="flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto">
        <div className="text-xl font-display font-medium text-white">
          <span className="text-algo-lime">Trade</span> smarter. <span className="text-algo-lime">Scale</span> globally.
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-algo-lime/10 text-algo-lime flex items-center justify-center animate-pulse-lime">
              <Shield size={18} />
            </div>
            <div className="ml-2">
              <div className="text-xs font-medium text-white">Fully Protected</div>
              <div className="text-[10px] text-gray-400">SOC2 Compliant</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-algo-lime/10 text-algo-lime flex items-center justify-center">
              <Award size={18} />
            </div>
            <div className="ml-2">
              <div className="text-xs font-medium text-white">4.9★ Rating</div>
              <div className="text-[10px] text-gray-400">App & Play Store</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-white rounded-md text-xs font-medium">App Store</button>
            <button className="px-3 py-1.5 bg-white rounded-md text-xs font-medium">Play Store</button>
            <div className="w-8 h-8 rounded-lg bg-algo-lime/10 text-algo-lime flex items-center justify-center cursor-pointer">
              <QrCode size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
