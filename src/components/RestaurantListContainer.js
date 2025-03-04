import { RestaurantItem } from "./RestaurantItem.js";

import createElement from "../util/createElement.js";

export default function RestaurantListContainer(restaurantItems) {
  const $restaurantListContainer = createElement({
    tag: "section",
    className: "restaurant-list-container",
  });

  const $restaurantList = createElement({
    tag: "ul",
    className: "restaurant-list",
  });

  const restaurantElements = restaurantItems.map(
    ({ src, alt, name, distance, description }) =>
      RestaurantItem({ src, alt, name, distance, description })
  );

  $restaurantList.append(...restaurantElements);
  $restaurantListContainer.appendChild($restaurantList);

  return $restaurantListContainer;
}
