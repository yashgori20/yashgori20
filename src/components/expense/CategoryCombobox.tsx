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
      <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        {categoryArray.map((category) => (
          <SelectItem 
            key={category} 
            value={category}
            className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer"
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryCombobox;