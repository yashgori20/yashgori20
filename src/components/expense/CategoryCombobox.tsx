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
        className="max-h-[200px] overflow-y-auto bg-popover border border-border"
        style={{ 
          scrollBehavior: 'smooth',
          touchAction: 'pan-y',
          overscrollBehavior: 'contain'
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {categoryArray.map((category) => (
          <SelectItem 
            key={category} 
            value={category}
            className="px-4 py-3 hover:bg-muted focus:bg-muted cursor-pointer text-sm border-b border-border/50 last:border-b-0 text-foreground"
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryCombobox;