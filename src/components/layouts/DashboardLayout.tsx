
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TrustIndicators from '../dashboard/TrustIndicators';
import { cn } from '@/lib/utils';
import { useTheme } from '../theme/ThemeProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className={`min-h-screen w-full ${isLightMode ? 'bg-gray-100' : 'bg-algo-dark-green'} flex`}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 pt-16 pb-20",
        sidebarCollapsed ? "ml-[72px]" : "ml-[220px]"
      )}>
        <Topbar />
        
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          {children}
        </div>
        
        <TrustIndicators />
      </main>
    </div>
  );
};

export default DashboardLayout;
