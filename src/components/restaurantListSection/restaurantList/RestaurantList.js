import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(restaurantList, updateList) {
    this.restaurantList = restaurantList;
    this.updateList = updateList;
  }

  render() {
    const $listSection = document.createElement("section");
    $listSection.className = "restaurant-list-container";

    const $list = document.createElement("ul");
    $list.className = "restaurant-list";

    $listSection.appendChild($list);
    this.restaurantList.forEach((restaurantInfo) =>
      $list.appendChild(
        new RestaurantListItem(
          restaurantInfo,
          this.restaurantList,
          this.updateList
        ).render()
      )
    );

    return $listSection;
  }
}
