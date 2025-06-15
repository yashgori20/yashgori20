
import { useState } from 'react';

export const useSidebarState = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };

  return {
    isSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
  };
};
