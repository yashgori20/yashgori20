
export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type View = 'chat' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';
