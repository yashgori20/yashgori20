import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import HomeView from './HomeView';
import AboutView from './AboutView';
import ExperienceView from './ExperienceView';
import ProjectsView from './ProjectsView';
import SkillsView from './SkillsView';
import ContactView from './ContactView';
import { View } from '@/types';

interface ChatInterfaceProps {
  messages: any[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  askApi: any;
  getGreeting: () => string;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  setActiveView: (view: View) => void;
  glowIntensity: number;
  triggerScrollHint: (deltaY: number) => void;
  setMessages: (messages: any[]) => void;
  showDownloadButton?: boolean;
  onDownloadResume?: () => void;
}

interface ContentViewProps {
  activeView: View;
  setActiveView: (view: View) => void;
  chatInterfaceProps: ChatInterfaceProps;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

const ContentView = ({ activeView, setActiveView, chatInterfaceProps, currentSection = 'home' }: ContentViewProps) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Home Section */}
      <section id="home" className="min-h-screen">
        <HomeView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen">
        <AboutView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="min-h-screen">
        <ExperienceView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen">
        <ProjectsView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen">
        <SkillsView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen">
        <ContactView activeView={activeView} setActiveView={setActiveView} />
      </section>
      
      {/* Bottom padding */}
      <div className="h-[100px]"></div>
    </div>
  );
};

export default ContentView;