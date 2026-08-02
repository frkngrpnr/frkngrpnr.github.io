import React, { useState } from 'react';
import { Award, Search, ArrowUpRight, GraduationCap, FileText, ArrowRight } from 'lucide-react';
import { publications } from '../data/publications';
import { PublicationType } from '../types';

export const PublicationsPanel: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<'all' | PublicationType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered = publications.filter((p) => {
    const typeMatches = currentFilter === 'all' || p.type === currentFilter;
    const q = searchQuery.toLowerCase();
    const textMatches =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.venue.toLowerCase().includes(q);
    return typeMatches && textMatches;
  });

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const categories: { key: 'all' | PublicationType; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'Journal Paper', label: 'JOURNAL' },
    { key: 'Conference Paper', label: 'CONFERENCE' },
    { key: 'Book Chapter', label: 'BOOK' },
  ];

  return (
    <section
      className="bg-[#0F0F12] border border-[#222227] rounded-[2.5rem] p-8 md:p-12 flex flex-col space-y-6 shadow-2xl"
      id="publications-panel"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">Peer-Reviewed Publications</h3>
          </div>
          <p className="text-sm text-white/50">
            Co-authored research papers and academic contributions in major venues including IEEE Transactions, CVPRW, and ICPR.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/5 text-xs font-semibold overflow-x-auto whitespace-nowrap max-w-full scrollbar-none self-stretch sm:self-start md:self-auto"
          id="pub-tabs"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCurrentFilter(cat.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full transition-all ${
                currentFilter === cat.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
        <input
          id="pub-search"
          type="text"
          placeholder="Filter by publication title, venue, authors, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#131317] border border-white/10 hover:border-white/20 focus:border-blue-500 focus:bg-[#0c0c0e] rounded-xl text-sm text-white placeholder-white/30 transition-all outline-none font-mono shadow-inner"
        />
      </div>

      {/* Scrollable list of publications */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin" id="pub-list-target">
        {filtered.length === 0 ? (
          <p className="text-xs text-white/30 text-center py-10">No publications match your filter criteria.</p>
        ) : (
          filtered.map((pub, idx) => {
            const actualIndex = publications.indexOf(pub);
            const isExpanded = expandedIndex === actualIndex;

            let badgeColor = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
            if (pub.type === "Journal Paper") {
              badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            } else if (pub.type === "Book Chapter") {
              badgeColor = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
            }

            return (
              <div
                key={actualIndex}
                onClick={() => toggleDetails(actualIndex)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                  isExpanded
                    ? 'bg-blue-600/10 border-blue-500/30 shadow-inner'
                    : 'bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                      {pub.type}
                    </span>
                    <span className="text-[11px] text-teal-400 font-mono font-semibold">
                      {pub.venue.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-xs text-white/30 font-mono">{pub.year}</span>
                </div>

                <h4 className="text-sm md:text-base font-bold text-white mt-3 leading-snug">
                  "{pub.title}"
                </h4>

                <p className="text-xs text-white/50 font-mono mt-2 line-clamp-1">{pub.authors}</p>

                {isExpanded ? (
                  <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/70 space-y-3">
                    <p>
                      <strong>Complete Author List:</strong> <span className="text-white/80">{pub.authors}</span>
                    </p>
                    <p>
                      <strong>Full Venue:</strong> <span className="text-blue-400 font-mono">{pub.venue || "N/A"}</span>
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-[10px] font-semibold font-mono tracking-wider uppercase transition-all duration-200"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Google Scholar</span>
                      </a>
                      {pub.pdfUrl && pub.pdfUrl !== "https://scholar.google.com/citations?user=W2RRQK0AAAAJ" ? (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 border border-teal-500/20 hover:border-teal-500/40 rounded-xl text-[10px] font-semibold font-mono tracking-wider uppercase transition-all duration-200"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Publication / PDF</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-blue-400 font-mono mt-2 flex items-center gap-1">
                    <span>Click to expand details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Publication stats and Google Scholar link */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/30 pt-4 border-t border-white/5 gap-3">
        <span id="pub-count-display">
          SHOWING {filtered.length} OF {publications.length} SCHOLARLY WORKS
        </span>
        <a
          href="https://scholar.google.com/scholar?q=Furkan+G%C3%BCrp%C4%B1nar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 flex items-center gap-1 transition-colors hover:underline text-teal-400 font-bold"
        >
          <span>EXPLORE ON GOOGLE SCHOLAR</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
