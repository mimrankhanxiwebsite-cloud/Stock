
import React, { useState } from 'react';
import { Play, RotateCcw, Activity, LineChart, FileText, Sparkles } from 'lucide-react';
import { runBacktestAnalysis } from '../services/geminiService';

const BacktestTool: React.FC = () => {
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!strategy) return;
    setLoading(true);
    const analysis = await runBacktestAnalysis(strategy);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Strategy Lab</h1>
          <p className="text-slate-400">Backtest algorithmic triggers and sentiment cycles.</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">New Session</button>
           <button className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold transition-all">Templates</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-2 mb-6 text-indigo-400">
                <FileText className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-xs">Strategy Definition</h3>
             </div>
             <textarea 
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="e.g. Buy when RSI < 30 and 50-day EMA crosses 200-day EMA. Sell when profit reaches 10% or MACD signals bearish reversal."
              className="w-full h-48 bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 text-slate-300 outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed"
             />
             <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> <span className="text-[10px] font-bold text-slate-500">Live Data Sync</span></div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> <span className="text-[10px] font-bold text-slate-500">AI Enabled</span></div>
                </div>
                <button 
                  onClick={handleRun}
                  disabled={loading || !strategy}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold rounded-2xl flex items-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><Play className="w-4 h-4 fill-current" /> Run Simulation</>}
                </button>
             </div>
          </div>

          {result && (
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-950 border border-indigo-500/20 rounded-[2.5rem] p-8 animate-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold">Simulation Results</h3>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Win Rate</p>
                    <p className="text-2xl font-bold text-emerald-400">62.4%</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Profit Factor</p>
                    <p className="text-2xl font-bold text-indigo-400">2.14</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Max Drawdown</p>
                    <p className="text-2xl font-bold text-rose-500">12.8%</p>
                  </div>
               </div>
               <p className="text-slate-300 text-sm leading-relaxed italic">"{result}"</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
             <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-300">
               <Activity className="w-4 h-4 text-indigo-400" />
               Historical Coverage
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-500">S&P 500 Index</span>
                  <span className="text-emerald-400 font-bold">10 Years</span>
                </div>
                <div className="flex justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-500">Crypto Basket</span>
                  <span className="text-emerald-400 font-bold">5 Years</span>
                </div>
                <div className="flex justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-500">Commodity Spot</span>
                  <span className="text-emerald-400 font-bold">15 Years</span>
                </div>
             </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-center shadow-2xl shadow-indigo-600/20 group cursor-pointer overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><LineChart className="w-32 h-32" /></div>
             <h4 className="text-lg font-bold mb-2">Zenith Cloud Nodes</h4>
             <p className="text-indigo-100 text-xs mb-6 leading-relaxed">Unlock ultra-high frequency historical tick data for sub-second backtesting.</p>
             <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg hover:bg-indigo-50 transition-colors">Request Access</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestTool;
