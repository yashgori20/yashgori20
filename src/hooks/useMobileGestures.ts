
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
    if (!isMobile || isAnimating.current) return;
    
    const { offset, velocity } = info;
    const swipeThreshold = windowHeight / 6; // Reduced threshold for easier swiping
    const velocityThreshold = 300; // Reduced velocity threshold

    const isSignificantSwipe = Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold;

    if (!isSignificantSwipe) return;

    // For chat view (index 0), only allow swiping up to go to next page
    if (pageIndex === 0) {
      if (offset.y < 0) {
        changePage(1);
      }
      return;
    }

    // For other views, check scroll position
    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = viewContainer;
    const isAtTop = scrollTop <= 10;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
    // Swipe up to go to next page (only if at bottom or content fits in view)
    if (offset.y < 0 && (isAtBottom || scrollHeight <= clientHeight)) {
      changePage(pageIndex + 1);
    } 
    // Swipe down to go to previous page (only if at top)
    else if (offset.y > 0 && isAtTop) {
      changePage(pageIndex - 1);
    }
  };
  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isAnimating.current) return;

    // For chat view, allow wheel navigation
    if (pageIndex === 0) {
      if (e.deltaY > 50) {
        changePage(1);
      }
      return;
    }

    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = viewContainer;
    const isAtTop = scrollTop <= 5;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
    const scrollThreshold = 50;

    if (e.deltaY > scrollThreshold && (isAtBottom || scrollHeight <= clientHeight)) {
      e.preventDefault();
      changePage(pageIndex + 1);
    } else if (e.deltaY < -scrollThreshold && isAtTop) {
      e.preventDefault();
      changePage(pageIndex - 1);
    }
  };

  return {
    handleDragEnd,
    handleWheel,
    isMobile
  };
};
