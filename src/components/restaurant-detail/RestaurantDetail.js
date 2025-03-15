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

    this.$form = document.createElement("form");
  }

  render() {
    this.$form.innerHTML = "";

    const $category = document.createElement("div");
    $category.className = "restaurant__category";

    const $categoryImg = document.createElement("img");
    $categoryImg.className = "category-icon";
    $categoryImg.setAttribute("src", CATEGORY_ASSETS[this.category]);
    $categoryImg.setAttribute("alt", this.category);

    const $info = document.createElement("div");
    $info.className = "restaurant__info";

    const $name = document.createElement("h3");
    $name.className = "restaurant__name text-subtitle";
    $name.textContent = this.name;

    const $distance = document.createElement("span");
    $distance.className = "restaurant__distance text-body";
    $distance.textContent = `캠퍼스부터 ${this.distance}분 내`;

    const $description = document.createElement("p");
    $description.className = "restaurant__description text-body";
    $description.textContent = this.description;

    const $favoriteButton = document.createElement("button");
    $favoriteButton.className = "favorite-button";
    $favoriteButton.setAttribute("aria-label", "자주 가는 음식점 추가");
    $favoriteButton.type = "button";

    const $favoriteImg = document.createElement("img");
    $favoriteImg.className = "favorite-icon";
    $favoriteImg.setAttribute(
      "src",
      this.isFavorite ? FAVORITE_ASSETS.filled : FAVORITE_ASSETS.lined
    );
    $favoriteImg.setAttribute("alt", "자주 가는 음식점 추가");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $deleteButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.delete,
      action: BUTTON_TYPES.delete,
    }).render();

    const $closeButton = new Button({
      text: BUTTON_TEXTS.close,
      action: BUTTON_TYPES.close,
    }).render();

    this.$form.append($category, $info, $favoriteButton, $buttonContainer);
    $category.append($categoryImg);
    $info.append($name, $distance, $description);
    $favoriteButton.append($favoriteImg);
    $buttonContainer.append($deleteButton, $closeButton);

    $favoriteButton.addEventListener(EVENT_TYPES.click, () =>
      this.onToggleFavorite(this.id)
    );
    $closeButton.addEventListener(EVENT_TYPES.click, this.onClose.bind(this));
    this.$form.addEventListener(
      EVENT_TYPES.submit,
      this.#handleSubmit.bind(this)
    );

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

    this.render();
  }
}
