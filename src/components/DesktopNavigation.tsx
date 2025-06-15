
import React from 'react';
import { Home, User, Briefcase, Code, BrainCircuit, Mail } from 'lucide-react';
import { View } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesktopNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const navItems = [
  { view: 'chat', icon: Home, label: 'Home' },
  { view: 'about', icon: User, label: 'About' },
  { view: 'experience', icon: Briefcase, label: 'Experience' },
  { view: 'projects', icon: Code, label: 'Projects' },
  { view: 'skills', icon: BrainCircuit, label: 'Skills' },
  { view: 'contact', icon: Mail, label: 'Contact' },
] as const;

const DesktopNavigation = ({ activeView, setActiveView }: DesktopNavProps) => {
  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden md:block">
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
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DesktopNavigation;
