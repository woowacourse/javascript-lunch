class LikeHeader {
  #likeHeaderContainer;
  #leftTitle;
  #rightTitle;
  #currentHeader;

  constructor(likeHeaderContainer, leftTitle, rightTitle) {
    this.#likeHeaderContainer = likeHeaderContainer;
    this.#currentHeader = '모든 음식점';
    this.#createLikeHeader(leftTitle, rightTitle);
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
      this.#currentHeader = '모든 음식점';
    });

    this.#rightTitle.addEventListener('click', () => {
      this.#leftTitle.classList.remove('selected');
      this.#rightTitle.classList.add('selected');
      this.#currentHeader = '자주 가는 음식점';
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
