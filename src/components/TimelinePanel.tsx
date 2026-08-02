import React from 'react';
import { Briefcase } from 'lucide-react';
import { experienceData } from '../data/experience';

export const TimelinePanel: React.FC = () => {
  return (
    <section
      className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-8 shadow-2xl"
      id="timeline-panel"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">Timeline & Experience</h3>
        </div>
        <p className="text-sm text-white/50">
          Tracing a career path from advanced academic research laboratories to independent, robust product deployments.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
        {experienceData.map((exp, idx) => (
          <div key={idx} className="relative pl-10 group/timeline">
            <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full ${exp.color} group-hover/timeline:scale-125 transition-transform shadow-lg`} />
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  {exp.period}
                </span>
                <span className={`px-2.5 py-0.5 text-[9px] font-mono rounded-full ${exp.categoryBadge}`}>
                  {exp.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover/timeline:text-blue-400 transition-colors">
                {exp.title}
              </h4>
              <p className="text-xs text-white/40 font-mono">{exp.subtitle}</p>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70 max-w-4xl">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
