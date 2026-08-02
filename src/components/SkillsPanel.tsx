import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Code,
  Braces,
  Layers,
  Atom,
  Binary,
  Server,
  Database,
  Terminal,
  Table,
  Smartphone,
  Tablet,
  Gamepad2,
  Box,
  Cpu,
  Shield,
  Link as LinkIcon
} from 'lucide-react';
import { skillsData } from '../data/skills';
import { Skill, SkillCategory } from '../types.ts';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Braces,
  Layers,
  Atom,
  Binary,
  Server,
  Database,
  Terminal,
  Table,
  Smartphone,
  Tablet,
  Gamepad2,
  Box,
  Cpu,
  Shield,
  Link: LinkIcon
};

export const SkillsPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [fractionalIndex, setFractionalIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const filteredSkills = skillsData.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const activeIndexRef = useRef(0);
  const fractionalIndexRef = useRef(0);
  const momentumAnimRef = useRef<number | null>(null);

  // Sync refs with state
  useEffect(() => {
    activeIndexRef.current = activeSkillIndex;
  }, [activeSkillIndex]);

  const updateFractionalIndex = useCallback((val: number) => {
    fractionalIndexRef.current = val;
    setFractionalIndex(val);
  }, []);

  const handleFilter = (cat: SkillCategory) => {
    if (momentumAnimRef.current) {
      cancelAnimationFrame(momentumAnimRef.current);
      momentumAnimRef.current = null;
    }
    setSelectedCategory(cat);
    setActiveSkillIndex(0);
    updateFractionalIndex(0);
  };

  const snapToClosest = useCallback((targetIndex: number) => {
    const len = filteredSkills.length;
    if (len === 0) return;
    const normalized = (targetIndex % len + len) % len;
    setActiveSkillIndex(normalized);
    updateFractionalIndex(normalized);
  }, [filteredSkills.length, updateFractionalIndex]);

  const nextSkill = useCallback(() => {
    const len = filteredSkills.length;
    if (len === 0) return;
    snapToClosest(activeIndexRef.current + 1);
  }, [filteredSkills.length, snapToClosest]);

  const prevSkill = useCallback(() => {
    const len = filteredSkills.length;
    if (len === 0) return;
    snapToClosest(activeIndexRef.current - 1);
  }, [filteredSkills.length, snapToClosest]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const len = filteredSkills.length;
    if (len === 0) return;

    if (momentumAnimRef.current) {
      cancelAnimationFrame(momentumAnimRef.current);
      momentumAnimRef.current = null;
    }

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);

    startXRef.current = clientX;
    currentXRef.current = clientX;
    lastDragXRef.current = clientX;
    lastDragTimeRef.current = Date.now();
    velocityRef.current = 0;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      currentXRef.current = clientX;
      const diffX = clientX - startXRef.current;

      const now = Date.now();
      const dt = now - lastDragTimeRef.current;
      if (dt > 0) {
        const instantVel = (clientX - lastDragXRef.current) / dt;
        velocityRef.current = velocityRef.current * 0.3 + instantVel * 0.7;
        lastDragXRef.current = clientX;
        lastDragTimeRef.current = now;
      }

      const isMobile = window.innerWidth < 640;
      const spacing = isMobile ? 100 : 155;
      const offset = diffX / spacing;
      updateFractionalIndex(activeIndexRef.current - offset);
    };

    const handleEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      const len = filteredSkills.length;
      if (len === 0) return;

      const timeSinceLastMove = Date.now() - lastDragTimeRef.current;
      if (timeSinceLastMove > 80) {
        velocityRef.current = 0;
      }

      const isMobile = window.innerWidth < 640;
      const spacing = isMobile ? 100 : 155;
      let indexVel = velocityRef.current / spacing;

      const maxVel = 0.04;
      if (Math.abs(indexVel) > maxVel) {
        indexVel = Math.sign(indexVel) * maxVel;
      }

      if (Math.abs(indexVel) > 0.003) {
        let lastFrameTime = Date.now();

        const animateDeceleration = () => {
          const now = Date.now();
          const dt = Math.min(now - lastFrameTime, 100);
          lastFrameTime = now;

          const friction = Math.pow(0.992, dt);
          indexVel *= friction;

          let current = fractionalIndexRef.current - indexVel * dt;
          current = (current % len + len) % len;
          updateFractionalIndex(current);

          if (Math.abs(indexVel) > 0.0008) {
            momentumAnimRef.current = requestAnimationFrame(animateDeceleration);
          } else {
            const target = Math.round(current) % len;
            snapToClosest(target);
          }
        };

        momentumAnimRef.current = requestAnimationFrame(animateDeceleration);
      } else {
        const diffX = currentXRef.current - startXRef.current;
        if (Math.abs(diffX) > 35) {
          let offsetVal = Math.round(diffX / spacing);
          if (offsetVal === 0) offsetVal = Math.sign(diffX);
          const target = activeIndexRef.current - offsetVal;
          snapToClosest(target);
        } else {
          snapToClosest(Math.round(fractionalIndexRef.current));
        }
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [filteredSkills.length, snapToClosest, updateFractionalIndex]);

  const categories: { key: SkillCategory; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'frontend', label: 'FRONTEND' },
    { key: 'backend', label: 'BACKEND' },
    { key: 'mobile', label: 'MOBILE' },
    { key: 'game_dev', label: 'GAME DEVELOPMENT' },
  ];

  const len = filteredSkills.length;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const spacing = isMobile ? 100 : 155;

  return (
    <section
      className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-8 relative overflow-hidden shadow-2xl"
      id="skills-panel"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">Skills & Technologies</h3>
          </div>
          <p className="text-sm text-white/50">
            A comprehensive selection of languages, frameworks, databases, and environments leveraged to engineer high-performance digital products.
          </p>
        </div>

        {/* Category Quick Filter Tabs */}
        <div className="flex flex-row flex-nowrap overflow-x-auto scrollbar-none gap-1 bg-white/5 p-1 rounded-full text-xs font-semibold max-w-full w-full md:w-auto whitespace-nowrap shrink-0" id="skills-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleFilter(cat.key)}
              className={`px-4 py-2 md:px-3.5 md:py-1.5 rounded-full transition-all shrink-0 ${selectedCategory === cat.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/40 hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Touch/Mouse Slidable Skills 3D Carousel Stage */}
      <div
        ref={stageRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className={`relative min-h-[350px] sm:min-h-[380px] md:min-h-[400px] flex items-center justify-center py-6 select-none overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        id="skills-stage"
      >
        {/* Floating Left & Right Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSkill();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-blue-500/95 border border-white/10 hover:border-blue-400 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md z-30 active:scale-95 group"
          title="Previous skill"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-blue-400 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSkill();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-blue-500/95 border border-white/10 hover:border-blue-400 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md z-30 active:scale-95 group"
          title="Next skill"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-400 group-hover:text-white transition-colors" />
        </button>

        {/* 3D Carousel Stage */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl flex items-center justify-center h-[260px] md:h-[300px]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {filteredSkills.map((skill: Skill, i: number) => {
            let diff = i - fractionalIndex;
            if (len >= 4) {
              if (diff < -len / 2) diff += len;
              if (diff > len / 2) diff -= len;
            }

            const absDiff = Math.abs(diff);
            const translateX = diff * spacing;
            const translateZ = -absDiff * 90;
            const rotateY = -diff * 22;
            const scale = Math.max(0.62, 1 - absDiff * 0.14);
            const zIndex = Math.round(100 - absDiff * 10);
            const opacity = isMobile
              ? Math.max(0, 1 - absDiff * 0.55)
              : Math.max(0, 1 - absDiff * 0.38);

            const isInteractive = absDiff <= 0.1;

            const IconComp = iconMap[skill.icon] || Code;
            const hasErr = imgErrorMap[skill.name];

            return (
              <div
                key={skill.name}
                onClick={() => snapToClosest(i)}
                className="skill-carousel-card absolute bg-[#131318] border border-[#2d2d35]/50 rounded-[1.5rem] p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] group overflow-hidden select-none"
                style={{
                  width: isMobile ? '150px' : '190px',
                  height: isMobile ? '170px' : '210px',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  pointerEvents: isInteractive ? 'auto' : 'none',
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s',
                  transformStyle: 'preserve-3d',
                  //transformStyle: 'flat',
                  backfaceVisibility: 'hidden',
                  //WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  willChange: 'transform, opacity',
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none m-0`} />

                {/* Logo Container */}
                <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-2.5 relative group-hover:scale-110 transition-transform duration-300 shrink-0 z-10">
                  {!hasErr ? (
                    <img
                      src={`./logos/${skill.logo}?v=3`}
                      alt={skill.name}
                      className="w-full h-full object-contain filter drop-shadow-md"
                      onError={() => setImgErrorMap((prev) => ({ ...prev, [skill.name]: true }))}
                    />
                  ) : null}

                  {hasErr && (
                    <div className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br ${skill.color} border ${skill.border}`}>
                      <IconComp className={`w-7 h-7 ${skill.text}`} />
                    </div>
                  )}
                </div>

                {/* Skill Name */}
                <div className="space-y-1 z-10">
                  <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight block">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 group-hover:text-white transition-colors block">
                    {skill.category === 'game_dev' ? 'game dev' : skill.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bullets indicator */}
      <div className="flex justify-center items-center gap-2" id="skills-bullets-container">
        {filteredSkills.map((_, i) => {
          const closestIndex = (Math.round(fractionalIndex) % len + len) % len;
          const active = i === closestIndex;
          return (
            <button
              key={i}
              onClick={() => snapToClosest(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${active ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              title={`Jump to skill ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};
