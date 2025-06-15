
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { View } from '@/types';

type SidebarButtonProps = {
    icon: React.ElementType,
    label: string,
    view: View,
    activeView: View,
    setActiveView: (view: View) => void,
    isSidebarCollapsed: boolean,
    setSidebarOpen: (open: boolean) => void
};

const SidebarButton = ({ icon: Icon, label, view, activeView, setActiveView, isSidebarCollapsed, setSidebarOpen }: SidebarButtonProps) => (
    <Button 
      variant={activeView === view ? "secondary" : "ghost"} 
      className={cn(
        "w-full transition-all duration-200",
        isSidebarCollapsed ? "justify-center px-2" : "justify-start"
      )}
      onClick={() => { setActiveView(view); setSidebarOpen(false); }}
      title={isSidebarCollapsed ? label : undefined}
    >
      <Icon className={cn("h-4 w-4", !isSidebarCollapsed && "mr-2")} />
      {!isSidebarCollapsed && label}
    </Button>
);

export default SidebarButton;
