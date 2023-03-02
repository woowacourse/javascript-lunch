import { State } from '../types/restaurantTypes';

export default class Component {
  $target: HTMLElement;
  $state!: State;

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

  listenEvent() {}

  setState(newState: any): void {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
