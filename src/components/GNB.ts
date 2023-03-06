import type { Component } from '../interface';

type GNBState = {
  toggleAddRestaurantDrawer: () => void;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

class GNB implements Component<GNBState> {
  $component: HTMLElement;
  state: GNBState;

  constructor({ $parent, toggleAddRestaurantDrawer }: MainTemplateProps) {
    this.$component = document.createElement('header');
    this.$component.classList.add('gnb');

    this.state = { toggleAddRestaurantDrawer };

    $parent.append(this.$component);
  }

  setState(newState: GNBState) {
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
    button?.addEventListener('click', this.state.toggleAddRestaurantDrawer);
  }
}

export default GNB;
