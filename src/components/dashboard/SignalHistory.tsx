import React from 'react';

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

const signals: SignalItem[] = [
  {
    id: 1,
    name: '128 Moving Average',
    price: '60000',
    time: 'Today, 2:00 AM',
    description: 'Under 128 Moving Average',
    status: 'green',
  },
  {
    id: 2,
    name: 'Knn Moving Average',
    price: '60000',
    time: '5 August, 1:45 PM',
    description: 'From Down to Up',
    status: 'green',
  },
  {
    id: 3,
    name: 'Keltner Channel',
    price: '60000',
    time: '7 hours ago',
    description: 'Arrived Lower band',
    status: 'red',
  },
];

const statusColor = {
  green: 'bg-green-500',
  red: 'bg-red-500',
};

const SignalHistory: React.FC<SignalHistoryProps> = ({ isLightMode }) => (
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

export default SignalHistory; 