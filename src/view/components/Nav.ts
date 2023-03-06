import { CATEGORY, Category, SortOption, SORT_OPTIONS } from '../../constants/lunchRecommendation';
import { useEvents } from '../../utils/core';

const categoryOptions: Category[] = Object.values(CATEGORY);
const filterOptions: SortOption[] = Object.values(SORT_OPTIONS);
interface NavProps {
  category: Category;
  sortOption: SortOption;
  handleCategory: (category: Category) => void;
  handleSortOption: (SortOption: SortOption) => void;
}

function Nav({ category, sortOption, handleCategory, handleSortOption }: NavProps) {
  const [addEvent] = useEvents('.restaurant-filter-container');

  addEvent('change', '#category-filter', (e) => {
    if (e.target instanceof HTMLSelectElement) handleCategory(e.target.value as Category);
  });

  addEvent('change', '#sorting-filter', (e) => {
    if (e.target instanceof HTMLSelectElement) handleSortOption(e.target.value as SortOption);
  });

  return `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          ${categoryOptions
            .map(
              (option) =>
                `<option value=${option} ${option === category && 'selected'}>${option}</option>`
            )
            .join('')}
          
          
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${filterOptions
            .map(
              (option) =>
                `<option value=${option} ${option === sortOption && 'selected'}>${option}</option>`
            )
            .join('')}
        </select>
      </section>
    `;
}

export { Nav };
