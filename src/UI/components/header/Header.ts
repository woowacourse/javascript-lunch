import { BUTTON_IMAGE_SRC } from '../../../../public/assets/imagePaths';
import './Header.css';

class $Header {
  #header: HTMLHeadElement;
  #title: HTMLHeadingElement;
  #button: HTMLButtonElement;

  constructor(onButtonClick: () => void) {
    this.#title = this.#createTitle('점심 뭐 먹지');
    this.#button = this.#createButton(BUTTON_IMAGE_SRC.ADD_BUTTON, '음식점 추가');
    this.#header = this.#createHeader();
    this.#bindEvent(onButtonClick);
  }

  #createHeader(): HTMLHeadElement {
    const header = document.createElement('header');
    header.classList.add('gnb');
    header.appendChild(this.#title);
    header.appendChild(this.#button);
    return header;
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

  #bindEvent(onButtonClick: () => void): void {
    this.#button.addEventListener('click', onButtonClick);
  }

  getElement(): HTMLHeadElement {
    return this.#header;
  }
}

export default $Header;
