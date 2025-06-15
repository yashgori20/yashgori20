
import React from 'react';
import { CornerDownLeft } from 'lucide-react';

type SuggestionCardProps = {
    title: string;
    onClick: () => void;
};

const SuggestionCard = ({ title, onClick }: SuggestionCardProps) => (
    <button onClick={onClick} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left flex items-center">
        <p className="flex-1 text-sm">{title}</p>
        <CornerDownLeft className="h-4 w-4 text-muted-foreground ml-2" />
    </button>
);

export default SuggestionCard;
