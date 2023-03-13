import type { Component } from './interface';
import AddRestaurantDrawer from './pages/AddRestaurantDrawer';
import RestaurantListPage from './pages/RestaurantListPage';
import GNB from './components/GNB';

type AppState = {
  isDrawerHide: boolean;
};

type AppProps = {
  $parent: HTMLElement;
};

export default class App implements Component<AppState> {
  $target: HTMLElement;
  state: AppState;

  constructor({ $parent }: AppProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('app');

    this.state = {
      isDrawerHide: true,
    };

    $parent.append(this.$target);
  }

  public setState(newState: AppState) {
    this.state = newState;
    this.render();
  }

  public render() {
    this.$target.innerHTML = ``;
    new GNB({
      $parent: this.$target,
      onToggleAddRestaurantDrawer: this.onToggleAddRestaurantDrawer.bind(this),
    }).render();

    new RestaurantListPage({ $parent: this.$target }).render();

    if (!this.state.isDrawerHide) {
      new AddRestaurantDrawer({
        $parent: this.$target,
        onToggleAddRestaurantDrawer: this.onToggleAddRestaurantDrawer.bind(this),
      }).render();
    }
  }

  public onToggleAddRestaurantDrawer() {
    this.setState({
      ...this.state,
      isDrawerHide: !this.state.isDrawerHide,
    });
  }
}
