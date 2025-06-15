
import React from 'react';
import { Home, User, Folder, Wrench, Contact as ContactIcon } from 'lucide-react';
import { View } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EdgeNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const navItems = [
  { view: 'chat', icon: Home, label: 'Home' },
  { view: 'about', icon: User, label: 'About' },
  { view: 'projects', icon: Folder, label: 'Projects' },
  { view: 'skills', icon: Wrench, label: 'Skills' },
  { view: 'contact', icon: ContactIcon, label: 'Contact' },
] as const;

const EdgeNavigation = ({ activeView, setActiveView }: EdgeNavProps) => {
  return (
    <div className="fixed top-1/2 right-2 -translate-y-1/2 z-50 md:hidden">
      <div className="flex flex-col gap-1 bg-background/50 backdrop-blur-sm border border-border p-1 rounded-full">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.view} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full h-10 w-10 transition-all",
                    activeView === item.view && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => setActiveView(item.view)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EdgeNavigation;
