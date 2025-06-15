
import React from 'react';

type SuggestionCardProps = {
    title: string;
    onClick: () => void;
};

const SuggestionCard = ({ title, onClick }: SuggestionCardProps) => (
    <button 
        onClick={onClick} 
        className="group py-4 w-full text-center relative transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/40 after:to-transparent last:after:hidden hover:bg-[radial-gradient(ellipse_at_center,hsl(var(--accent))_20%,transparent_70%)]"
    >
        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{title}</p>
    </button>
);

export default SuggestionCard;
