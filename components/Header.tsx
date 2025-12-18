
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, TrendingUp, ShieldCheck } from 'lucide-react';
import { Stock } from '../types';

interface HeaderProps {
  onSearch: (stock: Stock) => void;
  stocks: Stock[];
}

const Header: React.FC<HeaderProps> = ({ onSearch, stocks }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = stocks.filter(s => 
        s.symbol.toLowerCase().includes(query.toLowerCase()) || 
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (stock: Stock) => {
    onSearch(stock);
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group cursor-pointer">
            <TrendingUp className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-black tracking-tighter">ZENITH<span className="text-indigo-400">TRADE</span></div>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NYSE Open</span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400" />
            <input 
              type="text"
              placeholder="Search stocks, crypto, greeks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
            />
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              {suggestions.map(stock => (
                <button
                  key={stock.symbol}
                  onClick={() => handleSelect(stock)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800 transition-colors border-b border-slate-800/50 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400">{stock.symbol[0]}</div>
                    <div className="text-left">
                      <div className="font-bold text-sm">{stock.symbol}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm mono">${stock.price}</div>
                    <div className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all group">
             <ShieldCheck className="w-4 h-4 text-indigo-400" />
             <span className="text-[10px] font-bold uppercase text-slate-300">Zenith Pro</span>
          </button>
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border border-white/10 hidden sm:flex">
             AJ
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
