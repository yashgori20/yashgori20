
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatInputBarProps = {
    input: string,
    setInput: (value: string) => void,
    handleSend: () => void,
    isPending: boolean,
    className?: string,
    inputClassName?: string,
    showSuggestions?: boolean,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
};

const ChatInputBar = ({ 
    input, 
    setInput, 
    handleSend, 
    isPending, 
    className, 
    inputClassName,
    showSuggestions = false,
    onKeyDown
}: ChatInputBarProps) => (
    <div className={cn("relative", className)}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !showSuggestions) {
              handleSend();
            }
            onKeyDown?.(e);
          }}
          placeholder={showSuggestions ? "" : "What do you want to know about me?"}
          className={cn("pr-12 h-12 text-base", inputClassName)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute right-2 top-1/2 -translate-y-1/2" 
          onClick={handleSend} 
          disabled={isPending}
        >
          <CornerDownLeft className="h-5 w-5 font-bold" />
        </Button>
    </div>
);

export default ChatInputBar;
