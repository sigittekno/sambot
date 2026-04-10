import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Line,
  Area,
  AreaChart,
  BarChart
} from 'recharts';
import { Zap, Shield, Info, ArrowUpRight, ArrowDownRight, Clock, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface TickerDetailViewProps {
  symbol: string;
}

const candleData = [
  { time: '14:00', open: 191.5, high: 192.2, low: 191.2, close: 191.8, vol: 1200, rsi: 58, macd: 0.5 },
  { time: '14:05', open: 191.8, high: 192.5, low: 191.6, close: 192.3, vol: 1500, rsi: 62, macd: 0.8 },
  { time: '14:10', open: 192.3, high: 192.1, low: 191.5, close: 191.7, vol: 1100, rsi: 55, macd: 0.4 },
  { time: '14:15', open: 191.7, high: 192.8, low: 191.7, close: 192.6, vol: 1800, rsi: 65, macd: 1.2 },
  { time: '14:20', open: 192.6, high: 193.2, low: 192.4, close: 192.9, vol: 2100, rsi: 70, macd: 1.5 },
  { time: '14:25', open: 192.9, high: 193.5, low: 192.8, close: 193.4, vol: 1900, rsi: 72, macd: 1.8 },
  { time: '14:30', open: 193.4, high: 193.1, low: 192.2, close: 192.5, vol: 2400, rsi: 60, macd: 0.9 },
  { time: '14:35', open: 192.5, high: 192.9, low: 192.3, close: 192.8, vol: 1600, rsi: 63, macd: 1.1 },
  { time: '14:40', open: 192.8, high: 193.4, low: 192.7, close: 193.2, vol: 2000, rsi: 68, macd: 1.4 },
  { time: '14:45', open: 193.2, high: 193.8, low: 193.1, close: 193.6, vol: 2200, rsi: 71, macd: 1.7 },
  { time: '14:50', open: 193.6, high: 194.2, low: 193.5, close: 194.1, vol: 2500, rsi: 75, macd: 2.1 },
  { time: '14:55', open: 194.1, high: 193.8, low: 193.2, close: 193.5, vol: 1800, rsi: 65, macd: 1.3 },
];

export const TickerDetailView: React.FC<TickerDetailViewProps> = ({ symbol = 'AAPL' }) => {
  return (
    <div className="flex flex-col h-full bg-bg overflow-hidden">
      {/* HEADER */}
      <header className="h-14 border-b border-line/10 flex items-center justify-between px-6 bg-surface/30 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-headline font-black text-on-surface tracking-tighter">{symbol}</h1>
            <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest opacity-60">APPLE INC.</span>
          </div>
          <div className="flex items-center gap-6 pl-6 border-l border-line/10">
            <div className="flex flex-col">
              <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">PRICE</span>
              <span className="text-lg font-mono font-bold text-primary">192.42</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">CHANGE</span>
              <span className="text-lg font-mono font-bold text-primary">+1.24 (0.65%)</span>
            </div>
          </div>
        </div>

        <div className="flex bg-surface-high p-0.5 rounded-sm">
          {['1M', '5M', '15M', '1H', '1D'].map((t, i) => (
            <button key={t} className={cn(
              "px-3 py-1 text-[9px] font-headline font-bold uppercase tracking-widest transition-all",
              i === 1 ? "bg-primary text-bg" : "text-on-surface-variant hover:bg-surface-highest"
            )}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* MAIN CHART AREA */}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-4 gap-4">
          {/* MAIN CANDLESTICK CHART */}
          <section className="bg-surface/20 border border-line/5 p-4 h-[450px] relative">
            <div className="absolute top-4 right-4 z-10 text-right">
              <div className="text-[10px] font-mono text-primary">VOL: 12.4M</div>
              <div className="text-[10px] font-mono text-primary opacity-60">AVG: 10.1M</div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={candleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3b4b35" opacity={0.05} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#c2c9bd', fontSize: 9 }} />
                <YAxis orientation="right" domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#c2c9bd', fontSize: 9 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #3b4b35', fontSize: '10px' }}
                  itemStyle={{ color: '#02e600' }}
                />
                {/* CANDLESTICK SIMULATION */}
                <Bar dataKey="close" fill="#02e600" opacity={0.3} />
                <Line type="monotone" dataKey="close" stroke="#02e600" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </section>

          {/* RSI INDICATOR */}
          <section className="bg-surface/20 border border-line/5 p-4 h-[120px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-headline font-bold text-tertiary uppercase tracking-widest">RSI(14) - <span className="text-primary">64.21</span></span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={candleData}>
                <Area type="monotone" dataKey="rsi" stroke="#ffaa00" fill="#ffaa00" fillOpacity={0.05} strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          {/* MACD INDICATOR */}
          <section className="bg-surface/20 border border-line/5 p-4 h-[120px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">MACD (12, 26, 9)</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candleData}>
                <Bar dataKey="macd" fill={(d: any) => d.macd > 0 ? '#02e600' : '#ff4444'} />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* RECENT TAPE */}
          <section className="bg-surface/20 border border-line/5 p-4">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">RECENT TAPE</h3>
              <Clock className="w-3 h-3 text-on-surface-variant opacity-50" />
            </header>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest border-b border-line/10">
                  <th className="pb-2">TIME</th>
                  <th className="pb-2 text-right">PRICE</th>
                  <th className="pb-2 text-right">SIZE</th>
                  <th className="pb-2 text-right">EXCH</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[10px]">
                {[
                  { time: '14:22:01', price: '192.42', size: '200', exch: 'NSDQ', color: 'text-primary' },
                  { time: '14:21:58', price: '192.41', size: '5,000', exch: 'NYSE', color: 'text-secondary' },
                  { time: '14:21:55', price: '192.42', size: '100', exch: 'ARCA', color: 'text-primary' },
                  { time: '14:21:52', price: '192.41', size: '25', exch: 'NSDQ', color: 'text-secondary' },
                  { time: '14:21:49', price: '192.43', size: '1,200', exch: 'NSDQ', color: 'text-primary' },
                ].map((trade, i) => (
                  <tr key={i} className="border-b border-line/5 hover:bg-surface-high transition-colors">
                    <td className="py-2 text-on-surface-variant">{trade.time}</td>
                    <td className={cn("py-2 text-right font-bold", trade.color)}>{trade.price}</td>
                    <td className="py-2 text-right text-on-surface">{trade.size}</td>
                    <td className="py-2 text-right text-on-surface-variant">{trade.exch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 border-l border-line/10 bg-surface/10 flex flex-col overflow-y-auto no-scrollbar">
          {/* QUICK EXECUTE */}
          <section className="p-4 border-b border-line/10">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">QUICK EXECUTE</h3>
              <Zap className="w-3 h-3 text-primary" />
            </header>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button className="bg-primary text-bg py-2 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">BUY_MKT</button>
              <button className="bg-secondary text-bg py-2 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">SELL_MKT</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-bg p-2 border border-line/10">
                <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase">QTY</span>
                <span className="text-[11px] font-mono font-bold text-on-surface">100</span>
              </div>
              <div className="flex justify-between items-center bg-bg p-2 border border-line/10">
                <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase">LIMIT</span>
                <span className="text-[11px] font-mono font-bold text-on-surface">192.40</span>
              </div>
            </div>
          </section>

          {/* ORDER BOOK */}
          <section className="p-4 border-b border-line/10">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">ORDER BOOK</h3>
              <span className="text-[8px] font-headline font-bold text-tertiary uppercase tracking-widest">L2_ACTIVE</span>
            </header>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest pb-1">
                <span>PRICE</span>
                <span className="text-center">SIZE</span>
                <span className="text-right">TOTAL</span>
              </div>
              {/* ASKS */}
              {[
                { price: '192.50', size: '85', total: '400' },
                { price: '192.55', size: '1.2k', total: '1.6k' },
                { price: '192.58', size: '450', total: '2.1k' },
              ].reverse().map((ask, i) => (
                <div key={i} className="grid grid-cols-3 text-[10px] font-mono py-1 text-secondary">
                  <span>{ask.price}</span>
                  <span className="text-center text-on-surface-variant">{ask.size}</span>
                  <span className="text-right text-on-surface-variant opacity-50">{ask.total}</span>
                </div>
              ))}
              {/* SPREAD */}
              <div className="py-2 border-y border-line/5 flex justify-center items-center gap-2">
                <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">SPREAD</span>
                <span className="text-[10px] font-mono font-bold text-tertiary">0.02 (0.01%)</span>
              </div>
              {/* BIDS */}
              {[
                { price: '192.48', size: '200', total: '200' },
                { price: '192.45', size: '3.4k', total: '3.6k' },
                { price: '192.40', size: '1.1k', total: '4.7k' },
              ].map((bid, i) => (
                <div key={i} className="grid grid-cols-3 text-[10px] font-mono py-1 text-primary">
                  <span>{bid.price}</span>
                  <span className="text-center text-on-surface-variant">{bid.size}</span>
                  <span className="text-right text-on-surface-variant opacity-50">{bid.total}</span>
                </div>
              ))}
            </div>
          </section>

          {/* KEY METRICS */}
          <section className="p-4 flex-1">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">KEY METRICS</h3>
              <Activity className="w-3 h-3 text-on-surface-variant opacity-50" />
            </header>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
              {[
                { label: 'MARKET CAP', val: '2.98T' },
                { label: 'DIV YIELD', val: '0.51%' },
                { label: 'P/E RATIO', val: '31.42' },
                { label: '52W HIGH', val: '199.62' },
                { label: 'EPS (TTM)', val: '6.13' },
                { label: 'BETA (5Y)', val: '1.28' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-1">{m.label}</div>
                  <div className="text-[11px] font-mono font-bold text-on-surface">{m.val}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">TECHNICAL SENTIMENT</span>
              </div>
              <div className="h-1.5 w-full bg-surface-high relative">
                <div className="absolute inset-y-0 left-0 bg-secondary" style={{ width: '20%' }} />
                <div className="absolute inset-y-0 left-[20%] bg-primary" style={{ width: '80%' }} />
                <div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-on-surface z-10" />
              </div>
              <div className="flex justify-between text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">
                <span>BEARISH</span>
                <span className="text-primary">STRONG BUY</span>
              </div>
            </div>

            <div className="mt-8 p-3 bg-primary/5 border border-primary/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-headline font-bold text-primary uppercase tracking-widest">WEBSOCKET: LIVE FEED CONNECTED</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
