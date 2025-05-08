
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface ActivityItem {
  id: number;
  type: 'entered' | 'exited';
  coin: string;
  exchange: 'Binance' | 'Coinbase' | 'OKX';
  price: string;
  amount: string;
  amountValue: string;
  change?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'entered',
    coin: 'BTC',
    exchange: 'Binance',
    price: '$72,453',
    amount: '1.2345',
    amountValue: 'BTC',
  },
  {
    id: 2,
    type: 'exited',
    coin: 'ETH',
    exchange: 'Coinbase',
    price: '$3,874',
    amount: '15.6789',
    amountValue: 'ETH',
    change: '+2.3%',
  },
  {
    id: 3,
    type: 'entered',
    coin: 'SOL',
    exchange: 'OKX',
    price: '$184',
    amount: '125.4568',
    amountValue: 'SOL',
  },
  {
    id: 4,
    type: 'exited',
    coin: 'BTC',
    exchange: 'Binance',
    price: '$72,451',
    amount: '0.8765',
    amountValue: 'BTC',
    change: '+1.5%',
  },
];

const RecentActivity = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Recent Activity</h2>
        <button className="text-xs text-algo-lime hover:underline flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'entered' ? 'bg-algo-lime/20 text-algo-lime' : 'bg-red-500/20 text-red-400'
                }`}>
                  {activity.type === 'entered' ? (
                    <ArrowDown size={20} />
                  ) : (
                    <ArrowUp size={20} />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className={`text-sm font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
                      {activity.type === 'entered' ? 'Entered' : 'Exited'} {activity.coin}
                    </h3>
                    {activity.change && (
                      <span className="ml-2 text-xs bg-algo-lime/20 text-algo-lime px-2 py-0.5 rounded">
                        {activity.change}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.exchange === 'Binance' ? 'bg-[#F0B90B]' : 
                      activity.exchange === 'Coinbase' ? 'bg-[#0052FF]' : 
                      'bg-[#121212]'
                    }`}></div>
                    <span className="text-xs text-gray-400 ml-1">{activity.exchange}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'} font-medium`}>{activity.price}</div>
                <div className="text-xs text-gray-400">
                  <span className="font-medium">{activity.amount}</span> {activity.amountValue}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
