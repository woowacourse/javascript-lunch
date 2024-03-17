import RestaurantList from '../domain/restaurantList';
import { SortingValues } from '../types/types';
import Select from './common/Select';

const SortFilter = (restaurantList: RestaurantList) => {
  const section = document.createElement('section');
  section.classList.add('restaurant-filter-container');

  const select = Select({
    name: 'sort',
    id: 'sort-filter',
    className: 'restaurant-filter',
    options: [
      { value: '이름순', label: '이름순' },
      { value: '거리순', label: '거리순' }
    ]
  }).create();

  section.appendChild(select);

  const create = () => section;

  select.addEventListener('change', () => {
    const selectedCategory = select.value as SortingValues;
    restaurantList.setSort(selectedCategory);
  });

  return {
    create
  };
};

export default SortFilter;
