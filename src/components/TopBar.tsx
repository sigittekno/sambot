import React from 'react';
import { Search, Radio, Settings2, Terminal as TerminalIcon, Bell, Sliders, Layout, User, Monitor } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 h-12 bg-surface border-b border-line/20 flex justify-between items-center px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-primary font-headline">OBSIDIAN COMMAND</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1 rounded-sm">
          <Monitor className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-headline font-black text-primary uppercase tracking-widest">SYSTEM:OPERATIONAL</span>
        </div>
        
        <div className="hidden lg:flex items-center bg-bg/50 border border-line/10 px-3 h-8 group focus-within:border-primary/50 transition-all">
          <Search className="w-3 h-3 text-primary mr-3 opacity-50" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-[10px] font-mono text-primary w-64 uppercase placeholder:text-line" 
            placeholder="AAPL:NASDAQ" 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* INDICES */}
        <div className="hidden xl:flex items-center gap-6 border-r border-line/10 pr-6">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">S&P 500</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold text-on-surface">5,241.53</span>
              <span className="text-[9px] font-mono font-bold text-primary">+0.82%</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">NASDAQ</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold text-on-surface">16,384.47</span>
              <span className="text-[9px] font-mono font-bold text-primary">+1.15%</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">DOW J</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold text-on-surface">39,282.33</span>
              <span className="text-[9px] font-mono font-bold text-secondary">-0.12%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-surface-high transition-colors text-on-surface-variant">
            <Layout className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-surface-high transition-colors text-on-surface-variant">
            <Sliders className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-surface-high transition-colors text-on-surface-variant relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-secondary rounded-full border border-surface" />
          </button>
          
          <button className="ml-2 bg-primary text-bg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
            DEPLOY BOT
          </button>
        </div>
      </div>
    </header>
  );
};
