import React from 'react';

interface CalendarEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  actual: string;
  consensus: string;
  previous: string;
  forecast: string;
}

interface EconomicCalendarProps {
  isLightMode: boolean;
}

const events: CalendarEvent[] = [
  { id: 1, date: 'Tuesday, Apr 1', time: '13:45', title: 'S&P Global Manufacturing PMI Final MAR', actual: 'NULL', consensus: '49.8', previous: '52.7', forecast: '49.8' },
  { id: 2, date: 'Tuesday, Apr 1', time: '14:00', title: 'ISM Manufacturing PMI MAR', actual: 'NULL', consensus: '49.5', previous: '50.3', forecast: '50' },
  { id: 3, date: 'Friday, Apr 4', time: '12:30', title: 'Non Farm Payrolls MAR', actual: 'NULL', consensus: '128K', previous: '151K', forecast: '80.0K' },
  { id: 4, date: 'Friday, Apr 4', time: '12:30', title: 'U-6 Unemployment Rate MAR', actual: 'NULL', consensus: 'NULL', previous: '8%', forecast: '8.1%' },
  { id: 5, date: 'Friday, Apr 4', time: '12:30', title: 'Unemployment Rate MAR', actual: 'NULL', consensus: '4.2%', previous: '4.1%', forecast: '4.2%' },
];

const groupedEvents = events.reduce((acc, event) => {
  if (!acc[event.date]) acc[event.date] = [];
  acc[event.date].push(event);
  return acc;
}, {} as Record<string, CalendarEvent[]>);

const EconomicCalendar: React.FC<EconomicCalendarProps> = ({ isLightMode }) => (
  <div className="glass-card p-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
    <div className="flex justify-between items-center mb-6">
      <h2 className={`text-xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Economic Calendar</h2>
      <button className="text-xs flex items-center gap-1 text-yellow-400 hover:underline">
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className=''><circle cx='8' cy='8' r='7'/><polyline points='8 4 8 8 10.5 9.5'/></svg>
        Refresh
      </button>
    </div>
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <div key={date}>
          <div className={`text-base font-semibold mb-4 ${isLightMode ? 'text-blue-700' : ''}`}>{date}</div>
          <div className="space-y-5">
            {dayEvents.map(event => (
              <div key={event.id} className={isLightMode ? 'border border-black/10 rounded-xl p-5 bg-transparent hover:bg-black/5 transition-all' : 'border border-white/10 rounded-xl p-5 bg-transparent hover:bg-white/5 transition-all'}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-xs font-mono text-gray-400 w-14">{event.time}</div>
                  <div className={`text-base font-bold ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{event.title}</div>
                </div>
                <div className="flex flex-col gap-y-1 text-xs ml-20">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div className={`flex gap-1 ${isLightMode ? 'text-gray-800' : ''}`}><span className="text-gray-400">Actual:</span> <span className="font-bold">{event.actual}</span></div>
                    <div className={`flex gap-1 ${isLightMode ? 'text-gray-800' : ''}`}><span className="text-gray-400">Previous:</span> <span className="font-bold">{event.previous}</span></div>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div className={`flex gap-1 ${isLightMode ? 'text-gray-800' : ''}`}><span className="text-gray-400">Consensus:</span> <span className="font-bold">{event.consensus}</span></div>
                    <div className={`flex gap-1 ${isLightMode ? 'text-gray-800' : ''}`}><span className="text-gray-400">Forecast:</span> <span className="font-bold">{event.forecast}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EconomicCalendar; 