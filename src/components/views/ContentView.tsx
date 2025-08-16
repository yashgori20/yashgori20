import React from 'react';
import ChatInterface from '@/components/ChatInterface';
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

type ContentViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
  chatInterfaceProps: ChatInterfaceProps;
};

const ContentView = ({ activeView, setActiveView, chatInterfaceProps }: ContentViewProps) => {
  return (
    <div className="w-full">
      <section id="chat" className="min-h-screen">
        <ChatInterface {...chatInterfaceProps} />
      </section>
      <AboutView activeView={activeView} setActiveView={setActiveView} />
      <ExperienceView activeView={activeView} setActiveView={setActiveView} />
      <ProjectsView activeView={activeView} setActiveView={setActiveView} />
      <SkillsView activeView={activeView} setActiveView={setActiveView} />
      <ContactView activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default ContentView;