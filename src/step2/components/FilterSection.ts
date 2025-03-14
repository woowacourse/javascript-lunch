import { Category, Sorting } from '../types/restaurants';
import { CategorySelect } from './CategorySelect';
import { SortingSelect } from './SortingSelect';

interface FilterSectionProps {
  category: Category;
  setCategory: (category: Category) => void;
  sorting: Sorting;
  setSorting: (sorting: Sorting) => void;
}

const FilterSection = (props: FilterSectionProps) => {
  const { category, setCategory, sorting, setSorting } = props;

  return `
    <section class="restaurant-filter-container">
      ${CategorySelect({
        setCategory,
        category,
      })}
      ${SortingSelect({
        setSorting,
        sorting,
      })}
    </section>
  `;
};

export default FilterSection;
