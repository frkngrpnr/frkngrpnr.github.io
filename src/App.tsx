import React from 'react';
import { StarsBackground } from './components/StarsBackground';
import { Header } from './components/Header';
import { HeroPanel } from './components/HeroPanel';
import { SkillsPanel } from './components/SkillsPanel';
import { TimelinePanel } from './components/TimelinePanel';
import { PublicationsPanel } from './components/PublicationsPanel';
import { AwardsAndReferences } from './components/AwardsAndReferences';
import { SocialProfiles } from './components/SocialProfiles';
import { Footer } from './components/Footer';
import { publications } from './data/publications';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen night-sky-bg text-[#F3F4F6] font-sans selection:bg-blue-600/30 selection:text-blue-200 flex flex-col justify-between p-4 sm:p-8 md:p-16 relative">
      {/* Background Celestial Parallax Stars & Grids */}
      <StarsBackground />

      {/* Header */}
      <Header />

      {/* Main Single Column Layout */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col gap-10 z-10 my-4">
        {/* 1. Hero Panel */}
        <HeroPanel publicationCount={publications.length} />

        {/* 2. Skills Showcase Panel */}
        <SkillsPanel />

        {/* 3. Work & Academic Experiences Timeline */}
        <TimelinePanel />

        {/* 4. Peer-Reviewed Publications Panel */}
        <PublicationsPanel />

        {/* 5. Awards & References Grid */}
        <AwardsAndReferences />

        {/* Social Profiles Row */}
        <SocialProfiles />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
