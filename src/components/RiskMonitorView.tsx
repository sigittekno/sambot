import React from 'react';
import { ShieldAlert, Activity, CheckCircle, AlertTriangle, Maximize2, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

export const RiskMonitorView: React.FC = () => {
  return (
    <div className="flex-1 p-4 grid grid-cols-12 grid-rows-6 gap-4 overflow-y-auto no-scrollbar bg-bg">
      {/* 1. REAL-TIME RISK DASHBOARD */}
      <section className="col-span-12 lg:col-span-8 row-span-1 grid grid-cols-3 gap-4">
        <div className="bg-surface p-4 flex flex-col justify-between border-l-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <ShieldAlert className="w-16 h-16" />
          </div>
          <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Net Liquidity</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline font-bold text-on-surface">$14,290,442</span>
            <span className="text-[10px] text-primary font-bold font-headline">+0.42%</span>
          </div>
        </div>
        <div className="bg-surface p-4 flex flex-col justify-between border-l-2 border-tertiary relative">
          <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Margin Usage</span>
          <div className="flex items-baseline justify-between w-full">
            <span className="text-3xl font-headline font-bold text-tertiary">38.4%</span>
            <div className="w-24 h-1 bg-surface-highest relative">
              <div className="absolute top-0 left-0 h-full bg-tertiary w-[38.4%] shadow-[0_0_8px_#ffba20]"></div>
            </div>
          </div>
        </div>
        <div className="bg-surface p-4 flex flex-col justify-between border-l-2 border-secondary relative">
          <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Daily Drawdown</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline font-bold text-secondary">-$112,040</span>
            <span className="text-[10px] text-secondary font-bold font-headline">-0.78%</span>
          </div>
        </div>
      </section>

      {/* 2. VaR DISTRIBUTION */}
      <section className="col-span-12 lg:col-span-5 row-span-3 bg-surface flex flex-col border border-line/10">
        <div className="bg-surface-highest px-4 py-2 flex justify-between items-center">
          <h2 className="text-[10px] font-headline font-bold text-on-surface uppercase tracking-widest">VaR Distribution (99% Confidence)</h2>
          <Maximize2 className="w-3 h-3 text-on-surface-variant cursor-pointer" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-end gap-1">
          <div className="flex items-end gap-1 h-full pt-10">
            {[10, 15, 25, 45, 70, 90, 65, 40, 20, 12, 5].map((h, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 transition-all duration-500",
                  i < 4 ? "bg-surface-high" : 
                  i < 7 ? "bg-primary/40 border-t-2 border-primary" : 
                  "bg-secondary/40 border-t-2 border-secondary"
                )} 
                style={{ height: `${h}%` }} 
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-headline text-on-surface-variant uppercase font-bold">
            <span>-5.0%</span>
            <span>-2.5%</span>
            <span>0%</span>
            <span>+2.5%</span>
            <span>+5.0%</span>
          </div>
          <div className="mt-4 pt-4 border-t border-line/20 flex justify-around">
            <div className="text-center">
              <p className="text-[8px] text-on-surface-variant uppercase font-bold">Potential Loss</p>
              <p className="text-sm font-headline font-bold text-secondary">$420,000</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] text-on-surface-variant uppercase font-bold">Current VaR</p>
              <p className="text-sm font-headline font-bold text-on-surface">$288,500</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPOSURE HEATMAP */}
      <section className="col-span-12 lg:col-span-7 row-span-3 bg-surface flex flex-col border border-line/10">
        <div className="bg-surface-highest px-4 py-2 flex justify-between items-center">
          <h2 className="text-[10px] font-headline font-bold text-on-surface uppercase tracking-widest">Asset Exposure Heatmap</h2>
          <div className="flex gap-2">
            <span className="text-[9px] text-primary border border-primary px-1 font-bold">LIVE</span>
            <Filter className="w-3 h-3 text-on-surface-variant cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 p-4 grid grid-cols-4 grid-rows-2 gap-2">
          <div className="col-span-2 row-span-2 bg-primary/10 border border-primary/20 p-3 flex flex-col justify-between hover:bg-primary/20 cursor-pointer transition-colors group">
            <div>
              <p className="text-[10px] font-headline font-bold text-primary uppercase tracking-widest">Equities</p>
              <p className="text-2xl font-headline font-bold">$8.4M</p>
            </div>
            <p className="text-[9px] text-on-surface-variant font-bold uppercase">64% Portfolio Weight</p>
          </div>
          <div className="col-span-1 row-span-1 bg-tertiary/10 border border-tertiary/20 p-3 flex flex-col justify-between hover:bg-tertiary/20 transition-colors">
            <div>
              <p className="text-[10px] font-headline font-bold text-tertiary uppercase tracking-widest">Forex</p>
              <p className="text-lg font-headline font-bold">$3.2M</p>
            </div>
            <p className="text-[9px] text-on-surface-variant font-bold uppercase">22% weight</p>
          </div>
          <div className="col-span-1 row-span-1 bg-surface-high border border-line/10 p-3 flex flex-col justify-between hover:bg-surface-highest transition-colors">
            <div>
              <p className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Commodities</p>
              <p className="text-lg font-headline font-bold">$0.9M</p>
            </div>
            <p className="text-[9px] text-on-surface-variant font-bold uppercase">6% weight</p>
          </div>
          <div className="col-span-2 row-span-1 bg-secondary/10 border border-secondary/20 p-3 flex flex-col justify-between hover:bg-secondary/20 transition-colors">
            <div>
              <p className="text-[10px] font-headline font-bold text-secondary uppercase tracking-widest">Crypto</p>
              <p className="text-lg font-headline font-bold">$1.79M</p>
            </div>
            <p className="text-[9px] text-on-surface-variant font-bold uppercase">8% weight · Volatility: High</p>
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE RULE ENGINE */}
      <section className="col-span-12 lg:col-span-6 row-span-2 bg-surface flex flex-col border border-line/10">
        <div className="bg-surface-highest px-4 py-2 flex justify-between items-center">
          <h2 className="text-[10px] font-headline font-bold text-on-surface uppercase tracking-widest">Compliance Rule Engine</h2>
          <button className="bg-primary text-bg text-[9px] font-bold px-2 py-0.5 font-headline uppercase tracking-widest">Add Rule</button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-surface-high text-on-surface-variant font-headline sticky top-0 uppercase text-[9px]">
              <tr>
                <th className="p-3 font-bold tracking-tighter">Rule ID</th>
                <th className="p-3 font-bold tracking-tighter">Constraint Description</th>
                <th className="p-3 font-bold tracking-tighter">Limit</th>
                <th className="p-3 font-bold tracking-tighter text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {[
                { id: 'CR-092', desc: 'Max Position Size (Single Asset)', limit: '$1,500,000', active: true },
                { id: 'CR-104', desc: 'Daily Loss Limit (Global)', limit: '$250,000', active: true, alert: true },
                { id: 'CR-021', desc: 'Leverage Ceiling (Crypto)', limit: '5.0x', active: false },
              ].map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-high transition-colors">
                  <td className="p-3 font-headline font-bold text-primary">{rule.id}</td>
                  <td className="p-3 text-on-surface-variant">{rule.desc}</td>
                  <td className={cn("p-3 font-bold", rule.alert ? "text-secondary" : "text-on-surface")}>{rule.limit}</td>
                  <td className="p-3 text-right">
                    <div className={cn(
                      "inline-flex w-8 h-4 rounded-full relative cursor-pointer transition-all",
                      rule.active ? "bg-primary/20" : "bg-surface-highest"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full transition-all",
                        rule.active ? "right-0.5 bg-primary shadow-[0_0_5px_#02e600]" : "left-0.5 bg-on-surface-variant"
                      )} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. ALERT HISTORY */}
      <section className="col-span-12 lg:col-span-6 row-span-2 bg-surface flex flex-col border border-line/10">
        <div className="bg-surface-highest px-4 py-2 flex justify-between items-center">
          <h2 className="text-[10px] font-headline font-bold text-on-surface uppercase tracking-widest">Risk Breach History</h2>
          <span className="text-[9px] text-on-surface-variant font-headline font-bold uppercase tracking-widest">Last 24 Hours</span>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-[1px] bg-line/10">
          {[
            { type: 'warning', title: 'Margin Level Alert', time: '14:02:11', msg: 'Margin usage exceeded 35% threshold on portfolio sub-account AX-01. Action required.', color: 'text-secondary' },
            { type: 'high', title: 'Position Concentration', time: '11:45:02', msg: 'TSLA exposure reached 12.5% of total NAV. Closing in on 15% hard limit.', color: 'text-tertiary' },
            { type: 'success', title: 'Risk Reset Success', time: '09:12:44', msg: 'Manual override applied to Daily Loss Limit. System status restored to Nominal.', color: 'text-primary' },
          ].map((alert, i) => (
            <div key={i} className="bg-surface p-3 flex items-start gap-4 hover:bg-surface-high transition-colors group">
              <div className="mt-1">
                <Activity className={cn("w-4 h-4", alert.color)} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[11px] font-bold text-on-surface font-headline uppercase tracking-tight">{alert.title}</h4>
                  <span className="text-[9px] text-on-surface-variant font-mono">{alert.time}</span>
                </div>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">{alert.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
