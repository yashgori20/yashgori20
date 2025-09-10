import { useState, useEffect } from 'react';
import { Expense, ExpenseFormData, ExpenseStats } from '@/types';
import { expenseService } from '@/services/expenseService';
import { toast } from 'sonner';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all expenses
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses');
      console.error('Error loading expenses:', err);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  // Add new expense
  const addExpense = async (expenseData: ExpenseFormData) => {
    try {
      const id = await expenseService.addExpense(expenseData);
      const newExpense: Expense = {
        id,
        ...expenseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setExpenses(prev => [newExpense, ...prev]);
      toast.success('Expense added successfully');
      return id;
    } catch (err) {
      console.error('Error adding expense:', err);
      toast.error('Failed to add expense');
      throw err;
    }
  };

  // Update expense
  const updateExpense = async (id: string, updates: Partial<ExpenseFormData>) => {
    try {
      await expenseService.updateExpense(id, updates);
      
      setExpenses(prev => 
        prev.map(expense => 
          expense.id === id 
            ? { ...expense, ...updates, updatedAt: new Date().toISOString() }
            : expense
        )
      );
      
      toast.success('Expense updated successfully');
    } catch (err) {
      console.error('Error updating expense:', err);
      toast.error('Failed to update expense');
      throw err;
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      toast.success('Expense deleted successfully');
    } catch (err) {
      console.error('Error deleting expense:', err);
      toast.error('Failed to delete expense');
      throw err;
    }
  };

  // Calculate expense statistics
  const calculateStats = (filteredExpenses?: Expense[]): ExpenseStats => {
    const expensesToAnalyze = filteredExpenses || expenses;
    
    if (expensesToAnalyze.length === 0) {
      return {
        totalAmount: 0,
        totalExpenses: 0,
        averageDaily: 0,
        largestExpense: null,
        categoryTotals: {},
        monthOverMonth: 0,
      };
    }

    const totalAmount = expensesToAnalyze.reduce((sum, expense) => sum + expense.amount, 0);
    const totalExpenses = expensesToAnalyze.length;
    
    // Calculate average daily spend for current month
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
    const currentMonthExpenses = expensesToAnalyze.filter(e => e.date.startsWith(currentMonth));
    const daysInMonth = now.getDate();
    const averageDaily = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0) / daysInMonth;

    // Find largest expense
    const largestExpense = expensesToAnalyze.reduce((largest, current) => 
      current.amount > (largest?.amount || 0) ? current : largest
    );

    // Category totals
    const categoryTotals = expensesToAnalyze.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [category: string]: number });

    // Month over month calculation
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1).toISOString().slice(0, 7);
    const lastMonthExpenses = expensesToAnalyze.filter(e => e.date.startsWith(lastMonth));
    const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    const monthOverMonth = lastMonthTotal === 0 ? 0 : 
      ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    return {
      totalAmount,
      totalExpenses,
      averageDaily,
      largestExpense,
      categoryTotals,
      monthOverMonth,
    };
  };

  // Load expenses on mount
  useEffect(() => {
    loadExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    loadExpenses,
    calculateStats,
  };
};