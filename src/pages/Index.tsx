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
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

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
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const [showPortfolioPrompt, setShowPortfolioPrompt] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { playPop } = useSound();
  const isMobile = useIsMobile();
  const { height: windowHeight } = useWindowSize();
  const isAnimating = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const promptTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isMobile) {
      setSidebarVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      return;
    }

    const handleScroll = () => {
      setSidebarVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setSidebarVisible(false);
      }, 1500); // Hide after 1.5s of inactivity
    };

    const containers = viewContainerRefs.current.filter(Boolean);
    containers.forEach(container => container?.addEventListener('scroll', handleScroll));

    // Initially hide the sidebar on mobile after a short delay
    const initialTimeout = window.setTimeout(() => setSidebarVisible(false), 2000);

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      clearTimeout(initialTimeout);
      containers.forEach(container => container?.removeEventListener('scroll', handleScroll));
    };
  }, [isMobile, pageIndex]);

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

  useEffect(() => {
    viewContainerRefs.current = viewContainerRefs.current.slice(0, views.length);
  }, []);

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
    
    if (pageIndex === 0) {
      // For chat view, show prompt on upward swipe. A small swipe is enough.
      if (offset.y < -50) {
        setShowPortfolioPrompt(true);
        if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
        promptTimeoutRef.current = window.setTimeout(() => setShowPortfolioPrompt(false), 4000);
      }
      return;
    }
    
    const swipeThreshold = windowHeight / 4;
    const velocityThreshold = 300;

    const isSignificantSwipe = Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold;

    if (!isSignificantSwipe) {
      return;
    }

    // drag is only enabled for pageIndex > 0
    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = viewContainer;
    const isAtTop = scrollTop <= 1;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;
    
    // Swipe up (finger moves up) to next page
    if (offset.y < 0 && isAtBottom) {
      changePage(pageIndex + 1);
    } 
    // Swipe down (finger moves down) to previous page
    else if (offset.y > 0 && isAtTop) {
      changePage(pageIndex - 1);
    }
  };
  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isAnimating.current) return;

    if (pageIndex === 0) {
      // For chat view, show prompt on scroll down
      if (e.deltaY > 10) {
        setShowPortfolioPrompt(true);
        if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
        promptTimeoutRef.current = window.setTimeout(() => setShowPortfolioPrompt(false), 4000);
      }
      return;
    }

    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    // This handler is only attached for pageIndex > 0
    const { scrollTop, scrollHeight, clientHeight } = viewContainer;
    const isAtTop = scrollTop <= 1;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;
    const scrollThreshold = 10;

    if (e.deltaY > scrollThreshold && isAtBottom) {
      changePage(pageIndex + 1);
    } else if (e.deltaY < -scrollThreshold && isAtTop) {
      changePage(pageIndex - 1);
    }
  };
  
  const chatInterfaceProps = { messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView };
  const finalIsCollapsed = isMobile || isSidebarCollapsed;

  return (
    <div className="h-svh w-screen bg-background text-foreground overflow-hidden">
      <ProfileCard 
        isOpen={profileCardOpen} 
        onClose={() => setProfileCardOpen(false)} 
        position={profileCardPosition} 
      />
      
      <div className={cn(
        "transition-opacity duration-300",
        isMobile && !isSidebarVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <SidebarContent 
          {...{ activeView, setActiveView, setMessages, scrollToContact }} 
          isCollapsed={finalIsCollapsed}
          isMobile={isMobile}
          toggleCollapse={toggleSidebarCollapse} 
        />
      </div>
      
      <main className={cn(
        "flex flex-col bg-background relative h-full transition-[margin-left] duration-300",
        isMobile ? "ml-0" : (finalIsCollapsed ? "ml-[calc(45px+1rem)]" : "ml-[17rem]")
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
            className="flex-1 overflow-hidden relative"
            onWheel={handleWheel}
          >
            {windowHeight > 0 && (
              <motion.div
                className="h-full w-full"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                animate={{ y: -pageIndex * windowHeight }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                onAnimationComplete={onAnimationComplete}
                onDragEnd={handleDragEnd}
              >
                {views.map((viewName, i) => {
                  const PageComponent = PageComponents[viewName];
                  return (
                    <div 
                      key={viewName} 
                      ref={el => (viewContainerRefs.current[i] = el)}
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar" 
                      style={{ height: windowHeight }}
                    >
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
             <AnimatePresence>
              {showPortfolioPrompt && (
                <motion.div
                  className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="secondary"
                    className="shadow-lg"
                    onClick={() => {
                      changePage(1);
                      setShowPortfolioPrompt(false);
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Click to switch to portfolio mode
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
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
