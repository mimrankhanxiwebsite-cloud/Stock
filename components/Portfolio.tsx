
import React from 'react';
import { Stock } from '../types';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, PieChart as PieIcon } from 'lucide-react';

interface PortfolioProps {
  stocks: Stock[];
}

const Portfolio: React.FC<PortfolioProps> = ({ stocks }) => {
  const holdings = stocks.slice(0, 3).map(s => ({
    ...s,
    shares: Math.floor(Math.random() * 50) + 10,
    avgCost: s.price - (Math.random() * 10)
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Your Assets</h2>
              <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
           </div>

           <div className="space-y-2">
              {holdings.map(stock => {
                const equity = stock.shares * stock.price;
                const gain = (stock.price - stock.avgCost) * stock.shares;
                const isGain = gain >= 0;
                
                return (
                  <div key={stock.symbol} className="flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-2xl transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-indigo-300 group-hover:bg-indigo-600 transition-colors">
                        {stock.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold">{stock.symbol}</div>
                        <div className="text-xs text-slate-500">{stock.shares} shares @ ${stock.avgCost.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold mono">${equity.toLocaleString()}</div>
                      <div className={`text-xs flex items-center justify-end gap-1 ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isGain ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        ${Math.abs(gain).toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
               <PieIcon className="w-5 h-5 text-indigo-400" />
               <h3 className="font-bold">Allocation</h3>
            </div>
            <div className="relative h-48 w-48 mx-auto mb-6">
               <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" strokeDasharray="180 251.2" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="40 251.2" strokeDashoffset="-180" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray="31.2 251.2" strokeDashoffset="-220" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-500">Diversification</span>
                  <span className="text-xl font-bold">Strong</span>
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Technology</div>
                  <span className="font-bold">72%</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Energy</div>
                  <span className="font-bold">16%</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Health</div>
                  <span className="font-bold">12%</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
