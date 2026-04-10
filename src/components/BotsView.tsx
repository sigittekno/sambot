import React, { useState } from 'react';
import { Play, Pause, Square, RefreshCw, Cpu, Activity, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { DeployBotModal } from './DeployBotModal';

export const BotsView: React.FC = () => {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const bots = [
    { id: 'B-001', name: 'OMEGA_SCALPER', status: 'RUNNING', strategy: 'HFT_MEAN_REVERSION', pnl: '+$4,210.40', pnlPct: '+1.2%', uptime: '14d 02h', load: 12 },
    { id: 'B-002', name: 'DELTA_NEUTRAL_V4', status: 'RUNNING', strategy: 'OPTIONS_ARBITRAGE', pnl: '+$12,890.15', pnlPct: '+0.8%', uptime: '42d 11h', load: 45 },
    { id: 'B-003', name: 'SENTIMENT_SNIPER', status: 'PAUSED', strategy: 'NLP_NEWS_TRADING', pnl: '-$1,240.00', pnlPct: '-0.4%', uptime: '0d 00h', load: 0 },
    { id: 'B-004', name: 'LIQUIDITY_HUNTER', status: 'ERROR', strategy: 'ORDER_BOOK_IMBALANCE', pnl: '+$2,100.22', pnlPct: '+0.5%', uptime: '5d 22h', load: 0 },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar bg-bg">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-headline font-black text-on-surface uppercase tracking-tighter mb-1">Autonomous_Agent_Fleet</h1>
          <p className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Managing 4 active algorithmic instances across 12 exchanges</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-high border border-line/30 text-on-surface-variant px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-surface-highest transition-all flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Sync_All
          </button>
          <button 
            onClick={() => setIsDeployModalOpen(true)}
            className="bg-primary text-bg px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(2,230,0,0.2)]"
          >
            <Zap className="w-3 h-3" /> Deploy_New_Agent
          </button>
        </div>
      </div>

      {/* BOT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {bots.map((bot) => (
          <div key={bot.id} className={cn(
            "bg-surface border border-line/10 p-5 flex flex-col relative overflow-hidden group transition-all duration-500",
            bot.status === 'RUNNING' ? "border-l-4 border-l-primary" : 
            bot.status === 'PAUSED' ? "border-l-4 border-l-tertiary opacity-80" : 
            "border-l-4 border-l-secondary"
          )}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-mono text-on-surface-variant opacity-50 block mb-1">{bot.id}</span>
                <h3 className="text-sm font-headline font-black text-on-surface tracking-tight uppercase group-hover:text-primary transition-colors">{bot.name}</h3>
                <p className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mt-1">{bot.strategy}</p>
              </div>
              <div className={cn(
                "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest",
                bot.status === 'RUNNING' ? "bg-primary/10 text-primary" : 
                bot.status === 'PAUSED' ? "bg-tertiary/10 text-tertiary" : 
                "bg-secondary/10 text-secondary animate-pulse"
              )}>
                {bot.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">24h_PnL</span>
                <span className={cn("text-lg font-headline font-bold", bot.pnl.startsWith('+') ? 'text-primary' : 'text-secondary')}>
                  {bot.pnl}
                </span>
                <span className="text-[9px] font-mono ml-1 opacity-60">{bot.pnlPct}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Uptime</span>
                <span className="text-sm font-mono font-bold text-on-surface">{bot.uptime}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Node_Load</span>
                <span className="text-[9px] font-mono text-primary font-bold">{bot.load}%</span>
              </div>
              <div className="h-1 bg-bg w-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", bot.status === 'RUNNING' ? 'bg-primary' : 'bg-surface-highest')} 
                  style={{ width: `${bot.load}%` }} 
                />
              </div>
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-line/5">
              {bot.status === 'RUNNING' ? (
                <button className="flex-1 bg-surface-high hover:bg-surface-highest text-tertiary p-2 flex items-center justify-center transition-all">
                  <Pause className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary p-2 flex items-center justify-center transition-all">
                  <Play className="w-3.5 h-3.5" />
                </button>
              )}
              <button className="flex-1 bg-surface-high hover:bg-surface-highest text-secondary p-2 flex items-center justify-center transition-all">
                <Square className="w-3.5 h-3.5" />
              </button>
              <button className="flex-1 bg-surface-high hover:bg-surface-highest text-on-surface-variant p-2 flex items-center justify-center transition-all">
                <Activity className="w-3.5 h-3.5" />
              </button>
            </div>

            {bot.status === 'RUNNING' && (
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>
            )}
          </div>
        ))}

        {/* ADD NEW BOT PLACEHOLDER */}
        <div 
          onClick={() => setIsDeployModalOpen(true)}
          className="bg-bg border-2 border-dashed border-line/20 p-5 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-surface-high/20 transition-all cursor-pointer group min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-full border border-line/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
            <Plus className="w-6 h-6 text-on-surface-variant group-hover:text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-xs font-headline font-black text-on-surface-variant uppercase tracking-widest group-hover:text-on-surface">Initialize_New_Instance</h3>
            <p className="text-[9px] font-headline font-bold text-on-surface-variant opacity-40 uppercase mt-1">Select from strategy library</p>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="mt-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-4 border border-line/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-widest">Global_Safety_Lock: ACTIVE</h4>
              <p className="text-[9px] text-on-surface-variant font-bold uppercase">All bots monitored by real-time risk engine. Max drawdown limit: 15%.</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-secondary text-secondary text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-bg transition-all">Emergency_Kill_Switch</button>
        </div>
        <div className="bg-surface p-4 border border-line/10 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Cluster_Health</span>
            <div className="flex gap-1">
              {[1,1,1,1,1,1,1,1,1,0].map((v, i) => (
                <div key={i} className={cn("w-2 h-4", v ? 'bg-primary' : 'bg-secondary animate-pulse')} />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Avg_Latency</span>
            <div className="text-lg font-headline font-bold text-primary">4.2ms</div>
          </div>
        </div>
      </div>
      
      <DeployBotModal 
        isOpen={isDeployModalOpen} 
        onClose={() => setIsDeployModalOpen(false)} 
      />
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
