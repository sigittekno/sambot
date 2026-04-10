import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  MousePointer2, 
  Hand, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  Activity, 
  ChevronDown,
  Trash2,
  Zap,
  MoreVertical,
  Code2,
  Sparkles,
  Play,
  History,
  Save,
  Globe,
  TrendingUp,
  Target,
  BarChart3,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { StrategyNode, StrategyVersion, NodeType } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const StrategiesView: React.FC = () => {
  const [portfolioHeat, setPortfolioHeat] = useState(15.0);
  const [nodes, setNodes] = useState<StrategyNode[]>([
    { 
      id: 'node-1', 
      type: 'asset', 
      label: 'ASSET SELECTION', 
      x: 50, 
      y: 150, 
      data: { ticker: 'NVDA:NASDAQ', correlation: 'HIGH' } 
    },
    { 
      id: 'node-2', 
      type: 'entry', 
      label: 'ENTRY CONDITION', 
      x: 320, 
      y: 150, 
      data: { trigger: 'EMA(20) > EMA(50)', interval: '15M_TIMEFRAME' } 
    },
    { 
      id: 'node-3', 
      type: 'sizing', 
      label: 'POSITION SIZING', 
      x: 600, 
      y: 150, 
      data: { method: 'Fixed_Fractional', alloc: '2.5%' } 
    },
  ]);

  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [backtestData, setBacktestData] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [versions, setVersions] = useState<StrategyVersion[]>([
    { id: 'v1', name: 'Initial Trend', timestamp: '2026-04-09 10:00', nodes: [] }
  ]);
  const [showVersions, setShowVersions] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNewLogic = () => {
    setNodes([
      { 
        id: `node-${Date.now()}`, 
        type: 'entry', 
        label: 'NEW ENTRY', 
        x: 100, 
        y: 200, 
        data: { trigger: 'PRICE > SMA(200)', interval: '1H_TIMEFRAME' } 
      }
    ]);
  };

  const handleInitializeScript = () => {
    const newNode: StrategyNode = {
      id: `script-${Date.now()}`,
      type: 'script',
      label: 'CUSTOM SCRIPT',
      x: 250,
      y: 350,
      data: { language: 'TypeScript', status: 'Draft' }
    };
    setNodes([...nodes, newNode]);
  };

  const handleAddNode = (type: NodeType) => {
    const labels: Record<NodeType, string> = {
      entry: 'ENTRY CONDITION',
      sizing: 'POSITION SIZING',
      script: 'CUSTOM SCRIPT',
      exit: 'EXIT CONDITION',
      asset: 'ASSET SELECTION',
      sentiment: 'MARKET SENTIMENT'
    };
    
    const newNode: StrategyNode = {
      id: `${type}-${Date.now()}`,
      type,
      label: labels[type],
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      data: type === 'exit' ? { stopLoss: '2.5%', takeProfit: '5.0%' } :
            type === 'asset' ? { ticker: 'BTC:USD', correlation: 'N/A' } :
            type === 'sentiment' ? { source: 'Stitch News', filter: 'Bullish' } : {}
    };
    setNodes([...nodes, newNode]);
  };

  const handleAiGenerate = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a trading strategy logic based on this request: "${aiInput}". 
        Return ONLY a JSON array of nodes with this structure: 
        { id: string, type: 'entry'|'sizing'|'exit'|'asset'|'sentiment', label: string, data: any }.
        Keep it simple. Max 5 nodes.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                label: { type: Type.STRING },
                data: { type: Type.OBJECT }
              },
              required: ["id", "type", "label", "data"]
            }
          }
        }
      });

      const generatedNodes = JSON.parse(response.text);
      const positionedNodes = generatedNodes.map((node: any, i: number) => ({
        ...node,
        x: 50 + i * 250,
        y: 200
      }));
      setNodes(positionedNodes);
      setAiInput('');
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    // Mock simulation data
    const data = [];
    let pnl = 0;
    for (let i = 0; i < 20; i++) {
      pnl += (Math.random() - 0.4) * 100;
      data.push({ time: i, pnl });
    }
    setTimeout(() => {
      setBacktestData(data);
      setIsSimulating(false);
    }, 1500);
  };

  const saveVersion = () => {
    const newVersion: StrategyVersion = {
      id: `v-${Date.now()}`,
      name: `Strategy ${versions.length + 1}`,
      timestamp: new Date().toLocaleString(),
      nodes: [...nodes]
    };
    setVersions([newVersion, ...versions]);
  };

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    setDraggingNodeId(id);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
    e.stopPropagation();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId) return;

    setNodes(prev => prev.map(node => {
      if (node.id === draggingNodeId) {
        return {
          ...node,
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
      }
      return node;
    }));
  };

  const onMouseUp = () => {
    setDraggingNodeId(null);
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  return (
    <div className="flex h-full bg-bg overflow-hidden" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {/* LEFT SIDEBAR: STRATEGY LIBRARY & AI */}
      <aside className="w-72 border-r border-line/10 flex flex-col bg-surface/20">
        <header className="p-4 border-b border-line/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">STRATEGY</h2>
          </div>
          <button onClick={() => setShowVersions(!showVersions)} className="text-on-surface-variant hover:text-primary transition-colors">
            <History className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
          {/* AI ASSISTANT */}
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-headline font-black text-primary uppercase tracking-widest">AI ASSISTANT</span>
            </div>
            <textarea 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Describe your strategy..."
              className="w-full bg-bg border border-line/10 p-2 text-[10px] font-headline font-bold text-on-surface placeholder:opacity-30 focus:border-primary/50 outline-none resize-none h-20"
            />
            <button 
              onClick={handleAiGenerate}
              disabled={isAiLoading || !aiInput.trim()}
              className="w-full bg-primary/20 border border-primary/30 text-primary py-2 text-[9px] font-black uppercase tracking-widest hover:bg-primary/30 disabled:opacity-50 transition-all"
            >
              {isAiLoading ? 'GENERATING...' : 'GENERATE LOGIC'}
            </button>
          </div>

          <div>
            <h3 className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-3 opacity-60">CORE TEMPLATES</h3>
            <div className="space-y-2">
              {[
                { id: 'trend', name: 'TREND FOLLOWING', status: 'STABLE', statusColor: 'text-primary', desc: 'Momentum based entry with trailing stop-loss logic.' },
                { id: 'mean', name: 'MEAN REVERSION', status: 'VOLATILE', statusColor: 'text-tertiary', desc: 'RSI divergence detection with bollinger band exit.' },
              ].map((template) => (
                <div 
                  key={template.id} 
                  className="p-3 bg-bg border border-line/10 hover:border-primary/30 transition-all cursor-pointer group"
                  onClick={handleNewLogic}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-headline font-black text-on-surface group-hover:text-primary transition-colors">{template.name}</span>
                    <span className={cn("text-[7px] font-headline font-bold px-1.5 py-0.5 bg-surface-high rounded-sm", template.statusColor)}>{template.status}</span>
                  </div>
                  <p className="text-[9px] font-headline font-bold text-on-surface-variant leading-relaxed opacity-70">{template.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-3 opacity-60">NODE LIBRARY</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['asset', 'entry', 'sizing', 'exit', 'sentiment', 'script'] as NodeType[]).map(type => (
                <button 
                  key={type}
                  onClick={() => handleAddNode(type)}
                  className="p-2 bg-surface-high border border-line/10 text-[8px] font-headline font-bold text-on-surface-variant uppercase hover:border-primary/50 hover:text-primary transition-all flex items-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-line/10 space-y-2">
          <button 
            onClick={saveVersion}
            className="w-full bg-surface-high border border-line/10 text-on-surface py-2 text-[10px] font-black uppercase tracking-widest hover:bg-surface-highest transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-3 h-3" /> SAVE VERSION
          </button>
          <button 
            onClick={handleNewLogic}
            className="w-full bg-primary text-bg py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            NEW LOGIC
          </button>
        </div>
      </aside>

      {/* CENTER: LOGIC CANVAS */}
      <main 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] select-none"
      >
        {/* CANVAS TOOLBAR */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div className="flex bg-surface-high p-0.5 rounded-sm border border-line/10 shadow-xl">
            <button className="p-2 text-primary hover:bg-surface-highest transition-colors"><MousePointer2 className="w-3.5 h-3.5" /></button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-highest transition-colors"><Hand className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex bg-surface-high p-0.5 rounded-sm border border-line/10 shadow-xl">
            <button className="p-2 text-on-surface-variant hover:bg-surface-highest transition-colors"><ZoomIn className="w-3.5 h-3.5" /></button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-highest transition-colors"><ZoomOut className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* CANVAS STATUS */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-primary text-bg px-4 py-1.5 rounded-sm font-headline font-black text-[9px] uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all"
          >
            <Play className={cn("w-3 h-3", isSimulating && "animate-spin")} />
            {isSimulating ? 'SIMULATING...' : 'RUN SIMULATION'}
          </button>
          <div className="flex items-center gap-2 bg-surface-high px-3 py-1.5 rounded-sm border border-line/10 shadow-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-headline font-bold text-on-surface uppercase tracking-widest">LOGIC: LIVE EDIT</span>
          </div>
        </div>

        {/* VERSION HISTORY OVERLAY */}
        {showVersions && (
          <div className="absolute top-16 right-4 z-20 w-64 bg-surface-high border border-line/20 shadow-2xl p-4 space-y-4">
            <h3 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-widest">VERSION HISTORY</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              {versions.map(v => (
                <div key={v.id} className="p-2 bg-bg border border-line/10 hover:border-primary/30 cursor-pointer group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-headline font-bold text-on-surface group-hover:text-primary">{v.name}</span>
                    <span className="text-[7px] font-mono text-on-surface-variant opacity-50">{v.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SVG CONNECTIONS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
          {nodes.map((node, i) => {
            const nextNode = nodes[i + 1];
            if (!nextNode) return null;
            
            const startX = node.x + 256;
            const startY = node.y + 60;
            const endX = nextNode.x;
            const endY = nextNode.y + 60;
            
            const cp1x = startX + (endX - startX) / 2;
            const cp2x = startX + (endX - startX) / 2;

            return (
              <path 
                key={`path-${node.id}-${nextNode.id}`}
                d={`M ${startX},${startY} C ${cp1x},${startY} ${cp2x},${endY} ${endX},${endY}`} 
                stroke="#02e600" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.2"
              />
            );
          })}
        </svg>

        {/* NODES */}
        {nodes.map((node) => (
          <div 
            key={node.id}
            onMouseDown={(e) => onMouseDown(e, node.id)}
            style={{ left: node.x, top: node.y }}
            className={cn(
              "absolute w-64 bg-surface-high border border-line/20 shadow-2xl z-10 cursor-grab active:cursor-grabbing transition-shadow",
              draggingNodeId === node.id && "shadow-primary/20 border-primary/40 ring-1 ring-primary/20"
            )}
          >
            <header className="bg-surface-highest p-3 border-b border-line/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {node.type === 'script' && <Code2 className="w-3 h-3 text-tertiary" />}
                {node.type === 'asset' && <Globe className="w-3 h-3 text-primary" />}
                {node.type === 'sentiment' && <TrendingUp className="w-3 h-3 text-secondary" />}
                {node.type === 'exit' && <Target className="w-3 h-3 text-secondary" />}
                <span className="text-[9px] font-headline font-black text-on-surface uppercase tracking-widest">{node.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => deleteNode(node.id)}
                  className="hover:text-secondary transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <MoreVertical className="w-3 h-3 text-on-surface-variant" />
              </div>
            </header>
            
            <div className="p-4 space-y-4">
              {node.type === 'asset' && (
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">TICKER</span>
                    <div className="text-[10px] font-mono font-bold text-primary">{node.data.ticker}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">CORR</span>
                    <div className="text-[10px] font-mono font-bold text-on-surface">{node.data.correlation}</div>
                  </div>
                </div>
              )}
              {node.type === 'entry' && (
                <>
                  <div>
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">TRIGGER</span>
                    <div className="text-[10px] font-mono font-bold text-primary">{node.data.trigger}</div>
                  </div>
                  <div>
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">INTERVAL</span>
                    <div className="text-[10px] font-mono font-bold text-on-surface">{node.data.interval}</div>
                  </div>
                </>
              )}
              {node.type === 'exit' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">STOP LOSS</span>
                    <div className="text-[10px] font-mono font-bold text-secondary">{node.data.stopLoss}</div>
                  </div>
                  <div>
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">TAKE PROFIT</span>
                    <div className="text-[10px] font-mono font-bold text-primary">{node.data.takeProfit}</div>
                  </div>
                </div>
              )}
              {node.type === 'sentiment' && (
                <div>
                  <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest block mb-1">NEWS FILTER</span>
                  <div className="text-[10px] font-mono font-bold text-secondary">{node.data.source}: {node.data.filter}</div>
                </div>
              )}
              {node.type === 'sizing' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">METHOD</span>
                    <span className="text-[10px] font-mono font-bold text-on-surface">{node.data.method}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">ALLOC</span>
                    <span className="text-[10px] font-mono font-bold text-primary">{node.data.alloc}</span>
                  </div>
                </>
              )}
              {node.type === 'script' && (
                <div className="flex justify-between items-center">
                  <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">LANGUAGE</span>
                  <span className="text-[10px] font-mono font-bold text-tertiary">{node.data.language}</span>
                </div>
              )}
            </div>
            
            <div className="h-0.5 w-full bg-bg">
              <div className={cn(
                "h-full",
                node.type === 'entry' ? "bg-primary w-2/3" : 
                node.type === 'sizing' ? "bg-tertiary w-full" : 
                node.type === 'exit' ? "bg-secondary w-full" : "bg-primary w-1/2"
              )} />
            </div>

            {/* PORTS */}
            {node.type !== 'asset' && (
              <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-on-surface-variant border border-bg rounded-full" />
            )}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary border border-bg rounded-full" />
          </div>
        ))}

        {/* BACKTEST PREVIEW OVERLAY */}
        {backtestData.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 h-40 bg-surface-high/90 backdrop-blur-md border border-line/20 p-4 z-20">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-headline font-black text-on-surface uppercase tracking-widest">QUICK BACKTEST PREVIEW</span>
              </div>
              <button onClick={() => setBacktestData([])} className="text-on-surface-variant hover:text-secondary">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={backtestData}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#02e600" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#02e600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="pnl" stroke="#02e600" fillOpacity={1} fill="url(#colorPnl)" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                    itemStyle={{ color: '#02e600' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>

      {/* RIGHT SIDEBAR: RISK & VALIDATION */}
      <aside className="w-80 border-l border-line/10 flex flex-col bg-surface/20">
        <header className="p-4 border-b border-line/10 flex items-center gap-3">
          <ShieldAlert className="w-4 h-4 text-secondary" />
          <h2 className="text-[10px] font-headline font-black text-on-surface uppercase tracking-[0.2em]">RISK PARAMETERS</h2>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8">
          {/* RISK CONTROLS */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">MAX PORTFOLIO HEAT</span>
                <span className="text-[10px] font-mono font-bold text-primary">{portfolioHeat.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="0.5" 
                value={portfolioHeat}
                onChange={(e) => setPortfolioHeat(parseFloat(e.target.value))}
                className="w-full h-1 bg-surface-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-3">
              <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">DAILY DRAWDOWN LIMIT</span>
              <div className="flex items-center bg-bg border border-line/10 p-2">
                <input className="bg-transparent border-none focus:ring-0 text-[11px] font-mono font-bold text-on-surface w-full" defaultValue="3.5" />
                <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase ml-2">% USD</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">MAX SLIPPAGE TOLERANCE</span>
              <div className="flex items-center justify-between bg-bg border border-line/10 p-2 cursor-pointer hover:bg-surface-high transition-all">
                <span className="text-[10px] font-mono font-bold text-on-surface">0.50% (Standard)</span>
                <ChevronDown className="w-3 h-3 text-on-surface-variant" />
              </div>
            </div>
          </div>

          {/* LOGIC VALIDATION */}
          <div className="space-y-4 pt-6 border-t border-line/10">
            <h3 className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest opacity-60">LOGIC VALIDATION</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-bg border border-line/10 p-3">
                <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase block mb-1">COMPLEXITY</span>
                <span className="text-[10px] font-headline font-black text-tertiary uppercase tracking-widest">MODERATE</span>
              </div>
              <div className="bg-bg border border-line/10 p-3">
                <span className="text-[7px] font-headline font-bold text-on-surface-variant uppercase block mb-1">BACKTEST SPEED</span>
                <span className="text-[10px] font-headline font-black text-primary uppercase tracking-widest">HIGH</span>
              </div>
            </div>
          </div>

          {/* ESTIMATED SHARPE */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[8px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">ESTIMATED SHARPE</span>
              <span className="text-lg font-mono font-bold text-primary">1.82</span>
            </div>
            <div className="h-12 flex items-end gap-1">
              {[0.3, 0.4, 0.5, 0.4, 0.6, 0.7, 1.0, 0.6, 0.5].map((h, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 transition-all",
                    i === 6 ? "bg-primary shadow-[0_0_10px_rgba(2,230,0,0.5)]" : "bg-surface-highest"
                  )} 
                  style={{ height: `${h * 100}%` }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 border-t border-line/10 bg-surface/30 space-y-3">
          <div className="flex gap-2">
            <button className="flex-1 bg-surface-high border border-line/10 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-surface-highest transition-all">
              DISCARD
            </button>
            <div className="flex-[1.5] bg-bg border border-line/10 p-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[6px] font-headline font-bold text-on-surface-variant uppercase">API CONNECTIVITY</span>
                <span className="text-[8px] font-mono font-bold text-primary uppercase">STABLE // 12ms</span>
              </div>
              <Activity className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
