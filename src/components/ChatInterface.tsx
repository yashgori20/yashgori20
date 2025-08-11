
import React, { useState, useEffect } from 'react';
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
import { ChevronsDown, ChevronLeft, User } from 'lucide-react';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);
  const [bounceAnimation, setBounceAnimation] = useState(false);
  
  const suggestions = [
    "What are my key skills?",
    "Tell me about the DocuTalk project",
    "Summarize my experience", 
    "How can I contact you?",
    "What are your latest projects?",
    "Tell me about your education",
    "What programming languages do you know?",
    "Describe your AI/ML experience",
    "What's your strongest project?",
    "How did you build Swift Check AI?"
  ];

  const handleScrollAttempt = (e: React.WheelEvent<HTMLDivElement>) => {
    // Don't trigger scroll hint if mouse is over suggestions
    // Lower threshold for more sensitive scroll detection
    if (!isMouseOverSuggestions && Math.abs(e.deltaY) > 20) {
      triggerScrollHint(e.deltaY);
    }
  };

  const handleSuggestionScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Check if we're at the top or bottom
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    // If trying to scroll beyond bounds, trigger bounce animation
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      setBounceAnimation(true);
      setTimeout(() => setBounceAnimation(false), 300);
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

  const [inputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    // Delay hiding dropdown to allow clicks
    setTimeout(() => {
      if (!isMouseOverSuggestions) {
        setShowSuggestions(false);
      }
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
          setShowSuggestions(false);
        } else if (input.trim()) {
          handleSend();
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSuggestionClick(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setInputFocused(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {messages.length === 0 ? (
        <div 
          className="relative flex-1 flex flex-col justify-center items-center text-center p-4 md:p-8 max-w-4xl mx-auto w-full"
          onWheel={handleScrollAttempt}
        >
          
          <div className="w-full mb-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{getGreeting()}</h1>
            <p className="text-muted-foreground mb-8 text-xs md:text-sm">Welcome to Yash Gori's Portfolio</p>
            
            <PillNavigation setActiveView={setActiveView} />
          </div>

          <div className="relative w-full max-w-2xl mx-auto">
            <div className="mb-4">
               <div
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
               >
                  <ChatInputBar
                     input={input}
                     setInput={setInput}
                     handleSend={handleSend}
                     isPending={askApi.isPending}
                     showSuggestions={inputFocused}
                     onKeyDown={handleKeyDown}
                  />
               </div>
            </div>
            
            {/* Dropdown when focused - full width of container */}
            <AnimatePresence>
               {inputFocused && showSuggestions && (
                  <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: bounceAnimation ? [1, 1.02, 1] : 1
                     }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 max-h-48 md:max-h-64 overflow-y-auto"
                     onMouseEnter={() => setIsMouseOverSuggestions(true)}
                     onMouseLeave={() => {
                       setIsMouseOverSuggestions(false);
                       if (!inputFocused) {
                         setTimeout(() => setShowSuggestions(false), 100);
                       }
                     }}
                     onWheel={handleSuggestionScroll}
                  >
                     {suggestions.map((suggestion, index) => (
                        <button
                           key={suggestion}
                           onClick={() => handleSuggestionSelect(suggestion)}
                           className={cn(
                              "w-full text-left px-4 py-3 text-sm hover:bg-accent transition-colors",
                              "first:rounded-t-lg last:rounded-b-lg",
                              selectedIndex === index && "bg-accent"
                           )}
                        >
                           {suggestion}
                        </button>
                     ))}
                  </motion.div>
               )}
            </AnimatePresence>
            
            {/* Default suggestions when not focused - with more space */}
            <AnimatePresence>
               {!inputFocused && (
                  <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: bounceAnimation ? [1, 1.02, 1] : 1
                     }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                     className="w-full max-w-2xl mx-auto mt-8"
                     onMouseEnter={() => setIsMouseOverSuggestions(true)}
                     onMouseLeave={() => setIsMouseOverSuggestions(false)}
                  >
                     <div 
                        className="max-h-[20vh] md:max-h-[25vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                        onWheel={handleSuggestionScroll}
                     >
                        {suggestions.map((suggestion) => (
                           <SuggestionCard 
                              key={suggestion}
                              title={suggestion} 
                              onClick={() => handleSuggestionClick(suggestion)} 
                           />
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Button 
                onClick={() => setActiveView('content')}
                variant="outline"
                className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                style={glowStyle}
              >
                <User className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Switch to Portfolio Mode
              </Button>
            </div>
        </div>
      ) : (
        <div 
          className="flex-1 flex flex-col overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="flex items-center p-2 border-b border-border bg-background/95 backdrop-blur-sm z-10 shrink-0">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="font-semibold text-lg ml-2">Chat with Yash</h3>
          </div>
          <ScrollArea 
            className="flex-1 p-4 overflow-y-auto" 
            ref={scrollAreaRef}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto space-y-6 pb-36">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {askApi.isPending && <LoadingMessage />}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
