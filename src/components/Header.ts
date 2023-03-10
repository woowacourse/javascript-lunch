import ImagePath from '../../templates/add-button.png';
import { Component } from '../type/Component';

class Header implements Component {
  $target: Element;

  constructor(parent: Element) {
    parent.insertAdjacentHTML('afterbegin', this.template());
    this.$target = parent.firstElementChild!;
  }

  template = () => `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src= ${ImagePath} alt="음식점 추가">
      </button>
    </header>`;

  setButtonHandler = (handler: () => void) => {
    this.$target.querySelector('.gnb__button')?.addEventListener('click', (event) => {
      handler();
    });
  };
}

export default Header;
