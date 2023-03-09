import type { Component } from '../../interface';
import type { Category, Restaurant, SortBy, TabBarSelect } from '../../type';
import RestaurantListItem from '../../components/RestaurantListItem';
import { DEFAULT_CATEGORY } from '../../utils/constants';

type RestaurantListState = {
  restaurants: Restaurant[];
  category: Category;
  sortBy: SortBy;
  tabBarSelect: TabBarSelect;
  fetchNewRestaurants: () => void;
  onOpenInfoDrawer: (e: Event) => void;
};

type RestaurantListProps = {
  $parent: HTMLElement;
  restaurants: Restaurant[];
  category: Category;
  sortBy: SortBy;
  tabBarSelect: TabBarSelect;
  fetchNewRestaurants: () => void;
  onOpenInfoDrawer: (e: Event) => void;
};

export default class RestaurantList implements Component<RestaurantListState> {
  $target: HTMLElement;
  state: RestaurantListState;

  constructor({
    $parent,
    restaurants,
    category,
    sortBy,
    tabBarSelect,
    fetchNewRestaurants,
    onOpenInfoDrawer,
  }: RestaurantListProps) {
    this.$target = document.createElement('ul');
    this.$target.classList.add('restaurant-list');
    this.state = {
      restaurants,
      category,
      sortBy,
      tabBarSelect,
      fetchNewRestaurants,
      onOpenInfoDrawer,
    };

    $parent.append(this.$target);
  }

  render() {
    const fragment = document.createDocumentFragment();

    this.categorizeRestaurantByOption().forEach((restaurant) => {
      new RestaurantListItem({
        $parent: fragment,
        restaurant,
        fetchNewRestaurants: this.state.fetchNewRestaurants,
        onOpenInfoDrawer: this.state.onOpenInfoDrawer,
      }).render();
    });

    this.$target.append(fragment);
  }

  // TODO: 메서드 분할하기 (너무 크다)
  categorizeRestaurantByOption() {
    const { category, sortBy } = this.state;
    const filteredByTabBarSelect = this.state.restaurants.filter((restaurant) =>
      this.state.tabBarSelect === 'favorite' ? restaurant.isFavorite : restaurant
    );
    const filteredByCategory = filteredByTabBarSelect.filter(
      (restaurant) => category === DEFAULT_CATEGORY || restaurant.category === category
    );

    const getPivot = (restaurant: Restaurant) =>
      sortBy === 'name' ? restaurant.name : Number(restaurant.distance);

    return filteredByCategory.sort((a, b) => {
      if (getPivot(a) > getPivot(b)) return 1;
      if (getPivot(a) < getPivot(b)) return -1;
      return 0;
    });
  }
}
