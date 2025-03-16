import { CATEGORY, CATEGORY_ASSETS } from "../../../constants/constants.js";
import "./restaurantListItem.css";

export default class RestaurantListItem {
  constructor(restaurantInfo, updateBookmark) {
    this.restaurantInfo = restaurantInfo;
    this.updateBookmark = updateBookmark;
  }

  render() {
    const { name, category, description, distance, bookmark, id } =
      this.restaurantInfo;

    const $item = document.createElement("li");
    $item.className = "restaurant";
    $item.id = id;

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

    const $bookmarkButton = document.createElement("button");
    $bookmarkButton.className = "restaurant__bookmark";

    const $bookmarkIcon = document.createElement("img");
    $bookmarkIcon.setAttribute(
      "src",
      `./assets/favorite-icon-${bookmark ? "filled" : "lined"}.png`
    );

    $item.appendChild($category);
    $item.appendChild($info);

    $category.appendChild($categoryImg);

    $info.appendChild($name);
    $info.appendChild($distance);
    $info.appendChild($description);

    $bookmarkButton.appendChild($bookmarkIcon);
    $item.appendChild($bookmarkButton);

    $bookmarkButton.addEventListener("click", () =>
      this.#handleButtonClick($bookmarkIcon)
    );

    return $item;
  }

  #handleButtonClick($bookmarkIcon) {
    const src = $bookmarkIcon.getAttribute("src");
    const id = this.restaurantInfo.id;

    if (src === "./assets/favorite-icon-lined.png") {
      $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-filled.png");

      this.updateBookmark(id, true);
    }

    if (src === "./assets/favorite-icon-filled.png") {
      $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-lined.png");

      this.updateBookmark(id, false);
    }
  }
}
