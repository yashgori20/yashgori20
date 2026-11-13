import React, { useState } from 'react';
import { resumeData, Project } from '@/data/resume';
import Turn from '@/components/convo/Turn';
import ProjectModal from '@/components/ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

// "Show me the work." → two featured cards, then a compact list
const ProjectsView = (_props: ViewProps) => {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = resumeData.projects.filter((p) => p.featured).sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
  const more = resumeData.projects.filter((p) => !p.featured && !p.archived);

  return (
    <Turn
      id="projects"
      question="What have you built?"
      tool={`opened projects · ${featured.length} featured, ${more.length} more`}
      headline="SwiftCheck AI and the BOM Data Mapper are the big ones."
    >
      <div className="mt-4 grid gap-5">
        {featured.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setSelected(p)}
            className="rise group block overflow-hidden rounded-[20px] border border-g-line bg-g-surface text-left transition-[border-color,transform] duration-500 hover:-translate-y-[3px] hover:border-g-faint"
            style={{ '--d': i } as React.CSSProperties}
          >
            <div className="aspect-[2/1] overflow-hidden border-b border-g-line bg-[#0d0d0d]">
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                className={`tint-on-hover h-full w-full object-top transition-transform duration-1000 group-hover:scale-[1.03] ${p.image?.endsWith('.svg') ? 'object-contain' : 'object-cover'}`}
              />
            </div>
            <div className="grid gap-x-6 gap-y-1.5 p-5 sm:grid-cols-[1fr_auto] sm:items-end md:px-[26px] md:pb-6 md:pt-[22px]">
              <span className="text-[13px] text-g-muted sm:col-span-2">{p.company}</span>
              <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-g-text">
                {p.title.split(':')[0]}
              </h3>
              {p.result && (
                <div className="mt-3 max-w-[22ch] text-[13.5px] leading-snug text-g-muted sm:row-span-2 sm:mt-0 sm:text-right">
                  <span className="mb-1 block text-[28px] font-semibold leading-none tracking-[-0.04em] text-g-text">
                    {p.result.value}
                  </span>
                  {p.result.label}
                </div>
              )}
              <p className="max-w-[52ch] text-pretty text-[15.5px] leading-[1.6] text-g-text2 sm:col-start-1">{p.short}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="rise mb-4 mt-10 text-[14px] text-g-muted" style={{ '--d': 2 } as React.CSSProperties}>
        A few more I built on the side
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {more.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setSelected(p)}
            className={`rise group flex flex-col overflow-hidden rounded-2xl border border-g-line bg-g-surface text-left transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-g-faint ${
              i === 0 && more.length % 2 === 1 ? 'sm:col-span-2' : ''
            }`}
            style={{ '--d': 3 + i } as React.CSSProperties}
          >
            <div className={`overflow-hidden border-b border-g-line bg-[#0d0d0d] ${i === 0 && more.length % 2 === 1 ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[16/10]'}`}>
              <img
                src={p.image}
                alt={`${p.title.split(':')[0]} preview`}
                loading="lazy"
                className="tint-on-hover h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-5">
              <span className="flex items-center justify-between gap-2 text-[17px] font-semibold tracking-[-0.015em] text-g-text">
                {p.title.split(':')[0]}
                <ArrowUpRight className="h-4 w-4 flex-none text-g-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-g-text" />
              </span>
              <span className="text-[14.5px] leading-snug text-g-muted">{p.short}</span>
              <span className="mt-auto flex flex-wrap gap-x-2.5 gap-y-1 pt-3 font-mono text-[11.5px] text-g-faint">
                {p.technologies.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        project={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onNavigate={(project) => setSelected(project)}
      />
    </Turn>
  );
};

export default ProjectsView;
