import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(restaurantList, updateBookmark, onRestaurantItemClick) {
    this.restaurantList = restaurantList;
    this.updateBookmark = updateBookmark;
    this.onRestaurantItemClick = onRestaurantItemClick;
  }

  render() {
    const $listSection = document.createElement("section");
    $listSection.className = "restaurant-list-container";

    const $list = document.createElement("ul");
    $list.className = "restaurant-list";

    $listSection.appendChild($list);
    this.restaurantList.forEach((restaurantInfo) =>
      $list.appendChild(
        new RestaurantListItem(restaurantInfo, this.updateBookmark).render()
      )
    );

    $list.addEventListener("click", this.onRestaurantItemClick);
    return $listSection;
  }
}
