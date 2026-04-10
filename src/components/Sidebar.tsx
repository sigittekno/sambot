import React from 'react';
import { 
  LayoutGrid,
  Terminal, 
  BarChart3, 
  Activity, 
  ShieldAlert, 
  Calendar, 
  Cpu, 
  Settings, 
  HelpCircle,
  Zap,
  Plus,
  Radio,
  LogOut,
  Workflow
} from 'lucide-react';
import { cn } from '../lib/utils';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'market', icon: LayoutGrid, label: 'Market' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'strategies', icon: Workflow, label: 'Strategies' },
    { id: 'backtest', icon: BarChart3, label: 'Backtest' },
    { id: 'logs', icon: Activity, label: 'Logs' },
    { id: 'risk', icon: ShieldAlert, label: 'Risk' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'bots', icon: Cpu, label: 'Bots' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 flex flex-col bg-surface border-r border-line/20 z-40 pt-4">
      <div className="flex flex-col items-center gap-1 mb-6">
        <span className="text-[10px] font-black text-tertiary font-headline tracking-tighter">S_OS</span>
      </div>

      <nav className="flex flex-col w-full gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "flex flex-col items-center py-3 transition-all duration-200 group relative",
              activeView === item.id 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "text-on-surface-variant opacity-40 hover:bg-surface-high hover:opacity-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[7px] font-headline font-bold uppercase tracking-widest mt-1">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-4 px-3">
        <button className="w-full aspect-square bg-primary flex items-center justify-center text-bg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(2,230,0,0.3)]">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-auto flex flex-col w-full gap-1 pb-4">
        <button className="flex flex-col items-center py-3 text-on-surface-variant opacity-40 hover:opacity-100 transition-all group">
          <Settings className="w-5 h-5 group-hover:text-on-surface" />
          <span className="text-[7px] font-headline font-bold uppercase tracking-widest mt-1 group-hover:text-on-surface">SETTINGS</span>
        </button>
        <button className="flex flex-col items-center py-3 text-on-surface-variant opacity-40 hover:opacity-100 transition-all group">
          <HelpCircle className="w-5 h-5 group-hover:text-on-surface" />
          <span className="text-[7px] font-headline font-bold uppercase tracking-widest mt-1 group-hover:text-on-surface">SUPPORT</span>
        </button>
      </div>
    </aside>
  );
};
