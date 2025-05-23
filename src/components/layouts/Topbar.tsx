import React from 'react';
import { Bell, Search, Shield, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Toggle } from '@/components/ui/toggle';
import { supabase } from '@/lib/supabaseClient';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === 'light';
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    timeZone: 'UTC'
  });

  return (
    <div className={`flex items-center justify-between h-16 px-6 ${isLightMode ? 'bg-white/70 backdrop-blur-lg border-b border-black/5' : 'bg-black/20 backdrop-blur-lg border-b border-white/5'} sticky top-0 z-20`}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-algo-lime animate-pulse-lime"></div>
          <span className={`text-xs font-medium ${isLightMode ? 'text-gray-800' : 'text-white/80'}`}>All Systems Active</span>
        </div>
        <div className={`text-xs font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
          UTC {currentTime}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Toggle 
          pressed={theme === 'light'}
          onPressedChange={toggleTheme}
          aria-label="Toggle theme"
          className={`w-8 h-8 rounded-full flex items-center justify-center ${isLightMode ? 'bg-gray-100 hover:bg-gray-200 border border-gray-200' : 'bg-white/5 hover:bg-white/10 border border-white/5'}`}
        >
          {theme === 'light' ? <Sun size={16} className="text-algo-lime" /> : <Moon size={16} className="text-gray-400" />}
        </Toggle>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`w-64 h-8 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-algo-lime/50 ${
              isLightMode 
                ? 'bg-gray-100 border border-gray-200 text-gray-800 placeholder:text-gray-500' 
                : 'bg-white/5 border border-white/10 text-gray-200 placeholder:text-gray-500'
            }`}
          />
          <Search size={14} className={`absolute right-3 top-2 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`} />
        </div>
        
        <div className="relative">
          <Bell size={20} className={`${isLightMode ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-white'} cursor-pointer transition-colors`} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-algo-lime rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-black">2</span>
          </div>
        </div>
        

        {user && (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${isLightMode ? 'bg-gray-100 border border-gray-200 text-gray-800' : 'bg-white/5 border border-white/10 text-white'} hover:bg-algo-lime/20 transition-colors`}
            title="Log out"
          >
            <LogOut size={16} />
            <span className="text-xs font-medium">Log out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
