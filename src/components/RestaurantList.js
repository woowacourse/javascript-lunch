import { RestaurantItem } from "./RestaurantItem.js";

import createElement from "../util/createElement.js";

export default function RestaurantList(restaurantItems) {
  const $restaurantList = createElement({
    tag: "ul",
    className: "restaurant-list",
  });

  restaurantItems.forEach((restaurantItem) => {
    const { src, alt, name, distance, description } = restaurantItem;
    $restaurantList.prepend(
      RestaurantItem({
        src,
        alt,
        name,
        distance,
        description,
      })
    );
  });

  return $restaurantList;
}
