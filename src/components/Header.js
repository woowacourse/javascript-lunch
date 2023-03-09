import { $ } from '../utils/dom';

const header = `
  <header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="modal-open-button gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>
  </header>`;

export default class Header {
  constructor(onClickAddRestaurantButton) {
    $('body').insertAdjacentHTML('beforebegin', header);

    $('.modal-open-button').addEventListener('click', onClickAddRestaurantButton.bind(this));
  }
}
