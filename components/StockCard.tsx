
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types';
import ChartComponent from './ChartComponent';

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const isUp = stock.change >= 0;

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl hover:border-slate-600 transition-all cursor-pointer group hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            {stock.symbol[0]}
          </div>
          <div>
            <h3 className="font-bold text-slate-100">{stock.symbol}</h3>
            <p className="text-xs text-slate-500 truncate max-w-[100px]">{stock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold mono">${stock.price}</p>
          <div className={`text-xs flex items-center justify-end gap-1 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity">
        <ChartComponent 
          data={stock.history.slice(-10)} 
          color={isUp ? '#10b981' : '#f43f5e'} 
          height={64} 
          hideAxis 
        />
      </div>
    </div>
  );
};

export default StockCard;
