import React, { useState, useRef, useEffect } from 'react';
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
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';

const views: View[] = ['chat', 'about', 'experience', 'projects', 'skills', 'contact'];

const Index = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const { playPop } = useSound();
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const y = useMotionValue(0);
  const [isPageDraggingEnabled, setPageDraggingEnabled] = useState(true);

  useEffect(() => {
    setActiveView(views[page]);
  }, [page]);

  useEffect(() => {
    const newPage = views.indexOf(activeView);
    if (newPage !== -1 && page !== newPage) {
      setPage(newPage);
    }
  }, [activeView]);

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

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        const isTypingInInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

        if (activeView === 'chat') {
            if (!isTypingInInput && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
                const chatInput = document.querySelector('input[placeholder="Ask me anything about Yash Gori..."]') as HTMLInputElement;
                if (chatInput) {
                    chatInput.focus();
                }
            }
        }

        if (isTypingInInput) return;

        let newPage = page;
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            newPage = Math.min(page + 1, views.length - 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            newPage = Math.max(page - 1, 0);
        }
      
        if (newPage !== page) {
            setPage(newPage);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeView, page]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const containerHeight = mainContainerRef.current?.offsetHeight || window.innerHeight;
    const dragVelocity = info.velocity.y;
    const dragOffset = info.offset.y;

    if (Math.abs(dragVelocity) > 200 || Math.abs(dragOffset) > containerHeight * 0.3) {
      const direction = dragVelocity < 0 ? 1 : -1;
      const newPage = Math.min(Math.max(page + direction, 0), views.length - 1);
      setPage(newPage);
    } else {
      animate(y, -page * containerHeight, { type: 'spring', bounce: 0.2, duration: 0.5 });
    }
  };
  
  const handlePanStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const target = event.target as HTMLElement;
    if (activeView === 'chat' && scrollAreaRef.current && scrollAreaRef.current.contains(target)) {
      if (scrollAreaRef.current.scrollHeight > scrollAreaRef.current.clientHeight) {
        setPageDraggingEnabled(false);
        return;
      }
    }
    setPageDraggingEnabled(true);
  };

  const handlePanEnd = () => {
    if (!isPageDraggingEnabled) {
      const containerHeight = mainContainerRef.current?.offsetHeight || window.innerHeight;
      animate(y, -page * containerHeight, { type: 'spring', bounce: 0.2, duration: 0.5 });
      setPageDraggingEnabled(true);
    }
  };

  useEffect(() => {
    const containerHeight = mainContainerRef.current?.offsetHeight || window.innerHeight;
    const controls = animate(y, -page * containerHeight, {
        type: 'spring',
        stiffness: 100,
        damping: 20,
    });
    return controls.stop;
  }, [page]);

  const renderViewComponent = (view: View) => {
    switch (view) {
      case 'chat': return <ChatInterface {...{ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView }} />;
      case 'about': return <AboutView />;
      case 'experience': return <ExperienceView />;
      case 'projects': return <ProjectsView />;
      case 'skills': return <SkillsView />;
      case 'contact': return <ContactView />;
      default: return null;
    }
  };

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
            className="flex-1 flex flex-col overflow-hidden"
          >
            <motion.div
              className="w-full"
              drag={isPageDraggingEnabled ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onPanStart={handlePanStart}
              onPanEnd={handlePanEnd}
              onDragEnd={handleDragEnd}
              style={{ y }}
            >
              {views.map((view) => (
                <div key={view} className="h-screen w-full flex-shrink-0 flex flex-col">
                  {renderViewComponent(view)}
                </div>
              ))}
            </motion.div>
          </div>

        {activeView === 'chat' && messages.length > 0 && (
          <div className="absolute bottom-0 w-full p-4 border-t border-border bg-background">
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
