import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { UseMutationResult } from '@tanstack/react-query';
import { Message } from '@/types';
import ChatInputBar from './ChatInputBar';
import SuggestionCard from './SuggestionCard';
import ChatMessage from './ChatMessage';
import LoadingMessage from './LoadingMessage';

type ChatInterfaceProps = {
    messages: Message[],
    input: string,
    setInput: (value: string) => void,
    handleSend: () => void,
    handleSuggestionClick: (suggestion: string) => void,
    askApi: UseMutationResult<string, Error, string, unknown>,
    getGreeting: () => string,
    scrollAreaRef: React.RefObject<HTMLDivElement>
};

const ChatInterface = ({ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef }: ChatInterfaceProps) => (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 max-w-4xl mx-auto w-full">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <Button asChild variant="outline" className="text-sm text-muted-foreground hover:text-foreground">
              <a href="https://yash-ai-hub-portfolio.lovable.app/" target="_blank" rel="noopener noreferrer">
                Prefer a classic view?
              </a>
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
          <p className="text-muted-foreground mb-8 text-sm">Welcome to Yash Gori's Portfolio</p>
          
          <div className="w-full max-w-2xl mb-8">
             <ChatInputBar
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isPending={askApi.isPending}
                inputClassName="text-center rounded-b-none focus:ring-0 focus:ring-offset-0"
              />
            <div className="border-x border-b border-border rounded-b-xl divide-y divide-border overflow-hidden">
                <SuggestionCard title="What are your key skills?" onClick={() => handleSuggestionClick("What are your key skills?")} />
                <SuggestionCard title="Tell me about the DocuTalk project" onClick={() => handleSuggestionClick("Tell me about the DocuTalk project")} />
                <SuggestionCard title="Summarize my experience" onClick={() => handleSuggestionClick("Summarize my experience")} />
                <SuggestionCard title="How can I contact you?" onClick={() => handleSuggestionClick("How can I contact you?")} />
                <SuggestionCard title="What are your latest projects?" onClick={() => handleSuggestionClick("What are your latest projects?")} />
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {askApi.isPending && <LoadingMessage />}
          </div>
        </ScrollArea>
      )}
    </div>
  );

  export default ChatInterface;
