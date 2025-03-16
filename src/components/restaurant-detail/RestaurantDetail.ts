import { Restaurant } from "../../../types/interfaces.js";
import {
  BUTTON_TEXTS,
  BUTTON_TYPES,
  CATEGORY_ASSETS,
  EVENT_TYPES,
  FAVORITE_ASSETS,
} from "../../constants/constants.js";
import Button from "../common/button/Button.js";
import "./restaurantDetail.css";

type ToggleFavoriteCallback = (restaurantId: Restaurant["id"]) => void;
type DeleteCallback = (restaurantId: Restaurant["id"]) => void;
type CloseCallback = () => void;

interface RestaurantDetailProps {
  onToggleFavorite: ToggleFavoriteCallback;
  onDelete: DeleteCallback;
  onClose: CloseCallback;
}

export default class RestaurantDetail {
  private onToggleFavorite: ToggleFavoriteCallback;
  private onDelete: DeleteCallback;
  private onClose: CloseCallback;

  private $form!: HTMLFormElement;
  private $categoryImg!: HTMLImageElement;
  private $name!: HTMLHeadingElement;
  private $distance!: HTMLSpanElement;
  private $description!: HTMLParagraphElement;
  private $link!: HTMLAnchorElement;
  private $favoriteButton!: HTMLButtonElement;
  private $favoriteImg!: HTMLImageElement;
  private $closeButton!: HTMLButtonElement;

  private id!: Restaurant["id"];
  private category!: Restaurant["category"];
  private name!: Restaurant["name"];
  private distance!: Restaurant["distance"];
  private description!: Restaurant["description"];
  private link!: Restaurant["link"];
  private isFavorite!: Restaurant["isFavorite"];

  constructor({ onToggleFavorite, onDelete, onClose }: RestaurantDetailProps) {
    this.onToggleFavorite = onToggleFavorite;
    this.onDelete = onDelete;
    this.onClose = onClose;

    this.#initializeDOM();
    this.#initializeEventListeners();
  }

  #initializeDOM() {
    this.$form = document.createElement("form");

    const $formContainer = document.createElement("div");
    $formContainer.className = "restaurant-detail__form-container";

    const $detailInfo = document.createElement("div");
    $detailInfo.className = "restaurant-detail__detail-info";

    const $category = document.createElement("div");
    $category.className = "restaurant-detail__category";

    this.$categoryImg = document.createElement("img");
    this.$categoryImg.className = "category-icon";

    const $info = document.createElement("div");
    $info.className = "restaurant-detail__info";

    this.$name = document.createElement("h3");
    this.$name.className = "restaurant-detail__name text-subtitle";

    this.$distance = document.createElement("span");
    this.$distance.className = "restaurant-detail__distance text-body";

    this.$description = document.createElement("p");
    this.$description.className = "restaurant-detail__description text-body";

    this.$link = document.createElement("a");
    this.$link.className = "restaurant-detail__link";
    this.$link.setAttribute("target", "_blank");
    this.$link.setAttribute("rel", "noopener noreferrer");

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

    $category.append(this.$categoryImg);
    $info.append(this.$name, this.$distance, this.$description, this.$link);
    this.$favoriteButton.append(this.$favoriteImg);
    $detailInfo.append($category, $info);
    $formContainer.append($detailInfo, this.$favoriteButton);
    $buttonContainer.append($deleteButton, this.$closeButton);
    this.$form.append($formContainer, $buttonContainer);
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
    if (this.description) this.$description.textContent = this.description;
    if (this.link) {
      this.$link.textContent = this.link;
      this.$link.setAttribute("href", this.link);
    }

    this.$favoriteImg.setAttribute(
      "src",
      this.isFavorite ? FAVORITE_ASSETS.filled : FAVORITE_ASSETS.lined
    );
  }

  render() {
    return this.$form;
  }

  #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.onDelete(this.id);
    this.onClose();
  }

  openDetail({
    id,
    category,
    name,
    distance,
    description,
    link,
    isFavorite,
  }: Restaurant) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.distance = distance;
    if (description) this.description = description;
    if (link) this.link = link;
    this.isFavorite = isFavorite;

    this.#updateContent();
  }
}
