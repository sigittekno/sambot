import React, { useState } from 'react';
import { X, ChevronDown, Cpu, ShieldAlert, Zap, Globe, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface DeployBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployBotModal: React.FC<DeployBotModalProps> = ({ isOpen, onClose }) => {
  const [leverage, setLeverage] = useState(25);
  const [selectedNode, setSelectedNode] = useState('alpha');
  const [mode, setMode] = useState<'paper' | 'live'>('live');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-surface border border-line/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-4 border-b border-line/20 bg-surface-high">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-headline font-black text-primary uppercase tracking-[0.2em]">DEPLOYMENT_PROTOCOL_V4.0</h2>
              <div className="flex items-center gap-2 px-2 py-0.5 bg-bg border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                <span className="text-[9px] font-headline font-bold text-tertiary uppercase tracking-widest">IDLE_WAITING_FOR_INPUT</span>
              </div>
            </div>
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="p-8 grid grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto no-scrollbar dashed-grid">
            {/* LEFT COLUMN */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
              {/* 01 // BOT_IDENTITY */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">01 //</span> BOT_IDENTITY
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Bot_Instance_Name</label>
                    <input 
                      type="text" 
                      defaultValue="VANTAGE_SCALPER_01"
                      className="w-full bg-bg border border-line/30 px-3 py-2 text-xs font-mono text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Strategy_Library</label>
                    <div className="relative">
                      <select className="w-full bg-bg border border-line/30 px-3 py-2 text-xs font-headline font-bold text-on-surface appearance-none focus:border-primary outline-none">
                        <option>Momentum Scalper</option>
                        <option>Arbitrage Engine</option>
                        <option>Mean Reversion</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                    </div>
                  </div>
                </div>
              </section>

              {/* 02 // CAPITAL_ALLOCATION */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">02 //</span> CAPITAL_ALLOCATION
                </h3>
                <div className="bg-bg/50 p-6 border border-line/10 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Allocated_Capital</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          defaultValue="50000"
                          className="w-full bg-surface-high border border-line/20 px-4 py-3 text-2xl font-headline font-bold text-primary focus:border-primary outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                          <button className="px-2 py-0.5 bg-primary text-bg text-[9px] font-black uppercase">USD</button>
                          <button className="px-2 py-0.5 bg-surface text-on-surface-variant text-[9px] font-black uppercase">BTC</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Leverage_Gearing</label>
                      <span className="text-xs font-headline font-black text-primary">{leverage.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full h-1 bg-surface-highest appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-on-surface-variant opacity-50">
                      <span>1X</span>
                      <span>10X</span>
                      <span>25X</span>
                      <span>40X</span>
                      <span>50X</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 03 // SAFETY_PROTOCOLS */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">03 //</span> SAFETY_PROTOCOLS
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'kill', label: 'Emergency_Kill_Switch', desc: 'Instant liquidation on system desync', active: true },
                    { id: 'drawdown', label: 'Max_Drawdown_Limit', desc: 'Terminate all position at -15.0%', active: true },
                    { id: 'hedge', label: 'Auto_Hedge_Enabled', desc: 'Offset long positions with short derivatives', active: false },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-bg/30 border border-line/5 hover:bg-bg/50 transition-colors">
                      <div>
                        <h4 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-tight">{item.label}</h4>
                        <p className="text-[8px] text-on-surface-variant uppercase font-bold tracking-widest mt-0.5">{item.desc}</p>
                      </div>
                      <button className={cn(
                        "w-10 h-5 rounded-none relative transition-all",
                        item.active ? "bg-primary/20" : "bg-surface-highest"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-3 h-3 transition-all",
                          item.active ? "right-1 bg-primary shadow-[0_0_8px_#02e600]" : "left-1 bg-on-surface-variant"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              {/* 04 // EXECUTION_NODE */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">04 //</span> EXECUTION_NODE
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'alpha', name: 'NODE_ALPHA_NY', desc: 'New York Data Center / Latency: 0.8ms' },
                    { id: 'beta', name: 'NODE_BETA_LDN', desc: 'London LMAX Feed / Latency: 1.4ms' },
                    { id: 'gamma', name: 'NODE_GAMMA_TKY', desc: 'Tokyo JPX Feed / Latency: 2.1ms' },
                  ].map((node) => (
                    <button 
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 border transition-all text-left",
                        selectedNode === node.id 
                          ? "bg-primary/5 border-primary" 
                          : "bg-bg/30 border-line/10 hover:border-line/30"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 flex items-center justify-center",
                        selectedNode === node.id ? "text-primary" : "text-on-surface-variant opacity-40"
                      )}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          "text-[10px] font-headline font-black uppercase tracking-tight",
                          selectedNode === node.id ? "text-primary" : "text-on-surface"
                        )}>{node.name}</h4>
                        <p className="text-[8px] text-on-surface-variant uppercase font-bold tracking-widest mt-0.5">{node.desc}</p>
                      </div>
                      <div className={cn(
                        "w-3 h-3 rounded-full border flex items-center justify-center",
                        selectedNode === node.id ? "border-primary" : "border-line/30"
                      )}>
                        {selectedNode === node.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* 05 // DEPLOYMENT_MODE */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">05 //</span> DEPLOYMENT_MODE
                </h3>
                <div className="flex bg-bg border border-line/10 p-1">
                  <button 
                    onClick={() => setMode('paper')}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-headline font-black uppercase tracking-widest transition-all",
                      mode === 'paper' ? "bg-surface-highest text-on-surface" : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    Paper_Trading_Sim
                  </button>
                  <button 
                    onClick={() => setMode('live')}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-headline font-black uppercase tracking-widest transition-all",
                      mode === 'live' ? "bg-secondary text-bg" : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    Live_Production_Market
                  </button>
                </div>
                {mode === 'live' && (
                  <div className="mt-4 p-4 border border-secondary/20 bg-secondary/5 flex gap-3">
                    <ShieldAlert className="w-4 h-4 text-secondary shrink-0" />
                    <p className="text-[8px] text-secondary font-bold uppercase leading-relaxed tracking-widest">
                      Warning: Live_Production_Market mode detected. Execution will incur real financial risk. Ensure all safety protocols are verified.
                    </p>
                  </div>
                )}
              </section>

              {/* 06 // AI_INTEGRATION_CONFIG */}
              <section>
                <h3 className="text-[10px] font-headline font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="opacity-50">06 //</span> AI_INTEGRATION_CONFIG
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Select_AI_Model</label>
                    <div className="relative">
                      <select className="w-full bg-bg border border-line/30 px-3 py-2 text-xs font-headline font-bold text-on-surface appearance-none focus:border-primary outline-none">
                        <option>ChatGPT-4o</option>
                        <option>Claude 3.5 Sonnet</option>
                        <option>Gemini 1.5 Pro</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">API_Key_Encrypted</label>
                    <input 
                      type="password" 
                      defaultValue="••••••••••••••••"
                      className="w-full bg-bg border border-line/30 px-3 py-2 text-xs font-mono text-on-surface focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-8 py-6 border-t border-line/20 bg-surface-high flex gap-4">
            <button 
              className="flex-1 bg-primary text-bg py-4 text-xs font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(2,230,0,0.2)] hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Execute_Deployment
            </button>
            <button 
              className="px-8 border border-line/30 text-on-surface-variant text-[10px] font-headline font-bold uppercase tracking-widest hover:bg-surface-highest transition-all"
            >
              Reset_Form
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
