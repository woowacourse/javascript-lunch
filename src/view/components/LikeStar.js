class LikeStar extends HTMLElement {
  constructor(isLiked) {
    super();
    this.setAttribute('data-isLiked', isLiked);
    this.#applyColor();
  }

  connectedCallback() {
    this.classList.add('like-star');
    this.addEventListener('click', this.#handleClick);
  }

  #handleClick() {
    console.log('hi');
    // TODO: 도메인의 데이터의 isLiked값을 변경한다.
    // TODO: LocalStroage의 데이터 isLiked값을 변경한다.
    // TODO: this의 data-isLiked속성을 변경한다.
  }

  #applyColor() {
    const IMAGE_ID = this.#isLikedStar() ? 'filled' : 'lined';
    this.innerHTML = `<img src="./templates/favorite-icon-${IMAGE_ID}.png" alt="like-star"/>`;
  }

  #isLikedStar() {
    const isLikedString = this.getAttribute('data-isLiked');
    if (isLikedString === 'true') {
      return true;
    }
    if (isLikedString === 'false') {
      return false;
    }
    throw new Error('비정상적인 접근입니다.');
  }

  static get observedAttributes() {
    return ['data-isLiked'];
  }

  attributeChangedCallback() {
    this.#applyColor();
  }
}

export default LikeStar;
