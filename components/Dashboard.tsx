
import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, Wallet, ArrowUpRight, Zap, Globe, Sparkles, Calendar, MessageSquare } from 'lucide-react';
import { Stock } from '../types';
import { GLOBAL_INDICES } from '../constants';
import StockCard from './StockCard';
import ChartComponent from './ChartComponent';
import { getPortfolioOptimization } from '../services/geminiService';

const Dashboard: React.FC<{ stocks: Stock[]; onSelect: (stock: Stock) => void }> = ({ stocks, onSelect }) => {
  const [aiTip, setAiTip] = useState('Generating personalized strategy...');
  
  useEffect(() => {
    getPortfolioOptimization({}).then(setAiTip);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Global Index Ticker */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
        {GLOBAL_INDICES.map(idx => (
          <div key={idx.name} className="flex-shrink-0 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-slate-600 transition-all cursor-default">
            <div className={`p-2 rounded-xl ${idx.changePercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">{idx.name}</div>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold mono leading-none">${idx.value.toLocaleString()}</span>
                <span className={`text-xs font-black ${idx.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {idx.changePercent >= 0 ? '▲' : '▼'} {Math.abs(idx.changePercent)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-950 rounded-[3rem] p-10 border border-indigo-500/20 relative group overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -top-20 opacity-5 group-hover:opacity-10 transition-opacity">
               <TrendingUp className="w-96 h-96" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                 <div>
                   <h1 className="text-4xl font-black tracking-tighter mb-1">Trading Terminal</h1>
                   <p className="text-slate-400 text-sm">Welcome back, <span className="text-indigo-300 font-bold">Zenith Elite</span> member.</p>
                 </div>
                 <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
                   Live: NYSE
                 </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-2">Net Equity</p>
                  <p className="text-3xl font-bold mono tracking-tight">$142,504.20</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-2">24h Gain</p>
                  <p className="text-3xl font-bold text-emerald-400 mono tracking-tight">+$3,420.12</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-2">Market Vol</p>
                  <p className="text-3xl font-bold text-indigo-400 mono tracking-tight">Low</p>
                </div>
              </div>

              <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-start gap-4">
                 <Sparkles className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">AI Portfolio Optimization</p>
                    <p className="text-xs text-indigo-100 italic leading-relaxed">"{aiTip}"</p>
                 </div>
              </div>
            </div>
          </div>

          <section>
            <div className="flex justify-between items-center mb-6 px-2">
               <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                 <Zap className="w-5 h-5 text-amber-400" /> 
                 Priority Watchlist
               </h2>
               <button className="text-[10px] text-indigo-400 font-black uppercase tracking-widest hover:text-indigo-300 transition-colors">Manage Alerts</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stocks.slice(0, 4).map(stock => (
                <StockCard key={stock.symbol} stock={stock} onClick={() => onSelect(stock)} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-indigo-400" /> 
              Social Pulse
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Twitter (X)', value: 84, color: 'bg-indigo-500', trend: 'Bullish' },
                { label: 'Reddit r/stocks', value: 42, color: 'bg-rose-500', trend: 'Bearish' },
                { label: 'News Sentiment', value: 68, color: 'bg-emerald-500', trend: 'Neutral' }
              ].map(pulse => (
                <div key={pulse.label}>
                  <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest">
                    <span className="text-slate-500">{pulse.label}</span>
                    <span className={pulse.trend === 'Bullish' ? 'text-emerald-400' : pulse.trend === 'Bearish' ? 'text-rose-400' : 'text-slate-300'}>{pulse.trend}</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                    <div className={`h-full ${pulse.color} rounded-full transition-all duration-1000 shadow-lg shadow-indigo-500/10`} style={{ width: `${pulse.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
             <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
               <Calendar className="w-5 h-5 text-indigo-400" />
               Market Events
             </h2>
             <div className="space-y-4">
                <div className="flex gap-4 items-start group cursor-pointer">
                   <div className="w-10 h-10 rounded-2xl bg-slate-800 flex flex-col items-center justify-center font-black group-hover:bg-indigo-600 transition-colors">
                      <span className="text-[10px] text-slate-500 group-hover:text-white/50">JUL</span>
                      <span className="text-sm group-hover:text-white">24</span>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-100">CPI Inflation Report</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Economic • 08:30 AM</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start group cursor-pointer">
                   <div className="w-10 h-10 rounded-2xl bg-slate-800 flex flex-col items-center justify-center font-black group-hover:bg-indigo-600 transition-colors">
                      <span className="text-[10px] text-slate-500 group-hover:text-white/50">JUL</span>
                      <span className="text-sm group-hover:text-white">25</span>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-100">AMZN Earnings Call</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Corporate • After Close</p>
                   </div>
                </div>
             </div>
             <button className="w-full mt-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-white hover:border-slate-500 transition-all">Full Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
