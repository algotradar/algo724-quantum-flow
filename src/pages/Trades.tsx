
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useTheme } from '@/components/theme/ThemeProvider';

const Trades = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className={`text-4xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-2`}>Trades</h1>
        <p className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>
          Track all your algorithmic and manual trading activities.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className={`text-xl ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Trade history will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Trades;
