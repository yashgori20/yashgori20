
import { useRef } from 'react';
import { PanInfo } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type UseMobileGesturesProps = {
  pageIndex: number;
  changePage: (newIndex: number) => void;
  windowHeight: number;
  viewContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  isAnimating: React.MutableRefObject<boolean>;
};

export const useMobileGestures = ({
  pageIndex,
  changePage,
  windowHeight,
  viewContainerRefs,
  isAnimating
}: UseMobileGesturesProps) => {
  const isMobile = useIsMobile();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Only handle drag on mobile and only for non-chat views
    if (!isMobile || pageIndex === 0) return;
    
    const { offset, velocity } = info;
    const swipeThreshold = windowHeight / 4;
    const velocityThreshold = 500;

    const isSignificantSwipe = Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold;

    if (!isSignificantSwipe) return;

    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = viewContainer;
    const isAtTop = scrollTop <= 5;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5;
    
    // Swipe up to go to next page
    if (offset.y < 0 && isAtBottom) {
      changePage(pageIndex + 1);
    } 
    // Swipe down to go to previous page
    else if (offset.y > 0 && isAtTop) {
      changePage(pageIndex - 1);
    }
  };
  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isAnimating.current || pageIndex === 0) return;

    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

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

  return {
    handleDragEnd,
    handleWheel,
    isMobile
  };
};
