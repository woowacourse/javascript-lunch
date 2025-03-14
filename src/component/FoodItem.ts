import { toggleFavorite } from "../managers/storageManagers.js";
import { getImgSrcAlt } from "../util/getImgSrcAlt.js";
import { Button } from "./button/Button.js";
import { ButtonContainer } from "./button/ButtonContainer.js";
import Modal from "./layout/modal/Modal.js";

type CssTypeProps = "row" | "column";

interface FoodItemOptions {
  data: FoodItemProps;
  cssType: CssTypeProps;
}

export default class FoodItem {
  container: HTMLElement;

  #data: FoodItemProps;
  #id: string;
  #category: Category;
  #name: string;
  #distance: Distance;
  #description: string;
  #link: string;

  #isFavorite;

  #cssType: CssTypeProps;

  constructor({ data, cssType }: FoodItemOptions) {
    this.#data = data;
    this.#cssType = cssType;

    this.#id = data.id;
    this.#category = data.category;
    this.#name = data.name;
    this.#distance = data.distance;
    this.#description = data.description;
    this.#isFavorite = data.isFavorite;
    this.#link = data.link;

    this.container = document.createElement("div");

    this.render();
    this.setUpFavoriteToggle();
    this.setCss();
    this.showDetail();
  }

  getBookmarkIconSrc() {
    if (this.#isFavorite) {
      return "/favorite-icon-filled.png";
    }
    return "/favorite-icon-lined.png";
  }

  setUpFavoriteToggle() {
    const bookmarkIcon = this.container.querySelector(".favorite-icon");
    if (!bookmarkIcon) return;

    bookmarkIcon.addEventListener("click", (event) => {
      event.stopPropagation();

      this.#isFavorite = !this.#isFavorite;
      bookmarkIcon.setAttribute("src", this.getBookmarkIconSrc());

      toggleFavorite(this.#id);
      this.render();
    });
  }

  showDetail() {
    this.container.querySelector("li")?.addEventListener("click", () => {
      const fragment = document.createDocumentFragment();

      const detailFoodItem = new FoodItem({
        data: this.#data,
        cssType: "column",
      });
      if (!detailFoodItem.element) return;

      fragment.appendChild(detailFoodItem.element);

      const buttonContainer = ButtonContainer({
        buttons: [
          Button({ name: "delete", innerText: "삭제하기", cssType: "secondary" }),
          Button({ name: "close", innerText: "닫기", onClick: () => detailModal.close() }),
        ],
      });
      fragment.appendChild(buttonContainer);

      const detailModal = new Modal({ content: fragment });

      detailModal.open();
      document.querySelector("body")?.appendChild(detailModal.element);
    });
  }

  setCss() {
    if (this.#cssType === "column") {
      this.container.querySelector("li")?.classList.add("restaurant-detail");
    }
  }

  render() {
    const { imgAlt, imgSrc } = getImgSrcAlt(this.#category);

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
              <h3 class="restaurant__name text-subtitle">${this.#name}</h3>
              <span class="restaurant__distance text-body"
                >캠퍼스부터 ${this.#distance}분 내</span
              >
              <p class="restaurant__description text-body">
               ${this.#description}
              </p>
              ${this.#cssType === "column" && this.#link ? `<p>${this.#link}</p>` : ""}
              <img src=${this.getBookmarkIconSrc()} alt="즐겨찾기" class="favorite-icon">
            </div>
          </li>
  `;
  }

  get element() {
    return this.container.firstElementChild;
  }
}
