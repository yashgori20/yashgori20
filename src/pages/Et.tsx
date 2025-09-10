import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Wallet, Plus, TrendingUp, TrendingDown, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExpenses } from '@/hooks/useExpenses';
import AddTransactionDialog from '@/components/expense/AddTransactionDialog';
import EditExpenseDialog from '@/components/expense/EditExpenseDialog';
import ExpenseChart from '@/components/expense/ExpenseChart';
import IncomeChart from '@/components/expense/IncomeChart';
import MonthlyTrendChart from '@/components/expense/MonthlyTrendChart';

const Et = () => {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'income' | 'expense'>('expense');
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  // Separate income and expenses (handle backward compatibility)
  const incomeTransactions = expenses.filter(e => e.type === 'income');
  const expenseTransactions = expenses.filter(e => e.type === 'expense' || !e.type); // Treat missing type as expense
  
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netAmount = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddIncome = () => {
    setDialogType('income');
    setShowAddDialog(true);
  };

  const handleAddExpense = () => {
    setDialogType('expense');
    setShowAddDialog(true);
  };

  // Handle delete transaction
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteExpense(id);
    }
  };

  // Handle edit transaction
  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setShowEditDialog(true);
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
            Track your income & expenses, analyze spending patterns, and manage your budget
          </p>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleAddIncome} size="lg" className="bg-green-600 hover:bg-green-700">
              <TrendingUp className="h-5 w-5 mr-2" />
              Add Income
            </Button>
            <Button onClick={handleAddExpense} size="lg" variant="destructive">
              <TrendingDown className="h-5 w-5 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
              <p className="text-xs text-muted-foreground">
                {incomeTransactions.length} transaction{incomeTransactions.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
              <p className="text-xs text-muted-foreground">
                {expenseTransactions.length} transaction{expenseTransactions.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(netAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {netAmount >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <div className="h-4 w-4 bg-primary/20 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {expenses.length > 0 && (
          <div className="mb-8">
            {/* Income vs Expense Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Overall financial breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-2">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                        <p className="font-medium text-green-600">Income</p>
                        <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-2">
                          <TrendingDown className="h-8 w-8 text-red-600" />
                        </div>
                        <p className="font-medium text-red-600">Expenses</p>
                        <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${netAmount >= 0 ? 'bg-green-50 dark:bg-green-950/50' : 'bg-red-50 dark:bg-red-950/50'}`}>
                      <p className="text-sm text-muted-foreground">Net Amount</p>
                      <p className={`text-xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Income */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Recent Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomeTransactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No income recorded yet</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {incomeTransactions.map((transaction) => (
                    <div key={transaction.id} className="group flex items-center justify-between p-3 bg-card hover:bg-muted/50 rounded-lg border border-border transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                      <div className="text-right mr-3">
                        <p className="font-bold text-green-600 dark:text-green-400">+{formatCurrency(transaction.amount)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Edit3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                Recent Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenseTransactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No expenses recorded yet</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {expenseTransactions.map((transaction) => (
                    <div key={transaction.id} className="group flex items-center justify-between p-3 bg-card hover:bg-muted/50 rounded-lg border border-border transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                      <div className="text-right mr-3">
                        <p className="font-bold text-red-600 dark:text-red-400">-{formatCurrency(transaction.amount)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Edit3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Charts Section */}
        {expenses.length > 0 && (
          <div className="space-y-8 mt-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Analytics & Insights</h2>
              <p className="text-muted-foreground">Detailed analysis of your financial data</p>
            </div>

            {/* Category Breakdown Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Expense Categories Pie Chart */}
              {expenseTransactions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                    <CardDescription>Breakdown of your spending</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ExpenseChart expenses={expenseTransactions} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Income Categories Pie Chart */}
              {incomeTransactions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Income Sources</CardTitle>
                    <CardDescription>Your income breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <IncomeChart income={incomeTransactions} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Monthly Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Income vs Expenses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <MonthlyTrendChart transactions={expenses} />
                </div>
              </CardContent>
            </Card>

            {/* Detailed KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Avg Daily Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(expenseTransactions.reduce((sum, e) => sum + e.amount, 0) / 30)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Largest Expense</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {expenseTransactions.length > 0 
                      ? formatCurrency(Math.max(...expenseTransactions.map(e => e.amount)))
                      : formatCurrency(0)
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {expenseTransactions.length > 0 
                      ? expenseTransactions.reduce((max, e) => e.amount > max.amount ? e : max).category
                      : 'No expenses'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Top Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {expenseTransactions.length > 0 ? (() => {
                      const categoryTotals = expenseTransactions.reduce((acc, e) => {
                        acc[e.category] = (acc[e.category] || 0) + e.amount;
                        return acc;
                      }, {} as { [key: string]: number });
                      const topCategory = Object.entries(categoryTotals).reduce((max, [cat, amount]) => 
                        amount > max[1] ? [cat, amount] : max
                      );
                      return formatCurrency(topCategory[1]);
                    })() : formatCurrency(0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {expenseTransactions.length > 0 ? (() => {
                      const categoryTotals = expenseTransactions.reduce((acc, e) => {
                        acc[e.category] = (acc[e.category] || 0) + e.amount;
                        return acc;
                      }, {} as { [key: string]: number });
                      return Object.entries(categoryTotals).reduce((max, [cat, amount]) => 
                        amount > max[1] ? [cat, amount] : max
                      )[0];
                    })() : 'No expenses'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Savings Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalIncome > 0 
                      ? `${((netAmount / totalIncome) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {netAmount >= 0 ? 'Positive' : 'Deficit'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Status Info */}
        {loading && <p className="text-center text-muted-foreground mt-8">Loading...</p>}
        {error && <p className="text-center text-red-600 mt-8">Error: {error}</p>}
      </div>

      {/* Add Transaction Dialog */}
      <AddTransactionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={addExpense}
        defaultType={dialogType}
      />

      {/* Edit Expense Dialog */}
      <EditExpenseDialog
        expense={editingTransaction}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={updateExpense}
      />
    </div>
  );
};

export default Et;