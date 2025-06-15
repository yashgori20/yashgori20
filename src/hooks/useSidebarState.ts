
import { useState } from 'react';

export const useSidebarState = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(isOpen => !isOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebarCollapse,
    toggleMobileSidebar,
    closeMobileSidebar,
  };
};
