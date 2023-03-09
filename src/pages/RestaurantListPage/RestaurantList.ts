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

  getTemplate() {
    const fragment = document.createDocumentFragment();

    this.categorizeRestaurantByOption().forEach((restaurant) => {
      new RestaurantListItem({
        $parent: fragment,
        restaurant,
        fetchNewRestaurants: this.state.fetchNewRestaurants,
        onOpenInfoDrawer: this.state.onOpenInfoDrawer,
      }).render();
    });

    return fragment;
  }

  render() {
    this.$target.append(this.getTemplate());
  }

  filterByTabBarSelect(restaurants: Restaurant[]) {
    return restaurants.filter((restaurant) =>
      this.state.tabBarSelect === 'favorite' ? restaurant.isFavorite : restaurant
    );
  }

  filterByCategory(restaurants: Restaurant[], category: Category) {
    return restaurants.filter(
      (restaurant) => category === DEFAULT_CATEGORY || restaurant.category === category
    );
  }

  filterBySorting(restaurants: Restaurant[], sortBy: SortBy) {
    const getPivot = (restaurant: Restaurant) =>
      sortBy === 'name' ? restaurant.name : Number(restaurant.distance);
    return restaurants.sort((a, b) => {
      if (getPivot(a) > getPivot(b)) return 1;
      if (getPivot(a) < getPivot(b)) return -1;
      return 0;
    });
  }

  categorizeRestaurantByOption() {
    return this.filterBySorting(
      this.filterByCategory(this.filterByTabBarSelect(this.state.restaurants), this.state.category),
      this.state.sortBy
    );
  }
}
