
export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type View = 'chat' | 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'content' | 'newchat';

// v2.0 API Types
export interface ChatSession {
  session_id: string;
  conversation_number: number;
  user_status: 'new' | 'returning';
  session_created: string;
}

export interface ChatRequest {
  question: string;
  processed_at: string;
  response_time_ms: number | null;
}

export interface ConfidenceIndicators {
  question_clarity: number;
  user_type_confidence: number;
  response_relevance: number;
}

export interface ChatResponse {
  answer: string;
  model_used: string;
  confidence_indicators: ConfidenceIndicators;
}

export interface UserAnalysis {
  detected_type: 'recruiter' | 'technical' | 'collaborator' | 'student' | 'general';
  sophistication_level: 'beginner' | 'intermediate' | 'advanced';
  question_clarity: string;
  is_returning_user: boolean;
  previous_topics: string[];
}

export interface ConversationState {
  total_exchanges: number;
  main_themes: string[];
  user_progression: string[];
  conversation_depth: 'light' | 'moderate' | 'deep';
}

export interface SmartSuggestions {
  follow_up_questions: string[];
  topic_transitions: string[];
  depth_exploration: string[];
}

export interface Intelligence {
  user_analysis: UserAnalysis;
  conversation_state: ConversationState;
  smart_suggestions: SmartSuggestions;
}

export interface ProjectContent {
  github_link: string;
  technical_specs: string[];
  key_achievement: string;
}

export interface RichContent {
  [projectName: string]: ProjectContent;
}

export interface RateLimit {
  requests_remaining: number;
  window_reset: string;
}

export interface ApiMetadata {
  rate_limit: RateLimit;
  developer: string;
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  api_version: string;
  session: ChatSession;
  request: ChatRequest;
  response: ChatResponse;
  intelligence: Intelligence;
  rich_content: RichContent;
  metadata: ApiMetadata;
  fallback_answer?: string;
}

// GetMeAJob API Types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    email: string;
    subscription: 'free' | 'pro';
  };
  message?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  isPaid: boolean;
  usageLeft: number;
  plan: 'free' | 'pro';
  renewalDate?: string;
}

// Expense Tracker Types
export interface Expense {
  id: string;
  date: string; // YYYY-MM-DD format
  description: string;
  amount: number;
  category: string;
  subcategory?: string;
  paymentMethod: string;
  notes?: string;
  type?: 'income' | 'expense'; // Optional for backward compatibility
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ExpenseCategory {
  id: string;
  name: string;
  isDefault: boolean;
  color?: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  totalIncome: number;
  netAmount: number;
  totalTransactions: number;
  averageDailySpent: number;
  averageDailyIncome: number;
  largestExpense: Expense | null;
  largestIncome: Expense | null;
  expenseCategoryTotals: { [category: string]: number };
  incomeCategoryTotals: { [category: string]: number };
  monthOverMonthExpenses: number;
  monthOverMonthIncome: number;
}

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  subcategory?: string;
  paymentMethod?: string;
  searchQuery?: string;
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallet' | 'Other';

export interface ExpenseFormData {
  date: string;
  description: string;
  amount: number;
  category: string;
  subcategory?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  type: 'income' | 'expense';
}

