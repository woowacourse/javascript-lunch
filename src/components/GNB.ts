import type { Component } from '../interface';

type GNBState = {
  toggleAddRestaurantDrawer: () => void;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

class GNB implements Component<GNBState> {
  $parent: HTMLElement;
  state: GNBState;

  constructor({ $parent, toggleAddRestaurantDrawer }: MainTemplateProps) {
    this.$parent = document.createElement('header');
    this.$parent.classList.add('gnb');

    this.state = { toggleAddRestaurantDrawer };

    $parent.append(this.$parent);
  }

  setState(newState: GNBState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$parent.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
      </button>
    `;

    const button = this.$parent.querySelector('button');
    button?.addEventListener('click', this.state.toggleAddRestaurantDrawer);
  }
}

export default GNB;
