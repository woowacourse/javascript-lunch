import RestaurantList from '../domain/restaurantList';
import { SortingValues } from '../types/types';
import Select from './common/Select';

const SortFilter = (restaurantList: RestaurantList) => {
  const createSection = (): HTMLElement => {
    const section = document.createElement('section');
    section.classList.add('restaurant-filter-container');
    return section;
  };

  const setupSelectChangeListener = (selectElement: HTMLSelectElement): void => {
    selectElement.addEventListener('change', () => {
      const selectedCategory = selectElement.value as SortingValues;
      restaurantList.setSort(selectedCategory);
    });
  };

  const assembleSortFilter = (): HTMLElement => {
    const section = createSection();
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
    setupSelectChangeListener(select);
    return section;
  };

  const sortFilterSection = assembleSortFilter();

  const create = (): HTMLElement => sortFilterSection;

  return { create };
};

export default SortFilter;
