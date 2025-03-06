import { DOM } from '../dom.js';
import AddRestaurantModal from '../modal/AddRestaurantModal.js';

const HEADER_TEMPLATE = `
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="../../public/assets/add-button.png" alt="음식점 추가">
  </button>
`;

class Header {
  modalOpen = false;

  constructor() {
    this.#createHeader();
    this.#bindEvent();
  }

  #createHeader = () => {
    const header = document.createElement('header');
    header.classList = 'gnb';
    header.innerHTML = HEADER_TEMPLATE;
    DOM.APP.prepend(header);
  };

  #bindEvent = () => {
    const addButton = document.querySelector('.gnb__button');
    addButton.addEventListener('click', () => {
      new AddRestaurantModal();
    });
  };
}
export default Header;
