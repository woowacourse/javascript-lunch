import { DOM } from '../../../dom';
import { BUTTON_IMAGE_SRC } from '../../../../public/assets/imagePaths';
import './Header.css';
class Header {
  #onButtonClick: () => void;

  constructor(onButtonClick: () => void) {
    this.#onButtonClick = onButtonClick;
    this.#createHeader();
    this.#bindEvent();
  }

  #createHeader(): void {
    const header = document.createElement('header');
    header.classList.add('gnb');

    const title = this.#createTitle('점심 뭐 먹지');
    const addButton = this.#createButton(BUTTON_IMAGE_SRC.ADD_BUTTON, '음식점 추가');

    header.appendChild(title);
    header.appendChild(addButton);

    if (DOM.APP) {
      DOM.APP!.prepend(header);
    } else {
      console.error('DOM.APP element not found');
    }
  }

  #createTitle(titleText: string): HTMLHeadingElement {
    const title = document.createElement('h1');
    title.classList.add('gnb__title', 'text-title');
    title.textContent = titleText;
    return title;
  }

  #createButton(buttonImageSrc: string, buttonImageAlt: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('gnb__button');
    button.setAttribute('aria-label', buttonImageAlt);

    const buttonImage = document.createElement('img');
    buttonImage.src = buttonImageSrc;
    buttonImage.alt = buttonImageAlt;

    button.appendChild(buttonImage);
    return button;
  }

  #bindEvent(): void {
    const addButton = document.querySelector('.gnb__button');
    if (addButton) {
      addButton.addEventListener('click', this.#onButtonClick);
    } else {
      console.error('Add button element not found');
    }
  }
}

export default Header;
