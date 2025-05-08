import React from 'react';

interface EntityRow {
  name: string;
  holdings?: string;
  percent24h?: string;
  streak?: string;
  streakPercent24h?: string;
  statusColor?: string;
  statusText?: string;
  section: 'CEX' | 'COMPANIES' | 'ETFS';
}

interface EntityHoldingsProps {
  isLightMode: boolean;
}

const entityData: EntityRow[] = [
  // CEX section (empty for now)
  // Companies
  { section: 'COMPANIES', name: 'Microstrategy', statusColor: 'bg-blue-500', statusText: 'Hold' },
  // ETFs
  { section: 'ETFS', name: 'Ark', holdings: '279', percent24h: '0.58', streak: '13d', streakPercent24h: '1.79', statusColor: 'bg-red-500' },
  { section: 'ETFS', name: 'Bitwise', holdings: '240', percent24h: '0.63', streak: '28d', streakPercent24h: '7.48', statusColor: 'bg-red-500' },
];

const sectionOrder = ['CEX', 'COMPANIES', 'ETFS'];
const sectionTitles: Record<string, string> = {
  CEX: 'CEX',
  COMPANIES: 'COMPANIES',
  ETFS: 'ETFS',
};

const EntityHoldings: React.FC<EntityHoldingsProps> = ({ isLightMode }) => (
  <div className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
    <h3 className={`text-lg font-display font-medium mb-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Entity Holdings</h3>
    <div className="w-full overflow-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className={isLightMode ? 'text-gray-500' : 'text-gray-400'}>
            <th className="text-xs font-medium pb-4 pl-2">&nbsp;</th>
            <th className="text-xs font-medium pb-4">HOLDINGS</th>
            <th className="text-xs font-medium pb-4">% (24H)</th>
            <th className="text-xs font-medium pb-4">STREAK</th>
            <th className="text-xs font-medium pb-4">% (24H)</th>
          </tr>
        </thead>
        <tbody>
          {sectionOrder.map(section => (
            <React.Fragment key={section}>
              <tr className={isLightMode ? 'border-t border-black/10' : 'border-t border-white/10'}>
                <td colSpan={5} className={`py-2 pl-2 font-semibold uppercase text-xs ${isLightMode ? 'text-gray-700 bg-black/5' : 'text-white/80 bg-white/5'}`}>{sectionTitles[section]}</td>
              </tr>
              {entityData.filter(row => row.section === section).length === 0 && (
                <tr className={isLightMode ? 'border-t border-black/10' : 'border-t border-white/10'}>
                  <td colSpan={5} className="py-4"></td>
                </tr>
              )}
              {entityData.filter(row => row.section === section).map((row, idx) => (
                <tr key={row.name} className={isLightMode ? 'border-t border-black/10 hover:bg-black/5 transition-colors' : 'border-t border-white/10 hover:bg-white/5 transition-colors'}>
                  <td className="py-4 pl-2 flex items-center gap-2">
                    {row.statusColor && <span className={`w-2 h-2 rounded-full ${row.statusColor}`}></span>}
                    <span className={`text-sm font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.name}</span>
                  </td>
                  <td className="py-4">
                    {row.statusText ? (
                      <span className="flex items-center gap-1 text-sm"><span className={`w-2 h-2 rounded-full ${row.statusColor}`}></span> <span className={isLightMode ? 'text-gray-800' : 'text-white'}>{row.statusText}</span></span>
                    ) : (
                      <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.holdings}</span>
                    )}
                  </td>
                  <td className="py-4">
                    <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.percent24h || '-'}</span>
                  </td>
                  <td className="py-4">
                    <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.streak || '-'}</span>
                  </td>
                  <td className="py-4">
                    <span className={`text-sm ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{row.streakPercent24h || '-'}</span>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EntityHoldings; 