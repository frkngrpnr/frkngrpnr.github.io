import React from 'react';
import { Trophy, UserCheck, FileText, Mail } from 'lucide-react';
import { awardsData } from '../data/awards';

export const AwardsAndReferences: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Machine Learning challenge awards */}
      <div
        className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6 shadow-2xl"
        id="ml-awards"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
              <Trophy className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">Machine Learning Challenges</h4>
          </div>

          <div className="space-y-4">
            {awardsData.map((award, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/2 border border-white/5">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white leading-snug">{award.title}</h5>
                    <p className="text-xs text-white/50 font-mono mt-1 leading-snug">{award.venue}</p>
                    <span
                      className={`text-[10px] font-mono font-bold block mt-1 ${
                        award.badgeType === 'FIRST PLACE' ? 'text-teal-400' : 'text-indigo-400'
                      }`}
                    >
                      {award.yearBadge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="text-[10px] font-mono text-white/30 uppercase block pt-4 border-t border-white/5">
          ChaLearn Computer Vision Benchmarks
        </span>
      </div>

      {/* Academic References */}
      <div
        className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6 shadow-2xl"
        id="references"
      >
        <div className="space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
              <UserCheck className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">Academic References</h4>
          </div>

          <div className="p-6 rounded-2xl bg-white/2 border border-white/5 flex flex-col items-center justify-center text-center space-y-4 my-auto flex-1 min-h-[220px]">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <p className="text-base font-bold text-white">Available Upon Request</p>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                Academic and professional references from Boğaziçi University and Utrecht University can be provided upon request.
              </p>
            </div>
            <a
              href="mailto:gurpinarfurkan@gmail.com?subject=Reference%20Request%20-%20Furkan%20G%C3%BCrp%C4%B1nar"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all duration-200 mt-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Request References
            </a>
          </div>
        </div>

        <span className="text-[10px] font-mono text-white/30 uppercase block pt-4 border-t border-white/5">
          Boğaziçi & Utrecht University
        </span>
      </div>
    </div>
  );
};
