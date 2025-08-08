
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
    isCollapsed?: boolean;
};

const SidebarButton = ({ icon: Icon, label, view, activeView, setActiveView, isCollapsed }: SidebarButtonProps) => (
    <Button 
      variant={activeView === view ? "secondary" : "ghost"} 
      size={isCollapsed ? "icon" : "default"}
      className={cn(
        "w-full transition-all duration-200 justify-start",
        isCollapsed && "justify-center rounded-none"
      )}
      onClick={() => { setActiveView(view); }}
      title={label}
    >
      <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
      {!isCollapsed && <span>{label}</span>}
    </Button>
);

export default SidebarButton;
