import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { useBinance24hTicker } from '@/hooks/useCryptoPrices';

interface MarketData {
  pair: string;
  iconPair: string;
  price: string;
  change24h: {
    value: string;
    isPositive: boolean;
  };
  binance: string;
  coinbase: string;
  okx: string;
  arbitrage: {
    value: string;
    isOpportunity: boolean;
  };
}

const MarketOverview = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const { formattedPrices, isLoading } = useCryptoPrices();
  const { formatted: binance24h, isLoading: isLoading24h } = useBinance24hTicker();

  // Generate market data using real-time prices
  const marketData: MarketData[] = [
    {
      pair: 'BTC/USDT',
      iconPair: 'BT',
      price: isLoading ? '$72,453.85' : formattedPrices.BTC,
      change24h: { value: '+3.45%', isPositive: true },
      binance: isLoading24h || !binance24h ? '-' : binance24h.BTC.high,
      coinbase: isLoading24h || !binance24h ? '-' : binance24h.BTC.low,
      okx: isLoading24h || !binance24h ? '-' : binance24h.BTC.volume,
      arbitrage: { value: 'Opportunity', isOpportunity: true }
    },
    {
      pair: 'ETH/USDT',
      iconPair: 'ET',
      price: isLoading ? '$3,874.29' : formattedPrices.ETH,
      change24h: { value: '-1.23%', isPositive: false },
      binance: isLoading24h || !binance24h ? '-' : binance24h.ETH.high,
      coinbase: isLoading24h || !binance24h ? '-' : binance24h.ETH.low,
      okx: isLoading24h || !binance24h ? '-' : binance24h.ETH.volume,
      arbitrage: { value: '0.02%', isOpportunity: false }
    },
    {
      pair: 'SOL/USDT',
      iconPair: 'SO',
      price: isLoading ? '$184.35' : formattedPrices.SOL,
      change24h: { value: '+5.67%', isPositive: true },
      binance: isLoading24h || !binance24h ? '-' : binance24h.SOL.high,
      coinbase: isLoading24h || !binance24h ? '-' : binance24h.SOL.low,
      okx: isLoading24h || !binance24h ? '-' : binance24h.SOL.volume,
      arbitrage: { value: '0.08%', isOpportunity: false }
    }
  ];

  return (
    <div className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Market Overview</h2>
        <button className="text-xs text-algo-lime hover:underline flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      
      <div className="w-full overflow-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className={isLightMode ? 'text-gray-500' : 'text-gray-400'}>
              <th className="text-xs font-medium pb-4 pl-2">PAIR</th>
              <th className="text-xs font-medium pb-4">PRICE</th>
              <th className="text-xs font-medium pb-4">24H</th>
              <th className="text-xs font-medium pb-4">HIGH</th>
              <th className="text-xs font-medium pb-4">LOW</th>
              <th className="text-xs font-medium pb-4">VOLUME</th>
              <th className="text-xs font-medium pb-4 text-right pr-2">ARBITRAGE</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item, index) => (
              <tr 
                key={index} 
                className={isLightMode ? 'border-t border-black/10 hover:bg-black/5 transition-colors' : 'border-t border-white/5 hover:bg-white/5 transition-colors'}
              >
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                      item.iconPair === 'BT' ? (isLightMode ? 'bg-[#F7931A]/20 text-[#F7931A]' : 'bg-[#F7931A]/20 text-[#F7931A]') :
                      item.iconPair === 'ET' ? (isLightMode ? 'bg-[#627EEA]/20 text-[#627EEA]' : 'bg-[#627EEA]/20 text-[#627EEA]') :
                      'bg-[#00FFA3]/20 text-[#00FFA3]'
                    }`}>
                      {item.iconPair}
                    </div>
                    <span className={`text-sm font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.pair}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.price}</span>
                </td>
                <td className="py-4">
                  <span className={`text-sm ${item.change24h.isPositive ? 'text-algo-lime' : 'text-red-400'}`}>{item.change24h.value}</span>
                </td>
                <td className="py-4">
                  <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.binance}</span>
                </td>
                <td className="py-4">
                  <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.coinbase}</span>
                </td>
                <td className="py-4">
                  <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{item.okx}</span>
                </td>
                <td className="py-4 text-right pr-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    item.arbitrage.isOpportunity 
                      ? (isLightMode ? 'bg-algo-lime/20 text-algo-lime' : 'bg-algo-lime/20 text-algo-lime')
                      : (isLightMode ? 'bg-black/10 text-gray-500' : 'bg-white/10 text-gray-300')
                  }`}>
                    {item.arbitrage.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-algo-lime"></div>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;
