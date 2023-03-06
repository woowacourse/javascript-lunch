import type { Component } from '../../interface';
import type { Category, SortBy, Restaurant } from '../../type';
import RestaurantList from '../../components/RestaurantList';
import RestaurantListHeader from '../../components/RestaurantListHeader';
import { DEFAULT_CATEGORY, REQUEST_RASTAURANT_KEY } from '../../utils/constants';
import GNB from '../../components/GNB';

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
  $parent: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent, toggleAddRestaurantDrawer }: RestaurantListPageProps) {
    this.$parent = document.createElement('div');

    this.state = {
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      restaurants: this.getRestaurants(),
      toggleAddRestaurantDrawer,
    };

    $parent.append(this.$parent);
  }

  setState(newState: RestaurantListPageState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$parent.innerHTML = '';

    new GNB({
      $parent: this.$parent,
      toggleAddRestaurantDrawer: this.state.toggleAddRestaurantDrawer,
    }).render();

    new RestaurantListHeader({
      $parent: this.$parent,
      category: this.state.category,
      sortBy: this.state.sortBy,
      onChangeCategory: this.onChangeCategory.bind(this),
      onChangeSortBy: this.onChangeSortBy.bind(this),
    }).render();

    new RestaurantList({
      $parent: this.$parent,
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
