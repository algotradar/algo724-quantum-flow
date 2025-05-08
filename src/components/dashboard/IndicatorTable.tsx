import React from 'react';

interface IndicatorRow {
  indicator: string;
  analytics: string;
  current: string;
  option: { label: string; color: string };
}

interface IndicatorTableProps {
  isLightMode: boolean;
}

const indicatorData: IndicatorRow[] = [
  { indicator: '128 Moving Average', analytics: 'Above/Below', current: 'Above', option: { label: 'Buy', color: 'text-green-500' } },
  { indicator: 'AI Trend Navigator', analytics: 'Green/Red', current: 'Red', option: { label: 'Sell', color: 'text-red-400' } },
  { indicator: 'Funding Rate', analytics: '+/-', current: '+1.01%', option: { label: 'Buy', color: 'text-green-500' } },
  { indicator: 'Google Trend', analytics: '0-100', current: '100', option: { label: 'Hold', color: 'text-yellow-400' } },
  { indicator: 'Greed & Fear Index', analytics: '0-100', current: '85', option: { label: 'Buy', color: 'text-green-500' } },
  { indicator: 'Keltner Channels', analytics: 'Upper/Middle/Lower', current: 'Upper', option: { label: 'Sell', color: 'text-red-400' } },
  { indicator: 'Knn Moving Average', analytics: 'Above/Below', current: 'Above', option: { label: 'Hold', color: 'text-yellow-400' } },
  { indicator: 'Mining Cost', analytics: '0.00-2.00', current: '0.94', option: { label: 'Buy', color: 'text-green-500' } },
  { indicator: 'Onchain', analytics: '100+ Holder', current: '-10000', option: { label: 'Sell', color: 'text-red-400' } },
];

const IndicatorTable: React.FC<IndicatorTableProps> = ({ isLightMode }) => (
  <div className="glass-card p-6 animate-fade-in mb-8" style={{animationDelay: '0.3s'}}>
    <h3 className={`text-lg font-display font-medium mb-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Indicator</h3>
    <div className="w-full overflow-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="text-xs font-medium pb-4 pl-2">INDICATOR</th>
            <th className="text-xs font-medium pb-4">ANALYTICS</th>
            <th className="text-xs font-medium pb-4">CURRENT INDEX</th>
            <th className="text-xs font-medium pb-4">OPTION</th>
          </tr>
        </thead>
        <tbody>
          {indicatorData.map((row, idx) => (
            <tr key={idx} className="border-t border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-3 pl-2">
                <span className={`text-sm font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.indicator}</span>
              </td>
              <td className="py-3">
                <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.analytics}</span>
              </td>
              <td className="py-3">
                <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.current}</span>
              </td>
              <td className="py-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full bg-white/10 ${row.option.color}`}>{row.option.label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default IndicatorTable; 