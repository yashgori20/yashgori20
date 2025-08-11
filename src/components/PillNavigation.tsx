
import React from 'react';
import { User, Briefcase, Code, BrainCircuit, Mail, Download } from 'lucide-react';
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
            "rounded-full border-primary/20 bg-secondary/30 hover:bg-secondary/50 h-auto py-2 px-3 flex items-center gap-2 w-full justify-center",
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
    showDownloadButton?: boolean;
    onDownloadResume?: () => void;
};

const PillNavigation = ({ setActiveView, showDownloadButton = false, onDownloadResume }: PillNavigationProps) => {
    const pills = [
        { icon: User, label: 'About', view: 'about' as View },
        { icon: Briefcase, label: 'Experience', view: 'experience' as View },
        { icon: BrainCircuit, label: 'Skills', view: 'skills' as View },
        { icon: Code, label: 'Projects', view: 'projects' as View },
        { icon: Mail, label: 'Contact', view: 'contact' as View },
    ];

    return (
        <div className="max-w-2xl mx-auto mb-6">
            <div className="grid grid-cols-5 gap-2 mb-4">
                {pills.map((pill) => (
                    <PillButton
                        key={pill.view}
                        icon={pill.icon}
                        label={pill.label}
                        onClick={() => setActiveView(pill.view)}
                        className="col-span-1"
                    />
                ))}
            </div>
            
            {showDownloadButton && onDownloadResume && (
                <div className="mt-3">
                    <PillButton
                        icon={Download}
                        label="Download Resume"
                        onClick={onDownloadResume}
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default PillNavigation;
