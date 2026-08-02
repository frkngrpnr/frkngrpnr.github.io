import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SocialProfiles: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto mt-16 py-2" id="social-profiles-section">
      <a
        href="https://github.com/f-gee"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#131318] hover:bg-white/5 border border-[#2d2d35]/50 hover:border-white/20 rounded-2xl px-4 py-3 flex items-center justify-between hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300 group relative w-full"
        id="github-profile-link"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-5 h-5 text-white/80 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block leading-none">GitHub</span>
            <span className="text-[9px] font-mono text-white/40 block mt-0.5">f-gee</span>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors shrink-0" />
      </a>

      <a
        href="https://www.linkedin.com/in/furkan-g%C3%BCrp%C4%B1nar-347160421/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#131318] hover:bg-blue-500/5 border border-[#2d2d35]/50 hover:border-blue-500/30 rounded-2xl px-4 py-3 flex items-center justify-between hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300 group relative w-full"
        id="linkedin-profile-link"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block leading-none">LinkedIn</span>
            <span className="text-[9px] font-mono text-blue-400 block mt-0.5">furkan-gurpinar</span>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-blue-400/50 group-hover:text-blue-400 transition-colors shrink-0" />
      </a>

      <a
        href="https://scholar.google.com/citations?user=W2RRQK0AAAAJ&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#131318] hover:bg-teal-500/5 border border-[#2d2d35]/50 hover:border-teal-500/30 rounded-2xl px-4 py-3 flex items-center justify-between hover:shadow-[0_0_20px_rgba(20,184,166,0.05)] transition-all duration-300 group relative w-full"
        id="scholar-profile-link"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-5 h-5 text-teal-400 group-hover:text-teal-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.854 3.64a7.002 7.002 0 0 1 14.292 0L24 9.5 12 0z"/>
            </svg>
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block leading-none">Scholar</span>
            <span className="text-[9px] font-mono text-teal-400 block mt-0.5">Citations & Papers</span>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-teal-400/50 group-hover:text-teal-400 transition-colors shrink-0" />
      </a>

      <a
        href="https://www.researchgate.net/profile/Furkan-Guerpinar-2"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#131318] hover:bg-emerald-500/5 border border-[#2d2d35]/50 hover:border-emerald-500/30 rounded-2xl px-4 py-3 flex items-center justify-between hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300 group relative w-full"
        id="researchgate-profile-link"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.37 0c-1.18 0-2.12.94-2.12 2.12v12.02h-1.62c-2.3 0-3.17-1.39-3.17-3.92V0H10.3c-1.18 0-2.12.94-2.12 2.12V24h2.12v-9.68h1.61c2.3 0 3.17 1.39 3.17 3.92V24h2.12V2.12C17.25.94 18.19 0 19.37 0z"/>
            </svg>
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block leading-none">ResearchGate</span>
            <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">Furkan Gürpınar</span>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/50 group-hover:text-emerald-400 transition-colors shrink-0" />
      </a>
    </div>
  );
};
