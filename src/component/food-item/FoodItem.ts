import { DEV_ERROR_MESSAGE } from "../../constants/devErrorMessage.ts";
import { DELETE } from "../../constants/systemMessage.ts";
import { getImgSrcAlt } from "../../util/getImgSrcAlt.js";

type CssTypeProps = "row" | "column";

interface FoodItemOptions {
  data: FoodItemType;
  cssType: CssTypeProps;

  onFavoriteClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onFoodItemClick: (foodItem: FoodItemType) => void;

  isModalFoodItem?: boolean;
}

export default class FoodItem {
  container: HTMLElement;

  #data: FoodItemType;

  #cssType: CssTypeProps;

  #onFavoriteClick: (id: string) => void;
  #onDeleteClick: (id: string) => void;
  #onFoodItemClick: (data: FoodItemType) => void;

  constructor({ data, cssType, onFavoriteClick, onDeleteClick, onFoodItemClick }: FoodItemOptions) {
    this.#data = data;
    this.#cssType = cssType;

    this.#onFavoriteClick = onFavoriteClick;
    this.#onDeleteClick = onDeleteClick;
    this.#onFoodItemClick = onFoodItemClick;

    this.container = document.createElement("div");

    this.render();

    this.setUpFavoriteToggle();
    this.setUpDetailModal();
  }

  get element() {
    return this.container.firstElementChild;
  }

  render() {
    const { imgAlt, imgSrc } = getImgSrcAlt(this.#data.category);

    this.container.innerHTML = `
              <li class="restaurant">
            <div class="restaurant__category">
              <img
                src=${imgSrc}
                alt=${imgAlt}
                class="category-icon"
              />
            </div>
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${this.#data.name}</h3>
              <span class="restaurant__distance text-body"
                >캠퍼스부터 ${this.#data.distance}분 내</span
              >
              <p class="restaurant__description ${this.#cssType === "column" ? "restaurant__description-detail" : ""} text-body">
               ${this.#data.description}
              </p>
              ${this.#cssType === "column" && this.#data.link ? `<p>${this.#data.link}</p>` : ""}
              <img src=${this.getBookmarkIconSrc()} alt="즐겨찾기" class="favorite-icon">
            </div>
          </li>
  `;
    this.setDetailCss();
  }

  setUpFavoriteToggle() {
    const bookmarkIcon = this.container.querySelector(".favorite-icon");
    if (!bookmarkIcon) {
      throw new Error(DEV_ERROR_MESSAGE.notFound("favorite-icon"));
    }

    bookmarkIcon.addEventListener("click", this.handleFavoriteClick.bind(this));
  }

  handleFavoriteClick(event: Event) {
    event.stopPropagation();

    this.updateFavoriteIcon();
    this.#onFavoriteClick(this.#data.id);

    this.render();
  }

  updateFavoriteIcon() {
    const bookmarkIcon = this.container.querySelector(".favorite-icon");
    if (!bookmarkIcon) {
      throw new Error(DEV_ERROR_MESSAGE.notFound("favorite-icon"));
    }
    bookmarkIcon.setAttribute("src", this.getBookmarkIconSrc());
  }

  getBookmarkIconSrc() {
    if (this.#data.isFavorite) {
      return "./favorite-icon-filled.png";
    }
    return "./favorite-icon-lined.png";
  }

  setDetailCss() {
    if (this.#cssType === "column") {
      this.container.querySelector("li")?.classList.add("restaurant-detail");
    }
  }

  setUpDetailModal() {
    this.container.querySelector("li")?.addEventListener("click", () => {
      this.#onFoodItemClick(this.#data);
    });
  }

  handleDeleteClick() {
    if (confirm(DELETE)) {
      this.#onDeleteClick(this.#data.id);
    }
  }
}
