
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { User, Briefcase, Code, BrainCircuit, Mail, Sparkles, Download, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import SidebarButton from './SidebarButton';
import HuggingFaceLogo from './HuggingFaceLogo';
import { View, Message } from '@/types';

type SidebarContentProps = {
    activeView: View;
    setActiveView: (view: View) => void;
    setSidebarOpen: (open: boolean) => void;
    setMessages: (messages: Message[]) => void;
    scrollToContact: () => void;
};

const SidebarContent = ({ activeView, setActiveView, setSidebarOpen, setMessages, scrollToContact }: SidebarContentProps) => (
    <div className={cn(
      "flex flex-col h-full bg-card text-foreground transition-all duration-300 w-72"
    )}>
      <div className={cn("p-4 flex flex-col")}>
        <div className="mb-4 text-center">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src={resumeData.profileImage} 
              alt="Yash Gori" 
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {resumeData.name}
              </h2>
              <div className="w-full h-px bg-border my-1"></div>
              <p className="text-sm text-muted-foreground">AI Developer & Engineer</p>
            </div>
          </div>
        </div>
        <div className={cn("flex items-center w-full")}>
          <Button 
            variant={activeView === 'chat' ? "secondary" : "ghost"}
            className="justify-start transition-all flex-1"
            onClick={() => { 
              if (activeView === 'chat') {
                setMessages([]);
              } else {
                setActiveView('chat');
              }
              setSidebarOpen(false); 
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" /> 
            Home
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          <SidebarButton icon={User} label="About" view="about" {...{ activeView, setActiveView, setSidebarOpen }}/>
          <SidebarButton icon={Briefcase} label="Experience" view="experience" {...{ activeView, setActiveView, setSidebarOpen }}/>
          <SidebarButton icon={Code} label="Projects" view="projects" {...{ activeView, setActiveView, setSidebarOpen }}/>
          <SidebarButton icon={BrainCircuit} label="Skills" view="skills" {...{ activeView, setActiveView, setSidebarOpen }}/>
          <SidebarButton icon={Mail} label="Contact" view="contact" {...{ activeView, setActiveView, setSidebarOpen }}/>
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t border-border">
          <>
            <div className="flex justify-center space-x-4 mb-4">
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Github className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <HuggingFaceLogo className="h-6 w-6 hover:text-primary transition-colors" />
              </a>
              <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
            </div>
            <div className="space-y-3">
              <a href="/Yash-Gori-Resume.pdf" download="Yash-Gori-Resume.pdf">
                <Button variant="outline" className="w-full bg-secondary/30 border-secondary hover:bg-secondary/50">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
              <Button variant="outline" className="w-full bg-secondary/30 border-secondary hover:bg-secondary/50" onClick={scrollToContact}>
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </div>
          </>
      </div>
    </div>
  );

export default SidebarContent;
