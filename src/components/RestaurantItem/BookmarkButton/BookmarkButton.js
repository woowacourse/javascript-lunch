import './BookmarkButton.css';

import bookmarkIconFilled from '../../../statics/imgs/favorite-icon-filled.png';
import bookmarkIconLined from '../../../statics/imgs/favorite-icon-lined.png';

export const BOOKMARK_BUTTON_EVENTS = {
  click: 'bookmarkBtnClicked',
};

export default class BookmarkButton extends HTMLButtonElement {
  #isBookmark;

  #imageElement;

  constructor(isBookmark) {
    super();

    this.#isBookmark = isBookmark;
    this.#imageElement = this.#createImgElement();

    this.classList.add('restaurant__bookmark');
    this.appendChild(this.#imageElement);

    this.#render();
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      this.#isBookmark = !this.#isBookmark;
      this.#render();

      this.dispatchEvent(
        new CustomEvent(BOOKMARK_BUTTON_EVENTS.click, {
          bubbles: true,
          detail: { isBookmark: this.#isBookmark },
        }),
      );
    });
  }

  #render() {
    this.#imageElement.src = this.#isBookmark ? bookmarkIconFilled : bookmarkIconLined;
  }

  #createImgElement() {
    const imgElement = document.createElement('img');
    imgElement.src = this.#isBookmark ? bookmarkIconFilled : bookmarkIconLined;
    return imgElement;
  }
}
