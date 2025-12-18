
import React from 'react';
import { Stock } from '../types';
import { SECTORS } from '../constants';
import { PieChart, Zap, Target, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';

const Analytics: React.FC<{ stocks: Stock[] }> = ({ stocks }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Deep Analytics</h1>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-emerald-400 font-bold"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Live Depth</span>
          <span className="text-slate-500 font-bold uppercase">US / INT Markets</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Section */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Market Heatmap
            </h2>
            <select className="bg-slate-800 text-xs border-none rounded-lg px-2 py-1">
              <option>Performance (1D)</option>
              <option>Volume</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SECTORS.map(sector => (
              <div key={sector.name} className={`p-4 rounded-2xl flex flex-col justify-between h-24 transition-all hover:scale-[1.02] cursor-pointer
                ${sector.performance > 1 ? 'bg-emerald-900/40 border-emerald-500/30' : 
                  sector.performance < 0 ? 'bg-rose-900/40 border-rose-500/30' : 
                  'bg-slate-800 border-slate-700'} border
              `}>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">{sector.name}</span>
                <span className="text-lg font-bold mono">{sector.performance > 0 ? '+' : ''}{sector.performance}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Gauge */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-400" />
            Social Sentiment
          </h2>
          <div className="relative h-48 flex items-center justify-center mb-6">
            <svg viewBox="0 0 100 50" className="w-full">
              <path d="M10,45 A40,40 0 0,1 90,45" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <path d="M10,45 A40,40 0 0,1 70,10" fill="none" stroke="url(#sentimentGrad)" strokeWidth="8" strokeLinecap="round" />
              <defs>
                <linearGradient id="sentimentGrad">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <line x1="50" y1="45" x2="65" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" className="origin-bottom transform rotate-12" />
            </svg>
            <div className="absolute bottom-4 text-center">
              <div className="text-2xl font-bold">Greed</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Index: 68</div>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-xs">
                <span className="text-slate-400">Twitter Sentiment</span>
                <span className="text-emerald-400 font-bold">Bullish</span>
             </div>
             <div className="flex justify-between text-xs">
                <span className="text-slate-400">Reddit Sentiment</span>
                <span className="text-amber-400 font-bold">Neutral</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
           <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-indigo-400" /></div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Intl Exposure</p>
              <p className="font-bold">24.5%</p>
           </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
           <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center"><Target className="w-5 h-5 text-emerald-400" /></div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Alpha Rating</p>
              <p className="font-bold text-emerald-400">+1.82</p>
           </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
           <div className="w-10 h-10 bg-rose-600/20 rounded-xl flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-rose-400" /></div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Risk VaR</p>
              <p className="font-bold">$4,250</p>
           </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
           <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center"><ArrowUpRight className="w-5 h-5 text-amber-400" /></div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Correlations</p>
              <p className="font-bold text-slate-300">Moderate</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
