import RestaurantListItem from '../../domain/RestaurantListItem';
import FilterButton from './FilterButton';
import SortButton from './SortButton';

const FilterSection = {
  template() {
    return `${FilterButton.template()}${SortButton.template()}`;
  },
  setEvent(restaurantListItem: RestaurantListItem) {
    FilterButton.setEvent(restaurantListItem);
    SortButton.setEvent(restaurantListItem);
  },
};

export default FilterSection;
