
import React from 'react';

type SuggestionCardProps = {
    title: string;
    onClick: () => void;
};

const SuggestionCard = ({ title, onClick }: SuggestionCardProps) => (
    <button onClick={onClick} className="py-4 w-full text-left flex items-center hover:bg-accent transition-colors duration-200 border-b border-border/40 last:border-b-0">
        <p className="flex-1 text-sm text-muted-foreground">{title}</p>
    </button>
);

export default SuggestionCard;
