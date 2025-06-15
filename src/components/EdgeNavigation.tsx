
import React from 'react';
import { Home, User, Briefcase, Wrench, Mail } from 'lucide-react';
import { View } from '@/types';
import { cn } from '@/lib/utils';

type EdgeNavigationProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const navItems: { view: View; icon: React.ElementType, label: string }[] = [
  { view: 'chat', icon: Home, label: 'Home' },
  { view: 'about', icon: User, label: 'About' },
  { view: 'projects', icon: Briefcase, label: 'Projects' },
  { view: 'skills', icon: Wrench, label: 'Skills' },
  { view: 'contact', icon: Mail, label: 'Contact' },
];

const EdgeNavigation = ({ activeView, setActiveView }: EdgeNavigationProps) => {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 md:hidden z-50">
      <nav className="flex flex-col items-center bg-background/80 backdrop-blur-sm border-l border-t border-b rounded-l-lg p-2 gap-2">
        {navItems.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={cn(
              "flex items-center justify-center text-xs transition-colors rounded-md h-12 w-12",
              activeView === view ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label={label}
          >
            <Icon className="h-6 w-6" />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default EdgeNavigation;
