import { Restaurant, UIComponent, Uuid } from "../../../types";
import {
  BUTTON_TEXTS,
  BUTTON_TYPES,
  CATEGORY_ASSETS,
  EVENT_TYPES,
  FAVORITE_ASSETS,
} from "../../constants";
import { Button } from "../index";
import "./restaurantDetail.css";

type ToggleFavoriteCallback = (restaurantId: Restaurant["id"]) => void;
type DeleteCallback = (restaurantId: Restaurant["id"]) => void;
type CloseCallback = () => void;

interface RestaurantDetailProps {
  onToggleFavorite: ToggleFavoriteCallback;
  onDelete: DeleteCallback;
  onClose: CloseCallback;
}

export default class RestaurantDetail implements UIComponent {
  private id: Uuid | null = null;

  private onToggleFavorite: ToggleFavoriteCallback;
  private onDelete: DeleteCallback;
  private onClose: CloseCallback;

  private $form: HTMLFormElement = document.createElement("form");
  private $categoryImg: HTMLImageElement = document.createElement("img");
  private $name: HTMLHeadingElement = document.createElement("h3");
  private $distance: HTMLSpanElement = document.createElement("span");
  private $description: HTMLParagraphElement = document.createElement("p");
  private $link: HTMLAnchorElement = document.createElement("a");
  private $favoriteButton: HTMLButtonElement = document.createElement("button");
  private $favoriteImg: HTMLImageElement = document.createElement("img");
  private $closeButton: HTMLButtonElement | undefined;

  constructor({ onToggleFavorite, onDelete, onClose }: RestaurantDetailProps) {
    this.onToggleFavorite = onToggleFavorite;
    this.onDelete = onDelete;
    this.onClose = onClose;

    this.#initializeDOM();
    this.#initializeEventListeners();
  }

  #initializeDOM() {
    const $formContainer = document.createElement("div");
    $formContainer.className = "restaurant-detail__form-container";

    const $detailInfo = document.createElement("div");
    $detailInfo.className = "restaurant-detail__detail-info";

    const $category = document.createElement("div");
    $category.className = "restaurant-detail__category";

    const $info = document.createElement("div");
    $info.className = "restaurant-detail__info";

    this.$categoryImg.className = "category-icon";
    this.$name.className = "restaurant-detail__name text-subtitle";
    this.$distance.className = "restaurant-detail__distance text-body";
    this.$description.className = "restaurant-detail__description text-body";

    this.$link.className = "restaurant-detail__link";
    this.$link.setAttribute("target", "_blank");
    this.$link.setAttribute("rel", "noopener noreferrer");

    this.$favoriteButton.className = "favorite-button";
    this.$favoriteButton.setAttribute("aria-label", "자주 가는 음식점 추가");
    this.$favoriteButton.type = "button";

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
    this.$favoriteButton.addEventListener(EVENT_TYPES.click, () => {
      if (this.id) this.onToggleFavorite(this.id);
    });
    if (this.$closeButton) {
      this.$closeButton.addEventListener(
        EVENT_TYPES.click,
        this.onClose.bind(this)
      );
    }
    this.$form.addEventListener(
      EVENT_TYPES.submit,
      this.#handleSubmit.bind(this)
    );
  }

  updateDetailContent(restaurant: Restaurant) {
    if (!restaurant) return;
    const { id, category, name, distance, description, link, isFavorite } =
      restaurant;

    this.id = id;
    this.$categoryImg.setAttribute("src", CATEGORY_ASSETS[category]);
    this.$categoryImg.setAttribute("alt", category);

    this.$name.textContent = name;
    this.$distance.textContent = `캠퍼스부터 ${distance}분 내`;
    this.$description.textContent = description;
    this.$link.textContent = link;
    this.$link.setAttribute("href", link);

    this.$favoriteImg.setAttribute(
      "src",
      isFavorite ? FAVORITE_ASSETS.filled : FAVORITE_ASSETS.lined
    );
  }

  render(): HTMLFormElement {
    return this.$form;
  }

  #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.id) this.onDelete(this.id);
    this.onClose();
  }
}
