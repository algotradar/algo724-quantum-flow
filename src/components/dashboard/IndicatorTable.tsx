import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface IndicatorRow {
  indicator: string;
  analytics: string;
  current: string;
  option: { label: string; color: string };
}

interface IndicatorTableProps {
  isLightMode: boolean;
}

const IndicatorTable: React.FC<IndicatorTableProps> = ({ isLightMode }) => {
  const [ma128, setMA128] = useState<{ current: string; option: string } | null>(null);
  const [aiTrend, setAITrend] = useState<{ current: string; option: string } | null>(null);
  const [knnMA, setKnnMA] = useState<{ current: string; option: string } | null>(null);
  const [kc, setKC] = useState<{ current: string; option: string } | null>(null);
  const [fundingRate, setFundingRate] = useState<string>('-');

  useEffect(() => {
    const fetchMA128 = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('current_index, Option')
        .eq('alert_name', '128_MA')
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        let currentValue = '-';
        if (typeof data[0].current_index === 'number') {
          currentValue = Math.round(data[0].current_index).toString();
        } else if (typeof data[0].current_index === 'string') {
          const asNumber = Number(data[0].current_index);
          if (!isNaN(asNumber)) {
            currentValue = Math.round(asNumber).toString();
          } else {
            currentValue = data[0].current_index;
          }
        }
        setMA128({
          current: currentValue,
          option: data[0].Option ?? '-',
        });
      } else {
        setMA128(null);
      }
    };
    const fetchAITrend = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('current_index, Option')
        .eq('alert_name', 'AI_Trend')
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        let currentValue = '-';
        if (typeof data[0].current_index === 'number') {
          currentValue = Math.round(data[0].current_index).toString();
        } else if (typeof data[0].current_index === 'string') {
          const asNumber = Number(data[0].current_index);
          if (!isNaN(asNumber)) {
            currentValue = Math.round(asNumber).toString();
          } else {
            currentValue = data[0].current_index;
          }
        }
        setAITrend({
          current: currentValue,
          option: data[0].Option ?? '-',
        });
      } else {
        setAITrend(null);
      }
    };
    const fetchKnnMA = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('current_index, Option')
        .eq('alert_name', 'KNN_MA')
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        let currentValue = '-';
        if (typeof data[0].current_index === 'number') {
          currentValue = Math.round(data[0].current_index).toString();
        } else if (typeof data[0].current_index === 'string') {
          const asNumber = Number(data[0].current_index);
          if (!isNaN(asNumber)) {
            currentValue = Math.round(asNumber).toString();
          } else {
            currentValue = data[0].current_index;
          }
        }
        setKnnMA({
          current: currentValue,
          option: data[0].Option ?? '-',
        });
      } else {
        setKnnMA(null);
      }
    };
    const fetchKC = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('current_index, Option')
        .eq('alert_name', 'KC')
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        let currentValue = '-';
        if (typeof data[0].current_index === 'number') {
          currentValue = Math.round(data[0].current_index).toString();
        } else if (typeof data[0].current_index === 'string') {
          const asNumber = Number(data[0].current_index);
          if (!isNaN(asNumber)) {
            currentValue = Math.round(asNumber).toString();
          } else {
            currentValue = data[0].current_index;
          }
        }
        setKC({
          current: currentValue,
          option: data[0].Option ?? '-',
        });
      } else {
        setKC(null);
      }
    };
    const fetchFundingRate = async () => {
      try {
        const res = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT');
        const data = await res.json();
        if (data && data.lastFundingRate) {
          const rate = (parseFloat(data.lastFundingRate) * 100).toFixed(4) + '%';
          setFundingRate(rate.startsWith('-') ? rate : '+' + rate);
        } else {
          setFundingRate('-');
        }
      } catch {
        setFundingRate('-');
      }
    };
    fetchMA128();
    fetchAITrend();
    fetchKnnMA();
    fetchKC();
    fetchFundingRate();
  }, []);

  const indicatorData: IndicatorRow[] = [
    {
      indicator: '128 Moving Average',
      analytics: 'Above/Below',
      current: ma128 ? ma128.current : '-',
      option: {
        label: ma128 ? ma128.option : '-',
        color:
          ma128 && ma128.option.toLowerCase() === 'buy'
            ? 'text-green-500'
            : ma128 && ma128.option.toLowerCase() === 'sell'
            ? 'text-red-400'
            : ma128 && ma128.option.toLowerCase() === 'hold'
            ? 'text-yellow-400'
            : 'text-gray-400',
      },
    },
    {
      indicator: 'AI Trend Navigator',
      analytics: 'Green/Red',
      current: aiTrend ? aiTrend.current : '-',
      option: {
        label: aiTrend ? aiTrend.option : '-',
        color:
          aiTrend && aiTrend.option.toLowerCase() === 'buy'
            ? 'text-green-500'
            : aiTrend && aiTrend.option.toLowerCase() === 'sell'
            ? 'text-red-400'
            : aiTrend && aiTrend.option.toLowerCase() === 'hold'
            ? 'text-yellow-400'
            : 'text-gray-400',
      },
    },
    {
      indicator: 'Keltner Channels',
      analytics: 'Upper/Middle/Lower',
      current: kc ? kc.current : '-',
      option: {
        label: kc ? kc.option : '-',
        color:
          kc && kc.option.toLowerCase() === 'buy'
            ? 'text-green-500'
            : kc && kc.option.toLowerCase() === 'sell'
            ? 'text-red-400'
            : kc && kc.option.toLowerCase() === 'hold'
            ? 'text-yellow-400'
            : 'text-gray-400',
      },
    },
    {
      indicator: 'Knn Moving Average',
      analytics: 'Above/Below',
      current: knnMA ? knnMA.current : '-',
      option: {
        label: knnMA ? knnMA.option : '-',
        color:
          knnMA && knnMA.option.toLowerCase() === 'buy'
            ? 'text-green-500'
            : knnMA && knnMA.option.toLowerCase() === 'sell'
            ? 'text-red-400'
            : knnMA && knnMA.option.toLowerCase() === 'hold'
            ? 'text-yellow-400'
            : 'text-gray-400',
      },
    },
    {
      indicator: 'Funding Rate',
      analytics: '+/-',
      current: fundingRate,
      option: { label: 'Buy', color: 'text-green-500' },
    },
    { indicator: 'Google Trend', analytics: '0-100', current: '100', option: { label: 'Hold', color: 'text-yellow-400' } },
    { indicator: 'Greed & Fear Index', analytics: '0-100', current: '85', option: { label: 'Buy', color: 'text-green-500' } },
    { indicator: 'Mining Cost', analytics: '0.00-2.00', current: '0.94', option: { label: 'Buy', color: 'text-green-500' } },
    { indicator: 'Onchain', analytics: '100+ Holder', current: '-10000', option: { label: 'Sell', color: 'text-red-400' } },
  ];

  return (
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
};

export default IndicatorTable; 