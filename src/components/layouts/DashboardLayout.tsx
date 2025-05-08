
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TrustIndicators from '../dashboard/TrustIndicators';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-algo-dark-green flex">
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
