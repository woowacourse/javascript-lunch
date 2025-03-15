import {
  BUTTON_TEXTS,
  BUTTON_TYPES,
  CATEGORY_ASSETS,
  EVENT_TYPES,
  FAVORITE_ASSETS,
} from "../../constants/constants.js";
import Button from "../common/button/Button.js";
import "./restaurantDetail.css";

export default class RestaurantDetail {
  constructor({ onToggleFavorite, onDelete, onClose }) {
    this.onToggleFavorite = onToggleFavorite;
    this.onDelete = onDelete;
    this.onClose = onClose;

    this.#initializeDOM();
    this.#initializeEventListeners();
  }

  #initializeDOM() {
    this.$form = document.createElement("form");

    const $category = document.createElement("div");
    $category.className = "restaurant__category";

    this.$categoryImg = document.createElement("img");
    this.$categoryImg.className = "category-icon";

    const $info = document.createElement("div");
    $info.className = "restaurant__info";

    this.$name = document.createElement("h3");
    this.$name.className = "restaurant__name text-subtitle";

    this.$distance = document.createElement("span");
    this.$distance.className = "restaurant__distance text-body";

    this.$description = document.createElement("p");
    this.$description.className = "restaurant__description text-body";

    this.$favoriteButton = document.createElement("button");
    this.$favoriteButton.className = "favorite-button";
    this.$favoriteButton.setAttribute("aria-label", "자주 가는 음식점 추가");
    this.$favoriteButton.type = "button";

    this.$favoriteImg = document.createElement("img");
    this.$favoriteImg.className = "favorite-icon";
    this.$favoriteImg.setAttribute("alt", "자주 가는 음식점 추가");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $deleteButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.delete,
      action: BUTTON_TYPES.delete,
    }).render();

    this.$closeButton = new Button({
      text: BUTTON_TEXTS.close,
      action: BUTTON_TYPES.close,
    }).render();

    this.$form.append($category, $info, this.$favoriteButton, $buttonContainer);
    $category.append(this.$categoryImg);
    $info.append(this.$name, this.$distance, this.$description);
    this.$favoriteButton.append(this.$favoriteImg);
    $buttonContainer.append($deleteButton, this.$closeButton);
  }

  #initializeEventListeners() {
    this.$favoriteButton.addEventListener(EVENT_TYPES.click, () =>
      this.onToggleFavorite(this.id)
    );
    this.$closeButton.addEventListener(
      EVENT_TYPES.click,
      this.onClose.bind(this)
    );
    this.$form.addEventListener(
      EVENT_TYPES.submit,
      this.#handleSubmit.bind(this)
    );
  }

  #updateContent() {
    this.$categoryImg.setAttribute("src", CATEGORY_ASSETS[this.category]);
    this.$categoryImg.setAttribute("alt", this.category);

    this.$name.textContent = this.name;
    this.$distance.textContent = `캠퍼스부터 ${this.distance}분 내`;
    this.$description.textContent = this.description;

    this.$favoriteImg.setAttribute(
      "src",
      this.isFavorite ? FAVORITE_ASSETS.filled : FAVORITE_ASSETS.lined
    );
  }

  render() {
    return this.$form;
  }

  #handleSubmit(e) {
    e.preventDefault();
    this.onDelete(this.id);
    this.onClose();
  }

  openDetail({ id, category, name, distance, description, link, isFavorite }) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.distance = distance;
    this.description = description;
    this.link = link;
    this.isFavorite = isFavorite;

    this.#updateContent();
  }
}
