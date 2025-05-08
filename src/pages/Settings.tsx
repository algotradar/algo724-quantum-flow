
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-medium text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your account, API connections, and security preferences.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className="text-xl text-gray-400">Settings interface will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
