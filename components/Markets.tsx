
import React, { useState } from 'react';
import { Stock } from '../types';
import { Search, Filter, ArrowUp, ArrowDown, Rocket, Percent } from 'lucide-react';

interface MarketsProps {
  stocks: Stock[];
  onSelect: (stock: Stock) => void;
}

const Markets: React.FC<MarketsProps> = ({ stocks, onSelect }) => {
  const [filter, setFilter] = useState('');
  const [activeSubView, setActiveSubView] = useState<'all' | 'ipo' | 'yield'>('all');

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(filter.toLowerCase()) || 
                         s.name.toLowerCase().includes(filter.toLowerCase());
    if (activeSubView === 'ipo') return matchesSearch && s.isIPO;
    if (activeSubView === 'yield') return matchesSearch && s.dividendYield > 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter">Global Markets</h2>
          <p className="text-slate-500 text-sm">Real-time aggregate data from 24 global exchanges.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4 items-center">
           <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text"
                placeholder="Ticker, company or sector..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-bold"
              />
           </div>
           <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit">
         <button onClick={() => setActiveSubView('all')} className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubView === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}>All Assets</button>
         <button onClick={() => setActiveSubView('ipo')} className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeSubView === 'ipo' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}><Rocket className="w-3.5 h-3.5" /> IPO Tracker</button>
         <button onClick={() => setActiveSubView('yield')} className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeSubView === 'yield' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}><Percent className="w-3.5 h-3.5" /> High Yield</button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
         <div className="hidden sm:grid grid-cols-6 gap-6 px-10 py-6 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <div className="col-span-2">Security</div>
            <div className="text-right">Price (USD)</div>
            <div className="text-right">24h Δ</div>
            <div className="text-right">Market Cap</div>
            <div className="text-right">Dividend</div>
         </div>
         <div className="divide-y divide-slate-800/50">
            {filteredStocks.map(stock => (
               <div 
                  key={stock.symbol} 
                  onClick={() => onSelect(stock)}
                  className="grid grid-cols-2 sm:grid-cols-6 gap-6 px-10 py-6 hover:bg-slate-800/30 cursor-pointer transition-all items-center group"
               >
                  <div className="col-span-1 sm:col-span-2 flex items-center gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-indigo-600/20">
                        {stock.symbol.slice(0, 1)}
                     </div>
                     <div>
                        <div className="font-bold text-slate-50 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                           {stock.symbol}
                           {stock.isIPO && <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] rounded uppercase">IPO</span>}
                        </div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-wider">{stock.name}</div>
                     </div>
                  </div>
                  <div className="text-right font-bold mono hidden sm:block">
                     ${stock.price.toLocaleString()}
                  </div>
                  <div className={`text-right flex items-center justify-end gap-1 font-bold mono ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {stock.change >= 0 ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                     {Math.abs(stock.changePercent)}%
                  </div>
                  <div className="text-right text-slate-400 font-bold mono text-xs hidden sm:block">
                     {stock.marketCap}
                  </div>
                  <div className="text-right text-indigo-400 font-bold mono text-xs hidden sm:block">
                     {stock.dividendYield > 0 ? `${stock.dividendYield}%` : '—'}
                  </div>
                  {/* Mobile Price */}
                  <div className="sm:hidden text-right font-bold mono text-indigo-300">
                    ${stock.price.toLocaleString()}
                  </div>
               </div>
            ))}
            {filteredStocks.length === 0 && (
               <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600"><Search className="w-8 h-8" /></div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No securities found matching your criteria</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Markets;
