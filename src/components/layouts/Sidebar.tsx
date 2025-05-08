
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bitcoin, ChartBar, Settings, ArrowLeft, ArrowRight, ChartLine } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed: boolean;
}

const NavItem = ({ icon: Icon, label, href, active = false, collapsed }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-300 group',
        active 
          ? 'bg-algo-lime bg-opacity-10 text-algo-lime font-medium' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      )}
    >
      <div className={cn(
        'flex items-center justify-center transition-all duration-300',
        active ? 'text-algo-lime' : 'text-gray-400 group-hover:text-white'
      )}>
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} className={active ? 'animate-glow' : ''} />
      </div>
      {!collapsed && (
        <span className={cn(
          'text-sm transition-all duration-300 animate-slide-right',
          active ? 'text-algo-lime' : ''
        )}>
          {label}
        </span>
      )}
      {active && !collapsed && (
        <div className="w-1 h-6 bg-algo-lime absolute right-0 rounded-l-md animate-pulse-lime"></div>
      )}
    </Link>
  );
};

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "h-screen fixed top-0 left-0 flex flex-col bg-algo-dark-blue border-r border-white/5 transition-all duration-300 z-10",
        collapsed ? "w-[72px]" : "w-[220px]"
      )}
    >
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-algo-dark-green flex items-center justify-center border border-algo-lime/30 text-algo-lime">
            <span className="text-xs font-bold">A7</span>
          </div>
          {!collapsed && (
            <span className="ml-2 text-algo-lime font-display font-medium tracking-wider text-lg animate-slide-right">
              ALGO724
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
        </button>
      </div>
      
      <div className="px-2 py-4 mt-6 flex-1">
        <NavItem icon={ChartBar} label="Dashboard" href="/" active={true} collapsed={collapsed} />
        <NavItem icon={Bitcoin} label="Portfolio" href="/portfolio" collapsed={collapsed} />
        <NavItem icon={ChartLine} label="Strategies" href="/strategies" collapsed={collapsed} />
        <NavItem icon={ChartBar} label="Trades" href="/trades" collapsed={collapsed} />
        <NavItem icon={Settings} label="Settings" href="/settings" collapsed={collapsed} />
      </div>
      
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-xs font-medium text-white">
            JD
          </div>
          {!collapsed && (
            <div className="animate-slide-right">
              <p className="text-xs font-medium text-white">John Doe</p>
              <p className="text-[10px] text-gray-400">Pro Trader</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
