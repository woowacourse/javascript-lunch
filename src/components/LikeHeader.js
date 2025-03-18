import { LIKE_HEADER_TITLE } from '../constant/LikeHeaderTitle';

class LikeHeader {
  #likeHeaderContainer;
  #leftTitle;
  #rightTitle;
  #currentHeader;

  constructor(likeHeaderContainer) {
    this.#likeHeaderContainer = likeHeaderContainer;
    this.#currentHeader = LIKE_HEADER_TITLE.ALL_RESTAURANTS;
    this.#createLikeHeader(LIKE_HEADER_TITLE.ALL_RESTAURANTS, LIKE_HEADER_TITLE.LIKE_RESTAURANTS);
    this.#bindEvent();
  }

  #createLikeHeader(leftTitle, rightTitle) {
    const leftTitleDiv = document.createElement('button');
    leftTitleDiv.classList.add('selected');
    leftTitleDiv.classList.add('all-restaurants');
    const rightTitleDiv = document.createElement('button');
    rightTitleDiv.classList.add('like-restaurants');

    leftTitleDiv.innerText = leftTitle;
    rightTitleDiv.innerText = rightTitle;
    this.#leftTitle = leftTitleDiv;
    this.#rightTitle = rightTitleDiv;

    this.#likeHeaderContainer.appendChild(leftTitleDiv);
    this.#likeHeaderContainer.appendChild(rightTitleDiv);
  }

  #bindEvent = () => {
    this.#leftTitle.addEventListener('click', () => {
      this.#leftTitle.classList.add('selected');
      this.#rightTitle.classList.remove('selected');
      this.#currentHeader = LIKE_HEADER_TITLE.ALL_RESTAURANTS;
    });

    this.#rightTitle.addEventListener('click', () => {
      this.#leftTitle.classList.remove('selected');
      this.#rightTitle.classList.add('selected');
      this.#currentHeader = LIKE_HEADER_TITLE.LIKE_RESTAURANTS;
    });
  };

  getElement() {
    return this.#likeHeaderContainer;
  }

  getCurrentHeader() {
    return this.#currentHeader;
  }
}

export default LikeHeader;
