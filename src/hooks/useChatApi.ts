
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Message, ApiResponse, SmartSuggestions, RichContent, UserAnalysis, RateLimit } from '@/types';
import { useSound } from '@/hooks/useSound';

export const useChatApi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [smartSuggestions, setSmartSuggestions] = useState<SmartSuggestions | null>(null);
  const [richContent, setRichContent] = useState<RichContent>({});
  const [userAnalysis, setUserAnalysis] = useState<UserAnalysis | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [apiResponseData, setApiResponseData] = useState<ApiResponse | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const glowTimeoutRef = useRef<number | null>(null);
  const { playPop } = useSound();

  // Initialize session from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem('yashChatSession');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

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
    mutationFn: async (userInput: string): Promise<ApiResponse> => {
      try {
        const payload: { question: string; session_id?: string } = {
          question: userInput,
        };

        // Include session_id if we have one
        if (sessionId) {
          payload.session_id = sessionId;
        }

        const response = await fetch('https://yashgori20-yashgori.hf.space/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        
        // Store session ID if new session was created
        if (data.session?.session_id && !sessionId) {
          setSessionId(data.session.session_id);
          localStorage.setItem('yashChatSession', data.session.session_id);
        }

        return data;
      } catch (error) {
        console.error("API call failed:", error);
        // Return a fallback response in case of error
        return {
          success: false,
          api_version: '2.0',
          session: {
            session_id: sessionId || 'fallback',
            conversation_number: 1,
            user_status: 'new',
            session_created: new Date().toISOString()
          },
          request: {
            question: userInput,
            processed_at: new Date().toISOString(),
            response_time_ms: null
          },
          response: {
            answer: "Sorry, something went wrong while connecting to my brain. Please try again later.",
            model_used: 'fallback',
            confidence_indicators: {
              question_clarity: 0,
              user_type_confidence: 0,
              response_relevance: 0
            }
          },
          intelligence: {
            user_analysis: {
              detected_type: 'general',
              sophistication_level: 'intermediate',
              question_clarity: 'Error occurred',
              is_returning_user: false,
              previous_topics: []
            },
            conversation_state: {
              total_exchanges: 1,
              main_themes: [],
              user_progression: [],
              conversation_depth: 'light'
            },
            smart_suggestions: {
              follow_up_questions: [],
              topic_transitions: [],
              depth_exploration: []
            }
          },
          rich_content: {},
          metadata: {
            rate_limit: {
              requests_remaining: 0,
              window_reset: new Date().toISOString()
            },
            developer: 'Yash Gori',
            timestamp: new Date().toISOString()
          },
          fallback_answer: "Sorry, something went wrong while connecting to my brain. Please try again later."
        };
      }
    },
    onSuccess: (data: ApiResponse) => {
      const answerText = data.success ? data.response.answer : data.fallback_answer || data.response.answer;
      
      setMessages((prev) => [...prev, { role: 'assistant', content: answerText }]);
      
      // Update state with API response data
      setApiResponseData(data);
      setSmartSuggestions(data.intelligence?.smart_suggestions || null);
      setRichContent(data.rich_content || {});
      setUserAnalysis(data.intelligence?.user_analysis || null);
      setRateLimit(data.metadata?.rate_limit || null);
      
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
    triggerScrollHint,
    sessionId,
    smartSuggestions,
    richContent,
    userAnalysis,
    rateLimit,
    apiResponseData
  };
};
