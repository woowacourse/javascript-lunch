import { Category, Filter } from '../../domain/model/LunchRecommendation';
import { useEvents } from '../../utils/core';

const categoryOptions: Category[] = ['한식', '아시안', '양식', '일식', '전체', '중식', '기타'];
const filterOptions: Filter[] = ['이름순', '거리순'];
interface NavProps {
  category: Category;
  filter: Filter;
  handleCategory: (category: Category) => void;
  handleFilter: (filter: Filter) => void;
}

function Nav({ category, filter, handleCategory, handleFilter }: NavProps) {
  const [addEvent] = useEvents('.restaurant-filter-container');

  addEvent('change', '#category-filter', (e) => {
    if (e.target instanceof HTMLSelectElement) handleCategory(e.target.value as Category);
  });

  addEvent('change', '#sorting-filter', (e) => {
    if (e.target instanceof HTMLSelectElement) handleFilter(e.target.value as Filter);
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
                `<option value=${option} ${option === filter && 'selected'}>${option}</option>`
            )
            .join('')}
        </select>
      </section>
    `;
}

export { Nav };
