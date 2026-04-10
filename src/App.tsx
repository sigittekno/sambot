import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MarketView } from './components/MarketView';
import { TerminalView } from './components/TerminalView';
import { BacktestView } from './components/BacktestView';
import { LogsView } from './components/LogsView';
import { RiskMonitorView } from './components/RiskMonitorView';
import { MacroCalendarView } from './components/MacroCalendarView';
import { BotsView } from './components/BotsView';
import { TickerDetailView } from './components/TickerDetailView';
import { StrategiesView } from './components/StrategiesView';
import { View } from './types';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('market');
  const [selectedTicker, setSelectedTicker] = useState<string>('AAPL');

  const navigateToTicker = (symbol: string) => {
    setSelectedTicker(symbol);
    setActiveView('ticker-detail');
  };

  const renderView = () => {
    switch (activeView) {
      case 'market': return <MarketView onTickerClick={navigateToTicker} />;
      case 'terminal': return <TerminalView />;
      case 'backtest': return <BacktestView />;
      case 'logs': return <LogsView />;
      case 'risk': return <RiskMonitorView />;
      case 'calendar': return <MacroCalendarView />;
      case 'bots': return <BotsView />;
      case 'strategies': return <StrategiesView />;
      case 'ticker-detail': return <TickerDetailView symbol={selectedTicker} />;
      default: return <MarketView onTickerClick={navigateToTicker} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-on-surface font-sans selection:bg-primary selection:text-bg">
      <TopBar />
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="pl-20 pt-12 pb-6 h-screen overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {/* GLOBAL OVERLAY EFFECTS */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] dashed-grid" />
        <div className="fixed inset-0 pointer-events-none z-[101] overflow-hidden">
          <div className="scanline" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-20 right-0 h-6 bg-surface border-t border-line/10 flex justify-between items-center px-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-headline font-bold text-primary uppercase tracking-widest">NETWORK_STABLE</span>
          </div>
          <div className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">
            LATENCY: <span className="text-primary">12ms</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[8px] font-mono text-on-surface-variant uppercase">
            <span>NYC: 10:24:02 AM</span>
            <span>LDN: 03:24:02 PM</span>
            <span className="text-on-surface font-bold">GMT: 02:24:02 PM</span>
          </div>
          <div className="bg-surface-highest px-2 py-0.5 text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">
            V2.04.1_ALPHA
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
