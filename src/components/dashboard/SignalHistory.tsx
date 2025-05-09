import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SignalItem {
  id: number;
  name: string;
  price: string;
  time: string;
  description: string;
  status: 'green' | 'red';
}

interface SignalHistoryProps {
  isLightMode: boolean;
}

const statusColor = {
  green: 'bg-green-500',
  red: 'bg-red-500',
};

const SignalHistory: React.FC<SignalHistoryProps> = ({ isLightMode }) => {
  const [signals, setSignals] = useState<SignalItem[]>([]);

  useEffect(() => {
    const fetchSignals = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('id, alert_name, price, timestamp, Option')
        .in('Option', ['buy', 'sell']);
      if (data && Array.isArray(data)) {
        // Group by alert_name and keep only the latest by timestamp
        const latestByAlert: Record<string, any> = {};
        data.forEach((row: any) => {
          if (
            !latestByAlert[row.alert_name] ||
            new Date(row.timestamp) > new Date(latestByAlert[row.alert_name].timestamp)
          ) {
            latestByAlert[row.alert_name] = row;
          }
        });
        // Mapping for friendly names
        const nameMap: Record<string, string> = {
          KC: 'Keltner Channels',
          KNN_MA: 'Knn Moving Average',
          AI_Trend: 'AI Trend Navigator',
          '128_MA': '128 Moving Average',
        };
        setSignals(
          Object.values(latestByAlert).map((row: any) => ({
            id: row.id,
            name: nameMap[row.alert_name] || row.alert_name,
            price: row.price?.toString() ?? '-',
            time: row.timestamp ? new Date(row.timestamp).toLocaleString('en-US') : '-',
            description: row.Option,
            status: row.Option?.toLowerCase() === 'buy' ? 'green' : 'red',
          }))
        );
      } else {
        setSignals([]);
      }
    };
    fetchSignals();
  }, []);

  return (
    <div className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Signal History</h2>
      </div>
      <div className="space-y-4">
        {signals.map(signal => (
          <div key={signal.id} className="p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-all flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full ${statusColor[signal.status]}`}></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{signal.name}</span>
                <span className={`text-xs font-semibold ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Price: {signal.price}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">{signal.time}</span>
                <span className="text-xs text-gray-400">{signal.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalHistory; 