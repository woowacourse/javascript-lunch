export const LIKE_HEADER_STATE = Object.freeze({
  ALL: 'ALL',
  LIKE: 'LIKE',
});

const LIKE_HEADER_TITLE = Object.freeze({
  [LIKE_HEADER_STATE.ALL]: '모든 음식점',
  [LIKE_HEADER_STATE.LIKE]: '자주 가는 음식점',
});

class LikeHeader {
  #likeHeaderContainer;
  #leftTitle;
  #rightTitle;
  #currentHeader;

  constructor(likeHeaderContainer) {
    this.#likeHeaderContainer = likeHeaderContainer;
    this.#currentHeader = LIKE_HEADER_STATE.ALL;
    this.#createLikeHeader();
    this.#bindEvent();
  }

  #createLikeHeader() {
    const leftTitleDiv = document.createElement('button');
    leftTitleDiv.classList.add('selected');
    leftTitleDiv.classList.add('all-restaurants');
    const rightTitleDiv = document.createElement('button');
    rightTitleDiv.classList.add('like-restaurants');

    leftTitleDiv.innerText = LIKE_HEADER_TITLE[LIKE_HEADER_STATE.ALL];
    rightTitleDiv.innerText = LIKE_HEADER_TITLE[LIKE_HEADER_STATE.LIKE];
    this.#leftTitle = leftTitleDiv;
    this.#rightTitle = rightTitleDiv;

    this.#likeHeaderContainer.appendChild(leftTitleDiv);
    this.#likeHeaderContainer.appendChild(rightTitleDiv);
  }

  #bindEvent = () => {
    this.#leftTitle.addEventListener('click', () => {
      this.#leftTitle.classList.add('selected');
      this.#rightTitle.classList.remove('selected');
      this.#currentHeader = LIKE_HEADER_STATE.ALL;
    });

    this.#rightTitle.addEventListener('click', () => {
      this.#leftTitle.classList.remove('selected');
      this.#rightTitle.classList.add('selected');
      this.#currentHeader = LIKE_HEADER_STATE.LIKE;
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
