
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarState = (pageIndex: number, viewContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const isMobile = useIsMobile();
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isMobile) {
      setSidebarVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      return;
    }

    const handleScroll = () => {
      setSidebarVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setSidebarVisible(false);
      }, 1500); // Hide after 1.5s of inactivity
    };

    const containers = viewContainerRefs.current.filter(Boolean);
    containers.forEach(container => container?.addEventListener('scroll', handleScroll));

    // Initially hide the sidebar on mobile after a short delay
    const initialTimeout = window.setTimeout(() => setSidebarVisible(false), 2000);

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      clearTimeout(initialTimeout);
      containers.forEach(container => container?.removeEventListener('scroll', handleScroll));
    };
  }, [isMobile, pageIndex]);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };

  return {
    isSidebarCollapsed,
    isSidebarVisible,
    toggleSidebarCollapse
  };
};
