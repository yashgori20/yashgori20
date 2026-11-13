import React from 'react';
import HomeView from './HomeView';
import ExperienceView from './ExperienceView';
import JourneyView from './JourneyView';
import ProjectsView from './ProjectsView';
import CaseStudiesView from './CaseStudiesView';
import SkillsView from './SkillsView';
import BackgroundView from './BackgroundView';
import ContactView from './ContactView';
import { View } from '@/types';

interface ContentViewProps {
  activeView: View;
  setActiveView: (view: View) => void;
  chatInterfaceProps: unknown;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

// The portfolio as one conversation: opening message, then one turn per question.
const ContentView = ({ activeView, setActiveView }: ContentViewProps) => {
  const props = { activeView, setActiveView };
  return (
    <div className="w-full px-5 md:px-12">
      <div className="mx-auto max-w-[780px]">
        <HomeView {...props} />
        <ExperienceView {...props} />
        <JourneyView {...props} />
        <ProjectsView {...props} />
        <CaseStudiesView {...props} />
        <SkillsView {...props} />
        <BackgroundView {...props} />
        <ContactView {...props} />
        {/* room for the floating composer */}
        <div className="h-40" />
      </div>
    </div>
  );
};

export default ContentView;
