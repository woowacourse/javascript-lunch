import RestaurantListItem from '../../domain/RestaurantListItem';
import RestaurantList from '../RestaurantListSection';
import { TPriority } from '../../domain/RestaurantListItem';
import { ID } from '../../constants';

const SortButton = {
  template() {
    return `
      <select name="sorting" id="${ID.SORTING_FILTER}" class="restaurant-filter">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    this.handleSortingFilter(RestaurantListItem);
  },
  handleSortingFilter(RestaurantListItem: RestaurantListItem) {
    const sortingFilter = document.querySelector(`#${ID.SORTING_FILTER}`) as HTMLSelectElement;

    sortingFilter?.addEventListener('change', () => {
      const select = sortingFilter.options[sortingFilter.selectedIndex].value as TPriority;
      RestaurantListItem.setSort(select);
      const result = RestaurantListItem.filterAndSort();

      RestaurantList.update(RestaurantListItem, result);
    });
  },
};

export default SortButton;
