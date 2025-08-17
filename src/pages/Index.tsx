
import React, { useRef, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  Plus,
  Search,
  MessageSquare,
  User,
  Briefcase,
  Code,
  BrainCircuit,
  Mail,
  ChevronDown,
  Settings,
  HelpCircle,
  Palette,
  Database,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import XLogo from '@/components/XLogo';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';

const Index = () => {
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);

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
    triggerScrollHint,
    sessionId,
    smartSuggestions,
    richContent,
    userAnalysis,
    rateLimit,
    apiResponseData
  } = useChatApi();

  // Portfolio sections as "chats" - matching Demo1 structure
  const portfolioChats = [
    { id: 'about', title: 'About Me', icon: User, description: 'Learn about my background' },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, description: 'My professional journey' },
    { id: 'projects', title: 'Projects', icon: Code, description: 'Things I\'ve built' },
    { id: 'skills', title: 'Skills & Expertise', icon: BrainCircuit, description: 'My technical abilities' },
    { id: 'contact', title: 'Contact Me', icon: Mail, description: 'Get in touch' },
  ];

  const setActiveView = (view: View) => {
    const targetViewIndex = views.indexOf(view);
    if (targetViewIndex !== -1) {
      const viewContainer = viewContainerRefs.current[targetViewIndex];
      if (viewContainer) {
        viewContainer.scrollTo({ top: 0, behavior: 'auto' });
      }
    }

    _setActiveView(view);
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleChatClick = (chatId: string) => {
    // Navigate to the corresponding section
    const sectionMap: { [key: string]: View } = {
      'about': 'content',
      'experience': 'content',
      'projects': 'content',
      'skills': 'content',
      'contact': 'content'
    };

    const targetView = sectionMap[chatId];
    if (targetView) {
      setActiveView(targetView);
      // Scroll to section after a brief delay to ensure view is loaded
      setTimeout(() => {
        document.getElementById(chatId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    setMessages,
    showDownloadButton: isMobile,
    onDownloadResume: handleDownloadResume,
    sessionId,
    smartSuggestions,
    richContent,
    userAnalysis,
    rateLimit,
    apiResponseData
  };

  return (
    <div className="h-screen bg-[#212121] text-white flex">
      <ProfileCard
        isOpen={profileCardOpen}
        onClose={() => setProfileCardOpen(false)}
        position={profileCardPosition}
      />

      {/* Demo1-style Sidebar */}
      <div className={cn(
        "bg-[#171717] border-r border-gray-700 flex flex-col transition-all duration-300",
        isMobile ? (isMobileSidebarOpen ? "fixed inset-y-0 left-0 w-64 z-40" : "hidden") : "w-64"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <Button
            className="w-full justify-start bg-transparent border border-gray-600 hover:bg-gray-700 text-white"
            onClick={() => {
              setMessages([]);
              setActiveView('chat');
              if (isMobile) closeMobileSidebar();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New chat
          </Button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search chats"
              className="pl-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation Tools */}
        <div className="px-4 mb-4">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Portfolio</div>
          <div className="space-y-1">
            {portfolioChats.map((chat) => {
              const Icon = chat.icon;
              return (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {chat.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Chats */}
        <div className="px-4 mb-4 flex-1">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Recent</div>
          <div className="space-y-1">
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => {
                setActiveView('chat');
                if (isMobile) closeMobileSidebar();
              }}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <div className="text-sm text-white truncate">AI Product Strategy Discussion</div>
              </div>
            </button>
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => {
                setActiveView('chat');
                if (isMobile) closeMobileSidebar();
              }}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <div className="text-sm text-white truncate">Technical Skills Overview</div>
              </div>
            </button>
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => {
                setActiveView('chat');
                if (isMobile) closeMobileSidebar();
              }}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <div className="text-sm text-white truncate">Project Collaboration Ideas</div>
              </div>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={resumeData.profileImage} alt="Yash Gori" />
                <AvatarFallback>YG</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Yash Gori</div>
                <div className="text-xs text-gray-400">AI Product Lead</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#2a2a2a] border border-gray-600 rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-600">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={resumeData.profileImage} alt="Yash Gori" />
                      <AvatarFallback>YG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Yash Gori</div>
                      <div className="text-sm text-gray-400">AI Product Lead</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <XLogo className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <HuggingFaceLogo className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => setShowPersonalityModal(true)}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="text-sm">Change Chatbot Personality</span>
                  </button>
                  <button
                    onClick={() => setShowMemoryModal(true)}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left"
                  >
                    <Database className="h-4 w-4" />
                    <span className="text-sm">Memory & Preferences</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">Help & Support</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {isMobile && isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
            onClick={toggleMobileSidebar}
          />
        )}

        {/* Header */}
        <div className="border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                  <Menu className="h-6 w-6" />
                </Button>
              )}
              <h1 className="text-xl font-semibold">YashBot 3000 🚀</h1>
              <Badge variant="secondary" className="bg-purple-600 text-white">
                Your AI Product Buddy
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                Upgrade your plan
              </Button>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform touch-manipulation"
                onClick={handleProfileClick}
                style={{ touchAction: 'manipulation' }}
              >
                <img
                  src={resumeData.profileImage}
                  alt="Yash Gori"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {activeView === 'chat' && messages.length > 0 && (
          <div className="p-4 border-t border-gray-700 bg-[#171717]">
            <ChatInputBar
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isPending={askApi.isPending}
            />
            <div className="flex flex-col items-center gap-2 mt-3">
              <p className="text-xs text-center text-gray-400">
                YashGori-GPT can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
