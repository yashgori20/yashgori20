import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Calendar,
  CreditCard,
  StickyNote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Expense } from '@/types';
import { CATEGORY_COLORS } from '@/data/categories';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const categoryColor = CATEGORY_COLORS[expense.category] || '#64748b';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground truncate">
                {expense.description}
              </h3>
              <Badge 
                variant="secondary"
                className="text-xs"
                style={{ 
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  borderColor: `${categoryColor}40`
                }}
              >
                {expense.category}
              </Badge>
            </div>
            
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(expense.amount)}
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(expense.date)}
              </div>
              
              <div className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {expense.paymentMethod}
              </div>
            </div>

            {expense.subcategory && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {expense.subcategory}
                </Badge>
              </div>
            )}

            {expense.notes && (
              <div className="flex items-start gap-1 mt-2 text-sm text-muted-foreground">
                <StickyNote className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{expense.notes}</span>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(expense)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(expense.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;