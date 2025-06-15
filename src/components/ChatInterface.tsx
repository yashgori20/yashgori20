
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
import { ArrowDown } from 'lucide-react';

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
};

const ChatInterface = ({ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView }: ChatInterfaceProps) => (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="relative flex-1 flex flex-col justify-center items-center text-center p-4 md:p-8 max-w-4xl mx-auto w-full">
          
          <div className="transform -translate-y-8">
            <div className="w-full mb-6">
              <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
              <p className="text-muted-foreground mb-6 text-sm">Welcome to Yash Gori's Portfolio</p>
              
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
                    className="w-full max-w-2xl mx-auto mt-4"
                  >
                    <div className="max-h-[20vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <SuggestionCard title="What are your key skills?" onClick={() => handleSuggestionClick("What are your key skills?")} />
                        <SuggestionCard title="Tell me about the DocuTalk project" onClick={() => handleSuggestionClick("Tell me about the DocuTalk project")} />
                        <SuggestionCard title="Summarize my experience" onClick={() => handleSuggestionClick("Summarize my experience")} />
                        <SuggestionCard title="How can I contact you?" onClick={() => handleSuggestionClick("How can I contact you?")} />
                        <SuggestionCard title="What are your latest projects?" onClick={() => handleSuggestionClick("What are your latest projects?")} />
                    </div>
                  </motion.div>
              </AnimatePresence>
            </div>
          </div>
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground opacity-50"
            >
              <p className="text-xs">Swipe to explore</p>
              <ArrowDown className="w-4 h-4 animate-bounce" />
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
