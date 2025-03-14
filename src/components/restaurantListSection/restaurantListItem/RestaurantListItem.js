import { CATEGORY, CATEGORY_ASSETS } from "../../../constants/constants.js";
import "./restaurantListItem.css";

export default class RestaurantListItem {
  constructor(restaurantInfo, restaurantList, updateList) {
    this.restaurantInfo = restaurantInfo;
    this.restaurantList = restaurantList;
    this.updateList = updateList;
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

    const $titleAndBookmark = document.createElement("div");
    $titleAndBookmark.className = "restaurant__title__section";
    const $titleWrap = document.createElement("div");

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
    $info.appendChild($titleAndBookmark);
    $info.appendChild($description);

    $titleAndBookmark.appendChild($titleWrap);
    $titleAndBookmark.appendChild($bookmarkButton);

    $titleWrap.appendChild($name);
    $titleWrap.appendChild($distance);
    $titleWrap.appendChild($distance);
    $bookmarkButton.appendChild($bookmarkIcon);

    $bookmarkButton.addEventListener("click", () => {
      const src = $bookmarkIcon.getAttribute("src");
      const index = this.restaurantList.findIndex(
        (restaurant) => restaurant.id === id
      );

      const copy = [...this.restaurantList];
      if (src === "./assets/favorite-icon-lined.png") {
        $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-filled.png");

        copy[index] = { ...copy[index], bookmark: true };

        this.updateList(copy);
      }

      if (src === "./assets/favorite-icon-filled.png") {
        $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-lined.png");

        copy[index] = { ...copy[index], bookmark: false };

        this.updateList(copy);
      }
    });

    return $item;
  }
}
