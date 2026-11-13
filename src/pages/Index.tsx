
import React, { useRef, useState, useEffect } from 'react';
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
import { useActiveSection } from '@/hooks/useActiveSection';
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
  Instagram,
  Linkedin,
  Github,
  ChevronLeft,
  ChevronRight,
  Home,
  Phone,
  Download,
  Link,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import XLogo from '@/components/XLogo';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';
import SearchChatsOverlay from '@/components/SearchChatsOverlay';
import ProjectModal from '@/components/ProjectModal';
import Buddy from '@/components/convo/Buddy';

const Index = () => {
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showReachOutOverlay, setShowReachOutOverlay] = useState(false);
  const [reachOutTimeout, setReachOutTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const activeSection = useActiveSection();
  const spotlightRef = useRef<HTMLDivElement>(null);

  // soft light that follows the cursor (desktop pointers only)
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`);
      el.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

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
    { id: 'home', title: 'Home', icon: Home, description: 'Welcome to my portfolio' },
    { id: 'experience', title: 'Work', icon: Briefcase, description: 'FactWise' },
    { id: 'projects', title: 'Projects', icon: Code, description: "Things I've built" },
    { id: 'case-studies', title: 'Writing', icon: BookOpen, description: 'Product case studies' },
    { id: 'skills', title: 'Stack', icon: BrainCircuit, description: 'Skills' },
    { id: 'about', title: 'About', icon: GraduationCap, description: 'Education and volunteering' },
    { id: 'contact', title: 'Contact', icon: Mail, description: 'Resume and contact' },
  ];

  const setActiveView = (view: View) => {
    const targetViewIndex = views.indexOf(view);
    // Only reset scroll when switching screens; the content view is now the scroll
    // container, so resetting it on every call would cancel section jumps.
    if (targetViewIndex !== -1 && view !== activeView) {
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

  // Switch to the portfolio view first, then scroll once it's visible.
  const goToSection = (sectionId: string) => {
    setActiveView('content');
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleChatClick = (chatId: string) => goToSection(chatId);

  // Deep-link support: returning from a case-study page (/?view=case-studies)
  // opens the portfolio content and scrolls to the requested section.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view) {
      setActiveView('content');
      // Wait for the content view to mount before scrolling to the section.
      const t = setTimeout(() => {
        document.getElementById(view)?.scrollIntoView({ behavior: 'auto' });
        // Clean the URL so a refresh doesn't keep forcing the jump.
        window.history.replaceState({}, '', '/');
      }, 150);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/pm.pdf';
    link.setAttribute('download', 'Yash Gori Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchSectionClick = (sectionId: string) => goToSection(sectionId);

  const handleSearchProjectClick = (project: any) => {
    setSelectedProject(project);
    setShowProjectModal(true);
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
    <div className="h-screen bg-g-bg text-g-text flex">
      <ProfileCard
        isOpen={profileCardOpen}
        onClose={() => setProfileCardOpen(false)}
        position={profileCardPosition}
      />

      {/* Demo1-style Sidebar */}
      <div className={cn(
        "flex flex-col transition-all duration-300 overflow-hidden",
        "bg-g-side border-r border-g-line",
        isMobile ? (isMobileSidebarOpen ? "fixed inset-y-0 left-0 w-64 z-40" : "hidden") : (isSidebarCollapsed ? "w-14" : "w-64")
      )}>
        {/* Header with Logo */}
        <div className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <button
              onClick={() => {
                goToSection('home');
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-g-raised rounded transition-colors group"
            >
              <img src="/images/triquetra-logo.png" alt="Logo" className="w-4 h-4 group-hover:animate-spin transition-transform duration-500 origin-center" style={{ animationDuration: '0.5s' }} />
            </button>
          )}

          {isSidebarCollapsed ? (
            <button
              onClick={() => {
                goToSection('home');
              }}
              className="w-6 h-6 rounded-sm flex items-center justify-center hover:bg-g-raised transition-all duration-300 mx-auto group"
            >
              <img
                src="/images/triquetra-logo.png"
                alt="Logo"
                className="w-4 h-4 group-hover:animate-spin transition-all duration-300 origin-center"
                style={{ animationDuration: '0.5s' }}
              />
            </button>
          ) : (
            <button
              onClick={toggleSidebarCollapse}
              className="w-6 h-6 rounded-sm flex items-center justify-center hover:bg-g-raised transition-colors"
            >
              <ChevronLeft className="h-3 w-3 text-g-muted" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className={cn("pb-4", isSidebarCollapsed ? "px-2" : "px-3")}>
          <div className={cn(isSidebarCollapsed ? "space-y-2" : "space-y-0.5")}>
            <button
              className={cn(
                "w-full text-left rounded-lg transition-colors",
                isSidebarCollapsed ? "p-2.5 flex justify-center" : "px-3 py-2.5",
                activeView === 'newchat' ? "bg-g-raised" : "hover:bg-g-raised"
              )}
              onClick={() => {
                setMessages([]);
                setActiveView('newchat');
                if (isMobile) closeMobileSidebar();
              }}
            >
              <div className={cn("flex items-center", !isSidebarCollapsed && "gap-3")}>
                <Plus className="h-4 w-4 text-g-muted" />
                {!isSidebarCollapsed && (
                  <div className="text-sm text-g-text truncate whitespace-nowrap">New chat</div>
                )}
              </div>
            </button>
            <button
              className={cn(
                "w-full text-left rounded-lg hover:bg-g-raised transition-colors",
                isSidebarCollapsed ? "p-2.5 flex justify-center" : "px-3 py-2.5"
              )}
              onClick={() => setShowSearchOverlay(true)}
            >
              <div className={cn("flex items-center", !isSidebarCollapsed && "gap-3")}>
                <Search className="h-4 w-4 text-g-muted" />
                {!isSidebarCollapsed && (
                  <div className="text-sm text-g-text truncate whitespace-nowrap">Search</div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Separator when collapsed */}
        {isSidebarCollapsed && (
          <div className="mx-2 border-b border-g-line mb-4"></div>
        )}

        {/* Chats Section */}
        <div className={cn(isSidebarCollapsed ? "px-2" : "px-3", "pb-4")}>
          {!isSidebarCollapsed && (
            <div className="text-[12.5px] text-g-muted mb-2 px-3">Chats</div>
          )}
          <div className={cn(isSidebarCollapsed ? "space-y-2" : "space-y-0.5")}>
            {portfolioChats.map((chat) => {
              const Icon = chat.icon;
              const section = activeSection === 'journey' ? 'experience' : activeSection; // earlier roles live under Experience
              const isActive = activeView === 'content' && section === chat.id;
              return (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={cn(
                    "w-full text-left rounded-lg transition-colors",
                    isSidebarCollapsed
                      ? "p-2.5 flex justify-center"
                      : "px-3 py-2.5",
                    isActive ? "bg-g-raised" : "hover:bg-g-raised"
                  )}
                >
                  <div className={cn("flex items-center", !isSidebarCollapsed && "gap-3")}>
                    <Icon className={cn("h-4 w-4", isActive ? "text-g-text" : "text-g-faint")} />
                    {!isSidebarCollapsed && (
                      <div className={cn("text-sm truncate whitespace-nowrap", isActive ? "text-g-text font-medium" : "text-g-muted")}>{chat.title}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacer to push profile to bottom */}
        <div className="flex-1"></div>

        {/* Profile Section */}
        <div className={cn(isSidebarCollapsed ? "p-2" : "p-3")}>
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={cn(
                "w-full flex items-center rounded-lg hover:bg-g-raised transition-colors",
                isSidebarCollapsed ? "p-2.5 justify-center" : "gap-3 px-3 py-2"
              )}
            >
              <div className={cn("rounded-full overflow-hidden flex-shrink-0", isSidebarCollapsed ? "w-5 h-5" : "w-6 h-6")}>
                <img src={resumeData.profileImage} alt="Yash Gori" className="w-full h-full object-cover" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm text-g-text">Yash Gori</div>
                  <div className="text-xs text-g-muted">AI Product Manager</div>
                </div>
              )}
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className={cn(
                "absolute bg-g-surface border border-g-line rounded-xl shadow-2xl shadow-black/60 z-50",
                isSidebarCollapsed
                  ? "bottom-0 left-full ml-2 w-64"
                  : "bottom-full left-0 right-0 mb-2"
              )}>
                <div className="p-4 border-b border-g-line">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={resumeData.profileImage} alt="Yash Gori" />
                      <AvatarFallback>YG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Yash Gori</div>
                      <div className="text-sm text-g-muted">AI Product Manager</div>
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
                    onClick={handleDownloadResume}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-g-raised text-left"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download Resume</span>
                  </button>
                  <button
                    onClick={() => {
                      setMessages([]);
                      setActiveView('newchat');
                      setShowProfileDropdown(false);
                      if (isMobile) closeMobileSidebar();
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-g-raised text-left"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">New Chat</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('content');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                      setShowProfileDropdown(false);
                      if (isMobile) closeMobileSidebar();
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-g-raised text-left"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Contact Me</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // You could add a toast notification here
                      setShowProfileDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-g-raised text-left"
                  >
                    <Link className="h-4 w-4" />
                    <span className="text-sm">Copy Portfolio Link</span>
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

        {/* Fixed Mobile Hamburger Menu */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileSidebar}
              className="bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="p-2 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            </div>
            <div className="flex items-center gap-4">
              {/* Reach Out - Show on all screens */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (reachOutTimeout) {
                    clearTimeout(reachOutTimeout);
                    setReachOutTimeout(null);
                  }
                  setShowReachOutOverlay(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setShowReachOutOverlay(false);
                  }, 500);
                  setReachOutTimeout(timeout);
                }}
              >
                <button
                  className="text-left p-3 rounded-2xl hover:bg-g-raised transition-colors flex items-center gap-3 text-g-text"
                >
                  <Mail className="h-4 w-4 text-g-muted" />
                  <div className="text-sm truncate">Reach out</div>
                </button>

                {/* Contact Overlay */}
                {showReachOutOverlay && (
                  <div className="absolute top-full right-0 mt-2 bg-g-surface border border-g-line rounded-xl shadow-2xl shadow-black/60 p-4 min-w-[280px] z-50">
                    <div className="space-y-3">
                      <div className="text-sm text-g-text font-medium mb-3">Yash Gori · AI Product Manager</div>
                      <div className="text-xs text-g-muted mb-3">Get in touch</div>

                      {/* Email */}
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-g-muted" />
                        <span className="text-g-text">{resumeData.contact.email}</span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-g-muted" />
                        <span className="text-g-text">{resumeData.contact.phone}</span>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-2 pt-2">
                        <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-g-raised">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-g-raised">
                            <Github className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-g-raised">
                            <XLogo className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-g-raised">
                            <Instagram className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>

                      {/* Contact Me Button */}
                      <button
                        onClick={() => {
                          setActiveView('content');
                          setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                          setShowReachOutOverlay(false);
                        }}
                        className="w-full mt-3 p-2 bg-g-text hover:bg-white text-g-bg font-medium rounded-lg text-sm transition-colors"
                      >
                        Contact Me
                      </button>
                    </div>
                  </div>
                )}
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

        {/* Chat Input Bar - Show at bottom of active chat */}
        {activeView === 'newchat' && messages.length > 0 && (
          <div className="p-4">
            <ChatInputBar
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isPending={askApi.isPending}
              className="shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Persistent Floating Chat Input Bar - Show on portfolio screens only */}
      {activeView !== 'newchat' && (
        <div className={cn(
          "fixed bottom-0 z-40 pb-4 pt-10 px-5 md:px-12 transition-all duration-300 bg-gradient-to-t from-g-bg from-60% to-transparent pointer-events-none",
          isMobile ? "left-0 right-0" : finalIsCollapsed ? "right-0 left-14" : "right-0 left-64"
        )}>
          <ChatInputBar
            input={input}
            setInput={setInput}
            handleSend={() => {
              handleSend();
              setActiveView('newchat');
            }}
            isPending={askApi.isPending}
            className="pointer-events-auto mx-auto max-w-[780px]"
          />
        </div>
      )}

      {/* Cursor spotlight */}
      <div ref={spotlightRef} aria-hidden className="spotlight pointer-events-none fixed inset-0 z-[1]" />

      {/* Tri, the mascot */}
      <Buddy
        section={activeSection}
        hidden={activeView === 'newchat'}
        onOpenChat={() => {
          setMessages([]);
          setActiveView('newchat');
        }}
      />

      {/* Search Chats Overlay */}
      <SearchChatsOverlay
        isOpen={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
        onSectionClick={handleSearchSectionClick}
        onProjectClick={handleSearchProjectClick}
      />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
};

export default Index;
