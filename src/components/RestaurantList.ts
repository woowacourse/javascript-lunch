import { Component, Restaurant } from '../type';

type RestaurantListState = {
  restaurant: Restaurant[];
};

class RestaurantList implements Component<RestaurantListState> {
  $component: HTMLElement;
  state: RestaurantListState;

  constructor($parent: HTMLElement, state: RestaurantListState) {
    this.$component = document.createElement('div');
    this.state = state;
  }

  setState(newState: RestaurantListState) {
    this.state = newState;

    this.render();
  }

  render() {
    // TODO: 매핑으로 띄워주기
  }
}

export default RestaurantList;
