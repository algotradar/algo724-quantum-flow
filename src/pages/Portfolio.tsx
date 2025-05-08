
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useTheme } from '@/components/theme/ThemeProvider';

const Portfolio = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className={`text-4xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-2`}>Portfolio</h1>
        <p className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>
          Manage your crypto portfolio and track performance across multiple assets.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className={`text-xl ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Portfolio content will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
