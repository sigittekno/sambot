import React from 'react';
import { X, Plus, Edit2, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export const TerminalView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 h-full overflow-y-auto p-4 no-scrollbar">
      {/* COLUMN 1: MULTI-LEG ORDER ENTRY */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
        <section className="bg-surface p-4 border border-line/10">
          <header className="flex justify-between items-center mb-4 border-b border-line/10 pb-2">
            <h2 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface">Multi-Leg Order Entry</h2>
            <span className="text-[10px] text-tertiary">COMPLEX_MODE_ON</span>
          </header>

          {/* LEG A */}
          <div className="bg-bg p-3 mb-2 border-l-2 border-primary">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant">LEG_01 // CALL</span>
              <X className="w-3 h-3 text-on-surface-variant cursor-pointer hover:text-secondary" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Strike</label>
                <input className="w-full bg-surface border-none text-xs font-mono text-on-surface focus:ring-1 focus:ring-primary" type="text" defaultValue="445.00" />
              </div>
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Expiry</label>
                <input className="w-full bg-surface border-none text-xs font-mono text-on-surface focus:ring-1 focus:ring-primary" type="text" defaultValue="15_SEP_24" />
              </div>
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Side</label>
                <select className="w-full bg-surface border-none text-xs font-mono text-primary focus:ring-1 focus:ring-primary appearance-none px-2">
                  <option>BUY_OPEN</option>
                  <option>SELL_CLOSE</option>
                </select>
              </div>
            </div>
          </div>

          {/* LEG B */}
          <div className="bg-bg p-3 mb-4 border-l-2 border-secondary">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant">LEG_02 // CALL</span>
              <X className="w-3 h-3 text-on-surface-variant cursor-pointer hover:text-secondary" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Strike</label>
                <input className="w-full bg-surface border-none text-xs font-mono text-on-surface focus:ring-1 focus:ring-primary" type="text" defaultValue="455.00" />
              </div>
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Expiry</label>
                <input className="w-full bg-surface border-none text-xs font-mono text-on-surface focus:ring-1 focus:ring-primary" type="text" defaultValue="15_SEP_24" />
              </div>
              <div>
                <label className="block text-[9px] text-on-surface-variant mb-1 uppercase">Side</label>
                <select className="w-full bg-surface border-none text-xs font-mono text-secondary focus:ring-1 focus:ring-secondary appearance-none px-2">
                  <option>SELL_OPEN</option>
                  <option>BUY_CLOSE</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full py-2 border border-dashed border-line/30 text-[10px] text-on-surface-variant hover:bg-surface-high transition-colors mb-4 flex items-center justify-center gap-2 uppercase font-bold">
            <Plus className="w-3 h-3" /> Add Leg
          </button>

          <div className="mb-4">
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Execution Strategy</label>
            <div className="grid grid-cols-4 gap-1">
              {['VWAP', 'TWAP', 'ICEBERG', 'SNIPER'].map((algo, i) => (
                <button key={algo} className={cn(
                  "text-[9px] py-2 font-bold transition-all",
                  i === 0 ? "bg-surface-high border-b-2 border-primary text-primary" : "bg-bg hover:bg-surface-high text-on-surface-variant"
                )}>
                  {algo}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-highest p-3 flex flex-col gap-2 mb-4 border border-line/10">
            <div className="flex justify-between text-[10px]">
              <span className="text-on-surface-variant uppercase">Estimated Margin Impact:</span>
              <span className="font-mono text-tertiary">-12,450.00 USD</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-on-surface-variant uppercase">Available Power:</span>
              <span className="font-mono text-on-surface">482,001.22 USD</span>
            </div>
            <div className="h-1 bg-bg w-full overflow-hidden">
              <div className="h-full bg-primary w-[25%] shadow-[0_0_8px_#02e600]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-bg border border-line/30 text-on-surface-variant py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-surface-high transition-all">Simulation</button>
            <button className="bg-primary text-bg py-3 text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(2,230,0,0.2)] hover:brightness-110 transition-all">Submit Order</button>
          </div>
        </section>
      </div>

      {/* COLUMN 2: MARKET DEPTH */}
      <div className="col-span-12 lg:col-span-4 bg-surface p-4 border border-line/10">
        <header className="flex justify-between items-center mb-4 border-b border-line/10 pb-2">
          <h2 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface">Market Depth (L2)</h2>
          <span className="text-[10px] font-mono text-primary">SPREAD: 0.02</span>
        </header>

        <div className="overflow-hidden">
          <table className="w-full text-[11px] font-mono border-collapse">
            <thead>
              <tr className="text-on-surface-variant text-left opacity-50 uppercase text-[9px]">
                <th className="pb-2 font-normal">Size</th>
                <th className="pb-2 font-normal text-right">Bid</th>
                <th className="pb-2 font-normal text-right">Ask</th>
                <th className="pb-2 font-normal text-right">Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ask: 445.18, size: '1,240', fill: 60 },
                { ask: 445.17, size: '890', fill: 40 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-secondary/5 cursor-crosshair group">
                  <td className="py-1 text-on-surface-variant opacity-40">--</td>
                  <td className="py-1 text-right text-on-surface-variant opacity-40">--</td>
                  <td className="py-1 text-right text-secondary">{row.ask}</td>
                  <td className="py-1 text-right relative">
                    <span className="z-10 relative">{row.size}</span>
                    <div className="absolute inset-y-0 right-0 bg-secondary/10" style={{ width: `${row.fill}%` }}></div>
                  </td>
                </tr>
              ))}
              <tr className="bg-surface-highest border-y border-line/20">
                <td className="py-1 text-center font-headline font-black text-sm text-on-surface" colSpan={4}>445.16</td>
              </tr>
              {[
                { bid: 445.15, size: '4,500', fill: 90 },
                { bid: 445.14, size: '2,100', fill: 55 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-primary/5 cursor-crosshair group">
                  <td className="py-1 relative">
                    <span className="z-10 relative">{row.size}</span>
                    <div className="absolute inset-y-0 left-0 bg-primary/10" style={{ width: `${row.fill}%` }}></div>
                  </td>
                  <td className="py-1 text-right text-primary">{row.bid}</td>
                  <td className="py-1 text-right text-on-surface-variant opacity-40">--</td>
                  <td className="py-1 text-right text-on-surface-variant opacity-40">--</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-line/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Execution Heatmap</span>
          </div>
          <div className="h-24 w-full bg-bg relative overflow-hidden border border-line/5">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M0 80 L20 70 L40 75 L60 40 L80 45 L100 20 L120 30 L140 10 L160 50 L180 45 L200 60 L220 55 L240 80" fill="none" stroke="#02e600" strokeDasharray="2,2" strokeWidth="1.5" />
              <path d="M0 60 L20 65 L40 55 L60 80 L80 75 L100 90 L120 85 L140 95 L160 70 L180 75 L200 65 L220 70 L240 60" fill="none" stroke="#ffb4aa" strokeWidth="1" />
            </svg>
            <div className="scanline" />
          </div>
        </div>
      </div>

      {/* COLUMN 3: METRICS */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        <section className="bg-surface p-4 border border-line/10 flex-1">
          <header className="mb-4 border-b border-line/10 pb-2">
            <h2 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface">Slippage Metrics</h2>
          </header>
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-[9px] text-on-surface-variant uppercase font-bold mb-1">Avg_Fill_Speed</span>
                <span className="text-2xl font-headline font-black text-primary">12.4ms</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Optimal</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-on-surface-variant uppercase font-bold">Vol_Weighted_Slip</span>
                <span className="font-mono text-secondary">-0.04 bps</span>
              </div>
              <div className="w-full h-1 bg-bg">
                <div className="h-full bg-secondary w-[15%] shadow-[0_0_8px_#ffb4aa]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-on-surface-variant uppercase font-bold">Iceberg_Reveal_Rate</span>
                <span className="font-mono text-tertiary">2.1%</span>
              </div>
              <div className="w-full h-1 bg-bg">
                <div className="h-full bg-tertiary w-[8%] shadow-[0_0_8px_#ffba20]"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-line/10 p-1">
            <img 
              className="w-full h-32 object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" 
              src="https://picsum.photos/seed/tech/400/200" 
              alt="Visual"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      </div>

      {/* BOTTOM SECTION: ACTIVE ORDERS */}
      <section className="col-span-12 bg-surface p-4 border border-line/10">
        <header className="flex justify-between items-center mb-4">
          <h2 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface">Active Orders Pool (6)</h2>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
            <button className="text-secondary hover:underline transition-all">Cancel_All</button>
            <button className="text-on-surface-variant hover:text-on-surface transition-all">Flatten_Position</button>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead className="text-on-surface-variant uppercase text-[9px] bg-surface-high/50">
              <tr>
                <th className="p-2 text-left font-bold">Order ID</th>
                <th className="p-2 text-left font-bold">Symbol</th>
                <th className="p-2 text-left font-bold">Side</th>
                <th className="p-2 text-right font-bold">Qty</th>
                <th className="p-2 text-right font-bold">Filled</th>
                <th className="p-2 text-right font-bold">Limit</th>
                <th className="p-2 text-left font-bold">Algo</th>
                <th className="p-2 text-left font-bold">Status</th>
                <th className="p-2 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {[
                { id: 'ORD_8892', symbol: 'SPY', side: 'BUY', qty: 500, filled: '125 (25%)', limit: 445.12, algo: 'VWAP', status: 'WORKING', color: 'text-tertiary' },
                { id: 'ORD_8871', symbol: 'NVDA', side: 'SELL', qty: 1200, filled: '0 (0%)', limit: 892.45, algo: 'SNIPER', status: 'QUEUED', color: 'text-on-surface-variant' },
                { id: 'ORD_8866', symbol: 'AAPL', side: 'BUY', qty: 2500, filled: '2500 (100%)', limit: 188.90, algo: 'DMA', status: 'FILLED', color: 'text-primary' },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-surface-high/30 transition-colors group">
                  <td className="p-2 text-on-surface-variant">{order.id}</td>
                  <td className="p-2 font-bold text-on-surface">{order.symbol}</td>
                  <td className={cn("p-2 font-bold", order.side === 'BUY' ? 'text-primary' : 'text-secondary')}>{order.side}</td>
                  <td className="p-2 text-right">{order.qty}</td>
                  <td className="p-2 text-right">{order.filled}</td>
                  <td className="p-2 text-right">{order.limit}</td>
                  <td className="p-2"><span className="bg-bg px-1 border border-line/20 text-[9px]">{order.algo}</span></td>
                  <td className={cn("p-2 font-bold", order.color)}>{order.status}</td>
                  <td className="p-2 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3 cursor-pointer hover:text-secondary" />
                      <Edit2 className="w-3 h-3 cursor-pointer hover:text-primary" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
