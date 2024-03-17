import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';
import restaurantCatalog from '../../domain/RestaurantCatalog';

class LikeStar extends HTMLElement {
  #restaurantId;

  constructor(isLiked: boolean, id: number) {
    super();
    this.setAttribute('data-is-liked', String(isLiked));
    this.#applyColor();
    this.#restaurantId = id;
  }

  connectedCallback() {
    this.classList.add('like-star');
    this.addEventListener('click', (e) => this.#clickHandler(e));
  }

  #clickHandler(e: Event) {
    e.stopPropagation();
    // 도메인의 데이터의 isLiked값을 변경한다.
    restaurantCatalog.restaurants.get(this.#restaurantId)?.changeIsLiked();
    // LocalStorage의 데이터 isLiked값을 변경한다.
    this.#editLocalStorageData();
    // this의 data-isLiked속성을 변경한다.
    this.#changeIsLikeAttribute();
  }

  #editLocalStorageData() {
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    localData[this.#restaurantId].isLiked = !localData[this.#restaurantId].isLiked;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
  }

  #changeIsLikeAttribute() {
    const isLikedString = this.getAttribute('data-is-liked');
    const expectedValue = isLikedString === 'true' ? 'false' : 'true';
    this.setAttribute('data-is-liked', expectedValue);
  }

  #applyColor() {
    const IMAGE_ID = this.#isLikedStar() ? 'filled' : 'lined';
    this.innerHTML = `<img src="./templates/favorite-icon-${IMAGE_ID}.png" alt="like-star"/>`;
  }

  #isLikedStar() {
    const isLikedString = this.getAttribute('data-is-liked');
    if (isLikedString === 'true') {
      return true;
    }
    if (isLikedString === 'false') {
      return false;
    }
    throw new Error('비정상적인 접근입니다.');
  }

  static get observedAttributes() {
    return ['data-is-liked'];
  }

  attributeChangedCallback() {
    this.#applyColor();
  }
}

export default LikeStar;
