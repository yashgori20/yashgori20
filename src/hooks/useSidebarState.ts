
import { useState } from 'react';

export const useSidebarState = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(isCollapsed => !isCollapsed);
  };

  return {
    isSidebarCollapsed,
    isSidebarVisible: true,
    toggleSidebarCollapse,
  };
};
