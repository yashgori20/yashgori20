
import React, { useRef } from 'react';
import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import ProfileCard from '@/components/ProfileCard';
import { View } from '@/types';
import SidebarContent from '@/components/SidebarContent';
import ChatInputBar from '@/components/ChatInputBar';
import PageContainer from '@/components/PageContainer';
import { usePageNavigation } from '@/hooks/usePageNavigation';
import { useMobileGestures } from '@/hooks/useMobileGestures';
import { useProfileCard } from '@/hooks/useProfileCard';
import { useSidebarState } from '@/hooks/useSidebarState';
import { useChatApi } from '@/hooks/useChatApi';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Index = () => {
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const {
    activeView,
    setActiveView: _setActiveView,
    pageIndex,
    changePage,
    onAnimationComplete,
    isAnimating,
    views,
    windowHeight
  } = usePageNavigation();

  const {
    handleDragEnd,
    handleWheel,
    isMobile
  } = useMobileGestures({
    pageIndex,
    changePage,
    windowHeight,
    viewContainerRefs,
    isAnimating
  });

  const {
    profileCardOpen,
    setProfileCardOpen,
    profileCardPosition,
    handleProfileClick
  } = useProfileCard();

  const {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebarCollapse,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useSidebarState();

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSend,
    handleSuggestionClick,
    askApi,
    getGreeting,
    scrollAreaRef,
    glowIntensity,
    triggerScrollHint
  } = useChatApi();

  const setActiveView = (view: View) => {
    _setActiveView(view);
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const scrollToContact = () => {
    setActiveView('contact');
    setTimeout(() => {
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
      if (messageInput) messageInput.focus();
    }, 400);
  };

  const finalIsCollapsed = isMobile || isSidebarCollapsed;

  const chatInterfaceProps = { 
    messages, 
    input, 
    setInput, 
    handleSend, 
    handleSuggestionClick, 
    askApi, 
    getGreeting, 
    scrollAreaRef, 
    setActiveView, 
    glowIntensity, 
    triggerScrollHint, 
    setMessages 
  };

  return (
    <div className="h-svh w-screen bg-background text-foreground overflow-hidden">
      <ProfileCard 
        isOpen={profileCardOpen} 
        onClose={() => setProfileCardOpen(false)} 
        position={profileCardPosition} 
      />
      
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
          onClick={toggleMobileSidebar}
        />
      )}

      <SidebarContent 
        {...{ activeView, setMessages, scrollToContact }}
        setActiveView={setActiveView} 
        isCollapsed={finalIsCollapsed}
        isMobile={isMobile}
        toggleCollapse={toggleSidebarCollapse} 
        isMobileSidebarOpen={isMobileSidebarOpen}
      />
      
      <main className={cn(
        "flex flex-col bg-background relative h-full transition-[margin-left] duration-300",
        isMobile ? "ml-0" : (finalIsCollapsed ? "ml-[calc(45px+1rem)]" : "ml-[17rem]")
      )}>
          {isMobile && (
            <div className="absolute top-4 left-4 z-10">
              <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          )}
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
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

          <PageContainer
            views={views}
            pageIndex={pageIndex}
            windowHeight={windowHeight}
            onAnimationComplete={onAnimationComplete}
            handleWheel={handleWheel}
            handleDragEnd={handleDragEnd}
            isMobile={isMobile}
            chatInterfaceProps={chatInterfaceProps}
            viewContainerRefs={viewContainerRefs}
          />

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
