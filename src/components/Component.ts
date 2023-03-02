import { State } from '../types/restaurantTypes';

export default class Component {
  $target: HTMLElement;
  $state: State | undefined;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setState(newState: any): void {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
