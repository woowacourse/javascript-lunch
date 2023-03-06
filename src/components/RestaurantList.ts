import type { Component } from '../interface';
import type { Category, Restaurant, SortBy } from '../type';
import RestaurantListItem from './RestaurantListItem';
import { DEFAULT_CATEGORY } from '../utils/constants';

type RestaurantListState = {
  restaurants: Restaurant[];
  category: Category;
  sortBy: SortBy;
};

type RestaurantListProps = {
  $parent: HTMLElement;
  restaurants: Restaurant[];
  category: Category;
  sortBy: SortBy;
};

class RestaurantList implements Component<RestaurantListState> {
  $component: HTMLElement;
  state: RestaurantListState;

  constructor({ $parent, restaurants, category, sortBy }: RestaurantListProps) {
    this.$component = document.createElement('div');
    this.state = {
      restaurants,
      category,
      sortBy,
    };

    $parent.append(this.$component);
  }

  setState(newState: RestaurantListState) {
    this.state = newState;
    this.render();
  }

  render() {
    const fragment = document.createDocumentFragment();

    this.categorizeRestaurantByOption().forEach((restaurant) => {
      new RestaurantListItem({ $parent: fragment, restaurant }).render();
    });

    this.$component.append(fragment);
  }

  categorizeRestaurantByOption() {
    const { category, sortBy } = this.state;
    const filtered = this.state.restaurants.filter(
      (restaurant) => category === DEFAULT_CATEGORY || restaurant.category === category
    );

    const getPivot = (restaurant: Restaurant) =>
      sortBy === 'name' ? restaurant.name : Number(restaurant.distance);

    return filtered.sort((a, b) => {
      if (getPivot(a) > getPivot(b)) return 1;
      if (getPivot(a) < getPivot(b)) return -1;
      return 0;
    });
  }
}

export default RestaurantList;
