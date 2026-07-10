/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, Mail, Sparkles, Terminal, Code2, Cpu, 
  BookOpen, Trophy, GraduationCap, ArrowUpRight, 
  FileText, ArrowRight, User, Compass, Briefcase, 
  Check, Search, Printer, Copy, HelpCircle, ChevronLeft, ChevronRight, Share2, Award
} from "lucide-react";
import { cvData, Publication, Experience } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"all" | "Journal" | "Conference" | "Book">("all");
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCVModal, setShowCVModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMD, setCopiedMD] = useState(false);

  // 3D Book Library state
  const [bookIndex, setBookIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Skill books data matching Furkan's actual tech stack
  const skillBooks = [
    {
      title: "Web Frontend",
      subtitle: "Interfaces & Client Applications",
      spineColor: "from-blue-600 to-indigo-700",
      textColor: "text-blue-400",
      accentBg: "bg-blue-500/10",
      borderAccent: "border-blue-500/20",
      description: "Delivering fully responsive, lightweight frontend architectures and interactive dashboards since 2010.",
      primaryTech: "React & Vue",
      skills: ["JavaScript", "TypeScript", "React", "Vue", "jQuery", "AngularJS", "Tauri", "Electron", "NW.js"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-cyan-400 animate-[spin_12s_linear_infinite]">
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)"/>
        </svg>
      )
    },
    {
      title: "Backend Services",
      subtitle: "Data & Cloud Architecture",
      spineColor: "from-emerald-600 to-teal-700",
      textColor: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/20",
      description: "Highly optimized backend infrastructures, API orchestration, and structured database layouts.",
      primaryTech: "Node.js & Python",
      skills: ["Node.js", "Python", "Django", "MongoDB", "SQL", "PHP", "Express", "RESTful APIs"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16">
          <path d="M12 2C12 2 9 6.5 9 10C9 14.5 12 18 12 22C12 22 15 14.5 15 10C15 6.5 12 2 12 2Z" fill="#00ED64" />
          <path d="M12 2V22" stroke="#10B981" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "Mobile Platforms",
      subtitle: "Native App Development",
      spineColor: "from-purple-600 to-violet-700",
      textColor: "text-purple-400",
      accentBg: "bg-purple-500/10",
      borderAccent: "border-purple-500/20",
      description: "Crafting fluid native mobile apps. Built and deployed custom face analysis and image processing utilities.",
      primaryTech: "Android & iOS",
      skills: ["Android (Java, Kotlin)", "iOS (Objective-C)", "Swift", "CoreML", "Camera APIs", "Device Performance"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#3DDC84]">
          <path fill="currentColor" d="M17.6 9.48l1.44-2.5a.4.4 0 0 0-.15-.55.4.4 0 0 0-.54.15L16.9 9.1a10.05 10.05 0 0 0-9.8 0L5.65 6.58a.4.4 0 0 0-.54-.15.4.4 0 0 0-.15.55l1.44 2.5a10 10 0 0 0-4.4 7.6H22a10 10 0 0 0-4.4-7.6zM7 13.5a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm10 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>
        </svg>
      )
    },
    {
      title: "Game & 3D Interactive",
      subtitle: "Real-time Graphics Engine",
      spineColor: "from-amber-600 to-orange-700",
      textColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
      borderAccent: "border-amber-500/20",
      description: "Developing robust game logic and WebGL graphics engines for soft biometrics and facial dynamics.",
      primaryTech: "Unity3D & WebGL",
      skills: ["Unity3D", "Three.js", "Babylon.js", "Phaser.js", "ActionScript", "C# Game Logic", "GLSL Shaders"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-amber-400">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      )
    },
    {
      title: "Scientific Computing",
      subtitle: "Analytical Systems & Models",
      spineColor: "from-rose-600 to-pink-700",
      textColor: "text-rose-400",
      accentBg: "bg-rose-500/10",
      borderAccent: "border-rose-500/20",
      description: "Applying mechanical engineering and computer science principles to numerical analysis and face biometrics.",
      primaryTech: "MATLAB & Julia",
      skills: ["MATLAB", "R Studio", "Prolog", "Julia", "Numerical Analysis", "Time-Series Models", "Discrete Math"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-rose-400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: "Smart Contracts",
      subtitle: "Distributed Ledger Web3",
      spineColor: "from-cyan-600 to-blue-700",
      textColor: "text-cyan-400",
      accentBg: "bg-cyan-500/10",
      borderAccent: "border-cyan-500/20",
      description: "Developing decentralized logic, smart contract architecture, and web integrations for Web3 platforms.",
      primaryTech: "Solidity & Web3.js",
      skills: ["Solidity", "Web3.js", "C++", "C#", "C Systems", "Ethereum EVM", "Visual Basic"],
      accentLogo: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    }
  ];

  // Manual sliding helpers
  const handlePrev = () => {
    setBookIndex((prev) => (prev === 0 ? skillBooks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setBookIndex((prev) => (prev === skillBooks.length - 1 ? 0 : prev + 1));
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(cvData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyMarkdownCV = () => {
    const md = `
# ${cvData.name}
Email: ${cvData.email}

## Education
${cvData.education.map(e => `- **${e.degree}** at ${e.institution} (${e.period})`).join("\n")}

## Academic Experience
${cvData.academicExperience.map(exp => `### ${exp.role} - ${exp.organization} (${exp.period})\n${exp.bullets.map(b => `- ${b}`).join("\n")}`).join("\n\n")}

## Work Experience
${cvData.workExperience.map(exp => `### ${exp.role} - ${exp.organization} (${exp.period})\n${exp.bullets.map(b => `- ${b}`).join("\n")}`).join("\n\n")}

## Awards
${cvData.awards.map(a => `- **${a.title}** (${a.venue}, ${a.year})`).join("\n")}
    `;
    navigator.clipboard.writeText(md.trim());
    setCopiedMD(true);
    setTimeout(() => setCopiedMD(false), 2000);
  };

  // Filter publications
  const filteredPublications = cvData.publications.filter(pub => {
    const matchesTab = activeTab === "all" || 
      (activeTab === "Journal" && pub.type === "Journal Paper") ||
      (activeTab === "Conference" && pub.type === "Conference Paper") ||
      (activeTab === "Book" && pub.type === "Book Chapter");

    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070709] text-[#F3F4F6] font-sans selection:bg-blue-600/30 selection:text-blue-200 flex flex-col justify-between p-4 sm:p-8 md:p-16 relative overflow-hidden">
      {/* Immersive Atmospheric Lighting & Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-teal-950/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header Navigation (Full-width wide container) */}
      <header className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center z-10 mb-12 gap-6 pb-6 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3.5 self-start sm:self-auto"
          id="header-brand"
        >
          <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 rounded-xl flex items-center justify-center font-bold text-white font-mono text-lg shadow-xl shadow-blue-900/30">
            FG
          </div>
          <div>
            <span className="font-display font-extrabold tracking-tight text-xl text-white block">
              {cvData.name}
            </span>
            <span className="text-[10px] text-teal-400 font-mono tracking-widest block uppercase font-bold">M.S. Computational Scientist</span>
          </div>
        </motion.div>

        {/* Global navigation actions */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="flex items-center gap-3.5 w-full sm:w-auto justify-end"
        >
          <a
            href={`mailto:${cvData.email}`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full text-xs font-semibold bg-white/2 hover:bg-white/5 text-white/80 hover:text-white transition-all font-mono"
          >
            <Mail className="w-3.5 h-3.5 text-teal-400" />
            <span>{cvData.email}</span>
          </a>

          <button
            onClick={() => setShowCVModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-xs font-bold text-white transition-all shadow-lg shadow-blue-900/35 hover:brightness-110 active:scale-95"
            id="view-cv-btn"
          >
            <FileText className="w-4 h-4 text-white/90" />
            <span>Interactive LaTeX CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
          </button>
        </motion.div>
      </header>

      {/* Main Single Column Layout Container */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col gap-10 z-10 my-4">
        
        {/* 1. HERO PANEL (Wide Full-Width Single Column) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
          id="hero-panel"
        >
          {/* Scientific Accent Line on top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500" />
          <div className="absolute top-8 right-10 text-[10px] font-mono text-white/10 uppercase tracking-[0.3em] hidden sm:block">
            BOGAZICI_MEDIA_LAB // FACIAL_DYNAMICS
          </div>

          <div className="space-y-8">
            <div className="inline-flex px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Available for Research & Dev</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white max-w-4xl">
                Bridging Machine Learning, <span className="text-blue-500 bg-clip-text">Computer Vision</span> & Complex Engineering.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
                Computational Science and Mechanical Engineering alumnus of <b>Boğaziçi University</b>. Award-winning researcher in face analysis and facial dynamics at the Utrecht and Boğaziçi Media Labs. Specialist in building robust mobile/desktop interfaces and decentralized smart systems.
              </p>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/5 text-left">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">9+</p>
              <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Publications</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-teal-400">1st Place</p>
              <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">CVPR ML Challenge</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">2010</p>
              <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Dev Active Since</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-indigo-400">M.S.</p>
              <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">Computational Sci.</p>
            </div>
          </div>
        </motion.section>

        {/* 2. THE 3D BOOK SKILL LIBRARY (Generous Single Column Interactive Slider) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-8 relative overflow-hidden shadow-2xl"
          id="3d-library-panel"
        >
          {/* Title & Controller */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">3D Skill Book Library</h3>
              </div>
              <p className="text-sm text-white/50">
                Furkan's core expertise bound in a tactile sliding book catalog. Drag or swipe left/right to browse.
              </p>
            </div>

            {/* Slider Navigation Arrows & Counters */}
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 self-end md:self-auto font-mono text-sm">
              <button 
                onClick={handlePrev}
                className="p-1.5 hover:bg-white/5 rounded-full transition-all text-white/60 hover:text-white active:scale-90"
                title="Previous skill book"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-teal-400 font-bold tracking-widest">
                {String(bookIndex + 1).padStart(2, '0')} / {String(skillBooks.length).padStart(2, '0')}
              </span>
              <button 
                onClick={handleNext}
                className="p-1.5 hover:bg-white/5 rounded-full transition-all text-white/60 hover:text-white active:scale-90"
                title="Next skill book"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Slidable Book Container with drag bounds */}
          <div className="relative min-h-[380px] md:min-h-[420px] flex items-center justify-center py-6 select-none overflow-hidden">
            
            {/* Gesture Helper tooltip overlay */}
            <div className="absolute top-0 right-2 flex items-center gap-1.5 text-[10px] font-mono text-white/30 bg-white/2 px-2.5 py-1 rounded-md">
              <Share2 className="w-3.5 h-3.5 animate-pulse" />
              <span>SWIPE OR DRAG BOOK TO TURN PAGES</span>
            </div>

            <AnimatePresence mode="popLayout">
              {/* Central 3D Active Book Page */}
              <motion.div
                key={bookIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: 35, rotateX: 5, x: 100 }}
                animate={{ opacity: 1, scale: 1, rotateY: -10, rotateX: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -45, rotateX: -5, x: -100 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event, info) => {
                  setIsDragging(false);
                  const swipeThreshold = 60;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="w-full max-w-2xl bg-gradient-to-b from-[#15151a] to-[#101012] border border-[#2d2d35]/60 rounded-r-[1.5rem] rounded-l-[0.5rem] shadow-[25px_25px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col sm:flex-row relative group/book cursor-grab active:cursor-grabbing transform-gpu"
                style={{ 
                  perspective: "2000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D SPINE - Leather/Metallic binding left edge */}
                <div className={`w-6 sm:w-10 bg-gradient-to-r ${skillBooks[bookIndex].spineColor} border-r border-white/10 flex flex-col justify-between items-center py-6 relative shadow-inner shrink-0`}>
                  {/* Spine Ribs (3D tactile bumps) */}
                  <div className="space-y-4 w-full">
                    <div className="h-[2px] bg-black/40 w-full" />
                    <div className="h-[2px] bg-black/40 w-full" />
                    <div className="h-[2px] bg-black/40 w-full" />
                  </div>
                  {/* Vertical technology index label */}
                  <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-white/50 rotate-270 uppercase my-8 origin-center truncate w-24 block text-center">
                    {skillBooks[bookIndex].primaryTech}
                  </span>
                  <div className="space-y-4 w-full">
                    <div className="h-[2px] bg-black/40 w-full" />
                    <div className="h-[2px] bg-black/40 w-full" />
                  </div>

                  {/* Golden spine corner bindings */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/50" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400/50" />
                </div>

                {/* BOOK COVER CONTENT */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between space-y-6 relative">
                  
                  {/* Subtle paper texture overlay */}
                  <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-repeat pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

                  {/* Top row */}
                  <div className="flex justify-between items-start gap-4 z-10" style={{ transform: "translateZ(30px)" }}>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block font-bold">
                        PAGE {bookIndex + 1} // TECH_PORTFOLIO
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none group-hover/book:text-teal-300 transition-colors">
                        {skillBooks[bookIndex].title}
                      </h4>
                      <p className="text-xs text-white/40 font-mono mt-1">
                        {skillBooks[bookIndex].subtitle}
                      </p>
                    </div>
                    {/* Tactical Skill Category Accent Icon */}
                    <div className="p-2 bg-white/3 border border-white/5 rounded-xl shrink-0">
                      {skillBooks[bookIndex].accentLogo}
                    </div>
                  </div>

                  {/* Deep descriptive section */}
                  <div className="space-y-4 z-10" style={{ transform: "translateZ(45px)" }}>
                    <p className="text-sm text-white/70 leading-relaxed italic border-l-2 border-teal-500/30 pl-4">
                      "{skillBooks[bookIndex].description}"
                    </p>

                    {/* Skill Tags Grid */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Expertise & Tools</p>
                      <div className="flex flex-wrap gap-2">
                        {skillBooks[bookIndex].skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="px-2.5 py-1 bg-white/2 hover:bg-white/5 border border-white/5 rounded-md text-xs font-mono text-white/80 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Page index footer */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/30 border-t border-white/5 pt-4 z-10" style={{ transform: "translateZ(20px)" }}>
                    <span>BOĞAZİÇİ M.S. PORTFOLIO</span>
                    <span className="text-teal-400/80 font-bold">NEXT.js workflow ready</span>
                  </div>

                  {/* Golden right corners */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/40" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Ghost background pages stack for true 3D book depth */}
            <div className="absolute w-[94%] max-w-2xl h-[95%] bg-[#0f0f12]/90 border border-[#2d2d35]/30 rounded-r-[1.5rem] shadow-lg translate-x-2 translate-y-2 -z-10 scale-98 pointer-events-none" />
            <div className="absolute w-[88%] max-w-2xl h-[90%] bg-[#0c0c0e]/80 border border-[#2d2d35]/20 rounded-r-[1.5rem] shadow-md translate-x-4 translate-y-4 -z-20 scale-95 pointer-events-none" />
          </div>

          {/* Quick interactive dots indicator */}
          <div className="flex justify-center items-center gap-2">
            {skillBooks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBookIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === bookIndex ? "w-8 bg-teal-400" : "w-2 bg-white/20 hover:bg-white/40"}`}
                title={`Jump to Page ${idx + 1}`}
              />
            ))}
          </div>
        </motion.section>

        {/* 3. RESEARCH PUBLICATIONS PANEL (Single Column, Wide Layout) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-6 shadow-2xl"
          id="publications-panel"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">Peer-Reviewed Publications</h3>
              </div>
              <p className="text-sm text-white/50">
                Peer-reviewed papers in major venues including IEEE Transactions, CVPRW, ICPR, and Springer.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/5 text-xs font-semibold self-start md:self-auto">
              {(["all", "Journal", "Conference", "Book"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${activeTab === tab ? "bg-blue-600 text-white shadow-md" : "text-white/40 hover:text-white"}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
            <input
              type="text"
              placeholder="Filter by publication title, venue, authors, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/2 border border-white/5 hover:border-white/10 focus:border-blue-500 focus:bg-[#121215] rounded-xl text-sm text-white placeholder-white/30 transition-all outline-hidden font-mono"
            />
          </div>

          {/* Scrollable list of publications (Wide and responsive columns) */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/15">
            {filteredPublications.map((pub, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPaper(selectedPaper === pub ? null : pub)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${selectedPaper === pub ? "bg-blue-600/10 border-blue-500/30 shadow-inner" : "bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10"}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full ${pub.type === "Journal Paper" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : pub.type === "Book Chapter" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}`}>
                      {pub.type}
                    </span>
                    <span className="text-[11px] text-teal-400 font-mono font-semibold">{pub.venue.split(" ")[0]}</span>
                  </div>
                  <span className="text-xs text-white/30 font-mono">{pub.year}</span>
                </div>
                
                <h4 className="text-sm md:text-base font-bold text-white mt-3 leading-snug">
                  "{pub.title}"
                </h4>

                <p className="text-xs text-white/50 font-mono mt-2 line-clamp-1">{pub.authors}</p>
                
                {selectedPaper === pub ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-white/5 text-xs text-white/70 space-y-3"
                  >
                    <p><strong>Complete Author List:</strong> <span className="text-white/80">{pub.authors}</span></p>
                    <p><strong>Full Venue:</strong> <span className="text-blue-400 font-mono">{pub.venue}</span></p>
                  </motion.div>
                ) : (
                  <div className="text-[10px] text-blue-400 font-mono mt-2 flex items-center gap-1">
                    <span>Click to expand details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
            {filteredPublications.length === 0 && (
              <p className="text-xs text-white/30 text-center py-10">No publications match your filter criteria.</p>
            )}
          </div>

          {/* Publication Metadata metrics */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/30 pt-4 border-t border-white/5 gap-3">
            <span>SHOWING {filteredPublications.length} OF 9 SCHOLARLY WORKS</span>
            <a 
              href="https://scholar.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1 transition-colors hover:underline text-teal-400 font-bold"
            >
              <span>EXPLORE ON GOOGLE SCHOLAR</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.section>

        {/* 4. WORK & ACADEMIC EXPERIENCES (Unified Single Column Timeline) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
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
              Tracing Furkan's career from academic laboratories to independent project deployments.
            </p>
          </div>

          {/* Unified Timeline Container */}
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
            
            {/* 1. Software Developer - Freelance (Work) */}
            <div className="relative pl-10 group/timeline">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 group-hover/timeline:scale-125 transition-transform shadow-lg shadow-blue-500/50" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">Independent // 2010 - PRESENT</span>
                  <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono rounded-full">WORK EXP</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover/timeline:text-blue-400 transition-colors">Freelance Software Developer</h4>
                <p className="text-xs text-white/40 font-mono">Full-Stack, Android, BlockChain Logic</p>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70 max-w-4xl">
                  <li>Web design, full responsive development, and core Search Engine Optimization (SEO).</li>
                  <li>Native Android application engineering utilizing Kotlin and Java APIs.</li>
                  <li>Decentralized Solidity smart contracts deployment on the Ethereum blockchain.</li>
                  <li>High-performance real-time image processing systems for smart public transport applications.</li>
                </ul>
              </div>
            </div>

            {/* 2. Boğaziçi University Media Lab (Academic) */}
            <div className="relative pl-10 group/timeline">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 group-hover/timeline:scale-125 transition-transform shadow-lg shadow-indigo-500/50" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">Boğaziçi University // 2014 - 2017</span>
                  <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-mono rounded-full">RESEARCH EXP</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover/timeline:text-indigo-400 transition-colors">Researcher</h4>
                <p className="text-xs text-white/40 font-mono">Boğaziçi Media Laboratory</p>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70 max-w-4xl">
                  <li>Designed deep neural network structures for face dynamic analysis and video-based transfer learning.</li>
                  <li>Recognized and explained apparent personality patterns with high-impact research models.</li>
                </ul>
              </div>
            </div>

            {/* 3. Kadir Has University (Academic) */}
            <div className="relative pl-10 group/timeline">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-teal-500 group-hover/timeline:scale-125 transition-transform shadow-lg shadow-teal-500/50" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                  <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">Kadir Has University // 2014 - 2015</span>
                  <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[9px] font-mono rounded-full">ACADEMIC EXP</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover/timeline:text-teal-400 transition-colors">Research & Teaching Assistant</h4>
                <p className="text-xs text-white/40 font-mono">Department of Computer Science</p>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70 max-w-4xl">
                  <li>Applied time-series mathematical structures for high-accuracy market trend prediction models.</li>
                  <li>Supported classrooms in advanced lectures on Competitive Intelligence and Discrete Mathematics.</li>
                </ul>
              </div>
            </div>

            {/* 4. Teaching Assistant (Academic) */}
            <div className="relative pl-10 group/timeline">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-white/20 group-hover/timeline:scale-125 transition-transform" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                  <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider">Mechanical Engineering // 2010</span>
                  <span className="px-2.5 py-0.5 bg-white/5 text-white/50 border border-white/5 text-[9px] font-mono rounded-full">ACADEMIC EXP</span>
                </div>
                <h4 className="text-lg font-bold text-white">Teaching Assistant</h4>
                <p className="text-xs text-white/40 font-mono">Boğaziçi University Mechanical Engineering</p>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70 max-w-4xl">
                  <li>Delivered educational support and grading for advanced MATLAB algorithms and C logic for numerical analysis.</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.section>

        {/* 5. AWARDS & LAB REFERENCES GRID PANEL (Single Column Multi-Block layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Machine Learning challenge awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
                {cvData.awards.map((award, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-white/2 border border-white/5 ${i > 0 ? "border-t border-white/5" : ""}`}>
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <div>
                        <h5 className="text-sm font-bold text-white leading-snug">{award.title}</h5>
                        <p className="text-xs text-white/50 font-mono mt-1 leading-snug">{award.venue}</p>
                        <span className="text-[10px] text-teal-400 font-mono font-bold block mt-1">{award.year} • FIRST PLACE</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[10px] font-mono text-white/30 uppercase block pt-4 border-t border-white/5">
              ChaLearn Computer Vision Benchmarks
            </span>
          </motion.div>

          {/* Academic References */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6 shadow-2xl"
            id="references"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                  <User className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">Academic References</h4>
              </div>

              <div className="space-y-4">
                {cvData.references.map((ref, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/2 border border-white/5 flex flex-col justify-between">
                    <div>
                      <h5 className="text-sm font-extrabold text-white">{ref.name}</h5>
                      <p className="text-xs text-white/40 font-mono mt-0.5">{ref.institution}</p>
                    </div>
                    {/* Only display email since cell numbers are explicitly excluded */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/30 uppercase">EMAIL CONTACT</span>
                      <a 
                        href={`mailto:${ref.email}`}
                        className="text-teal-400 hover:underline hover:text-teal-300 font-bold"
                      >
                        {ref.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[10px] font-mono text-white/30 uppercase block pt-4 border-t border-white/5">
              Boğaziçi & Utrecht University
            </span>
          </motion.div>

        </div>

      </main>

      {/* Dynamic Wide Footer */}
      <footer className="w-full max-w-5xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] z-10">
        <div>&copy; {new Date().getFullYear()} {cvData.name} Portfolio Starter</div>
        <div className="flex items-center gap-2">
          <span>Designed with Intent</span>
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span>Next.js Workflow Active</span>
        </div>
        <div>No cell phone numbers included in UI</div>
      </footer>

      {/* Interactive LaTeX-like CV Modal (Same pristine content) */}
      <AnimatePresence>
        {showCVModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-blue-500 w-5 h-5" />
                    <span>Digital Academic CV</span>
                  </h3>
                  <p className="text-xs text-teal-400 font-mono font-bold">LaTeX COMPRESSED FORMAT</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyMarkdownCV}
                    className="p-2 hover:bg-white/5 rounded-lg border border-white/5 transition-all text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
                    title="Copy Markdown Resume"
                  >
                    {copiedMD ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedMD ? "Copied" : "Copy MD"}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 hover:bg-white/5 rounded-lg border border-white/5 transition-all text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
                    title="Print CV"
                  >
                    <Printer className="w-4 h-4 text-teal-400" />
                    <span>Print CV</span>
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white border border-white/5 transition-colors font-mono text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scrollable Curriculum Vitae Content */}
              <div className="p-8 overflow-y-auto flex-1 space-y-8 text-left text-white/80 print-content" id="printable-cv">
                {/* CV Header */}
                <div className="border-b border-white/10 pb-6">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">{cvData.name}</h1>
                  <p className="text-sm text-teal-400 font-mono mt-1">gurpinarfurkan@gmail.com • Istanbul, Turkey</p>
                </div>

                {/* Education section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.education.map((edu, idx) => (
                      <div key={idx} className="bg-white/2 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 block mb-1">{edu.period}</span>
                        <h4 className="text-sm font-bold text-white leading-tight">{edu.degree}</h4>
                        <p className="text-xs text-white/60 mt-1">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Experience */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Academic Experience</h3>
                  <div className="space-y-4">
                    {cvData.academicExperience.map((exp, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                          <span className="text-xs font-mono text-white/40">{exp.period}</span>
                        </div>
                        <p className="text-xs text-teal-400 font-medium">{exp.organization}</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="text-xs text-white/60">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Professional Work Experience</h3>
                  <div className="space-y-4">
                    {cvData.workExperience.map((exp, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                          <span className="text-xs font-mono text-white/40">{exp.period}</span>
                        </div>
                        <p className="text-xs text-teal-400 font-medium">{exp.organization}</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="text-xs text-white/60">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publications Summary */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Selected Peer-Reviewed Publications</h3>
                  <div className="space-y-3">
                    {cvData.publications.map((pub, idx) => (
                      <div key={idx} className="text-xs space-y-1 bg-white/2 p-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded">
                            {pub.type}
                          </span>
                          <span className="text-white/40 font-mono text-[10px]">{pub.year}</span>
                        </div>
                        <p className="text-white font-medium">"{pub.title}"</p>
                        <p className="text-white/40 text-[10px]">{pub.authors}</p>
                        <p className="text-blue-400 font-mono text-[10px]">{pub.venue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
