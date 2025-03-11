import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantItem from "./RestaurantItem.js";
import RestaurantListContainer from "./RestaurantListContainer.js";

import restaurantDataList from "../../domain/RestaurantDataList.js";
import RestaurantFilterContainer from "./RestaurantFilterContainer.js";

export default function Restaurant() {
  const $body = document.querySelector("body");
  const $restaurantHeader = RestaurantHeader("점심 뭐 먹지");
  
  const $restaurantFilterContainer = RestaurantFilterContainer();

  const $restaurantListContainer = RestaurantListContainer(
    restaurantDataList.getDataList()
  );


  $body.appendChild($restaurantHeader);
  $body.appendChild($restaurantFilterContainer);
  $body.appendChild($restaurantListContainer);
}