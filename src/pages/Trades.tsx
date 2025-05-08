
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Trades = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-medium text-white mb-2">Trades</h1>
        <p className="text-gray-400">
          Track all your algorithmic and manual trading activities.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className="text-xl text-gray-400">Trade history will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Trades;
