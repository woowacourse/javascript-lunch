import { DOM } from '../dom.js';

const HEADER_TEMPLATE = `
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="../../public/assets/add-button.png" alt="음식점 추가">
  </button>
`;

class Header {
  constructor(addRestaurantModal) {
    this.addRestaurantModal = addRestaurantModal;
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
      this.addRestaurantModal.openModal();
    });
  };
}
export default Header;
