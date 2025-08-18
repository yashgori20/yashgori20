
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { UseMutationResult } from '@tanstack/react-query';
import { Message, View, SmartSuggestions, RichContent, UserAnalysis, RateLimit, ApiResponse } from '@/types';
import ChatInputBar from './ChatInputBar';
import SuggestionCard from './SuggestionCard';
import ChatMessage from './ChatMessage';
import LoadingMessage from './LoadingMessage';
import PillNavigation from './PillNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsDown, ChevronLeft, User, Github, Linkedin } from 'lucide-react';
import HuggingFaceLogo from './HuggingFaceLogo';
import { cn } from '@/lib/utils';

type ChatInterfaceProps = {
  messages: Message[],
  input: string,
  setInput: (value: string) => void,
  handleSend: () => void,
  handleSuggestionClick: (suggestion: string) => void,
  askApi: UseMutationResult<ApiResponse, Error, string, unknown>,
  getGreeting: () => string,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  setActiveView: (view: View) => void,
  glowIntensity: number;
  triggerScrollHint: (deltaY: number) => void;
  setMessages: (messages: Message[]) => void;
  sessionId?: string | null;
  smartSuggestions?: SmartSuggestions | null;
  richContent?: RichContent;
  userAnalysis?: UserAnalysis | null;
  rateLimit?: RateLimit | null;
  apiResponseData?: ApiResponse | null;
};

const ChatInterface = ({ messages, input, setInput, handleSend, handleSuggestionClick, askApi, getGreeting, scrollAreaRef, setActiveView, glowIntensity, triggerScrollHint, setMessages, sessionId, smartSuggestions, richContent, userAnalysis, rateLimit, apiResponseData }: ChatInterfaceProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);
  const [bounceAnimation, setBounceAnimation] = useState(false);

  // Combine all smart suggestions from API response
  const getSmartSuggestions = (): string[] => {
    // If no messages, always show default suggestions (home state)
    if (messages.length === 0) {
      return [
        "What are Yash's key skills?",
        "Tell me about his DocuTalk project",
        "Summarize his experience",
        "How can I contact Yash?",
        "What are his latest projects?",
        "Tell me about his education",
        "What programming languages does he know?",
        "Describe his AI/ML experience",
        "What's his strongest project?",
        "How did he build Swift Check AI?"
      ];
    }

    if (!smartSuggestions) {
      return [];
    }

    const allSuggestions = [
      ...(smartSuggestions.follow_up_questions || []),
      ...(smartSuggestions.topic_transitions || []),
      ...(smartSuggestions.depth_exploration || [])
    ];

    // If no smart suggestions, fallback to default
    return allSuggestions.length > 0 ? allSuggestions : [
      "Tell me more about his experience",
      "What projects is he most proud of?",
      "How can I work with Yash?",
      "What are his technical strengths?"
    ];
  };

  const suggestions = getSmartSuggestions();

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
    setInput(''); // Clear any text in input field

    // Reset focus and suggestion states with a small delay to ensure clean transition
    setTimeout(() => {
      setInputFocused(false);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      setIsMouseOverSuggestions(false);
    }, 50);
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
        const nextIndex = selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(nextIndex);
        // Scroll to the selected item
        setTimeout(() => {
          const selectedElement = document.querySelector(`[data-suggestion-index="${nextIndex}"]`);
          selectedElement?.scrollIntoView({ block: 'nearest' });
        }, 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : suggestions.length - 1;
        setSelectedIndex(prevIndex);
        // Scroll to the selected item
        setTimeout(() => {
          const selectedElement = document.querySelector(`[data-suggestion-index="${prevIndex}"]`);
          selectedElement?.scrollIntoView({ block: 'nearest' });
        }, 0);
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

          <div className="mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-8">How can I help, Yash?</h1>
          </div>

          <div className="w-full">
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
                  className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 max-h-32 md:max-h-40 overflow-y-auto"
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
                      data-suggestion-index={index}
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
                  className="w-full max-w-3xl mx-auto mt-10"
                  onMouseEnter={() => setIsMouseOverSuggestions(true)}
                  onMouseLeave={() => setIsMouseOverSuggestions(false)}
                >
                  <div
                    className="max-h-[18vh] md:max-h-[22vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
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
          </div>

        </div>
      ) : (
        <div
          className="flex-1 flex flex-col overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="border-b border-border bg-background/95 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center p-2">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="font-semibold text-lg ml-2">Chat with Yash</h3>

              {/* Rate Limit Warning (only show when low) */}
              <div className="ml-auto flex items-center gap-2">
                {rateLimit && rateLimit.requests_remaining < 5 && (
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {rateLimit.requests_remaining} questions left
                  </div>
                )}
              </div>
            </div>

          </div>
          <ScrollArea
            className="flex-1 p-4 overflow-y-auto"
            ref={scrollAreaRef}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto space-y-6 pb-36">
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={idx}
                  message={msg}
                  richContent={msg.role === 'assistant' && idx === messages.length - 1 ? richContent : undefined}
                />
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
