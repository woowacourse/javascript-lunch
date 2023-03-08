import { showModal } from '../modal';
import addButton from '../../templates/add-button.png';

export default class Header {
  constructor(rootElement) {
    this.$root = rootElement;
  }

  render() {
    this.$root.insertAdjacentHTML('afterbegin', this.template());
  }

  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button id="add-restaurant-button" type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      </header>
    `;
  }

  bindEvents() {
    const modalOpenButton = this.$root.querySelector('#add-restaurant-button');
    modalOpenButton.addEventListener('click', showModal);
  }
}
