import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Turn from '@/components/convo/Turn';
import Badges from '@/components/convo/Badges';
import { resumeData } from '@/data/resume';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const shortCompany = (c: string) => c.replace(' IT Consultancy', '');
const years = (period: string) => (period.match(/\d{4}/g) || []).join(' – ');

// "What were you doing before this?" → earlier roles as cards: points + tech badges
const JourneyView = (_props: ViewProps) => {
  const earlier = resumeData.experience.slice(1);
  const first = years(earlier[earlier.length - 1].period).split(' – ')[0];
  const last = years(earlier[0].period).split(' – ').pop();

  return (
    <Turn
      id="journey"
      question="What were you doing before this?"
      tool={`looked up experience · ${first} – ${last}`}
      headline="Mostly building SwiftCheck AI at Webotix."
    >
      <div className="mt-4 grid gap-4">
        {earlier.map((exp, i) => (
          <article
            key={exp.company}
            className="rise rounded-[18px] border border-g-line bg-g-surface p-5 md:p-7"
            style={{ '--d': i } as React.CSSProperties}
          >
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold text-g-text">
                {exp.role} ·{' '}
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 underline decoration-g-faint underline-offset-4 hover:decoration-g-text"
                  >
                    {shortCompany(exp.company)}
                    <ArrowUpRight className="h-3.5 w-3.5 text-g-muted" />
                  </a>
                ) : (
                  shortCompany(exp.company)
                )}
              </h3>
              <span className="text-[13.5px] text-g-muted tabular-nums">
                {years(exp.period)} · {exp.location}
              </span>
            </header>
            <ul className="mt-4 grid max-w-[66ch] list-disc gap-2.5 pl-[18px] text-[15.5px] leading-[1.65] text-g-text2 marker:text-g-faint">
              {exp.points.map((pt) => (
                <li key={pt.slice(0, 40)}>{pt}</li>
              ))}
            </ul>
            {exp.technologies && <Badges items={exp.technologies} className="mt-5" />}
          </article>
        ))}
      </div>
    </Turn>
  );
};

export default JourneyView;
