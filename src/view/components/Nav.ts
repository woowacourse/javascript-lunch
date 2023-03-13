import '../css/Nav.css';

import { Category, SortOption } from '../../constants/lunchRecommendation';
import { useEvents } from '../../utils/core';

const categoryOptions: Category[] = ['한식', '아시안', '양식', '일식', '전체', '중식', '기타'];
const filterOptions: SortOption[] = ['이름순', '거리순'];
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
