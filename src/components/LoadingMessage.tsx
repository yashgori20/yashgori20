
import React from 'react';
import { Bot } from 'lucide-react';

const LoadingMessage = () => (
  <div className="flex items-start gap-4 justify-start animate-fadeIn">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
      <Bot className="w-5 h-5 text-primary-foreground animate-pulse" />
    </div>
    <div className="max-w-xl p-4 rounded-lg bg-secondary/80 backdrop-blur-sm border shadow-sm">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
        <span className="ml-2 text-sm text-muted-foreground animate-pulse">
          Thinking...
        </span>
      </div>
    </div>
  </div>
);

export default LoadingMessage;
