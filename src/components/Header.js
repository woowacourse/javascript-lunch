import { DOM } from '../dom.js';
import { BUTTON_IMAGE_SRC } from '../../public/assets/imgaePaths.js';

class Header {
  #addRestaurantModal;

  constructor(addRestaurantModal) {
    this.#addRestaurantModal = addRestaurantModal;
    this.#createHeader();
    this.#bindEvent();
  }

  #createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('gnb');

    const title = document.createElement('h1');
    title.classList.add('gnb__title', 'text-title');
    title.textContent = '점심 뭐 먹지';

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.classList.add('gnb__button');
    addButton.setAttribute('aria-label', '음식점 추가');

    const buttonImage = document.createElement('img');
    buttonImage.src = BUTTON_IMAGE_SRC.ADD_BUTTON;
    buttonImage.alt = '음식점 추가';

    addButton.appendChild(buttonImage);
    header.appendChild(title);
    header.appendChild(addButton);
    
    DOM.APP.prepend(header);
  };

  #bindEvent = () => {
    const addButton = document.querySelector('.gnb__button');
    addButton.addEventListener('click', () => {
      this.#addRestaurantModal.toggleModal();
    });
  };
}

export default Header;
