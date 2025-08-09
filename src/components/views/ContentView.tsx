import React from 'react';
import AboutView from './AboutView';
import ExperienceView from './ExperienceView';
import ProjectsView from './ProjectsView';
import SkillsView from './SkillsView';
import ContactView from './ContactView';
import { View } from '@/types';

type ContentViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ContentView = ({ activeView, setActiveView }: ContentViewProps) => {
  return (
    <div className="w-full">
      <AboutView activeView={activeView} setActiveView={setActiveView} />
      <ExperienceView activeView={activeView} setActiveView={setActiveView} />
      <ProjectsView activeView={activeView} setActiveView={setActiveView} />
      <SkillsView activeView={activeView} setActiveView={setActiveView} />
      <ContactView activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default ContentView;