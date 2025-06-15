
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
    setSidebarOpen: (open: boolean) => void
};

const SidebarButton = ({ icon: Icon, label, view, activeView, setActiveView, setSidebarOpen }: SidebarButtonProps) => (
    <Button 
      variant={activeView === view ? "secondary" : "ghost"} 
      className={cn(
        "w-full transition-all duration-200 justify-start"
      )}
      onClick={() => { setActiveView(view); setSidebarOpen(false); }}
      title={label}
    >
      <Icon className={cn("h-4 w-4 mr-2")} />
      {label}
    </Button>
);

export default SidebarButton;
