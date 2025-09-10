import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Expense, ExpenseFormData } from '@/types';

const COLLECTION_NAME = 'expenses';

export const expenseService = {
  // Add new expense
  async addExpense(expenseData: ExpenseFormData): Promise<string> {
    try {
      const now = new Date().toISOString();
      const expense: Omit<Expense, 'id'> = {
        ...expenseData,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), expense);
      return docRef.id;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  // Get all expenses
  async getExpenses(): Promise<Expense[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const expenses: Expense[] = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        } as Expense);
      });
      
      return expenses;
    } catch (error) {
      console.error('Error getting expenses:', error);
      throw error;
    }
  },

  // Get expenses by date range
  async getExpensesByDateRange(startDate: string, endDate: string): Promise<Expense[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const expenses: Expense[] = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        } as Expense);
      });
      
      return expenses;
    } catch (error) {
      console.error('Error getting expenses by date range:', error);
      throw error;
    }
  },

  // Update expense
  async updateExpense(id: string, updates: Partial<ExpenseFormData>): Promise<void> {
    try {
      const expenseRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(expenseRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  // Delete expense
  async deleteExpense(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },

  // Get expenses by category
  async getExpensesByCategory(category: string): Promise<Expense[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const expenses: Expense[] = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        } as Expense);
      });
      
      return expenses;
    } catch (error) {
      console.error('Error getting expenses by category:', error);
      throw error;
    }
  },
};