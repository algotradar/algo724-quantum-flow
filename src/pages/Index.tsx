
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import MarketOverview from '@/components/dashboard/MarketOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useTheme } from '@/components/theme/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className={`text-4xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-2`}>Dashboard</h1>
        <p className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>
          Welcome to Algo724. Monitor your portfolio, track algorithm performance, and execute trades with precision.
        </p>
      </div>
      
      <div className="mb-8">
        <PortfolioSummary />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
