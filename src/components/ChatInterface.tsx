
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { UseMutationResult } from '@tanstack/react-query';
import { Message, View } from '@/types';
import ChatInputBar from './ChatInputBar';
import SuggestionCard from './SuggestionCard';
import ChatMessage from './ChatMessage';
import LoadingMessage from './LoadingMessage';
import PillNavigation from './PillNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsDown, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatInterfaceProps = {
    messages: Message[],
    input: string,
    setInput: (value: string) => void,
    handleSend: () => void,
    handleSuggestionClick: (suggestion: string) => void,
    askApi: UseMutationResult<string, Error, string, unknown>,
    getGreeting: () => string,
    scrollAreaRef: React.RefObject<HTMLDivElement>,
    setActiveView: (view: View) => void,
    glowIntensity: number;
    triggerScrollHint: (deltaY: number) => void;
    setMessages: (messages: Message[]) => void;
};

const ChatInterface = ({ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView, glowIntensity, triggerScrollHint, setMessages }: ChatInterfaceProps) => {
  const handleScrollAttempt = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > 0) {
      triggerScrollHint(e.deltaY);
    }
  };

  const glowStyle = {
    opacity: glowIntensity > 0 ? 0.7 + glowIntensity * 0.3 : undefined,
    textShadow: `0 0 ${glowIntensity * 8}px rgba(255,255,255,0.8)`,
    filter: `drop-shadow(0 0 ${glowIntensity * 4}px rgba(255,255,255,0.7))`
  };

  const handleBack = () => {
    setMessages([]);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        <div 
          className="relative flex-1 flex flex-col justify-center items-center text-center p-4 md:p-8 max-w-4xl mx-auto w-full"
          onWheel={handleScrollAttempt}
        >
          
          <div className="w-full mb-4">
            <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
            <p className="text-muted-foreground mb-8 text-sm">Welcome to Yash Gori's Portfolio</p>
            
            <PillNavigation setActiveView={setActiveView} />
          </div>

          <div>
            <div className="w-full max-w-2xl mx-auto mb-4">
               <ChatInputBar
                  input={input}
                  setInput={setInput}
                  handleSend={handleSend}
                  isPending={askApi.isPending}
                  inputClassName="text-center"
                />
            </div>
            <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl mx-auto"
                >
                  <div className="max-h-[20vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
                      <SuggestionCard title="What are my key skills?" onClick={() => handleSuggestionClick("What are my key skills?")} />
                      <SuggestionCard title="Tell me about the DocuTalk project" onClick={() => handleSuggestionClick("Tell me about the DocuTalk project")} />
                      <SuggestionCard title="Summarize my experience" onClick={() => handleSuggestionClick("Summarize my experience")} />
                      <SuggestionCard title="How can I contact me?" onClick={() => handleSuggestionClick("How can I contact me?")} />
                      <SuggestionCard title="What are my latest projects?" onClick={() => handleSuggestionClick("What are my latest projects?")} />
                  </div>
                </motion.div>
            </AnimatePresence>
          </div>
            <button
              onClick={() => setActiveView('about')}
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground opacity-50 hover:opacity-100 transition-all duration-300"
              )}
              style={glowStyle}
            >
              <p className="text-xs">Click here to switch to Portfolio mode</p>
              <ChevronsDown className={cn("w-4 h-4", glowIntensity === 0 && "animate-bounce")} />
            </button>
        </div>
      ) : (
        <>
          <div className="flex items-center p-2 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="font-semibold text-lg ml-2">Chat with Yash</h3>
          </div>
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {askApi.isPending && <LoadingMessage />}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}

export default ChatInterface;
