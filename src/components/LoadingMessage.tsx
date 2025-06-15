
import React from 'react';
import { Bot } from 'lucide-react';

const LoadingMessage = () => (
      <div className="flex items-start gap-4 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"><Bot className="w-5 h-5 text-primary-foreground animate-pulse" /></div>
        <div className="max-w-xl p-4 rounded-lg bg-secondary flex items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
      </div>
  );

export default LoadingMessage;
