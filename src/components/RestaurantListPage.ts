import { Category, Component, SortBy, Restaurant } from '../type';
import RestaurantList from './RestaurantList';
import RestaurantListHeader from './RestaurantListHeader';
import { DEFAULT_CATEGORY } from '../utils/constants';

type RestaurantListPageState = {
  category: Category;
  sortBy: SortBy;
  restaurants: Restaurant[];
};

type RestaurantListPageProps = {
  $parent: HTMLElement;
};

class RestaurantListPage implements Component<RestaurantListPageState> {
  $component: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent }: RestaurantListPageProps) {
    this.$component = document.createElement('div');
    this.state = {
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      restaurants: this.getRestaurants(),
    };
    $parent.append(this.$component);
  }

  setState = (newState: RestaurantListPageState) => {
    this.state = newState;
    this.render();
  };

  render = () => {
    this.$component.innerHTML = '';

    new RestaurantListHeader({
      $parent: this.$component,
      category: this.state.category,
      sortBy: this.state.sortBy,
      onChangeCategory: this.onChangeCategory,
      onChangeSortBy: this.onChangeSortBy,
    }).render();

    new RestaurantList({
      $parent: this.$component,
      category: this.state.category,
      sortBy: this.state.sortBy,
      restaurants: this.state.restaurants,
    }).render();
  };

  getRestaurants = () => {
    return JSON.parse(localStorage.getItem('restaurants') ?? '[]');
  };

  onChangeCategory = (e: Event) => {
    const $select = e.target as HTMLSelectElement;
    const category = $select.value as Category;
    this.setState({
      ...this.state,
      category,
    });
  };

  onChangeSortBy = (e: Event) => {
    const $select = e.target as HTMLSelectElement;
    const sortBy = $select.value as SortBy;
    this.setState({
      ...this.state,
      sortBy,
    });
  };
}

export default RestaurantListPage;
