export type View = 'market' | 'terminal' | 'backtest' | 'logs' | 'risk' | 'calendar' | 'bots' | 'ticker-detail' | 'strategies';

export type NodeType = 'entry' | 'sizing' | 'script' | 'exit' | 'asset' | 'sentiment';

export interface StrategyNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  data: any;
}

export interface StrategyVersion {
  id: string;
  timestamp: string;
  name: string;
  nodes: StrategyNode[];
}

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  filled: number;
  limit: number;
  algo: string;
  status: 'WORKING' | 'QUEUED' | 'FILLED' | 'CANCELLED';
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'EXEC';
  message: string;
}

export interface Bot {
  id: string;
  name: string;
  status: 'RUNNING' | 'PAUSED' | 'ERROR';
  pnl24h: number;
}
