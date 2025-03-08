import RestaurantItem from "./RestaurantItem.js";
import createElement from "../../util/createElement.js";
import restaurantDataList from "../../domain/RestaurantDataList.js";
import { RestaurantDataList } from "../../domain/RestaurantDataList.js";

export default function RestaurantListContainer() {
  const $restaurantListContainer = createElement({
    tag: "section",
    classNames: ["restaurant-list-container"],
  });

  const $restaurantList = createElement({
    tag: "ul",
    classNames: ["restaurant-list"],
  });

  function render() {
    const restaurantElements = restaurantDataList
      .getDataList()
      .map(({ id, src, alt, name, distance, description }) =>
        RestaurantItem({ id, src, alt, name, distance, description })
      );

    $restaurantList.replaceChildren(...restaurantElements);
    $restaurantListContainer.appendChild($restaurantList);
  }

  restaurantDataList.subscribe(render);

  render();
  return $restaurantListContainer;
}
