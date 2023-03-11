import RestaurantList from './RestaurantList';

const SortButton = {
  template() {
    return `<select name="sorting" id="sorting-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>`;
  },

  setEvent() {
    const restaurantListContainer = document.querySelector(
      '.restaurant-list-container',
    ) as HTMLElement;
    const sortingFilter = document.querySelector(
      '#sorting-filter',
    ) as HTMLSelectElement;
    sortingFilter?.addEventListener('change', () => {
      const select = sortingFilter.options[sortingFilter.selectedIndex].value;
      const result = RestaurantList.listUp(RestaurantList.filterState, select);
      restaurantListContainer.innerHTML = RestaurantList.template(result);
    });
  },
};

export default SortButton;
