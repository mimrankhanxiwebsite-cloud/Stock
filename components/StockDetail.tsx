
import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Info, BarChart3, Clock, Sparkles, Layers, Activity } from 'lucide-react';
import { Stock } from '../types';
import ChartComponent from './ChartComponent';
import { getMarketAnalysis } from '../services/geminiService';

const MarketDepth = ({ stock }: { stock: Stock }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
        <span>Bid</span>
        <span>Size</span>
        <span>Ask</span>
      </div>
      <div className="space-y-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between items-center text-xs mono">
            <span className="text-emerald-400">${(stock.bid - i * 0.05).toFixed(2)}</span>
            <span className="text-slate-500">{100 * i}</span>
            <span className="text-rose-400">${(stock.ask + i * 0.05).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OptionsChain = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="text-slate-500 border-b border-slate-800">
          <th className="py-2">Calls Last</th>
          <th className="py-2">Strike</th>
          <th className="py-2">Puts Last</th>
          <th className="py-2">Delta</th>
        </tr>
      </thead>
      <tbody className="mono">
        {[130, 135, 140, 145].map(strike => (
          <tr key={strike} className="border-b border-slate-900/50 hover:bg-slate-800/20">
            <td className="py-3 text-emerald-400">$4.50</td>
            <td className="py-3 font-bold text-slate-300">{strike}</td>
            <td className="py-3 text-rose-400">$2.10</td>
            <td className="py-3 text-slate-500">0.65</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StockDetail: React.FC<{ stock: Stock; onClose: () => void; onTrade: () => void }> = ({ stock, onClose, onTrade }) => {
  const [analysis, setAnalysis] = useState('Analyzing market dynamics...');
  const [activeTab, setActiveTab] = useState('chart');
  const isUp = stock.change >= 0;

  useEffect(() => {
    getMarketAnalysis(stock.symbol).then(setAnalysis);
  }, [stock.symbol]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onClose} className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {stock.symbol} <span className="text-sm font-medium text-slate-500 px-2 py-0.5 bg-slate-800 rounded">{stock.exchange}</span>
          </h1>
          <p className="text-slate-400 text-sm">{stock.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-4xl font-bold mono">${stock.price}</div>
                <div className={`flex items-center gap-1 font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stock.changePercent}%
                </div>
              </div>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map(t => (
                  <button key={t} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${t === '1W' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80 w-full mb-6">
              <ChartComponent data={stock.history} color={isUp ? '#10b981' : '#f43f5e'} height={320} />
            </div>

            <div className="flex gap-4 border-b border-slate-800 mb-6">
              {['Technical', 'Options', 'L2 Depth', 'Financials'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-3 px-2 text-sm font-bold relative transition-colors ${activeTab === tab.toLowerCase() ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
                </button>
              ))}
            </div>

            {activeTab === 'technical' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">SMA (50)</p>
                  <p className="font-bold mono">${(stock.price * 0.98).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">RSI (14)</p>
                  <p className="font-bold mono">64.2</p>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">MACD</p>
                  <p className="font-bold mono text-emerald-400">+1.24</p>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">ATR</p>
                  <p className="font-bold mono">2.14</p>
                </div>
              </div>
            )}
            {activeTab === 'options' && <OptionsChain />}
            {activeTab === 'l2 depth' && <MarketDepth stock={stock} />}
            {activeTab === 'financials' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-500">Market Cap</span>
                  <span className="font-bold mono">{stock.marketCap}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-500">P/E Ratio</span>
                  <span className="font-bold mono">{stock.peRatio}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-500">Volume</span>
                  <span className="font-bold mono">{stock.volume}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-500">EPS</span>
                  <span className="font-bold mono">${stock.eps}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <button onClick={onTrade} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
            Trade Now
          </button>
          
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm">AI Analyst</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic mb-4">"{analysis}"</p>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-3/4"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Strong Buy</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Order Book
            </h3>
            <MarketDepth stock={stock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
