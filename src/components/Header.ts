import type { Component } from '../type';

type HeaderState = {};

type MainTemplateProps = {
  $parent: HTMLElement;
  toggleModal: () => void;
};

class Header implements Component<HeaderState> {
  $component: HTMLElement;
  state: HeaderState;
  toggleModal: () => void;

  constructor({ $parent, toggleModal }: MainTemplateProps) {
    this.$component = document.createElement('header');
    this.$component.classList.add('gnb');
    this.state = {};
    $parent.append(this.$component);

    this.toggleModal = toggleModal;
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
    button?.addEventListener('click', this.toggleModal);
  }
}

export default Header;
