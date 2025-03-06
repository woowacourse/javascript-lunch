import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantItem from "./RestaurantItem.js";
import RestaurantListContainer from "./RestaurantListContainer.js";

import restaurantDataList from "../../state/RestaurantDataList.js";

export default function Restaurant() {
  const $body = document.querySelector("body");
  const $restaurantHeader = RestaurantHeader("점심 뭐 먹지");

  const $restaurantListContainer = RestaurantListContainer(
    restaurantDataList.getDataList()
  );

  console.log(restaurantDataList.getDataList());

  $body.appendChild($restaurantHeader);
  $body.appendChild($restaurantListContainer);
}
