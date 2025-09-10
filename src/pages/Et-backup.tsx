import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Plus, 
  Download,
  AlertCircle,
  Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExpenses } from '@/hooks/useExpenses';
import { Expense, ExpenseFilters, ExpenseFormData } from '@/types';

// Components
import AddExpenseDialog from '@/components/expense/AddExpenseDialog';
import EditExpenseDialog from '@/components/expense/EditExpenseDialog';
import ExpenseCard from '@/components/expense/ExpenseCard';
import ExpenseStats from '@/components/expense/ExpenseStats';
import ExpenseFilters from '@/components/expense/ExpenseFilters';
import ExpenseCharts from '@/components/expense/ExpenseCharts';

const Et = () => {
  const { 
    expenses, 
    loading, 
    error, 
    addExpense, 
    updateExpense, 
    deleteExpense, 
    calculateStats 
  } = useExpenses();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<ExpenseFilters>({});

  // Filter expenses based on current filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!expense.description.toLowerCase().includes(query) &&
            !expense.category.toLowerCase().includes(query) &&
            !expense.subcategory?.toLowerCase().includes(query) &&
            !expense.notes?.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Date range filter
      if (filters.startDate && expense.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && expense.date > filters.endDate) {
        return false;
      }

      // Category filter
      if (filters.category && expense.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && expense.subcategory !== filters.subcategory) {
        return false;
      }

      // Payment method filter
      if (filters.paymentMethod && expense.paymentMethod !== filters.paymentMethod) {
        return false;
      }

      return true;
    });
  }, [expenses, filters]);

  // Get available subcategories for filter dropdown
  const availableSubcategories = useMemo(() => {
    const subcategories = expenses
      .map(e => e.subcategory)
      .filter((sub): sub is string => Boolean(sub))
      .filter((sub, index, arr) => arr.indexOf(sub) === index);
    
    return subcategories.sort();
  }, [expenses]);

  // Calculate stats for filtered expenses
  const stats = useMemo(() => {
    return calculateStats(filteredExpenses);
  }, [filteredExpenses, calculateStats]);

  // Handle adding expense
  const handleAddExpense = async (data: ExpenseFormData) => {
    await addExpense(data);
  };

  // Handle editing expense
  const handleEditExpense = async (id: string, data: Partial<ExpenseFormData>) => {
    await updateExpense(id, data);
    setEditingExpense(null);
  };

  // Handle deleting expense
  const handleDeleteExpense = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  // Export functions
  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Description', 'Amount', 'Category', 'Subcategory', 'Payment Method', 'Notes'].join(','),
      ...filteredExpenses.map(expense => [
        expense.date,
        `"${expense.description}"`,
        expense.amount,
        `"${expense.category}"`,
        `"${expense.subcategory || ''}"`,
        `"${expense.paymentMethod}"`,
        `"${expense.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredExpenses, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            
            <div className="flex items-center gap-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button onClick={exportToJSON} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border-4 border-primary/20">
              <Wallet className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Expense Tracker</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Track your expenses, analyze spending patterns, and manage your budget
          </p>

          <Button onClick={() => setShowAddDialog(true)} size="lg" className="mb-6">
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="p-4 flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              {error}
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <div className="mb-8">
          <ExpenseStats stats={stats} isLoading={loading} />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <ExpenseCharts expenses={filteredExpenses} isLoading={loading} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ExpenseFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableSubcategories={availableSubcategories}
          />
        </div>

        {/* Expenses List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              Recent Expenses 
              {filteredExpenses.length !== expenses.length && (
                <span className="text-base text-muted-foreground ml-2">
                  ({filteredExpenses.length} of {expenses.length})
                </span>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-8 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredExpenses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                {expenses.length === 0 ? (
                  <>
                    <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No expenses yet</p>
                    <p>Start by adding your first expense above</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No expenses match your filters</p>
                    <p>Try adjusting your search criteria</p>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onEdit={setEditingExpense}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <AddExpenseDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddExpense}
      />

      <EditExpenseDialog
        expense={editingExpense}
        open={!!editingExpense}
        onOpenChange={(open) => !open && setEditingExpense(null)}
        onSubmit={handleEditExpense}
      />
    </div>
  );
};

export default Et;