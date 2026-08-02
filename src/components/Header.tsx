import React from 'react';
import { Mail } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center z-10 mb-12 gap-6 pb-6 border-b border-white/5">
      <div className="flex items-center gap-3.5 self-start sm:self-auto" id="header-brand">
        <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 rounded-xl flex items-center justify-center font-bold text-white font-mono text-lg shadow-xl shadow-blue-900/30">
          FG
        </div>
        <div>
          <span className="font-display font-extrabold tracking-tight text-xl text-white block">
            Furkan Gürpınar
          </span>
          <span className="text-[10px] text-teal-400 font-mono tracking-widest block uppercase font-bold">
            Computer Scientist
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end">
        <a
          href="mailto:gurpinarfurkan@gmail.com"
          className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all font-mono"
        >
          <Mail className="w-3.5 h-3.5 text-teal-400" />
          <span>gurpinarfurkan@gmail.com</span>
        </a>
      </div>
    </header>
  );
};
