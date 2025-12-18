
import React from 'react';
import { BookOpen, Video, Users, Award, PlayCircle, Clock, ChevronRight } from 'lucide-react';
import { EDUCATIONAL_MODULES } from '../constants';

const EducationHub: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1">Knowledge Hub</h1>
          <p className="text-slate-400">Master the markets with institutional-grade tutorials.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
           <Award className="w-5 h-5 text-emerald-400" />
           <span className="text-xs font-bold text-emerald-400">Level 4 Certified Trader</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDUCATIONAL_MODULES.map(module => (
          <div key={module.id} className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><BookOpen className="w-24 h-24" /></div>
             <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  module.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                  module.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {module.level}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold">
                   <Clock className="w-3 h-3" /> {module.duration}
                </div>
             </div>
             <h3 className="text-lg font-bold mb-8 group-hover:text-indigo-400 transition-colors leading-tight">{module.title}</h3>
             <button className="flex items-center gap-2 text-indigo-400 text-xs font-bold group-hover:gap-3 transition-all">
                Start Module <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-indigo-900/40 to-slate-950 border border-indigo-500/20 rounded-[2.5rem] p-8 flex gap-8 items-center overflow-hidden group">
            <div className="hidden sm:block p-4 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-600/30">
               <Video className="w-12 h-12 text-white" />
            </div>
            <div>
               <h4 className="text-xl font-bold mb-2">Live Trading Webinars</h4>
               <p className="text-slate-400 text-sm mb-6">Join pro traders as they analyze the London and New York market opens every day.</p>
               <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all active:scale-95">
                  <PlayCircle className="w-4 h-4" /> View Schedule
               </button>
            </div>
         </div>
         <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex gap-8 items-center group">
            <div className="hidden sm:block p-4 bg-slate-800 rounded-3xl border border-slate-700">
               <Users className="w-12 h-12 text-indigo-400" />
            </div>
            <div>
               <h4 className="text-xl font-bold mb-2">Trader Community</h4>
               <p className="text-slate-400 text-sm mb-6">Connect with over 150k active traders, share strategies, and discuss market sentiment.</p>
               <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-2 transition-all active:scale-95">
                  Join Discord
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EducationHub;
