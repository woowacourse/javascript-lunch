import type { Component } from '../type';
import Header from './Header';
import RestaurantListPage from './RestaurantListPage';

type MainTemplateState = {
  addRestaurantDrawerHide: boolean;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  addRestaurantDrawerHide: boolean;
  toggleAddRestaurantDrawer: () => void;
};

class MainTemplate implements Component<MainTemplateState> {
  $component: HTMLElement;
  state: MainTemplateState;
  toggleAddRestaurantDrawer: () => void;

  constructor({ $parent, addRestaurantDrawerHide, toggleAddRestaurantDrawer }: MainTemplateProps) {
    this.$component = document.createElement('div');
    this.state = {
      addRestaurantDrawerHide,
    };
    this.toggleAddRestaurantDrawer = toggleAddRestaurantDrawer;

    $parent.append(this.$component);
  }

  setState(newState: MainTemplateState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$component.innerHTML = ``;

    new Header({
      $parent: this.$component,
      toggleAddRestaurantDrawer: this.toggleAddRestaurantDrawer,
    }).render();
    new RestaurantListPage({ $parent: this.$component }).render();
  }
}

export default MainTemplate;
