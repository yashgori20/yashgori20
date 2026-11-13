import React from 'react';
import Turn from '@/components/convo/Turn';
import { resumeData } from '@/data/resume';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const institution = (name: string) =>
  name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('K.j.', 'K.J.')
    .replace(' Of ', ' of ');

// "What's your background?" → education, volunteering
const BackgroundView = (_props: ViewProps) => {
  const { education, volunteering } = resumeData;
  const row = 'rise grid grid-cols-1 gap-1 border-t border-g-line py-5 sm:grid-cols-[120px_1fr] sm:gap-5';

  return (
    <Turn
      id="about"
      question="What's your background?"
      tool="looked up education · volunteering"
      headline="B.Tech in IT from K.J. Somaiya, Mumbai."
    >
      <ol className="mt-4 border-b border-g-line">
        {education.map((e, i) => (
          <li key={e.institution} className={row} style={{ '--d': i } as React.CSSProperties}>
            <span className="pt-0.5 text-[13.5px] text-g-muted tabular-nums">{e.period}</span>
            <div>
              <h3 className="text-[17px] font-semibold text-g-text">{institution(e.institution)}</h3>
              <p className="mt-1 text-[15.5px] text-g-text2">
                {e.degree} · {e.details.replace('CGPA – ', 'CGPA ')}
              </p>
            </div>
          </li>
        ))}

        <li className={row} style={{ '--d': education.length } as React.CSSProperties}>
          <span className="pt-0.5 text-[13.5px] text-g-muted">{volunteering.period}</span>
          <div>
            <h3 className="text-[17px] font-semibold text-g-text">
              <a
                href={volunteering.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-g-faint underline-offset-4 hover:decoration-g-text"
              >
                {volunteering.organization}
              </a>{' '}
              · Volunteer {volunteering.role}
            </h3>
            <p className="mt-1 max-w-[62ch] text-pretty text-[15.5px] leading-[1.65] text-g-text2">{volunteering.summary}</p>
          </div>
        </li>

      </ol>
    </Turn>
  );
};

export default BackgroundView;
