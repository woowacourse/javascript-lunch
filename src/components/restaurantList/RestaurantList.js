import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";

export default function RestaurantList(itemsData = []) {
  const $list = document.createElement("ul");
  $list.className = "restaurant-list";

  itemsData.forEach((data) => $list.appendChild(RestaurantListItem(data)));

  return $list;
}
