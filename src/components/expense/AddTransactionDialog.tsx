import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseFormData, PaymentMethod } from '@/types';
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES, PAYMENT_METHODS } from '@/data/categories';
import CategoryCombobox from './CategoryCombobox';

const formSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  notes: z.string().optional(),
  type: z.enum(['income', 'expense']),
});

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  defaultType?: 'income' | 'expense';
  editingTransaction?: any;
}

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultType = 'expense',
  editingTransaction,
}) => {
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>(defaultType);

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: 0,
      category: '',
      subcategory: '',
      paymentMethod: 'UPI',
      notes: '',
      type: 'expense',
    },
  });

  // Update transaction type and form data when dialog opens
  useEffect(() => {
    if (open) {
      if (editingTransaction) {
        // Populate form with existing transaction data
        const transactionType = editingTransaction.type || 'expense';
        setTransactionType(transactionType);
        form.reset({
          date: editingTransaction.date,
          description: editingTransaction.description,
          amount: editingTransaction.amount,
          category: editingTransaction.category,
          subcategory: editingTransaction.subcategory || '',
          paymentMethod: editingTransaction.paymentMethod,
          notes: editingTransaction.notes || '',
          type: transactionType,
        });
      } else if (defaultType) {
        // New transaction - use default type
        setTransactionType(defaultType);
        form.setValue('type', defaultType);
      }
    }
  }, [open, defaultType, editingTransaction, form]);

  const handleTypeChange = (type: 'income' | 'expense') => {
    setTransactionType(type);
    form.setValue('type', type);
    form.setValue('category', ''); // Reset category when type changes
  };

  const handleSubmit = async (data: ExpenseFormData) => {
    try {
      await onSubmit({ ...data, type: transactionType });
      form.reset({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0,
        category: '',
        subcategory: '',
        paymentMethod: 'UPI',
        notes: '',
        type: 'expense',
      });
      setTransactionType('expense');
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const categories = transactionType === 'income' ? DEFAULT_INCOME_CATEGORIES : DEFAULT_EXPENSE_CATEGORIES;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingTransaction ? 'Edit' : 'Add'} {transactionType === 'income' ? 'Income' : 'Expense'}
          </DialogTitle>
          <DialogDescription>
            {editingTransaction ? 'Update' : 'Enter'} the details of your {transactionType === 'income' ? 'income' : 'expense'} below.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={transactionType} onValueChange={handleTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value={transactionType} className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={transactionType === 'income' ? 'e.g., Salary, Freelance work' : 'e.g., Coffee, Groceries, Uber ride'} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          min="0"
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <CategoryCombobox
                            categories={categories}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Search or select category..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Optional" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {PAYMENT_METHODS.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional notes (optional)"
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTransaction ? 'Update' : 'Add'} {transactionType === 'income' ? 'Income' : 'Expense'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;