import { CATEGORY_OPTIONS, SORTING_OPTIONS } from '../constants';
import select from './common/select';

const restaurantFilterContainer = () => {
  return `
    <section class="restaurant-filter-container">
      ${select({
        id: 'category-filter',
        name: 'category',
        options: [{ value: '전체', content: '전체' }, ...CATEGORY_OPTIONS],
      })}
      ${select({ id: 'sorting-filter', name: 'sorting', options: SORTING_OPTIONS })}
    </section>
  `;
};

export default restaurantFilterContainer;
