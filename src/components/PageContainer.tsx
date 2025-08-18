import React, { useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { View } from '@/types';
import ChatInterface from '@/components/ChatInterface';
import ContentView from '@/components/views/ContentView';

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
      className="flex-1 overflow-hidden"
      onWheel={handleWheel}
    >
      {windowHeight > 0 && (
        <motion.div
          className="h-full w-full"
          drag={isMobile ? "y" : false}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={{ y: -pageIndex * windowHeight }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {views.map((viewName, i) => (
            <div
              key={viewName}
              ref={el => (viewContainerRefs.current[i] = el)}
              className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
              style={{
                height: windowHeight,
                touchAction: isMobile ? 'pan-y' : 'auto'
              }}
            >
              <ContentView
                activeView={activeView}
                setActiveView={setActiveView}
                chatInterfaceProps={chatInterfaceProps}
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PageContainer;