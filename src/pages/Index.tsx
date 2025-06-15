import React, { useRef } from 'react';
import { resumeData } from '@/data/resume';
import { cn } from '@/lib/utils';
import ProfileCard from '@/components/ProfileCard';
import { View, Message } from '@/types';
import SidebarContent from '@/components/SidebarContent';
import ChatInputBar from '@/components/ChatInputBar';
import PageContainer from '@/components/PageContainer';
import { usePageNavigation } from '@/hooks/usePageNavigation';
import { useMobileGestures } from '@/hooks/useMobileGestures';
import { useProfileCard } from '@/hooks/useProfileCard';
import { useSidebarState } from '@/hooks/useSidebarState';
import { useChatApi } from '@/hooks/useChatApi';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const {
    activeView,
    setActiveView,
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
    toggleSidebarCollapse,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
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

  const handleMobileNavigation = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const wrappedSetActiveView = (view: View) => {
    setActiveView(view);
    handleMobileNavigation();
  };

  const scrollToContact = () => {
    setActiveView('contact');
    setTimeout(() => {
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
      if (messageInput) messageInput.focus();
    }, 400);
  };

  const finalIsCollapsed = isSidebarCollapsed;

  const chatInterfaceProps = { 
    messages, 
    input, 
    setInput, 
    handleSend, 
    handleSuggestionClick, 
    askApi, 
    getGreeting, 
    scrollAreaRef, 
    setActiveView: isMobile ? wrappedSetActiveView : setActiveView, 
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
      
      {isMobile ? (
        <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-30">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[250px] bg-secondary text-foreground">
            <SidebarContent 
              activeView={activeView}
              setActiveView={wrappedSetActiveView}
              setMessages={setMessages}
              scrollToContact={() => {
                scrollToContact();
                handleMobileNavigation();
              }}
              isCollapsed={false}
              isMobile={true}
              toggleCollapse={() => {}}
            />
          </SheetContent>
        </Sheet>
      ) : (
        <SidebarContent 
          {...{ activeView, setActiveView, setMessages, scrollToContact }} 
          isCollapsed={finalIsCollapsed}
          isMobile={isMobile}
          toggleCollapse={toggleSidebarCollapse} 
        />
      )}
      
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
