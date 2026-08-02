import React, { useEffect, useState } from 'react';

export const StarsBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 stars-layer-1 pointer-events-none"
        style={{ backgroundPositionY: `${scrollY * -0.15}px` }}
      />
      <div
        className="fixed inset-0 stars-layer-2 pointer-events-none"
        style={{ backgroundPositionY: `${scrollY * -0.35}px` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-950/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] bg-blue-950/08 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-slate-950/10 rounded-full blur-[180px] pointer-events-none" />
    </>
  );
};
