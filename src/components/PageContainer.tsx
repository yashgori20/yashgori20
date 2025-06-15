
import React, { useRef, useEffect } from 'react';
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
};

const PageContainer = ({
  views,
  pageIndex,
  windowHeight,
  onAnimationComplete,
  handleWheel,
  handleDragEnd,
  isMobile,
  chatInterfaceProps
}: PageContainerProps) => {
  const viewContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    viewContainerRefs.current = viewContainerRefs.current.slice(0, views.length);
  }, [views.length]);

  return (
    <div
      className="flex-1 overflow-hidden"
      onWheel={pageIndex > 0 ? handleWheel : undefined}
    >
      {windowHeight > 0 && (
        <motion.div
          className="h-full w-full"
          drag={isMobile && pageIndex > 0 ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={{ y: -pageIndex * windowHeight }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 40,
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
    </div>
  );
};

export default PageContainer;
