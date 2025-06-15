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
  const [pageIndex, setPageIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
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
    const clampedIndex = Math.max(0, Math.min(newIndex, views.length - 1));
    if (clampedIndex !== pageIndex) {
      isAnimating.current = true;
      setPageIndex(clampedIndex);
      setActiveView(views[clampedIndex]);
    }
  }, [pageIndex, windowHeight]);

  useEffect(() => {
    const newIndex = views.indexOf(activeView);
    if (newIndex !== -1 && newIndex !== pageIndex) {
      isAnimating.current = true;
      setPageIndex(newIndex);
    }
  }, [activeView, pageIndex]);

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
    setTimeout(() => {
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
      if (messageInput) messageInput.focus();
    }, 400); // Increased delay for animation
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
    
    let swipeThreshold = windowHeight / 4;
    // Increase threshold for swipe from home to about
    if (pageIndex === 0 && offset.y < 0) {
        swipeThreshold = windowHeight / 2.5; 
    }

    const velocityThreshold = 300;

    if (Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold) {
      if (offset.y < 0) {
        changePage(pageIndex + 1);
      } else {
        changePage(pageIndex - 1);
      }
    }
  };
  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isAnimating.current) return;

    const viewContainer = (e.currentTarget.firstChild as HTMLElement)?.children[pageIndex] as HTMLElement;
    if (!viewContainer) return;

    if (pageIndex > 0) {
      // For content pages, check scroll position
      const { scrollTop, scrollHeight, clientHeight } = viewContainer;
      const isAtTop = scrollTop < 1;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;
      const scrollThreshold = 10;

      if (e.deltaY > scrollThreshold && isAtBottom) {
        changePage(pageIndex + 1);
      } else if (e.deltaY < -scrollThreshold && isAtTop) {
        changePage(pageIndex - 1);
      }
    } else {
      // For the initial chat screen, use a simple threshold
      const scrollDownThreshold = 100;
      if (e.deltaY > scrollDownThreshold) {
        changePage(pageIndex + 1);
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
            onWheel={(pageIndex > 0 || messages.length === 0) ? handleWheel : undefined}
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
                {views.map((viewName) => {
                  const PageComponent = PageComponents[viewName];
                  return (
                    <div key={viewName} className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ height: windowHeight }}>
                      {viewName === 'chat' ? (
                        <ChatInterface {...chatInterfaceProps} />
                      ) : (
                        <PageComponent />
                      )}
                    </div>
                  );
                })}
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
