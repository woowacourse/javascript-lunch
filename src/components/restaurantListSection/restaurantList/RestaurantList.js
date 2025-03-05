import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";
import "./restaurantList.css";

export default function RestaurantList(itemsData = []) {
  const $listSection = document.createElement("section");
  $listSection.className = "restaurant-list-container";

  const $list = document.createElement("ul");
  $list.className = "restaurant-list";

  $listSection.appendChild($list);
  itemsData.forEach((data) => $list.appendChild(RestaurantListItem(data)));

  return $listSection;
}
