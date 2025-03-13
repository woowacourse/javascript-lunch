import {
  CATEGORY_ASSETS,
  EVENT_TYPES,
  FAVORITE_ASSETS,
} from "../../../constants/constants.js";
import "./restaurantListItem.css";

export default class RestaurantListItem {
  constructor(
    { id, name, category, description, distance, link, isFavorite },
    onToggleFavorite
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.distance = distance;
    this.link = link;
    this.isFavorite = isFavorite;
    this.onToggleFavorite = onToggleFavorite;
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

    $favoriteButton.addEventListener(EVENT_TYPES.click, () =>
      this.onToggleFavorite(this.id)
    );

    return $item;
  }
}
