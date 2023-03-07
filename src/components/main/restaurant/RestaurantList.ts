import { Category, Restaurant, SortBy } from '../../../type';
import Component from '../../Component';
import RestaurantListItem from './RestaurantListItem';
import { DEFAULT_CATEGORY } from '../../../utils/constants';

interface RestaurantListProps {
  currentCategory: Category;
  currentSortBy: SortBy;
  restaurants: Restaurant[];
}

class RestaurantList extends Component {
  props: RestaurantListProps;

  constructor($parent: HTMLElement, props: RestaurantListProps) {
    super({ $parent, tagName: 'ul', className: 'restaurant-list' });
    this.props = props;
  }

  appendChild() {
    this.getShowRestaurants().forEach((restaurant) => {
      new RestaurantListItem(this.$wrapper, { restaurant }).render();
    });
  }

  getShowRestaurants() {
    const { currentCategory, currentSortBy, restaurants } = this.props;
    const filtered = restaurants.filter(
      (restaurant) =>
        currentCategory === DEFAULT_CATEGORY || currentCategory === restaurant.category
    );
    const getPivot = (restaurant: Restaurant) =>
      currentSortBy === 'name' ? restaurant.name : Number(restaurant.distance);

    return filtered.sort((a, b) => {
      if (getPivot(a) > getPivot(b)) return 1;
      if (getPivot(a) < getPivot(b)) return -1;
      return 0;
    });
  }
}

export default RestaurantList;
