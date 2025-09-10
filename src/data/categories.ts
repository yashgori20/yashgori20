export const DEFAULT_EXPENSE_CATEGORIES = [
  'Food & Drink',
  'Transport',
  'Housing & Utilities',
  'Entertainment & Leisure',
  'Subscriptions & Recurring',
  'Shopping',
  'Health & Fitness',
  'Insurance',
  'Education & Learning',
  'Personal Care',
  'Family & Dependents',
  'Gifts & Donations',
  'Lending',
  'Savings & Investments',
  'Miscellaneous'
] as const;

export const DEFAULT_INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Interest',
  'Rental',
  'Gifts Received',
  'Refunds',
  'Bonus',
  'Side Hustle',
  'Other Income'
] as const;

export const PAYMENT_METHODS = [
  'Cash',
  'UPI',
  'Credit Card',
  'Debit Card',
  'Net Banking',
  'Wallet',
  'Other'
] as const;

export const CATEGORY_COLORS: { [key: string]: string } = {
  // Expense categories (red tones)
  'Food & Drink': '#ef4444',
  'Transport': '#3b82f6',
  'Housing & Utilities': '#8b5cf6',
  'Entertainment & Leisure': '#f59e0b',
  'Subscriptions & Recurring': '#10b981',
  'Shopping': '#ec4899',
  'Health & Fitness': '#06b6d4',
  'Insurance': '#a855f7',
  'Education & Learning': '#84cc16',
  'Personal Care': '#f97316',
  'Family & Dependents': '#6366f1',
  'Gifts & Donations': '#14b8a6',
  'Lending': '#8b5cf6',
  'Savings & Investments': '#22c55e',
  'Miscellaneous': '#64748b',
  
  // Income categories (green tones)
  'Salary': '#22c55e',
  'Freelance': '#16a34a',
  'Business': '#15803d',
  'Investments': '#166534',
  'Interest': '#14532d',
  'Rental': '#059669',
  'Gifts Received': '#0d9488',
  'Refunds': '#0f766e',
  'Bonus': '#0e7490',
  'Side Hustle': '#0369a1',
  'Other Income': '#0284c7'
};