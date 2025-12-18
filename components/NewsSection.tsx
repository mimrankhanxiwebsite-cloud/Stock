
import React from 'react';
import { NewsItem } from '../types';
import { Clock, ExternalLink, Bookmark } from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Latest Headlines</h2>
        <div className="flex gap-2">
          {['All', 'Crypto', 'Stocks', 'Forex'].map(tag => (
            <button key={tag} className="px-4 py-1.5 text-xs font-medium rounded-full bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div key={item.id} className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-indigo-500/50 transition-all flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-lg font-bold mb-3 group-hover:text-indigo-300 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
              {item.summary}
            </p>
            
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Clock className="w-3.5 h-3.5" />
                {item.timestamp} • {item.source}
              </div>
              <button className="p-2 bg-slate-800 rounded-xl text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-indigo-600/20">
         <h2 className="text-2xl font-bold mb-2">Zenith Insider</h2>
         <p className="text-indigo-100 mb-6 max-w-lg mx-auto">Get deep technical analysis and institutional-grade insights delivered to your dashboard daily.</p>
         <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">
            Upgrade to Pro
         </button>
      </div>
    </div>
  );
};

export default NewsSection;
