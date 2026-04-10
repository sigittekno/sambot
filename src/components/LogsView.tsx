import React from 'react';
import { Search, Activity, Cpu, Globe, Copy, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const LogsView: React.FC = () => {
  const logs = [
    { time: '14:22:01.034', level: 'INFO', source: 'EXECUTION_ENGINE', message: 'Initializing websocket cluster [HKG_04]... Connected.' },
    { time: '14:22:01.890', level: 'INFO', source: 'BOT_OMEGA', message: 'Pulse detected. Market spread 0.04 bps. No trade criteria met.' },
    { time: '14:22:02.112', level: 'WARN', source: 'API_GATEWAY', message: 'Re-routing request through secondary node [LDN_01] due to high latency.' },
    { time: '14:22:02.456', level: 'INFO', source: 'SYSTEM', message: 'Memory buffer cleared. GC completed in 4.5ms.' },
    { time: '14:22:03.001', level: 'EXEC', source: 'TRADE_FILLED', message: 'BTC-USD-PERP / BUY / 4.50 / $64,231.50 / FEE: $2.31' },
    { time: '14:22:03.442', level: 'ERROR', source: 'DATA_FEED', message: 'Dropped 4 packets from provider [BINANCE_FUTURES].' },
    { time: '14:22:04.101', level: 'INFO', source: 'NETWORK', message: 'Keep-alive heartbeat successful from all nodes.' },
    { time: '14:22:04.552', level: 'INFO', source: 'STRATEGY_MGR', message: 'Reloaded coefficients for [DELTA_NEUTRAL_V4].' },
    { time: '14:22:05.101', level: 'INFO', source: 'AUTH', message: 'Session token rotation successful. Session expires in 4h.' },
    { time: '14:22:05.882', level: 'INFO', source: 'BOT_ALPHA', message: 'Scanning for liquidity gaps...' },
  ];

  return (
    <div className="grid grid-cols-12 gap-0 h-full overflow-hidden bg-bg">
      {/* LEFT COLUMN: FILTERS */}
      <div className="col-span-3 border-r border-line/10 flex flex-col overflow-hidden bg-surface">
        <section className="p-4 space-y-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline text-xs font-bold text-on-surface uppercase tracking-widest">Log_Filters</h2>
            <span className="text-[9px] text-primary bg-primary/10 px-1 font-bold">ACTIVE_04</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block font-headline text-[10px] text-on-surface-variant uppercase font-bold mb-2 tracking-widest">Source_Origin</label>
              <div className="grid grid-cols-2 gap-1">
                <button className="text-[10px] py-1 bg-surface-highest text-primary font-bold border-l-2 border-primary uppercase">System</button>
                <button className="text-[10px] py-1 bg-surface-high text-on-surface-variant hover:bg-surface-highest transition-colors uppercase">Network</button>
                <button className="text-[10px] py-1 bg-surface-high text-on-surface-variant hover:bg-surface-highest transition-colors uppercase">Bot_Exe</button>
                <button className="text-[10px] py-1 bg-surface-high text-on-surface-variant hover:bg-surface-highest transition-colors uppercase">Web_Soc</button>
              </div>
            </div>

            <div>
              <label className="block font-headline text-[10px] text-on-surface-variant uppercase font-bold mb-2 tracking-widest">Severity_Level</label>
              <div className="flex flex-col space-y-2">
                {[
                  { label: 'Info [342]', color: 'text-primary', checked: true },
                  { label: 'Warn [12]', color: 'text-tertiary', checked: true },
                  { label: 'Error [03]', color: 'text-secondary', checked: true },
                  { label: 'Critical [0]', color: 'text-secondary', checked: false },
                ].map((level) => (
                  <label key={level.label} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={level.checked}
                      className="form-checkbox h-3 w-3 bg-surface-container-lowest border-line text-primary rounded-none focus:ring-0" 
                    />
                    <span className={cn("text-[10px] font-bold opacity-80 group-hover:opacity-100 uppercase tracking-widest", level.color)}>
                      {level.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-auto p-4 border-t border-line/10 bg-surface-container-lowest">
          <h2 className="font-headline text-xs font-bold text-on-surface uppercase mb-4 flex items-center tracking-widest">
            <Activity className="w-3 h-3 mr-2 text-primary" />
            Telemetry_Live
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] text-on-surface-variant uppercase font-bold">CPU_Usage</div>
                <div className="text-xs font-bold font-headline text-primary">24.8%</div>
              </div>
              <div className="w-32 h-6 flex items-end space-x-0.5">
                {[2,3,4,2,5,3,6,4].map((h, i) => (
                  <div key={i} className="bg-primary/40 w-1" style={{ height: `${h * 15}%` }} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] text-on-surface-variant uppercase font-bold">Latency_MS</div>
                <div className="text-xs font-bold font-headline text-tertiary">12ms</div>
              </div>
              <div className="w-32 h-6 flex items-end space-x-0.5">
                {[1,2,1,2,1,2,3,2].map((h, i) => (
                  <div key={i} className="bg-tertiary/40 w-1" style={{ height: `${h * 20}%` }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MIDDLE COLUMN: LOG STREAM */}
      <div className="col-span-6 flex flex-col overflow-hidden relative border-r border-line/10">
        <header className="h-10 border-b border-line/10 flex items-center justify-between px-4 bg-surface-high">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#02e600]"></span>
            <h1 className="font-headline text-xs font-black uppercase text-on-surface tracking-widest">Streaming_Output_V2</h1>
          </div>
          <div className="flex space-x-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            <button className="hover:text-primary transition-colors">Auto_Scroll [ON]</button>
            <button className="hover:text-primary transition-colors">Clear_Buffer</button>
            <button className="hover:text-primary transition-colors">Export_CSV</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar p-0 bg-bg font-mono">
          {logs.map((log, i) => (
            <div key={i} className={cn(
              "flex items-start px-4 py-1.5 border-b border-line/5 hover:bg-surface-high transition-colors group",
              log.level === 'EXEC' && "bg-primary/5 border-primary/20",
              log.level === 'ERROR' && "bg-secondary/5 border-secondary/20"
            )}>
              <span className="text-[9px] text-on-surface-variant/50 w-24 flex-shrink-0">{log.time}</span>
              <span className={cn(
                "text-[9px] font-black px-1 mx-3 flex-shrink-0",
                log.level === 'INFO' && "text-primary bg-primary/10",
                log.level === 'WARN' && "text-tertiary bg-tertiary/10",
                log.level === 'ERROR' && "text-secondary bg-secondary/10",
                log.level === 'EXEC' && "text-primary bg-primary/20"
              )}>
                {log.level}
              </span>
              <span className={cn(
                "text-[10px] flex-1",
                log.level === 'EXEC' ? "text-primary font-bold" : 
                log.level === 'ERROR' ? "text-secondary" : "text-on-surface"
              )}>
                <span className="opacity-50 mr-2">{log.source}:</span>
                {log.message}
              </span>
              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-on-surface-variant cursor-pointer hover:text-primary transition-all" />
            </div>
          ))}
        </div>

        <div className="h-10 bg-surface-high flex items-center px-4 border-t border-line/10">
          <span className="text-primary font-bold text-xs mr-2">&gt;</span>
          <input 
            className="bg-transparent border-none outline-none text-xs text-primary w-full focus:ring-0 placeholder:text-line font-mono" 
            placeholder="INJECT_COMMAND_HERE..." 
            type="text" 
          />
        </div>
      </div>

      {/* RIGHT COLUMN: MONITOR */}
      <div className="col-span-3 flex flex-col overflow-hidden bg-surface">
        <section className="flex-1 flex flex-col overflow-hidden">
          <header className="p-4 bg-surface-highest flex justify-between items-center border-b border-line/10">
            <h2 className="font-headline text-xs font-bold text-on-surface uppercase tracking-widest">Active_Orders_Pool</h2>
            <span className="text-[9px] text-on-surface-variant font-bold">88.5% FILL_RATE</span>
          </header>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-surface-high text-[9px] text-on-surface-variant uppercase border-b border-line/10">
                <tr>
                  <th className="p-2 font-bold">Symbol</th>
                  <th className="p-2 font-bold">Side</th>
                  <th className="p-2 font-bold text-right">Qty</th>
                  <th className="p-2 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/5 font-mono">
                {[
                  { symbol: 'ETH-USD', side: 'SELL', qty: '12.50', fill: 45, color: 'text-secondary' },
                  { symbol: 'BTC-USD', side: 'BUY', qty: '1.22', fill: 92, color: 'text-primary' },
                  { symbol: 'SOL-USD', side: 'BUY', qty: '450.0', fill: 15, color: 'text-primary' },
                  { symbol: 'XRP-USD', side: 'SELL', qty: '12k', status: 'PENDING', color: 'text-secondary' },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-surface-high transition-colors">
                    <td className="p-2 text-[10px] font-bold text-on-surface">{order.symbol}</td>
                    <td className={cn("p-2 text-[10px] font-bold uppercase", order.color)}>{order.side}</td>
                    <td className="p-2 text-[10px] text-right">{order.qty}</td>
                    <td className="p-2 text-right">
                      {order.status ? (
                        <span className="text-[9px] text-tertiary font-bold">{order.status}</span>
                      ) : (
                        <div className="inline-block w-12 h-1 bg-bg relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${order.fill}%` }}></div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="h-48 border-t border-line/20 relative overflow-hidden p-4 bg-bg">
          <h2 className="font-headline text-[9px] font-bold text-on-surface-variant uppercase mb-2 tracking-widest">Geo_Latency_Heatmap</h2>
          <div className="w-full h-full relative opacity-40 grayscale contrast-125">
            <Globe className="w-full h-full text-primary-dim" />
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#02e600] animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#02e600] animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#ffb4aa]"></div>
          </div>
        </section>
      </div>
    </div>
  );
};
