import React from 'react';

interface HeroPanelProps {
  publicationCount: number;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ publicationCount }) => {
  return (
    <section
      className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
      id="hero-panel"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500" />
      <div className="absolute top-8 right-10 text-[10px] font-mono text-white/10 uppercase tracking-[0.3em] hidden sm:block">
        BOGAZICI_MEDIA_LAB // FACIAL_DYNAMICS
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white max-w-4xl">
          Combining Machine Learning, <span className="text-blue-500">Artificial Intelligence</span> and Computer Vision.
        </h2>
        <p className="text-lg md:text-lg text-white/60 leading-relaxed max-w-3xl">
          Computational Science and Mechanical Engineering alumnus of <b>Boğaziçi University</b>. Award-winning researcher in face analysis and facial dynamics at the Utrecht and Boğaziçi Media Labs. Specialist in building robust mobile/desktop interfaces and decentralized smart systems.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/5 text-left">
        <div>
          <p className="text-2xl md:text-3xl font-bold text-white">{publicationCount}</p>
          <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Publications</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-teal-400">1st Place</p>
          <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">CVPR ML Challenge</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-white">10+ Years</p>
          <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Full Stack Exp.</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-indigo-400">M.S.</p>
          <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Computational Sci.</p>
        </div>
      </div>
    </section>
  );
};
