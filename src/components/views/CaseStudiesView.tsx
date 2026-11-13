import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { resumeData } from '@/data/resume';
import Turn from '@/components/convo/Turn';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

// "How do you think about product?" → case studies as cover cards
const CaseStudiesView = (_props: ViewProps) => {
  const studies = resumeData.caseStudies;
  const n = words[studies.length]?.toLowerCase() ?? String(studies.length);
  return (
    <Turn
      id="case-studies"
      question="How do you think about product?"
      tool={`opened case studies · ${studies.length} results`}
      headline={`I like taking apart apps I use. Here are ${n} write-ups.`}
    >
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {studies.map((s, i) => {
          const name = s.shortTitle ?? s.title.split(':')[0];
          // odd count: the first card spans the row so the grid ends evenly
          const wide = i === 0 && studies.length % 2 === 1;
          return (
            <Link
              key={s.slug}
              to={`/case-studies/${s.slug}`}
              className={`rise group flex flex-col overflow-hidden rounded-2xl border border-g-line bg-g-surface transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-g-faint ${wide ? 'sm:col-span-2' : ''}`}
              style={{ '--d': i } as React.CSSProperties}
            >
              <div className={`relative overflow-hidden ${wide ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[16/9]'} border-b border-g-line bg-[#0d0d0d]`}>
                {s.cover ? (
                  <img
                    src={s.cover}
                    alt=""
                    loading="lazy"
                    className="tint-on-hover h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                ) : (
                  // No images for this one: a typographic cover instead
                  <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#26262b,#0d0d0d_70%)]">
                    <span className="text-[44px] font-bold tracking-[-0.05em] text-g-faint transition-colors duration-500 group-hover:text-g-text">
                      {name}
                    </span>
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[11.5px] text-g-text2 backdrop-blur-sm">
                  {s.kind}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <span className="block text-[17px] font-semibold leading-tight tracking-[-0.02em] text-g-text">{name}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-g-muted">{s.oneLiner}</span>
                </div>
                <ArrowUpRight className="mt-0.5 h-4 w-4 flex-none text-g-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-g-text" />
              </div>
            </Link>
          );
        })}
      </div>
    </Turn>
  );
};

export default CaseStudiesView;
