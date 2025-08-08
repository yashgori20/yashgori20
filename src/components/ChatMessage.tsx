
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ChatMessageProps = {
    message: Message;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === 'user';
    return (
      <div className={cn("flex items-start gap-4", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <Avatar className="w-8 h-8 rounded-none animate-gentle-pulse">
            <AvatarImage src="/images/triquetra-logo.png" alt="AI Assistant" />
            <AvatarFallback>
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        )}
        <div className={cn("max-w-xl p-4 rounded-lg whitespace-pre-wrap", isUser ? "bg-primary text-primary-foreground" : "bg-secondary")}>
          {message.content}
        </div>
        {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><User className="w-5 h-5 text-secondary-foreground" /></div>}
      </div>
    );
};

export default ChatMessage;

