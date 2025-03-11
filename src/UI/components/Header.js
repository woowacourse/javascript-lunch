import { DOM } from '../../dom.js';
import { BUTTON_IMAGE_SRC } from '../../../public/assets/imgaePaths.js';

class Header {
  #onButtonClick;

  constructor(onButtonClick) {
    this.#onButtonClick = onButtonClick;
    this.#createHeader();
    this.#bindEvent();
  }

  #createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('gnb');

    const title = this.#createTitle('점심 뭐 먹지');
    const addButton = this.#createButton(BUTTON_IMAGE_SRC.ADD_BUTTON, '음식점 추가');

    header.appendChild(title);
    header.appendChild(addButton);
    
    DOM.APP.prepend(header);
  };

  #createTitle = (titleText) => {
    const title = document.createElement('h1');
    title.classList.add('gnb__title', 'text-title');
    title.textContent = titleText;
    return title;
  };

  #createButton = (buttonImageSrc, buttonImageAlt) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('gnb__button');
    button.setAttribute('aria-label', buttonImageAlt);

    const buttonImage = document.createElement('img');
    buttonImage.src = buttonImageSrc;
    buttonImage.alt = buttonImageAlt;

    button.appendChild(buttonImage);
    return button;
  };
  

  #bindEvent = () => {
    const addButton = document.querySelector('.gnb__button');
    addButton.addEventListener('click', this.#onButtonClick);
  };
}

export default Header;
