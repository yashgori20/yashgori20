import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Mascot from '@/components/convo/Mascot';

type ChatInputBarProps = {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isPending: boolean;
  className?: string;
  inputClassName?: string;
  showSuggestions?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const ChatInputBar = ({
  input,
  setInput,
  handleSend,
  isPending,
  className,
  inputClassName,
  showSuggestions = false,
  onKeyDown,
}: ChatInputBarProps) => (
  <div
    className={cn(
      'flex items-center gap-3 rounded-[22px] border border-g-line bg-g-raised py-[7px] pl-4 pr-[7px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] transition-colors focus-within:border-g-faint',
      className
    )}
  >
    <Mascot mood={isPending ? 'wait' : 'idle'} size={18} framed={false} />
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !showSuggestions) {
          handleSend();
        }
        onKeyDown?.(e);
      }}
      placeholder={showSuggestions ? '' : "Ask me anything about my work…"}
      aria-label="Ask about Yash"
      className={cn(
        'min-w-0 flex-1 bg-transparent text-[15.5px] text-g-text outline-none placeholder:text-g-muted',
        inputClassName
      )}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
    />
    <button
      type="button"
      aria-label="Send"
      onClick={handleSend}
      disabled={isPending}
      className="grid h-9 w-9 flex-none place-items-center rounded-full bg-g-text text-g-bg transition-opacity hover:opacity-90 disabled:opacity-40"
    >
      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.25} />
    </button>
  </div>
);

export default ChatInputBar;
