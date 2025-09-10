import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Expense } from '@/types';
import { CATEGORY_COLORS } from '@/data/categories';

interface IncomeChartProps {
  income: Expense[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({ income }) => {
  // Calculate category totals
  const categoryData = React.useMemo(() => {
    const categoryTotals = income.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as { [category: string]: number });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLORS[name] || '#22c55e',
      }))
      .sort((a, b) => b.value - a.value);
  }, [income]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            <span className="text-primary">Amount: </span>
            {formatCurrency(data.value)}
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / income.reduce((sum, e) => sum + e.amount, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  if (income.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No income data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => 
            percent > 5 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''
          }
          labelLine={false}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;