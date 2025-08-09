
import { useState, useRef, useCallback, useEffect } from 'react';
import { View } from '@/types';
import { useWindowSize } from '@/hooks/use-window-size';

const views: View[] = ['chat', 'content'];

export const usePageNavigation = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [pageIndex, setPageIndex] = useState(0);
  const { height: windowHeight } = useWindowSize();
  const isAnimating = useRef(false);

  const changePage = useCallback((newIndex: number) => {
    if (isAnimating.current || !windowHeight) return;
    const clampedIndex = Math.max(0, Math.min(newIndex, views.length - 1));
    if (clampedIndex !== pageIndex) {
      isAnimating.current = true;
      setPageIndex(clampedIndex);
      setActiveView(views[clampedIndex]);
    }
  }, [pageIndex, windowHeight]);

  useEffect(() => {
    const newIndex = views.indexOf(activeView);
    if (newIndex !== -1 && newIndex !== pageIndex) {
      isAnimating.current = true;
      setPageIndex(newIndex);
    }
  }, [activeView, pageIndex]);

  const onAnimationComplete = () => {
    isAnimating.current = false;
  };

  return {
    activeView,
    setActiveView,
    pageIndex,
    changePage,
    onAnimationComplete,
    isAnimating,
    views,
    windowHeight
  };
};
