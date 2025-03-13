import { getImgSrcAlt } from "../util/getImgSrcAlt.js";

export default class FoodItem {
  container!: HTMLElement;

  #category;
  #name;
  #distance;
  #description;

  #isClick = false;

  constructor({ category, name, distance, description }: FoodItemProps) {
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;

    this.render();
    this.handleIsClick();
  }

  getBookmarkIconSrc() {
    if (this.#isClick) {
      return "/favorite-icon-filled.png";
    }
    return "/favorite-icon-lined.png";
  }

  handleIsClick() {
    const bookmarkIcon = this.container.querySelector(".bookmark-icon");
    if (!bookmarkIcon) return;

    bookmarkIcon.addEventListener("click", () => {
      this.#isClick = !this.#isClick;
      bookmarkIcon.setAttribute("src", this.getBookmarkIconSrc());
    });
  }

  render() {
    const { imgAlt, imgSrc } = getImgSrcAlt(this.#category);

    this.container = document.createElement("div");
    this.container.innerHTML = `
  <li class="restaurant">
    <div class="restaurant__category">
      <img src="${imgSrc}" alt="${imgAlt}" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <div class="restaurant__info-header">
        <div class="restaurant__title-container">
          <h3 class="restaurant__name text-subtitle">${this.#name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${this.#distance}분 내</span
          >
        </div>
        <img src=${this.getBookmarkIconSrc()} alt="즐겨찾기" class="bookmark-icon">
      </div>
      <p class="restaurant__description text-body">${this.#description}</p>
    </div>
  </li>
  `;
  }

  get element() {
    return this.container.firstElementChild;
  }
}
