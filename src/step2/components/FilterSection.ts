import { Category, Sorting } from '../types/restaurants';
import { useState } from '../utils/core/Core';
import { CategorySelect } from './CategorySelect';
import { SortingSelect } from './SortingSelect';

interface FilterSectionProps {
  onFilterChange: (filter: { category: Category; sorting: Sorting }) => void;
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [category, setCategory] = useState<Category>('전체');
  const [sorting, setSorting] = useState<Sorting>('name');

  // 상태 변경시 상위 컴포넌트에 알림
  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    onFilterChange({ category: newCategory, sorting });
  };

  const handleSortChange = (newSorting: Sorting) => {
    setSorting(newSorting);
    onFilterChange({ category, sorting: newSorting });
  };

  return `
    <section class="restaurant-filter-container">
      ${CategorySelect({
        handleCategoryChange,
        category,
      })}
      ${SortingSelect({
        handleSortChange,
        sorting,
      })}
    </section>
  `;
};

export default FilterSection;
