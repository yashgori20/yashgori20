import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { View } from '@/types';

interface ChatInterfaceProps {
  messages: any[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  askApi: any;
  getGreeting: () => string;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  setActiveView: (view: View) => void;
  glowIntensity: number;
  triggerScrollHint: (deltaY: number) => void;
  setMessages: (messages: any[]) => void;
  showDownloadButton?: boolean;
  onDownloadResume?: () => void;
}

interface NewChatViewProps {
  activeView: View;
  setActiveView: (view: View) => void;
  chatInterfaceProps: ChatInterfaceProps;
}

const NewChatView = ({ activeView, setActiveView, chatInterfaceProps }: NewChatViewProps) => {
  return (
    <div className="w-full h-full">
      <ChatInterface {...chatInterfaceProps} />
    </div>
  );
};

export default NewChatView;