import ImagePath from '../../templates/add-button.png';
import { Component } from '../type/Component';

class Header implements Component {
  $target: Element;

  constructor(parent: Element) {
    this.$target = document.createElement('header');
    parent.insertAdjacentElement('afterbegin', this.$target);
  }

  template() {
    return `
        <div class="gnb">
          <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
          <button type="button" class="gnb__button" aria-label="음식점 추가">
            <img src= ${ImagePath} alt="음식점 추가">
          </button>
        </div>
        <div class="gnb__tab">
            <input type="radio" name="tabs" id="all-restaurant" checked>
            <label for="all-restaurant">모든 음식점</label>
            <input type="radio" name="tabs" id="favorite-restaurant">
            <label for="favorite-restaurant">자주 가는 음식점</label>
        </div>`;
  }

  render(): void {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }

  setEventHandler(elementName: 'addButton' | 'allTab' | 'favoriteTab', handler: () => void) {
    switch (elementName) {
      case 'addButton':
        this.$target.querySelector('.gnb__button')?.addEventListener('click', handler);
        break;
      case 'allTab':
        this.$target.querySelector('#all-restaurant')?.addEventListener('change', handler);
        break;
      case 'favoriteTab':
        this.$target.querySelector('#favorite-restaurant')?.addEventListener('change', handler);
        break;
    }
  }
}

export default Header;
