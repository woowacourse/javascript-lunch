import { Category, Component, SortBy, Restaurant } from '../type';

type RestaurantListPageState = {
  category: Category;
  sortBy: SortBy;
  restaurant: Restaurant[];
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
      category: '전체',
      sortBy: 'name',
      restaurant: [],
    };
    $parent.append(this.$component);
  }

  setState(newState: RestaurantListPageState) {
    this.state = newState;
    this.render();
  }

  render() {}
}

export default RestaurantListPage;
