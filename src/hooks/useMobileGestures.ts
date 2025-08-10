
import { useRef, useState } from 'react';
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
  const [scrollDisabled, setScrollDisabled] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile || isAnimating.current) return;
    
    const { offset, velocity } = info;
    const swipeThreshold = windowHeight / 8; // Further reduced threshold for easier swiping
    const velocityThreshold = 250; // Further reduced velocity threshold

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
    if (isAnimating.current || scrollDisabled) return;

    // For chat view, implement 2-second pause when switching to content
    if (pageIndex === 0) {
      if (e.deltaY > 50) {
        changePage(1);
        // Disable scroll for 2 seconds after switching to content
        setScrollDisabled(true);
        setTimeout(() => {
          setScrollDisabled(false);
        }, 2000);
      }
      return;
    }

    // For content view, allow normal scrolling within the container
    const viewContainer = viewContainerRefs.current[pageIndex];
    if (!viewContainer) return;

    // Let the content scroll normally - don't prevent default
    // Only navigate back to chat if scrolling up from the very top
    const { scrollTop } = viewContainer;
    const scrollThreshold = 50;
    
    if (e.deltaY < -scrollThreshold && scrollTop <= 5) {
      e.preventDefault();
      changePage(0);
    }
  };

  return {
    handleDragEnd,
    handleWheel,
    isMobile
  };
};
