
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Strategies = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-medium text-white mb-2">Strategies</h1>
        <p className="text-gray-400">
          Build, test, and deploy algorithmic trading strategies.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className="text-xl text-gray-400">Strategy builder will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Strategies;
