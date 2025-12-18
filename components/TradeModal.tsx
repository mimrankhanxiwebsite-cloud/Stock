
import React, { useState } from 'react';
import { X, TrendingUp, ArrowRight, CheckCircle2, ShieldAlert, ChevronDown } from 'lucide-react';
import { Stock, OrderType } from '../types';

interface TradeModalProps {
  stock: Stock;
  onClose: () => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ stock, onClose }) => {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<OrderType>('Market');
  const [amount, setAmount] = useState<string>('');
  const [leverage, setLeverage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => onClose(), 2000);
    }, 1200);
  };

  const totalValue = (parseFloat(amount || '0') * stock.price).toLocaleString();
  const marginRequired = ((parseFloat(amount || '0') * stock.price) / leverage).toLocaleString();

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="bg-slate-900 w-full max-w-sm rounded-[3rem] p-10 text-center animate-in zoom-in-95 duration-500 border border-indigo-500/20 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Trade Executed</h2>
          <p className="text-slate-400 mb-6 text-sm">Successfully placed {orderType} {type} order for {amount} {stock.symbol}.</p>
          <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
            <div className="text-left"><p className="text-[10px] text-slate-500 uppercase">Settled Value</p><p className="font-bold mono">${totalValue}</p></div>
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg font-bold text-xs">{stock.symbol}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 border-t sm:border border-slate-800 shadow-2xl relative animate-in slide-in-from-bottom-12 duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>

        <div className="flex bg-slate-800 p-1.5 rounded-2xl w-fit mx-auto mb-8 shadow-inner">
          <button onClick={() => setType('buy')} className={`py-2 px-8 rounded-xl text-sm font-bold transition-all ${type === 'buy' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-200'}`}>Buy</button>
          <button onClick={() => setType('sell')} className={`py-2 px-8 rounded-xl text-sm font-bold transition-all ${type === 'sell' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-200'}`}>Sell</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-2">Order Type</label>
            <div className="relative group">
               <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as OrderType)}
                className="w-full bg-transparent text-sm font-bold outline-none cursor-pointer appearance-none pr-6"
               >
                 <option value="Market">Market</option>
                 <option value="Limit">Limit</option>
                 <option value="Stop-Limit">Stop-Limit</option>
                 <option value="Trailing Stop">Trailing Stop</option>
               </select>
               <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-2">Leverage</label>
            <div className="flex gap-2">
              {[1, 2, 5, 10].map(l => (
                <button key={l} onClick={() => setLeverage(l)} className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${leverage === l ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>{l}x</button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleTrade} className="space-y-6">
          <div className="text-center px-4">
             <input 
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-5xl font-bold mono text-center outline-none focus:text-indigo-400 transition-colors placeholder:text-slate-800"
              autoFocus
             />
             <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Amount to {type} ({stock.symbol})</p>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-slate-800 space-y-4">
             <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Order Value</span>
                <span className="text-slate-200 mono">${totalValue}</span>
             </div>
             <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Margin Required ({leverage}x)</span>
                <span className="text-indigo-400 font-bold mono">${marginRequired}</span>
             </div>
             <div className="flex items-center gap-2 pt-2 text-[10px] text-amber-500 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Risk Warning: High leverage increases potential losses.</span>
             </div>
          </div>

          <button 
            type="submit"
            disabled={!amount || isProcessing}
            className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-2 group active:scale-95
              ${isProcessing ? 'bg-slate-700' : type === 'buy' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'}
            `}
          >
            {isProcessing ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (
              <>{type === 'buy' ? 'Execute Long' : 'Execute Short'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;
