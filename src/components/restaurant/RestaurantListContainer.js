import RestaurantItem from "./restaurantItem/RestaurantItem.js";
import createElement from "../../util/createElement.js";
import restaurantDataList from "../../domain/RestaurantDataList.js";

export default function RestaurantListContainer() {
  const $restaurantListContainer = createElement({
    tag: "section",
    classNames: ["restaurant-list-container"],
  });

  const $restaurantList = createElement({
    tag: "ul",
    classNames: ["restaurant-list"],
  });

  function render(restaurantDataList) {
    const restaurantElements = restaurantDataList.map(
      ({ id, src, alt, name, distance, description, isFavorite }) =>
        RestaurantItem({
          id,
          src,
          alt,
          name,
          distance,
          description,
          isFavorite,
        })
    );

    $restaurantList.replaceChildren(...restaurantElements);
    $restaurantListContainer.appendChild($restaurantList);
  }

  restaurantDataList.subscribe(render);

  return $restaurantListContainer;
}
