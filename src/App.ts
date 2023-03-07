import type { Component } from './interface';
import AddRestaurantDrawer from './pages/AddRestaurantDrawer';
import RestaurantListPage from './pages/RestaurantListPage';

type AppState = {
  addRestaurantDrawerHide: boolean;
};

type AppProps = {
  $parent: HTMLElement;
};

class App implements Component<AppState> {
  $target: HTMLElement;
  state: AppState;

  constructor({ $parent }: AppProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('app');

    this.state = {
      addRestaurantDrawerHide: true,
    };

    $parent.append(this.$target);
  }

  setState(newState: AppState) {
    this.state = newState;
    this.render();
  }

  render() {
    const { addRestaurantDrawerHide } = this.state;
    this.$target.innerHTML = ``;

    new RestaurantListPage({
      $parent: this.$target,
      toggleAddRestaurantDrawer: this.toggleAddRestaurantDrawer.bind(this),
    }).render();

    if (!addRestaurantDrawerHide) {
      new AddRestaurantDrawer({
        $parent: this.$target,
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
