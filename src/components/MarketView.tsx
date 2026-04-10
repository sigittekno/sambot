import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, Info, Newspaper, Globe, ChevronDown, Edit3 } from 'lucide-react';
import { cn } from '../lib/utils';

const chartData = [
  { time: '09:30', price: 173.2, vol: 120 },
  { time: '10:00', price: 173.5, vol: 150 },
  { time: '10:30', price: 173.1, vol: 180 },
  { time: '11:00', price: 173.8, vol: 210 },
  { time: '11:30', price: 174.2, vol: 190 },
  { time: '12:00', price: 174.5, vol: 160 },
  { time: '12:30', price: 174.1, vol: 240 },
  { time: '13:00', price: 174.6, vol: 220 },
  { time: '13:30', price: 174.8, vol: 200 },
  { time: '14:00', price: 174.4, vol: 180 },
  { time: '14:30', price: 174.9, vol: 250 },
  { time: '15:00', price: 175.2, vol: 280 },
  { time: '15:30', price: 175.1, vol: 300 },
  { time: '16:00', price: 175.4, vol: 320 },
];

const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 16;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
};

export const MarketView: React.FC<{ onTickerClick: (symbol: string) => void }> = ({ onTickerClick }) => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');

  const gainers = [
    { symbol: 'GLMD', name: 'Galmed Pharm...', price: '1.160', change: '+86.36%', vol: '169.07M', mcap: '5.45M', spark: [1, 1.2, 1.1, 1.5, 1.4, 1.8, 1.7, 2.2] },
    { symbol: 'GAME', name: 'GAMESQUARE ...', price: '0.410', change: '+62.51%', vol: '252.02M', mcap: '38.16M', spark: [1, 1.1, 1.05, 1.3, 1.25, 1.5, 1.45, 1.6] },
    { symbol: 'ARAI', name: 'Arrive Al Inc', price: '0.990', change: '+47.76%', vol: '315.86M', mcap: '49.19M', spark: [1, 1.05, 1.15, 1.1, 1.3, 1.4, 1.35, 1.5] },
    { symbol: 'ELAB', name: 'PMGC Holdings', price: '6.56', change: '+45.78%', vol: '54.28M', mcap: '11.10M', spark: [1, 1.2, 1.1, 1.15, 1.1, 1.25, 1.2, 1.4] },
    { symbol: 'ONCO', name: 'Onconetix', price: '1.620', change: '+43.32%', vol: '219.65M', mcap: '845.37K', spark: [1, 1.1, 1.3, 1.2, 1.5, 1.4, 1.6, 1.55] },
    { symbol: 'PMAX', name: 'Powell Max Limi...', price: '0.477', change: '+28.86%', vol: '99.78M', mcap: '1.13M', spark: [1, 0.9, 1.1, 1.05, 1.2, 1.15, 1.3, 1.25] },
    { symbol: 'CLIK', name: 'Click Hldgs Ltd', price: '2.610', change: '+24.28%', vol: '28.81M', mcap: '9.46M', spark: [1, 1.05, 1.02, 1.1, 1.08, 1.15, 1.12, 1.2] },
    { symbol: 'YMT', name: 'Yimutian Inc', price: '0.212', change: '+20.49%', vol: '196.36M', mcap: '25.86M', spark: [1, 0.95, 1.05, 1.0, 1.1, 1.05, 1.15, 1.1] },
  ];

  const losers = [
    { symbol: 'FSR', name: 'Fisker Inc', price: '0.021', change: '-45.20%', vol: '82.1M', mcap: '12.4M', spark: [2.2, 1.8, 1.9, 1.5, 1.6, 1.2, 1.3, 1.0] },
    { symbol: 'NKLA', name: 'Nikola Corp', price: '0.650', change: '-12.15%', vol: '45.2M', mcap: '845M', spark: [1.5, 1.4, 1.45, 1.3, 1.35, 1.2, 1.25, 1.1] },
  ];

  const tableData = activeTab === 'gainers' ? gainers : losers;

  return (
    <div className="grid grid-cols-12 gap-4 h-full p-4 overflow-y-auto no-scrollbar bg-bg">
      {/* LEFT COLUMN: CHART & FOREX */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
        {/* MAIN CHART */}
        <section className="bg-surface border border-line/10 p-4 flex flex-col h-[500px]">
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h2 
                onClick={() => onTickerClick('AAPL')}
                className="font-headline text-sm font-black text-on-surface uppercase tracking-widest cursor-pointer hover:text-primary transition-colors"
              >
                AAPL:NASDAQ | APPLE INC.
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-headline font-bold text-primary">172.62</span>
                <span className="text-[10px] text-primary font-bold">+1.45 (0.85%)</span>
              </div>
            </div>
            <div className="flex bg-surface-high p-0.5">
              {['1M', '5M', '1H', '1D'].map((t, i) => (
                <button key={t} className={cn(
                  "px-3 py-1 text-[9px] font-headline font-bold uppercase tracking-widest transition-all",
                  i === 1 ? "bg-primary text-bg" : "text-on-surface-variant hover:bg-surface-highest"
                )}>
                  {t}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#02e600" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#02e600" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3b4b35" opacity={0.1} vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c2c9bd', fontSize: 9 }} 
                />
                <YAxis 
                  domain={['dataMin - 0.5', 'dataMax + 0.5']} 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c2c9bd', fontSize: 9 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #3b4b35', fontSize: '10px' }}
                  itemStyle={{ color: '#02e600' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#02e600" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  strokeWidth={2} 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* VOLUME BARS OVERLAY */}
            <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none opacity-30">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar dataKey="vol" fill="#02e600" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* FOREX QUOTES */}
        <section className="bg-surface border border-line/10 p-4">
          <h3 className="text-[10px] font-headline font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">FOREX_QUOTES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { pair: 'EUR / USD', price: '1.0824', sub: '5', bid: '1.0824', ask: '1.0825', trend: 'up' },
              { pair: 'GBP / USD', price: '1.2642', sub: '1', bid: '1.2642', ask: '1.2643', trend: 'up' },
              { pair: 'USD / JPY', price: '151.34', sub: '2', bid: '151.34', ask: '151.35', trend: 'down' },
              { pair: 'USD / CHF', price: '0.9022', sub: '8', bid: '0.9022', ask: '0.9024', trend: 'up' },
            ].map((fx) => (
              <div key={fx.pair} className="bg-bg/50 p-4 border border-line/5 hover:bg-surface-high transition-all group">
                <div className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">{fx.pair}</div>
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className={cn("text-2xl font-headline font-bold", fx.trend === 'up' ? 'text-primary' : 'text-secondary')}>
                    {fx.price}
                  </span>
                  <span className={cn("text-xs font-headline font-bold", fx.trend === 'up' ? 'text-primary' : 'text-secondary')}>
                    {fx.sub}
                  </span>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-on-surface-variant opacity-50 uppercase">
                  <span>BID: {fx.bid}</span>
                  <span>ASK: {fx.ask}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MIDDLE COLUMN: MOVERS & COMMODITIES */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        {/* MARKET MOVERS */}
        <section className="bg-surface border border-line/10 p-4 flex-1">
          <h3 className="text-[10px] font-headline font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">MARKET_MOVERS</h3>
          <div className="space-y-1">
            <div className="grid grid-cols-4 text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest pb-2 border-b border-line/10">
              <span>TICKER</span>
              <span className="text-right">LAST</span>
              <span className="text-right">CHG%</span>
              <span className="text-right">TREND</span>
            </div>
            {/* MARKET MOVERS LIST */}
            {[
              { ticker: 'NVDA', last: '894.20', chg: '+2.41%', trend: 'up' },
              { ticker: 'TSLA', last: '175.60', chg: '-3.12%', trend: 'down' },
              { ticker: 'MSFT', last: '412.33', chg: '+0.88%', trend: 'up' },
              { ticker: 'AMD', last: '182.10', chg: '+1.55%', trend: 'up' },
              { ticker: 'META', last: '496.22', chg: '-0.45%', trend: 'down' },
            ].map((mover) => (
              <div 
                key={mover.ticker} 
                onClick={() => onTickerClick(mover.ticker)}
                className="grid grid-cols-4 py-3 border-b border-line/5 items-center hover:bg-surface-high transition-colors cursor-pointer group"
              >
                <span className={cn("text-[11px] font-headline font-black group-hover:text-primary transition-colors", mover.trend === 'up' ? 'text-primary' : 'text-tertiary')}>{mover.ticker}</span>
                <span className="text-[11px] font-mono font-bold text-on-surface text-right">{mover.last}</span>
                <span className={cn("text-[11px] font-mono font-bold text-right", mover.trend === 'up' ? 'text-primary' : 'text-secondary')}>{mover.chg}</span>
                <div className="flex justify-end pr-2">
                  <div className={cn("w-12 h-1 bg-bg relative overflow-hidden")}>
                    <div className={cn("absolute inset-y-0 right-0", mover.trend === 'up' ? 'bg-primary' : 'bg-secondary')} style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMODITIES */}
        <section className="bg-surface border border-line/10 p-4">
          <h3 className="text-[10px] font-headline font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">COMMODITIES</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'GOLD', price: '2,184.20', chg: '+0.2%', trend: 'up' },
              { name: 'WTI CRUDE', price: '81.15', chg: '-1.4%', trend: 'down' },
              { name: 'NAT GAS', price: '1.782', chg: '+4.2%', trend: 'up' },
              { name: 'SILVER', price: '24.58', chg: '0.0%', trend: 'neutral' },
            ].map((com) => (
              <div key={com.name} className="bg-bg/50 p-3 border border-line/5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">{com.name}</span>
                  <span className={cn("text-[9px] font-mono font-bold", com.trend === 'up' ? 'text-primary' : com.trend === 'down' ? 'text-secondary' : 'text-on-surface-variant')}>
                    {com.chg}
                  </span>
                </div>
                <div className="text-lg font-headline font-black text-on-surface">{com.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">COMMOD_SENTIMENT</span>
            <div className="flex gap-0.5">
              {[1,1,1,0,0].map((v, i) => (
                <div key={i} className={cn("w-2 h-2", v ? 'bg-primary' : 'bg-surface-highest')} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN: NEWS & GAINERS/LOSERS */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        <section className="bg-surface border border-line/10 p-4 h-[450px] flex flex-col">
          <header className="flex justify-between items-center mb-6 border-b border-line/10 pb-2">
            <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">STITCH_NEWS_LIVE</h3>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </header>
          <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
            {[
              { time: '14:24:02', title: "Fed's Powell hints at possible June rate cut if inflation data remains supportive.", icon: TrendingUp, color: 'text-primary' },
              { time: '14:18:45', title: "NVIDIA announces partnership with global cloud providers for H200 chips.", icon: Info, color: 'text-tertiary' },
              { time: '14:05:11', title: "Crude oil inventory builds up more than expected, dragging WTI prices down.", icon: TrendingDown, color: 'text-secondary' },
              { time: '13:52:30', title: "Apple eyes new European markets for Vision Pro rollout this summer.", icon: Globe, color: 'text-on-surface-variant' },
              { time: '13:45:12', title: "Trading volumes in Japan hit record high amid yen volatility.", icon: Clock, color: 'text-on-surface-variant' },
            ].map((news, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className={cn("p-1.5 bg-bg border border-line/10", news.color)}>
                    <news.icon className="w-3 h-3" />
                  </div>
                  <div className="w-px flex-1 bg-line/10" />
                </div>
                <div className="pb-4">
                  <span className="text-[10px] font-mono font-bold text-primary mb-1 block">{news.time}</span>
                  <p className="text-[11px] font-headline font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                    {news.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 mt-4 border border-line/20 text-[9px] font-headline font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-high transition-all">
            VIEW_FULL_ARCHIVE
          </button>
        </section>
      </div>

      {/* TOP GAINERS / LOSERS TABLE */}
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
        <section className="bg-surface border border-line/10 p-0 flex flex-col h-[450px]">
          <header className="flex justify-between items-center px-4 py-3 border-b border-line/10">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('gainers')}
                className={cn(
                  "text-xs font-headline font-bold uppercase tracking-widest pb-1 transition-all relative",
                  activeTab === 'gainers' ? "text-primary" : "text-on-surface-variant opacity-50 hover:opacity-100"
                )}
              >
                Top Gainers
                {activeTab === 'gainers' && <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-primary" />}
              </button>
              <button 
                onClick={() => setActiveTab('losers')}
                className={cn(
                  "text-xs font-headline font-bold uppercase tracking-widest pb-1 transition-all relative",
                  activeTab === 'losers' ? "text-secondary" : "text-on-surface-variant opacity-50 hover:opacity-100"
                )}
              >
                Top Losers
                {activeTab === 'losers' && <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-secondary" />}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-on-surface">
                <Edit3 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 bg-bg px-2 py-1 border border-line/10 cursor-pointer hover:bg-surface-high transition-all">
                <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Pre-market</span>
                <ChevronDown className="w-3 h-3 text-on-surface-variant" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface z-10">
                <tr className="border-b border-line/10">
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest w-10">
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-2 border-y border-on-surface-variant/30" />
                    </div>
                  </th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest">Symbol</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest">Name</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest text-right">PM Price</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest text-center">Sparkline</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest text-right">% Change</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest text-right">Volume</th>
                  <th className="px-4 py-2 text-[9px] font-headline font-black text-on-surface-variant uppercase tracking-widest text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr 
                    key={row.symbol} 
                    onClick={() => onTickerClick(row.symbol)}
                    className="border-b border-line/5 hover:bg-surface-high transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3 text-[10px] font-mono text-on-surface-variant opacity-30 text-center">{i + 1}</td>
                    <td className="px-4 py-3 text-[11px] font-headline font-black text-on-surface group-hover:text-primary transition-colors">{row.symbol}</td>
                    <td className="px-4 py-3 text-[11px] font-headline font-bold text-on-surface-variant truncate max-w-[120px]">{row.name}</td>
                    <td className="px-4 py-3 text-[11px] font-mono font-bold text-primary text-right">{row.price}</td>
                    <td className="px-4 py-3 flex justify-center items-center h-full">
                      <Sparkline data={row.spark} color={activeTab === 'gainers' ? '#02e600' : '#ff4444'} />
                    </td>
                    <td className={cn(
                      "px-4 py-3 text-[11px] font-mono font-bold text-right",
                      activeTab === 'gainers' ? "text-primary" : "text-secondary"
                    )}>
                      {row.change}
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono font-bold text-on-surface text-right">{row.vol}</td>
                    <td className="px-4 py-3 text-[11px] font-mono font-bold text-on-surface text-right">{row.mcap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
