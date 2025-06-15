
import React from 'react';
import { Home, User, Code, BrainCircuit, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { View } from '@/types';

type EdgeNavigationProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const navItems = [
  { view: 'chat', icon: Home, label: 'Home' },
  { view: 'about', icon: User, label: 'About' },
  { view: 'projects', icon: Code, label: 'Projects' },
  { view: 'skills', icon: BrainCircuit, label: 'Skills' },
  { view: 'contact', icon: Mail, label: 'Contact' },
] as const;

const EdgeNavigation: React.FC<EdgeNavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 right-0 flex-col items-center p-1.5 space-y-2 bg-card/70 backdrop-blur-sm rounded-l-lg border-y border-l border-border z-50 md:hidden flex">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => setActiveView(item.view)}
          title={item.label}
          className={cn(
            'p-2 rounded-md transition-colors',
            activeView === item.view
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
          )}
        >
          <item.icon className="h-5 w-5" />
        </button>
      ))}
    </nav>
  );
};

export default EdgeNavigation;
