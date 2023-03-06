import type { Category, Component, SortBy, Restaurant } from '../type';
import RestaurantList from './RestaurantList';
import RestaurantListHeader from './RestaurantListHeader';
import { DEFAULT_CATEGORY, REQUEST_RASTAURANT_KEY } from '../utils/constants';
import Header from './Header';

type RestaurantListPageState = {
  category: Category;
  sortBy: SortBy;
  restaurants: Restaurant[];
  toggleAddRestaurantDrawer: () => void;
};

type RestaurantListPageProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

class RestaurantListPage implements Component<RestaurantListPageState> {
  $component: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent, toggleAddRestaurantDrawer }: RestaurantListPageProps) {
    this.$component = document.createElement('div');

    this.state = {
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      restaurants: this.getRestaurants(),
      toggleAddRestaurantDrawer,
    };

    $parent.append(this.$component);
  }

  setState(newState: RestaurantListPageState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$component.innerHTML = '';
    new Header({
      $parent: this.$component,
      toggleAddRestaurantDrawer: this.state.toggleAddRestaurantDrawer,
    }).render();

    new RestaurantListHeader({
      $parent: this.$component,
      category: this.state.category,
      sortBy: this.state.sortBy,
      onChangeCategory: this.onChangeCategory.bind(this),
      onChangeSortBy: this.onChangeSortBy.bind(this),
    }).render();

    new RestaurantList({
      $parent: this.$component,
      category: this.state.category,
      sortBy: this.state.sortBy,
      restaurants: this.state.restaurants,
    }).render();
  }

  getRestaurants() {
    return JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');
  }

  onChangeCategory(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const category = $select.value as Category;

    this.setState({
      ...this.state,
      category,
    });
  }

  onChangeSortBy(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const sortBy = $select.value as SortBy;

    this.setState({
      ...this.state,
      sortBy,
    });
  }
}

export default RestaurantListPage;
