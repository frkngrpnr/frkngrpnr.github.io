import React from 'react';
import { FolderGit2, ExternalLink, Star } from 'lucide-react';
import { projectsData } from '../data/projects';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

export const ProjectsPanel: React.FC = () => {
  return (
    <section
      className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-6 shadow-2xl"
      id="projects-panel"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/20 rounded-lg flex items-center justify-center text-teal-400">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">Projects</h3>
        </div>
        <p className="text-sm text-white/50">Things I've built, from side experiments to shipped tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="group flex flex-col rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all overflow-hidden"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-white/5">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured ? (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold font-mono uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 backdrop-blur">
                  <Star className="w-3 h-3 fill-amber-400" />
                  Featured
                </span>
              ) : null}
            </div>

            <div className="p-5 flex flex-col flex-1 space-y-3">
              <h4 className="text-base font-bold text-white leading-snug">{project.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed flex-1">{project.description}</p>

              {project.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2.5 pt-2 border-t border-white/5">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-[10px] font-semibold font-mono tracking-wider uppercase transition-all duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 border border-teal-500/20 hover:border-teal-500/40 rounded-xl text-[10px] font-semibold font-mono tracking-wider uppercase transition-all duration-200"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
