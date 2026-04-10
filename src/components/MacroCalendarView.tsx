import React from 'react';
import { Filter, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export const MacroCalendarView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-bg">
      {/* SUB-HEADER */}
      <div className="bg-surface px-6 py-3 flex justify-between items-center border-b border-line/10">
        <div className="flex gap-4 items-center">
          <h2 className="font-headline text-xs font-black uppercase tracking-widest text-primary">Global Macro Calendar</h2>
          <div className="flex bg-surface-high p-0.5">
            <button className="px-3 py-1 bg-surface-highest text-primary font-headline text-[10px] font-bold uppercase tracking-widest">Daily</button>
            <button className="px-3 py-1 text-on-surface-variant hover:bg-surface-highest font-headline text-[10px] font-bold uppercase tracking-widest transition-colors">Weekly</button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-high cursor-pointer hover:bg-surface-highest transition-all group">
            <Filter className="w-3 h-3 text-tertiary group-hover:scale-110 transition-transform" />
            <span className="font-headline text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">High Impact Only</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[9px] font-headline uppercase text-on-surface-variant font-bold tracking-widest">System Time</div>
              <div className="text-xs font-mono font-bold text-primary">14:02:45 UTC</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-headline uppercase text-on-surface-variant font-bold tracking-widest">Next Key Event</div>
              <div className="text-xs font-mono font-bold text-tertiary">00:14:15 (NFP)</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* CENTRAL COLUMN */}
        <div className="col-span-9 bg-bg overflow-y-auto no-scrollbar border-r border-line/10">
          {/* DAY SECTION */}
          <div className="border-b border-line/10">
            <div className="bg-surface px-6 py-2 flex items-center justify-between sticky top-0 z-10 border-b border-line/5">
              <div className="flex items-center gap-3">
                <span className="font-headline text-xs font-black text-on-surface uppercase tracking-widest">Friday, Nov 15</span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-headline text-[9px] font-black uppercase tracking-widest">Active Session</span>
              </div>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-[60px_80px_1fr_100px_100px_100px_120px_80px] px-6 py-2 bg-surface-high/50 border-b border-line/5">
              {['Time', 'Curr', 'Event', 'Actual', 'Forecast', 'Previous', 'Trend (30D)', 'Impact'].map((h) => (
                <div key={h} className={cn(
                  "text-[9px] font-headline font-bold uppercase text-on-surface-variant tracking-widest",
                  ['Actual', 'Forecast', 'Previous'].includes(h) && "text-right",
                  ['Trend (30D)', 'Impact'].includes(h) && "text-center"
                )}>
                  {h}
                </div>
              ))}
            </div>

            {/* EVENTS */}
            {[
              { time: '13:30', curr: 'USD', event: 'Non-Farm Payrolls (Oct)', sub: 'Employment Situation Report', actual: '175K', forecast: '160K', prev: '142K', impact: 'High', color: 'bg-secondary' },
              { time: '13:30', curr: 'EUR', event: 'Core CPI (YoY)', sub: 'HICP Final Estimate', actual: '2.4%', forecast: '2.2%', prev: '2.2%', impact: 'Med', color: 'bg-tertiary/20 text-tertiary border border-tertiary/30' },
              { time: '15:00', curr: 'USD', event: 'Retail Sales (MoM)', sub: 'Consumer Spending Monitor', actual: '--', forecast: '0.4%', prev: '0.1%', impact: 'Low', color: 'bg-surface-highest text-on-surface-variant' },
            ].map((ev, i) => (
              <div key={i} className="grid grid-cols-[60px_80px_1fr_100px_100px_100px_120px_80px] px-6 py-3 border-b border-line/5 items-center hover:bg-surface-high transition-colors group">
                <div className="text-[11px] font-mono font-bold text-on-surface">{ev.time}</div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-bg border border-line/30 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary-dim" />
                  </div>
                  <span className="text-[11px] font-mono text-on-surface">{ev.curr}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-on-surface uppercase tracking-tight">{ev.event}</span>
                  <span className="text-[9px] text-on-surface-variant font-headline uppercase tracking-widest font-bold">{ev.sub}</span>
                </div>
                <div className="text-[11px] font-mono text-right text-primary font-bold">{ev.actual}</div>
                <div className="text-[11px] font-mono text-right text-on-surface-variant">{ev.forecast}</div>
                <div className="text-[11px] font-mono text-right text-on-surface-variant">{ev.prev}</div>
                <div className="flex justify-center items-center px-4">
                  <svg className="w-full h-6" viewBox="0 0 100 20">
                    <path d="M0 15 L20 18 L40 10 L60 12 L80 5 L100 2" fill="none" stroke="#02e600" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="flex justify-center">
                  <span className={cn("px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter", ev.color)}>{ev.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR PANELS */}
        <aside className="col-span-3 bg-surface flex flex-col overflow-y-auto no-scrollbar border-l border-line/5">
          <section className="border-b border-line/10">
            <div className="bg-surface-highest px-4 py-2">
              <h3 className="font-headline text-[10px] font-black uppercase tracking-widest text-primary">Central Bank Targets</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { bank: 'US Federal Reserve', target: '5.25 - 5.50%', status: 'Pause Likely', color: 'border-primary' },
                { bank: 'Euro Central Bank', target: '4.00%', status: 'Steady', color: 'border-on-surface-variant' },
                { bank: 'Bank of Japan', target: '0.10%', status: 'Hike Bias', color: 'border-secondary' },
              ].map((cb) => (
                <div key={cb.bank} className={cn("flex justify-between items-center bg-bg p-3 border-l-2", cb.color)}>
                  <div>
                    <div className="text-[10px] font-headline font-bold text-on-surface uppercase tracking-tight">{cb.bank}</div>
                    <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest">Target Range</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-on-surface">{cb.target}</div>
                    <div className="text-[9px] text-primary uppercase font-bold tracking-widest">{cb.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex-1">
            <div className="bg-surface-highest px-4 py-2">
              <h3 className="font-headline text-[10px] font-black uppercase tracking-widest text-tertiary">Sentiment Outlook</h3>
            </div>
            <div className="p-4 space-y-6">
              <div className="relative pt-6">
                <div className="absolute top-0 left-0 text-[9px] font-headline uppercase text-on-surface-variant font-bold tracking-widest">USD Dominance Index</div>
                <div className="h-2 bg-surface-highest w-full flex">
                  <div className="h-full bg-primary shadow-[0_0_8px_#02e600]" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase">Bullish 65%</span>
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase">Bearish 35%</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-primary/5 border border-primary/20 p-3 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-3 h-3 text-tertiary animate-bounce" />
                    <span className="text-[10px] font-headline font-black uppercase text-tertiary tracking-widest">Volatility Alert</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold uppercase tracking-tight">
                    High probability of overnight gap in JPY pairs following Monday GDP release. Suggested de-leveraging in AUD/JPY.
                  </p>
                  <div className="scanline" />
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
