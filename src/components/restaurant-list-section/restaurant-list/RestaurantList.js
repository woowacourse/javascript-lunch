import RestaurantListItem from "../restaurant-list-item/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(restaurantList) {
    this.restaurantList = restaurantList;
  }

  render() {
    const $listSection = document.createElement("section");
    $listSection.className = "restaurant-list-container";

    const $list = document.createElement("ul");
    $list.className = "restaurant-list";

    $listSection.append($list);
    this.restaurantList.forEach((restaurantInfo) =>
      $list.append(new RestaurantListItem(restaurantInfo).render())
    );

    return $listSection;
  }
}
