
import React from 'react';
import { Home, BarChart2, Briefcase, Newspaper, User, Zap, BookOpen, FlaskConical } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'markets', label: 'Markets', icon: BarChart2 },
    { id: 'backtest', label: 'Lab', icon: FlaskConical },
    { id: 'portfolio', label: 'Assets', icon: Briefcase },
    { id: 'education', label: 'Learn', icon: BookOpen },
    { id: 'account', label: 'Elite', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/90 backdrop-blur-2xl border-t border-slate-900 px-4 pt-3 pb-safe">
      <div className="flex justify-between items-center h-14 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative ${isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500/10 scale-110' : ''}`}>
                <Icon className={`w-5 h-5`} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
              {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-indigo-400 rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
