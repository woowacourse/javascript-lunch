import { CATEGORY, CATEGORY_ASSETS } from "../../../constants/constants.js";
import "./restaurantListItem.css";

export default class RestaurantListItem {
  constructor(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;
  }

  render() {
    const { name, category, description, distance } = this.restaurantInfo;

    const $item = document.createElement("li");
    $item.className = "restaurant";

    const $category = document.createElement("div");
    $category.className = "restaurant__category";

    const $categoryImg = document.createElement("img");
    $categoryImg.className = "category-icon";
    $categoryImg.src = CATEGORY_ASSETS[category];
    $categoryImg.setAttribute("alt", category);

    const $info = document.createElement("div");
    $info.className = "restaurant__info";

    const $name = document.createElement("h3");
    $name.className = "restaurant__name text-subtitle";
    $name.textContent = name;

    const $distance = document.createElement("span");
    $distance.className = "restaurant__distance text-body";
    $distance.textContent = `캠퍼스부터 ${distance}분 내`;

    const $description = document.createElement("p");
    $description.className = "restaurant__description text-body";
    $description.textContent = description;

    $item.appendChild($category);
    $item.appendChild($info);

    $category.appendChild($categoryImg);
    $info.appendChild($name);
    $info.appendChild($distance);
    $info.appendChild($description);

    return $item;
  }
}
