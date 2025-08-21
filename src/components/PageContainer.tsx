import React, { useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { View } from '@/types';
import ChatInterface from '@/components/ChatInterface';
import ContentView from '@/components/views/ContentView';
import NewChatView from '@/components/views/NewChatView';

interface ChatInterfaceProps {
  messages: any[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  askApi: any;
  getGreeting: () => string;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  setActiveView: (view: View) => void;
  glowIntensity: number;
  triggerScrollHint: (deltaY: number) => void;
  setMessages: (messages: any[]) => void;
  showDownloadButton?: boolean;
  onDownloadResume?: () => void;
}

interface ContentViewProps {
  activeView: View;
  setActiveView: (view: View) => void;
  chatInterfaceProps: ChatInterfaceProps;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

const PageComponents: Record<View, React.ComponentType<ChatInterfaceProps | ContentViewProps>> = {
  chat: ChatInterface,
  content: ContentView,
  newchat: NewChatView,
};

type PageContainerProps = {
  views: View[];
  pageIndex: number;
  windowHeight: number;
  onAnimationComplete: () => void;
  handleWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isMobile: boolean;
  chatInterfaceProps: ChatInterfaceProps;
  viewContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeView: View;
  setActiveView: (view: View) => void;
};

const PageContainer = ({
  views,
  pageIndex,
  windowHeight,
  onAnimationComplete,
  handleWheel,
  handleDragEnd,
  isMobile,
  chatInterfaceProps,
  viewContainerRefs,
  activeView,
  setActiveView,
}: PageContainerProps) => {
  useEffect(() => {
    viewContainerRefs.current = viewContainerRefs.current.slice(0, views.length);
  }, [views.length, viewContainerRefs]);

  return (
    <div
      className="flex-1 overflow-hidden relative"
      onWheel={handleWheel}
    >
      {windowHeight > 0 && (
        <>
          {views.map((viewName, i) => (
            <motion.div
              key={viewName}
              ref={el => (viewContainerRefs.current[i] = el)}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
              style={{
                height: windowHeight,
                touchAction: isMobile ? 'pan-y' : 'auto'
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: i === pageIndex ? 1 : 0,
                pointerEvents: i === pageIndex ? 'auto' : 'none'
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut"
              }}
              onAnimationComplete={() => {
                if (i === pageIndex) onAnimationComplete();
              }}
              drag={isMobile && i === pageIndex ? "y" : false}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={i === pageIndex ? handleDragEnd : undefined}
            >
              {viewName === 'content' ? (
                <ContentView
                  activeView={activeView}
                  setActiveView={setActiveView}
                  chatInterfaceProps={chatInterfaceProps}
                />
              ) : viewName === 'newchat' ? (
                <NewChatView
                  activeView={activeView}
                  setActiveView={setActiveView}
                  chatInterfaceProps={chatInterfaceProps}
                />
              ) : null}
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};

export default PageContainer;