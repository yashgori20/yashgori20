import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryComboboxProps {
  categories: readonly string[] | string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const CategoryCombobox: React.FC<CategoryComboboxProps> = ({
  categories,
  value,
  onValueChange,
  placeholder = "Select category...",
}) => {
  // Convert readonly array to regular array for safety
  const categoryArray = Array.isArray(categories) ? [...categories] : [];

  const handleValueChange = (selectedValue: string) => {
    try {
      onValueChange(selectedValue);
    } catch (error) {
      console.error('Error in category selection:', error);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent 
        className="max-h-[200px] bg-popover border border-border"
        side="bottom"
        align="start"
        sideOffset={4}
      >
        <div 
          className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categoryArray.map((category) => (
            <SelectItem 
              key={category} 
              value={category}
              className="px-4 py-3 hover:bg-muted focus:bg-muted cursor-pointer text-sm border-b border-border/50 last:border-b-0 text-foreground relative flex items-center"
            >
              {category}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default CategoryCombobox;