
import React from 'react';
import { User, Briefcase, Code, BrainCircuit, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { View } from '@/types';
import { cn } from '@/lib/utils';

type PillButtonProps = {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    className?: string;
};

const PillButton = ({ icon: Icon, label, onClick, className }: PillButtonProps) => (
    <Button
        variant="outline"
        className={cn(
            "rounded-full border-primary/20 bg-secondary/30 hover:bg-secondary/50 h-auto py-2 px-4 flex items-center gap-2 w-full justify-center",
            className
        )}
        onClick={onClick}
    >
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
    </Button>
);

type PillNavigationProps = {
    setActiveView: (view: View) => void;
};

const PillNavigation = ({ setActiveView }: PillNavigationProps) => {
    const pills = [
        { icon: User, label: 'About', view: 'about' as View },
        { icon: Briefcase, label: 'Experience', view: 'experience' as View },
        { icon: Code, label: 'Projects', view: 'projects' as View },
        { icon: BrainCircuit, label: 'Skills', view: 'skills' as View },
        { icon: Mail, label: 'Contact', view: 'contact' as View },
    ];

    return (
        <div>
            {/* Mobile view: 3x2 grid */}
            <div className="sm:hidden grid grid-cols-6 gap-2 mb-8 max-w-xs mx-auto">
                {pills.map((pill, index) => (
                    <PillButton
                        key={pill.view}
                        icon={pill.icon}
                        label={pill.label}
                        onClick={() => setActiveView(pill.view)}
                        className={cn(index < 3 ? "col-span-2" : "col-span-3")}
                    />
                ))}
            </div>

            {/* Desktop view: flex-wrap */}
            <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-8">
                 {pills.map((pill) => (
                    <PillButton
                        key={pill.view}
                        icon={pill.icon}
                        label={pill.label}
                        onClick={() => setActiveView(pill.view)}
                        className="w-auto"
                    />
                ))}
            </div>
        </div>
    );
};

export default PillNavigation;
