import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '@/types';
import { format, startOfMonth, subMonths, eachMonthOfInterval } from 'date-fns';

interface MonthlyTrendChartProps {
  transactions: Expense[];
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ transactions }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare monthly trend data
  const monthlyData = React.useMemo(() => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });

    return months.map(month => {
      const monthStr = format(month, 'yyyy-MM');
      const monthTransactions = transactions.filter(transaction => 
        transaction.date.startsWith(monthStr)
      );
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense' || !t.type) // Backward compatibility
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        month: format(month, 'MMM yy'),
        Income: income,
        Expenses: expenses,
        Net: income - expenses,
      };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-500 rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span>{entry.dataKey}: </span>
              {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No transaction data available
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="month" 
          fontSize={12}
          className="text-muted-foreground"
        />
        <YAxis 
          fontSize={12}
          className="text-muted-foreground"
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="Income" 
          fill="#22c55e" 
          radius={[2, 2, 0, 0]}
          name="Income"
        />
        <Bar 
          dataKey="Expenses" 
          fill="#ef4444" 
          radius={[2, 2, 0, 0]}
          name="Expenses"
        />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;