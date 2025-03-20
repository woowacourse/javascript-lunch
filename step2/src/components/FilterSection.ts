import { Category, Sorting } from '../types/restaurants';
import { useState } from '../utils/core/Core';
import { CategorySelect } from './CategorySelect';
import { SortingSelect } from './SortingSelect';

interface FilterSectionProps {
  setFilterOptions: (filter: { category: Category; sorting: Sorting }) => void;
}

const FilterSection = ({ setFilterOptions }: FilterSectionProps) => {
  const [category, setCategory] = useState<Category>('전체');
  const [sorting, setSorting] = useState<Sorting>('name');

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setFilterOptions({ category: newCategory, sorting });
  };

  const handleSortChange = (newSorting: Sorting) => {
    setSorting(newSorting);
    setFilterOptions({ category, sorting: newSorting });
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
