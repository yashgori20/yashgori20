
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
    // Single page - no page navigation needed
    return;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Single page - allow normal scrolling
    return;
  };

  return {
    handleDragEnd,
    handleWheel,
    isMobile
  };
};
