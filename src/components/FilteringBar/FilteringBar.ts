import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../../constant/options';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import { $ } from '../../utils/querySelector';
import Dropdown from '../Common/Dropdown';

const createFilteringBar = () => {
  const render = () => {
    const filterContainer = $('.restaurant-filter-container');

    const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
    const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

    filterContainer.insertAdjacentHTML('beforeend', filterDropdown);
    filterContainer.insertAdjacentHTML('beforeend', sortDropdown);

    setEvents();
  };

  const setEvents = () => {
    const categoryFilter = $('#category-filter');
    const sortingFilter = $('#sorting-filter');

    categoryFilter.addEventListener('change', () => {
      console.log(categoryFilter.value);
      console.log(sortingFilter.value);
    });

    sortingFilter.addEventListener('change', () => {
      console.log(categoryFilter.value);
      console.log(sortingFilter.value);
    });
  };

  render();
};

export default createFilteringBar;
