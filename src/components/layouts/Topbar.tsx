
import React from 'react';
import { Bell, Search, Shield } from 'lucide-react';

const Topbar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    timeZone: 'UTC'
  });

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-black/20 backdrop-blur-lg border-b border-white/5 sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-algo-lime animate-pulse-lime"></div>
          <span className="text-xs font-medium text-white/80">All Systems Active</span>
        </div>
        <div className="text-xs font-medium text-gray-400">
          UTC {currentTime}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-8 bg-white/5 border border-white/10 rounded-full px-4 py-1 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-algo-lime/50"
          />
          <Search size={14} className="absolute right-3 top-2 text-gray-400" />
        </div>
        
        <div className="relative">
          <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-algo-lime rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-black">2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 border border-white/10">
          <Shield size={14} className="text-algo-lime" />
          <span className="text-xs font-medium text-white">$2.8M</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
