import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import ProfileCard from '@/components/ProfileCard';
import { View, Message } from '@/types';
import SidebarContent from '@/components/SidebarContent';
import ChatInterface from '@/components/ChatInterface';
import AboutView from '@/components/views/AboutView';
import ExperienceView from '@/components/views/ExperienceView';
import ProjectsView from '@/components/views/ProjectsView';
import SkillsView from '@/components/views/SkillsView';
import ContactView from '@/components/views/ContactView';
import ChatInputBar from '@/components/ChatInputBar';
import { useSound } from '@/hooks/useSound';
import EdgeNavigation from '@/components/EdgeNavigation';
import DesktopNavigation from '@/components/DesktopNavigation';

const Index = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const { playPop } = useSound();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning!";
    if (hour >= 12 && hour < 18) return "Good Afternoon!";
    if (hour >= 18 && hour < 22) return "Good Evening!";
    return "Good Night!";
  };

  const askApi = useMutation({
    mutationFn: async (userInput: string): Promise<string> => {
      try {
        const response = await fetch('https://yashgori20-yashgori.hf.space/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "question": userInput }),
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.answer || "I'm not sure how to answer that. Try asking about Yash's skills or projects.";
      } catch (error) {
        console.error("API call failed:", error);
        return "Sorry, something went wrong while connecting to my brain. Please try again later.";
      }
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
      playPop();
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setActiveView('chat');
      const newMessages: Message[] = [...messages, { role: 'user', content: input }];
      setMessages(newMessages);
      askApi.mutate(input);
      setInput('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setActiveView('chat');
    const newMessages: Message[] = [...messages, { role: 'user', content: suggestion }];
    setMessages(newMessages);
    askApi.mutate(suggestion);
    setInput('');
  };

  const scrollToContact = () => {
    setActiveView('contact');
    // Small delay to ensure the view has switched before focusing
    setTimeout(() => {
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.focus();
      }
    }, 100);
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setProfileCardPosition({
      x: rect.left,
      y: rect.bottom
    });
    setProfileCardOpen(!profileCardOpen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (activeView !== 'chat') return;
        
        const target = e.target as HTMLElement;
        const isTypingInInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

        if (!isTypingInInput && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
            const chatInput = document.querySelector('input[placeholder="Ask me anything about Yash Gori..."]') as HTMLInputElement;
            if (chatInput) {
                chatInput.focus();
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [activeView]);

  useEffect(() => {
    const container = mainContainerRef.current;
    if (!container || activeView === 'chat') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTypingInInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (isTypingInInput) return;

      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        container.scrollBy({ top: container.clientHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        container.scrollBy({ top: -container.clientHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'chat': return <ChatInterface {...{ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef }} />;
      case 'about': return <AboutView />;
      case 'experience': return <ExperienceView />;
      case 'projects': return <ProjectsView />;
      case 'skills': return <SkillsView />;
      case 'contact': return <ContactView />;
      default: return <ChatInterface {...{ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef }} />;
    }
  };

  return (
    <div className="flex h-svh w-screen bg-background text-foreground">
      <ProfileCard 
        isOpen={profileCardOpen} 
        onClose={() => setProfileCardOpen(false)} 
        position={profileCardPosition} 
      />
      
      <EdgeNavigation activeView={activeView} setActiveView={setActiveView} />
      <DesktopNavigation activeView={activeView} setActiveView={setActiveView} />

      <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10">
                      <Menu className="h-6 w-6" />
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none">
                  <div className="w-72 h-full"><SidebarContent {...{ activeView, setActiveView, setSidebarOpen, setMessages, scrollToContact }} /></div>
              </SheetContent>
          </Sheet>
      </div>
      
      <main className="flex-1 flex flex-col bg-background relative">
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={handleProfileClick}
            >
              <img 
                src={resumeData.profileImage} 
                alt="Yash Gori" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            ref={mainContainerRef}
            className={cn(
              "flex-1 flex flex-col",
              activeView === 'chat'
                ? 'overflow-hidden'
                : 'overflow-y-auto snap-y snap-mandatory'
            )}
          >
            {renderView()}
          </div>

        {activeView === 'chat' && messages.length > 0 && (
          <div className="p-4 border-t border-border bg-background">
            <ChatInputBar
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isPending={askApi.isPending}
            />
            <p className="text-xs text-center text-muted-foreground mt-2">
                YashGori-GPT can make mistakes. Consider checking important information.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
