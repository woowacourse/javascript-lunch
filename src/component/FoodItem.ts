import { toggleFavorite } from "../managers/storageManagers.js";
import { getImgSrcAlt } from "../util/getImgSrcAlt.js";
import Modal from "./layout/modal/Modal.js";

export default class FoodItem {
  container: HTMLElement;

  #id: string;
  #category: Category;
  #name: string;
  #distance: Distance;
  #description: string;

  #isFavorite;

  constructor({ id, category, name, distance, description, isFavorite }: FoodItemProps) {
    this.#id = id;
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#isFavorite = isFavorite;

    this.container = document.createElement("div");

    this.render();
    this.setUpFavoriteToggle();
    this.showDetail();
  }

  getBookmarkIconSrc() {
    if (this.#isFavorite) {
      return "/favorite-icon-filled.png";
    }
    return "/favorite-icon-lined.png";
  }

  setUpFavoriteToggle() {
    const bookmarkIcon = this.container.querySelector(".bookmark-icon");
    if (!bookmarkIcon) return;

    bookmarkIcon.addEventListener("click", () => {
      this.#isFavorite = !this.#isFavorite;
      bookmarkIcon.setAttribute("src", this.getBookmarkIconSrc());

      toggleFavorite(this.#id);
      this.render();
    });
  }

  showDetail() {
    this.container.querySelector("li")?.addEventListener("click", () => {
      const detailModalContent = document.createElement("div");

      const detailModal = new Modal({ content: detailModalContent });
      detailModal.open();
      document.querySelector("body")?.appendChild(detailModal.element);
    });
  }

  render() {
    const { imgAlt, imgSrc } = getImgSrcAlt(this.#category);

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
