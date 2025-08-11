
import React from 'react';

type SuggestionCardProps = {
    title: string;
    onClick: () => void;
};

const SuggestionCard = ({ title, onClick }: SuggestionCardProps) => (
    <button 
        onClick={onClick} 
        className="group py-2 w-full text-center transition-colors duration-200 hover:bg-gradient-to-r from-transparent via-accent/10 to-transparent"
    >
        <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">{title}</p>
    </button>
);

export default SuggestionCard;
