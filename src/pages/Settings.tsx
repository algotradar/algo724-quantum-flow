
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useTheme } from '@/components/theme/ThemeProvider';

const Settings = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className={`text-4xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-2`}>Settings</h1>
        <p className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>
          Configure your account, API connections, and security preferences.
        </p>
      </div>
      
      <div className="glass-card p-8 flex items-center justify-center h-96">
        <p className={`text-xl ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Settings interface will be displayed here</p>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
