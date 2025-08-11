
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Message } from '@/types';
import { useSound } from '@/hooks/useSound';

export const useChatApi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [glowIntensity, setGlowIntensity] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const glowTimeoutRef = useRef<number | null>(null);
  const { playPop } = useSound();

  const triggerScrollHint = (deltaY: number) => {
    if (glowTimeoutRef.current) {
      clearTimeout(glowTimeoutRef.current);
    }
    // Increase intensity based on scroll delta, capping at 1
    setGlowIntensity(prev => Math.min(1, prev + Math.abs(deltaY) * 0.0015));

    // Set a timeout to fade the glow away if the user stops scrolling
    glowTimeoutRef.current = window.setTimeout(() => {
      setGlowIntensity(0);
    }, 1500);
  };

  const askApi = useMutation({
    mutationFn: async (userInput: string): Promise<string> => {
      try {
        const response = await fetch('https://yashgori20-yashgori.hf.space/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "question": userInput }),
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.answer || "I'm not sure how to answer that. Try asking about Yash's skills or projects.";
      } catch (error) {
        console.error("API call failed:", error);
        return "Sorry, something went wrong while connecting to my brain. Please try again later.";
      }
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
      playPop();
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      // For ScrollArea component, we need to access the viewport element
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        // Fallback for regular div
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning!";
    if (hour >= 12 && hour < 18) return "Good Afternoon!";
    if (hour >= 18 && hour < 22) return "Good Evening!";
    return "Good Night!";
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessages: Message[] = [...messages, { role: 'user', content: input }];
      setMessages(newMessages);
      askApi.mutate(input);
      setInput('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    const newMessages: Message[] = [...messages, { role: 'user', content: suggestion }];
    setMessages(newMessages);
    askApi.mutate(suggestion);
    setInput('');
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    handleSend,
    handleSuggestionClick,
    askApi,
    getGreeting,
    scrollAreaRef,
    glowIntensity,
    triggerScrollHint
  };
};
