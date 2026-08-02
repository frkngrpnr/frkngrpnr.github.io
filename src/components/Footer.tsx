import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-5xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] z-10">
      <div>&copy; <span id="year-target">{currentYear}</span> Furkan Gürpınar Portfolio</div>
      <div>All Rights Reserved</div>
    </footer>
  );
};
