import { useState, useMemo } from 'react';
import { Expense } from '@/types';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from 'date-fns';

export type TimePeriod = 'week' | 'month' | 'year';

export interface FilterState {
  timePeriod: TimePeriod;
  selectedCategory: string;
  currentDate: Date;
}

export const useTransactionFilters = (
  transactions: Expense[],
  initialTimePeriod: TimePeriod = 'month',
  initialCategory: string = 'all'
) => {
  const [incomeFilters, setIncomeFilters] = useState<FilterState>({
    timePeriod: initialTimePeriod,
    selectedCategory: initialCategory,
    currentDate: new Date(),
  });

  const [expenseFilters, setExpenseFilters] = useState<FilterState>({
    timePeriod: initialTimePeriod,
    selectedCategory: initialCategory,
    currentDate: new Date(),
  });

  const getDateRange = (date: Date, period: TimePeriod) => {
    switch (period) {
      case 'week':
        return {
          start: startOfWeek(date, { weekStartsOn: 0 }), // Sunday
          end: endOfWeek(date, { weekStartsOn: 0 }),
        };
      case 'month':
        return {
          start: startOfMonth(date),
          end: endOfMonth(date),
        };
      case 'year':
        return {
          start: startOfYear(date),
          end: endOfYear(date),
        };
    }
  };

  const filterTransactions = (
    transactions: Expense[],
    filters: FilterState,
    transactionType: 'income' | 'expense'
  ) => {
    // Filter by transaction type (with backward compatibility)
    const typeFilteredTransactions = transactions.filter(transaction => {
      if (transactionType === 'income') {
        return transaction.type === 'income';
      } else {
        return transaction.type === 'expense' || !transaction.type; // Treat missing type as expense
      }
    });

    // Filter by date range
    const { start, end } = getDateRange(filters.currentDate, filters.timePeriod);
    const dateFilteredTransactions = typeFilteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return isWithinInterval(transactionDate, { start, end });
    });

    // Filter by category
    if (filters.selectedCategory === 'all') {
      return dateFilteredTransactions;
    }
    
    return dateFilteredTransactions.filter(transaction => 
      transaction.category === filters.selectedCategory
    );
  };

  const filteredIncomeTransactions = useMemo(() => {
    return filterTransactions(transactions, incomeFilters, 'income');
  }, [transactions, incomeFilters]);

  const filteredExpenseTransactions = useMemo(() => {
    return filterTransactions(transactions, expenseFilters, 'expense');
  }, [transactions, expenseFilters]);

  const updateIncomeFilters = (updates: Partial<FilterState>) => {
    setIncomeFilters(prev => ({ ...prev, ...updates }));
  };

  const updateExpenseFilters = (updates: Partial<FilterState>) => {
    setExpenseFilters(prev => ({ ...prev, ...updates }));
  };

  return {
    // Income filters
    incomeFilters,
    updateIncomeFilters,
    filteredIncomeTransactions,
    
    // Expense filters  
    expenseFilters,
    updateExpenseFilters,
    filteredExpenseTransactions,
  };
};