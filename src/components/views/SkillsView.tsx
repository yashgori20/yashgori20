import React from 'react';
import { resumeData } from '@/data/resume';
import Turn from '@/components/convo/Turn';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

// "What are you good at?" → grouped plain-text skill lines
const SkillsView = (_props: ViewProps) => (
  <Turn
    id="skills"
    question="What's your stack?"
    tool="summarised skills"
    headline="What I use most days."
  >
    <div className="rise mt-4 border-t border-g-line">
      {resumeData.skillGroups.map((g) => (
        <div
          key={g.label}
          className="grid grid-cols-1 items-baseline gap-1.5 border-b border-g-line py-4 sm:grid-cols-[140px_1fr] sm:gap-5"
        >
          <h3 className="text-[14px] font-medium text-g-muted">{g.label}</h3>
          <p className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-[15.5px] text-g-text2">
            {g.items.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </p>
        </div>
      ))}
      <div className="grid grid-cols-1 items-baseline gap-1.5 border-b border-g-line py-4 sm:grid-cols-[140px_1fr] sm:gap-5">
        <h3 className="text-[14px] font-medium text-g-muted">Certified</h3>
        <p className="text-[15.5px] text-g-text2">{resumeData.certifications.join(', ')}</p>
      </div>
    </div>
  </Turn>
);

export default SkillsView;
