import { Restaurant } from "./../../../../types/interfaces.js";
import {
  CATEGORY_ASSETS,
  EVENT_TYPES,
  FAVORITE_ASSETS,
} from "../../../constants/constants.js";
import "./restaurantListItem.css";

interface listItemData {
  id: Restaurant["id"];
  category: Restaurant["category"];
  name: Restaurant["name"];
  distance: Restaurant["distance"];
  description: Restaurant["description"];
  isFavorite: Restaurant["isFavorite"];
}

interface RestaurantListItemProps {
  listItemData: listItemData;
  onToggleFavorite: (restaurantId: Restaurant["id"]) => void;
  onOpenDetail: (restaurantId: Restaurant["id"]) => void;
}

export default class RestaurantListItem {
  private id: listItemData["id"];
  private category: listItemData["category"];
  private name: listItemData["name"];
  private distance: listItemData["distance"];
  private description: listItemData["description"];
  private isFavorite: listItemData["isFavorite"];

  private onToggleFavorite: RestaurantListItemProps["onToggleFavorite"];
  private onOpenDetail: RestaurantListItemProps["onOpenDetail"];

  constructor(
    {
      id,
      name,
      category,
      description,
      distance,
      isFavorite,
    }: RestaurantListItemProps["listItemData"],
    onToggleFavorite: RestaurantListItemProps["onToggleFavorite"],
    onOpenDetail: RestaurantListItemProps["onOpenDetail"]
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.distance = distance;
    this.isFavorite = isFavorite;
    this.onToggleFavorite = onToggleFavorite;
    this.onOpenDetail = onOpenDetail;
  }

  render() {
    const $item = document.createElement("li");
    $item.className = "restaurant";

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

    $item.append($category, $info, $favoriteButton);
    $category.append($categoryImg);
    $info.append($name, $distance, $description);
    $favoriteButton.append($favoriteImg);

    $favoriteButton.addEventListener(EVENT_TYPES.click, (e) => {
      e.stopPropagation();
      this.onToggleFavorite(this.id);
    });

    $item.addEventListener(EVENT_TYPES.click, (e: MouseEvent) => {
      if (
        e.target &&
        e.target instanceof HTMLElement &&
        !e.target.closest(".favorite-button")
      ) {
        this.onOpenDetail(this.id);
      }
    });

    return $item;
  }
}
