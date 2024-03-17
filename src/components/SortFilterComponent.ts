import RestaurantList from '../domain/restaurantList';
import { SortingValues } from '../types/types';
import SelectComponent from './common/SelectComponent';

const SortFilterComponent = (restaurantList: RestaurantList) => {
  const section = document.createElement('section');
  section.classList.add('restaurant-filter-container');

  const select = SelectComponent({
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

export default SortFilterComponent;
