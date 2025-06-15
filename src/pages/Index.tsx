
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const views: View[] = ['chat', 'about', 'experience', 'projects', 'skills', 'contact'];

const PageComponents: Record<View, React.ComponentType<any>> = {
  chat: ChatInterface,
  about: AboutView,
  experience: ExperienceView,
  projects: ProjectsView,
  skills: SkillsView,
  contact: ContactView,
};

const Index = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [pageIndex, setPageIndex] = useState(0); // 0 for chat, 1 for content
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { playPop } = useSound();
  const isMobile = useIsMobile();
  const { height: windowHeight } = useWindowSize();
  const isAnimating = useRef(false);

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

  const changePage = useCallback((newIndex: number) => {
    if (isAnimating.current || !windowHeight) return;
    const clampedIndex = Math.max(0, Math.min(newIndex, 1)); // Only two pages: chat and content
    if (clampedIndex !== pageIndex) {
      isAnimating.current = true;
      setPageIndex(clampedIndex);
    }
  }, [pageIndex, windowHeight]);

  useEffect(() => {
    const newViewIndex = views.indexOf(activeView);
    if (newViewIndex === -1) return;

    if (newViewIndex === 0) { // Chat view
      if (pageIndex !== 0) changePage(0);
    } else { // Content views
      const switchAndScroll = () => {
        const sectionEl = document.getElementById(activeView);
        sectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (activeView === 'contact') {
            setTimeout(() => {
                const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
                if (messageInput) messageInput.focus();
            }, 500); // Delay for scroll and focus
        }
      };

      if (pageIndex !== 1) {
        changePage(1);
        setTimeout(switchAndScroll, 400); // Delay to allow page transition animation
      } else {
        switchAndScroll();
      }
    }
  }, [activeView, pageIndex, changePage]);

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
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setProfileCardPosition({
      x: rect.left,
      y: rect.bottom
    });
    setProfileCardOpen(!profileCardOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };
  
  const onAnimationComplete = () => {
    isAnimating.current = false;
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    // Swipe up from chat to content
    if (pageIndex === 0 && (offset.y < -windowHeight / 2.5 || velocity.y < -300)) {
        changePage(1);
        setActiveView('about');
    } 
    // Swipe down from top of content to chat
    else if (pageIndex === 1 && contentRef.current?.scrollTop === 0 && (offset.y > windowHeight / 4 || velocity.y > 300)) {
        changePage(0);
        setActiveView('chat');
    }
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current) return;

    // Scroll down from chat page to content
    if (pageIndex === 0) {
      if (e.deltaY > 100) {
        changePage(1);
        setActiveView('about');
      }
    } 
    // Scroll up from top of content page to chat
    else if (pageIndex === 1) {
      if (e.deltaY < -50 && contentRef.current?.scrollTop === 0) {
        changePage(0);
        setActiveView('chat');
      }
    }
  };
  
  const chatInterfaceProps = { messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView };

  return (
    <div className="h-svh w-screen bg-background text-foreground overflow-hidden">
      <ProfileCard 
        isOpen={profileCardOpen} 
        onClose={() => setProfileCardOpen(false)} 
        position={profileCardPosition} 
      />
      
      <SidebarContent 
        {...{ activeView, setActiveView, setMessages, scrollToContact }} 
        isCollapsed={isSidebarCollapsed} 
        toggleCollapse={toggleSidebarCollapse} 
      />
      
      <main className={cn(
        "flex flex-col bg-background relative h-full transition-[margin-left] duration-300",
        !isSidebarCollapsed && !isMobile ? "ml-64" : "ml-[45px]"
      )}>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
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
            className="flex-1 overflow-hidden"
            onWheel={handleWheel}
          >
            {windowHeight > 0 && (
              <motion.div
                className="h-full w-full"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={pageIndex === 0 ? 0.2 : 0}
                onDragEnd={handleDragEnd}
                animate={{ y: -pageIndex * windowHeight }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                onAnimationComplete={onAnimationComplete}
              >
                <div key="chat" className="w-full h-full" style={{ height: windowHeight }}>
                    <ChatInterface {...chatInterfaceProps} />
                </div>
                
                <div key="content" ref={contentRef} className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar isolate" style={{ height: windowHeight }}>
                  {views.slice(1).map((viewName) => {
                    const PageComponent = PageComponents[viewName];
                    return (
                      <div id={viewName} key={viewName}>
                        <PageComponent />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
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
