import { useEvents } from '../../utils/core';
import {
  CATEGORY,
  Category,
  SortOption,
  SORT_OPTIONS,
} from './../../constants/lunchRecommendation';

interface NavFilterProps {
  category: Category;
  sortOption: SortOption;
  handleCategory: (category: Category) => void;
  handleSortOption: (SortOption: SortOption) => void;
}

function isCategory(payload: unknown): payload is Category {
  return Boolean(Object.values(CATEGORY).find((category) => category === payload));
}

function isSortOption(payload: unknown): payload is SortOption {
  return Boolean(Object.values(SORT_OPTIONS).find((option) => option === payload));
}

function NavFilter(props: NavFilterProps) {
  const { category, sortOption, handleCategory, handleSortOption } = props;
  const [addEvent] = useEvents('.restaurant-filter-container');
  const categoryList: Category[] = Object.values(CATEGORY);
  const sortOptionList: SortOption[] = Object.values(SORT_OPTIONS);

  addEvent('change', '#category-filter', (e) => {
    if (e.target instanceof HTMLSelectElement && isCategory(e.target.value)) {
      handleCategory(e.target.value);
    }
  });

  addEvent('change', '#sorting-filter', (e) => {
    if (e.target instanceof HTMLSelectElement && isSortOption(e.target.value)) {
      handleSortOption(e.target.value);
    }
  });

  return `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          ${categoryList
            .map(
              (option) =>
                `<option value=${option} ${option === category && 'selected'}>${option}</option>`
            )
            .join('')}
          
          
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${sortOptionList
            .map(
              (option) =>
                `<option value=${option} ${option === sortOption && 'selected'}>${option}</option>`
            )
            .join('')}
        </select>
      </section>
  `;
}

export { NavFilter };
