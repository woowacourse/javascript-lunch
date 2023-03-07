import RestaurantListItem from '../domain/RestaurantListItem';
import RestaurantList from './RestaurantList';
import { TPriority } from '../domain/RestaurantListItem';

const SortButton = {
  template() {
    return `<select name="sorting" id="sorting-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const restaurantListContainer = document.querySelector('.restaurant-list-container') as HTMLElement;
    const sortingFilter = document.querySelector('#sorting-filter') as HTMLSelectElement;
    sortingFilter?.addEventListener('change', () => {
      const select = sortingFilter.options[sortingFilter.selectedIndex].value as TPriority;
      RestaurantListItem.setSort(select);
      const result = RestaurantListItem.filterAndSort();
      restaurantListContainer.innerHTML = RestaurantList.template(result);
    });
  },
};

export default SortButton;
