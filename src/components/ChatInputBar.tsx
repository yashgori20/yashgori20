
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
      placeholder={showSuggestions ? "" : "Ask me anything about Yash"}
      className={cn("h-11 text-base rounded-3xl bg-[#2a2a2a] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-lg shadow-black/50 pl-4 pr-16", inputClassName)}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
    />
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-500"
      onClick={handleSend}
      disabled={isPending}
    >
      <CornerDownLeft className="h-5 w-5 font-bold" />
    </Button>
  </div>
);

export default ChatInputBar;
