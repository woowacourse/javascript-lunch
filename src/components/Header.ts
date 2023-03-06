import type { Component } from '../type';

type HeaderState = {};

type MainTemplateProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

class Header implements Component<HeaderState> {
  $component: HTMLElement;
  state: HeaderState;
  toggleAddRestaurantDrawer: () => void;

  constructor({ $parent, toggleAddRestaurantDrawer }: MainTemplateProps) {
    this.$component = document.createElement('header');
    this.$component.classList.add('gnb');

    this.state = {};
    this.toggleAddRestaurantDrawer = toggleAddRestaurantDrawer;

    $parent.append(this.$component);
  }

  setState(newState: HeaderState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$component.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
      </button>
    `;

    const button = this.$component.querySelector('button');
    button?.addEventListener('click', this.toggleAddRestaurantDrawer);
  }
}

export default Header;
