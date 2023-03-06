import { Category, Restaurant, SortBy } from '../../../type';
import Component from '../../Component';
import RestaurantListItem from './RestaurantListItem';
import { DEFAULT_CATEGORY } from '../../../utils/constants';

interface RestaurantListProps {
  currentCategory: Category;
  currentSortBy: SortBy;
  restaurants: Restaurant[];
}

interface RestaurantListState {}

class RestaurantList extends Component<RestaurantListProps, RestaurantListState> {
  constructor($parent: HTMLElement, props: RestaurantListProps) {
    super({ $parent, props, tagName: 'ul', initialState: {} });
  }

  appendChild() {
    this.getShowRestaurants().forEach((restaurant) => {
      new RestaurantListItem(this.$wrapper, { restaurant });
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
