
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { View } from '@/types';
import ChatInterface from '@/components/ChatInterface';
import AboutView from '@/components/views/AboutView';
import ExperienceView from '@/components/views/ExperienceView';
import ProjectsView from '@/components/views/ProjectsView';
import SkillsView from '@/components/views/SkillsView';
import ContactView from '@/components/views/ContactView';

const PageComponents: Record<View, React.ComponentType<any>> = {
  chat: ChatInterface,
  about: AboutView,
  experience: ExperienceView,
  projects: ProjectsView,
  skills: SkillsView,
  contact: ContactView,
};

type PageContainerProps = {
  views: View[];
  pageIndex: number;
  windowHeight: number;
  onAnimationComplete: () => void;
  handleWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
  isMobile: boolean;
  chatInterfaceProps: any;
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
  }, [views.length]);

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
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {views.map((viewName, i) => {
            const PageComponent = PageComponents[viewName];
            return (
              <div 
                key={viewName} 
                ref={el => (viewContainerRefs.current[i] = el)}
                className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar" 
                style={{ height: windowHeight, touchAction: 'pan-y' }}
              >
                {viewName === 'chat' ? (
                  <ChatInterface {...chatInterfaceProps} />
                ) : (
                  <PageComponent activeView={activeView} setActiveView={setActiveView} />
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default PageContainer;
