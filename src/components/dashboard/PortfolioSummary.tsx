
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';

const data = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 30 },
  { name: 'SOL', value: 15 },
  { name: 'USDT', value: 10 },
];

const COLORS = ['#F7931A', '#627EEA', '#00FFA3', '#26A17B'];

const PortfolioSummary = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const { isLoading } = useCryptoPrices();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-400">Portfolio Value</h3>
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-algo-lime/10 text-algo-lime">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h2 className={`text-3xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-1`}>
            $2,845,633
            {isLoading && <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-algo-lime border-t-transparent animate-spin"></span>}
          </h2>
          <div className="flex items-center">
            <span className="text-algo-lime text-sm font-medium">+12.40%</span>
            <span className="text-xs text-gray-400 ml-2">vs last week</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5 animate-fade-in" style={{animationDelay: '0.1s'}}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-400">Weekly Profit</h3>
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-algo-lime/10 text-algo-lime">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h2 className={`text-3xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-1`}>
            $324,516
            {isLoading && <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-algo-lime border-t-transparent animate-spin"></span>}
          </h2>
          <div className="flex items-center">
            <span className="text-algo-lime text-sm font-medium">+8.20%</span>
            <span className="text-xs text-gray-400 ml-2">vs last week</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-400">Allocation</h3>
            <h2 className={`text-2xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mt-1`}>
              87.2%
              {isLoading && <span className="ml-2 inline-block h-3 w-3 rounded-full border-2 border-algo-lime border-t-transparent animate-spin"></span>}
            </h2>
            <div className="flex items-center">
              <span className="text-algo-lime text-sm font-medium">+3.50%</span>
              <span className="text-xs text-gray-400 ml-2">vs last week</span>
            </div>
          </div>
          
          <div className="w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
              <span className={`text-xs ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
