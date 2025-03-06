import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor() {
    this.itemsData = [];
  }

  render() {
    const $listSection = document.createElement("section");
    $listSection.className = "restaurant-list-container";

    const $list = document.createElement("ul");
    $list.className = "restaurant-list";

    $listSection.appendChild($list);
    this.itemsData.forEach((data) =>
      $list.appendChild(new RestaurantListItem(data).render())
    );

    return $listSection;
  }
}
