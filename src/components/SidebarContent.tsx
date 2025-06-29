
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { User, Briefcase, Code, BrainCircuit, Mail, Sparkles, Download, Github, Linkedin, Instagram, Twitter, ChevronLeft } from 'lucide-react';
import SidebarButton from './SidebarButton';
import HuggingFaceLogo from './HuggingFaceLogo';
import { View, Message } from '@/types';

type SidebarContentProps = {
    activeView: View;
    setActiveView: (view: View) => void;
    setMessages: (messages: Message[]) => void;
    scrollToContact: () => void;
    isCollapsed: boolean;
    isMobile: boolean;
    toggleCollapse: () => void;
    isMobileSidebarOpen?: boolean;
};

const SidebarContent = ({ activeView, setActiveView, setMessages, scrollToContact, isCollapsed, isMobile, toggleCollapse, isMobileSidebarOpen }: SidebarContentProps) => (
    <div className={cn(
      "fixed top-1/2 -translate-y-1/2 left-4 flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 text-foreground transition-all duration-300 z-30 rounded-2xl shadow-lg",
      isCollapsed ? "w-[45px]" : "w-64",
      isMobile && (isMobileSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[calc(100%+2rem)] pointer-events-none")
    )}>
      {!isMobile && (
        <div className={cn("p-4 pt-6 flex flex-col gap-4", isCollapsed ? "px-0" : "px-4")}>
          {/* Collapse Toggle Button */}
          <div className={cn(
            "flex w-full",
            !isCollapsed ? "justify-end" : "justify-center"
          )}>
            <Button 
              onClick={toggleCollapse} 
              variant="ghost" 
              size="icon" 
              className={cn("h-9", !isCollapsed ? "w-7" : "w-full", isCollapsed && "rounded-none")}
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            </Button>
          </div>
          {!isCollapsed && (
            <div className="text-center">
              <div className={cn("flex items-center gap-3 mb-2 h-10")}>
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
          )}
        </div>
      )}
      
      <ScrollArea className="flex-grow">
        <div className={cn("space-y-2 py-2", isCollapsed ? "px-0" : "px-4", isMobile && "pt-4 pb-4")}>
           <Button 
              variant={activeView === 'chat' ? "secondary" : "ghost"}
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "w-full transition-all duration-200 justify-start",
                isCollapsed && "justify-center rounded-none"
              )}
              onClick={() => { 
                if (activeView === 'chat') {
                  setMessages([]);
                } else {
                  setActiveView('chat');
                }
              }}
              title="Home"
            >
              <Sparkles className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>Home</span>}
            </Button>
          <SidebarButton icon={User} label="About" view="about" {...{ activeView, setActiveView, isCollapsed }}/>
          <SidebarButton icon={Briefcase} label="Experience" view="experience" {...{ activeView, setActiveView, isCollapsed }}/>
          <SidebarButton icon={Code} label="Projects" view="projects" {...{ activeView, setActiveView, isCollapsed }}/>
          <SidebarButton icon={BrainCircuit} label="Skills" view="skills" {...{ activeView, setActiveView, isCollapsed }}/>
          <SidebarButton icon={Mail} label="Contact" view="contact" {...{ activeView, setActiveView, isCollapsed }}/>
        </div>
      </ScrollArea>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center space-x-4">
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
            </div>
        </div>
      )}
    </div>
  );

export default SidebarContent;
