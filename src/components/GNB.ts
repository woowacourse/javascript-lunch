import type { Component } from '../interface';

type GNBState = {
  toggleAddRestaurantDrawer: () => void;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

export default class GNB implements Component<GNBState> {
  $target: HTMLElement;
  state: GNBState;

  constructor({ $parent, toggleAddRestaurantDrawer }: MainTemplateProps) {
    this.$target = document.createElement('header');
    this.$target.classList.add('gnb');

    this.state = { toggleAddRestaurantDrawer };

    $parent.append(this.$target);
  }

  setState(newState: GNBState) {
    this.state = newState;
    this.render();
  }

  addEvent() {
    this.$target
      .querySelector('button')
      ?.addEventListener('click', this.state.toggleAddRestaurantDrawer);
  }

  render() {
    this.$target.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
      </button>
    `;
    this.addEvent();
  }
}
