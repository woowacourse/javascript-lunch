import RestaurantItem from "./RestaurantItem.js";

import createElement from "../../util/createElement.js";

export default function RestaurantListContainer(restaurantItems) {

  const $restaurantListContainer = createElement({
    tag: "section",
    classNames: ["restaurant-list-container"],
  });

  const $restaurantList = createElement({
    tag: "ul",
    classNames: ["restaurant-list"],
  });

  const restaurantElements = restaurantItems.map(
    ({ id, src, alt, name, distance, description, isWish }) =>
      RestaurantItem({ id, src, alt, name, distance, description, isWish })
  );

  $restaurantList.append(...restaurantElements);
  $restaurantListContainer.appendChild($restaurantList);

  return $restaurantListContainer;
}
