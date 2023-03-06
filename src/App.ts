import type { Component } from './type';
import AddRestaurantDrawer from './components/AddRestaurantDrawer';
import RestaurantListPage from './components/RestaurantListPage';

type AppState = {
  addRestaurantDrawerHide: boolean;
};

type AppProps = {
  $parent: HTMLElement;
};

class App implements Component<AppState> {
  $component: HTMLElement;
  state: AppState;

  constructor({ $parent }: AppProps) {
    this.$component = document.createElement('div');
    this.$component.classList.add('app');

    this.state = {
      addRestaurantDrawerHide: true,
    };

    $parent.append(this.$component);
  }

  setState(newState: AppState) {
    this.state = newState;
    this.render();
  }

  render() {
    const { addRestaurantDrawerHide } = this.state;
    this.$component.innerHTML = ``;

    new RestaurantListPage({
      $parent: this.$component,
      toggleAddRestaurantDrawer: this.toggleAddRestaurantDrawer.bind(this),
    }).render();

    if (!addRestaurantDrawerHide) {
      new AddRestaurantDrawer({
        $parent: this.$component,
        toggleAddRestaurantDrawer: this.toggleAddRestaurantDrawer.bind(this),
      }).render();
    }
  }

  toggleAddRestaurantDrawer() {
    const { addRestaurantDrawerHide } = this.state;

    this.setState({
      ...this.state,
      addRestaurantDrawerHide: !addRestaurantDrawerHide,
    });
  }
}

export default App;
