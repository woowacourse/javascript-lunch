import RestaurantListItem from '../../domain/RestaurantListItem';
import FilterButton from './FilterButton';
import SortButton from './SortButton';

const FilterSection = {
  template() {
    return `
      <section class="restaurant-filter-container">
        ${FilterButton.template()}
        ${SortButton.template()}
      </section>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    FilterButton.setEvent(RestaurantListItem);
    SortButton.setEvent(RestaurantListItem);
  },
  hide() {
    const restaurantFilterContainer = document.querySelector('.restaurant-filter-container') as HTMLElement;
    restaurantFilterContainer.style.display = 'none';
  },
  show() {
    const restaurantFilterContainer = document.querySelector('.restaurant-filter-container') as HTMLElement;
    restaurantFilterContainer.style.display = 'flex';
  },
};

export default FilterSection;
