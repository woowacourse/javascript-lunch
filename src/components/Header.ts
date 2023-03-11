import ImagePath from '../../templates/add-button.png';
import { Component } from '../type/Component';

class Header implements Component {
  $target: Element;

  constructor(parent: Element) {
    parent.insertAdjacentHTML('afterbegin', this.template());
    this.$target = parent.firstElementChild!;
  }

  template = () => `
    <header>
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
      </div>
    </header>`;

  setButtonHandler = (handler: () => void) => {
    this.$target.querySelector('.gnb__button')?.addEventListener('click', (event) => {
      handler();
    });
  };

  setTabHandler = (allTab: () => void, favoriteTab: () => void) => {
    this.$target.querySelector('#all-restaurant')?.addEventListener('change', allTab);
    this.$target.querySelector('#favorite-restaurant')?.addEventListener('change', favoriteTab);
  };
}

export default Header;
