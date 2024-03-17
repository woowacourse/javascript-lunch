import { CATEGORY_VALUES } from '../constants';
import RestaurantList from '../domain/restaurantList';
import { CategoryValues } from '../types/types';
import Select from './common/Select';

const CategoryFilter = (restaurantList: RestaurantList) => {
  const section = document.createElement('section');
  section.classList.add('restaurant-filter-container');

  const select = Select({
    name: 'category',
    id: 'category-filter',
    className: 'restaurant-filter',
    options: [
      { value: '전체', label: '전체' },
      { value: '한식', label: '한식' },
      { value: '중식', label: '중식' },
      { value: '일식', label: '일식' },
      { value: '양식', label: '양식' },
      { value: '아시안', label: '아시안' },
      { value: '기타', label: '기타' }
    ]
  }).create();

  section.appendChild(select);

  const create = () => section;

  select.addEventListener('change', () => {
    const selectedCategory: string = select.value;

    if (CATEGORY_VALUES.includes(selectedCategory as CategoryValues)) {
      restaurantList.setCategory(selectedCategory as CategoryValues);
    }
  });

  return {
    create
  };
};

export default CategoryFilter;
