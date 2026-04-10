import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { Settings, Play, Activity, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

const equityData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  portfolio: 100000 + (i * 5000) + (Math.random() * 2000),
  benchmark: 100000 + (i * 3000) + (Math.random() * 1000),
}));

const distributionData = [
  { range: '-5%', count: 10 },
  { range: '-4%', count: 25 },
  { range: '-3%', count: 45 },
  { range: '-2%', count: 65 },
  { range: '-1%', count: 85 },
  { range: '0%', count: 120 },
  { range: '+1%', count: 150 },
  { range: '+2%', count: 110 },
  { range: '+3%', count: 80 },
  { range: '+4%', count: 40 },
  { range: '+5%', count: 15 },
];

export const BacktestView: React.FC = () => {
  return (
    <div className="flex h-full overflow-hidden bg-bg">
      {/* LEFT PANEL: CONFIG */}
      <aside className="w-80 flex flex-col border-r border-line/20 bg-surface">
        <div className="p-4 bg-surface-high border-b border-line/30">
          <h2 className="font-headline text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
            <Settings className="w-4 h-4" />
            Simulation_Config
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          <section>
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">Timeframe_Window</label>
            <div className="grid grid-cols-3 gap-1">
              {['1Y', '3Y', '5Y'].map((t, i) => (
                <button key={t} className={cn(
                  "border py-2 text-[11px] font-headline transition-all uppercase font-bold",
                  i === 1 ? "bg-surface-high border-primary text-primary" : "bg-bg border-line/40 text-on-surface-variant hover:bg-surface-high"
                )}>
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">Initial_Capital (USD)</label>
              <input className="w-full bg-bg border-b border-line text-primary font-mono text-sm py-2 px-3 focus:outline-none focus:border-primary" type="text" defaultValue="100,000.00" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">Slippage_Model</label>
              <select className="w-full bg-bg border-b border-line text-on-surface font-headline text-xs py-2 px-2 focus:outline-none focus:border-primary rounded-none appearance-none">
                <option>CONSTANT_PERCENT (0.1%)</option>
                <option>DYNAMIC_VOLUME_IMPACT</option>
                <option>FIXED_PER_SHARE</option>
              </select>
            </div>
          </section>

          <section>
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">Sensitivity_Matrix (Stop-Loss %)</label>
            <div className="grid grid-cols-5 gap-0.5 text-center">
              {[0.5, 1.0, 1.5, 2.0, 2.5].map((val, i) => (
                <div key={val} className={cn(
                  "h-6 text-[8px] flex items-center justify-center font-bold",
                  i === 3 ? "bg-primary text-bg" : "bg-primary-dim/30 text-primary"
                )}>
                  {val}
                </div>
              ))}
              {['8.1%', '12.4%', '18.9%', '24.1%', '21.5%'].map((val) => (
                <div key={val} className="h-6 bg-bg text-[8px] flex items-center justify-center text-primary border border-line/10">
                  {val}
                </div>
              ))}
            </div>
          </section>

          <button className="w-full bg-primary text-bg font-headline font-bold text-xs py-3 tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(2,230,0,0.2)] uppercase">
            Execute_Simulation
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HUD */}
        <div className="grid grid-cols-5 bg-surface border-b border-line/20">
          {[
            { label: 'Total_Return', value: '+142.84%', color: 'text-primary' },
            { label: 'Max_Drawdown', value: '-12.4%', color: 'text-secondary' },
            { label: 'Sharpe_Ratio', value: '2.84', color: 'text-tertiary' },
            { label: 'Sortino_Ratio', value: '3.12', color: 'text-on-surface' },
            { label: 'Win_Rate', value: '64.2%', color: 'text-primary' },
          ].map((stat, i) => (
            <div key={stat.label} className={cn("p-4", i < 4 && "border-r border-line/20")}>
              <span className="text-[9px] font-bold text-on-surface-variant block mb-1 uppercase tracking-widest">{stat.label}</span>
              <span className={cn("text-2xl font-headline font-bold", stat.color)}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="flex-1 p-4 grid grid-cols-3 grid-rows-2 gap-4 overflow-hidden no-scrollbar">
          <div className="col-span-2 row-span-1 bg-surface relative border border-line/10 dashed-grid overflow-hidden">
            <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-bg to-transparent z-10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-on-surface tracking-tighter uppercase">Equity_Curve_Analysis (V_Alpha_7)</h3>
              <div className="flex gap-4 text-[9px] font-headline font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-primary"></span> Portfolio</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-on-surface-variant"></span> Benchmark (SPY)</div>
              </div>
            </div>
            <div className="absolute inset-0 pt-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData}>
                  <defs>
                    <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#02e600" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#02e600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3b4b35" opacity={0.2} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #3b4b35', fontSize: '10px' }}
                    itemStyle={{ color: '#02e600' }}
                  />
                  <Area type="monotone" dataKey="portfolio" stroke="#02e600" fillOpacity={1} fill="url(#colorPortfolio)" strokeWidth={2} />
                  <Line type="monotone" dataKey="benchmark" stroke="#b9ccaf" strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-surface border border-line/10 p-4 flex flex-col">
            <h3 className="text-[10px] font-bold text-on-surface mb-4 uppercase tracking-widest">Trade_Magnitude_Distribution</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <Bar dataKey="count" fill="#02e600" opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[8px] text-on-surface-variant font-mono">
              <span>-5.0%</span>
              <span>0.0%</span>
              <span>+5.0%</span>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-surface border border-line/10 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Risk_Reward_Optimization</h3>
              <span className="text-[8px] text-primary font-bold">CPU_LOAD: 18%</span>
            </div>
            <div className="grid grid-cols-8 grid-rows-8 gap-0.5 h-[calc(100%-2rem)]">
              {Array.from({ length: 64 }).map((_, i) => {
                const intensity = Math.floor(Math.random() * 5);
                const colors = ['bg-secondary-container', 'bg-tertiary-dim', 'bg-primary-dim', 'bg-primary', 'bg-primary-fixed'];
                return <div key={i} className={cn("w-full h-full", colors[intensity])} />;
              })}
            </div>
          </div>

          <div className="col-span-2 row-span-1 bg-surface border border-line/10 overflow-hidden flex flex-col">
            <div className="bg-surface-high p-3 border-b border-line/30 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Recent_Simulated_Executions</h3>
              <span className="text-[9px] text-on-surface-variant font-bold">TOTAL_TRADES: 412</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead className="sticky top-0 bg-surface text-on-surface-variant border-b border-line/30 uppercase text-[9px]">
                  <tr>
                    <th className="text-left p-2 font-bold">Timestamp</th>
                    <th className="text-left p-2 font-bold">Symbol</th>
                    <th className="text-left p-2 font-bold">Side</th>
                    <th className="text-right p-2 font-bold">Size</th>
                    <th className="text-right p-2 font-bold">Price</th>
                    <th className="text-right p-2 font-bold">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: '2023.11.14 09:34:21', symbol: 'TSLA', side: 'LONG', size: 450, price: 241.12, pnl: '+$1,241.00', color: 'text-primary' },
                    { time: '2023.11.14 11:12:05', symbol: 'NVDA', side: 'SHORT', size: 120, price: 485.40, pnl: '-$420.50', color: 'text-secondary' },
                    { time: '2023.11.14 14:45:33', symbol: 'AAPL', side: 'LONG', size: 800, price: 186.20, pnl: '+$2,890.15', color: 'text-primary' },
                    { time: '2023.11.15 10:05:12', symbol: 'AMD', side: 'LONG', size: 300, price: 118.45, pnl: '+$560.00', color: 'text-primary' },
                  ].map((trade, i) => (
                    <tr key={i} className={cn("hover:bg-surface-high/30 border-b border-line/10 transition-colors", i % 2 === 1 && "bg-surface-high/10")}>
                      <td className="p-2 text-on-surface-variant">{trade.time}</td>
                      <td className="p-2 font-bold text-on-surface">{trade.symbol}</td>
                      <td className={cn("p-2 font-bold", trade.side === 'LONG' ? 'text-primary' : 'text-secondary')}>{trade.side}</td>
                      <td className="p-2 text-right">{trade.size}</td>
                      <td className="p-2 text-right">{trade.price}</td>
                      <td className={cn("p-2 text-right font-bold", trade.color)}>{trade.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
