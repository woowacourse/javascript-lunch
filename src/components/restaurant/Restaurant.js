import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantItem from "./RestaurantItem.js";
import RestaurantListContainer from "./RestaurantListContainer.js";

import restaurantDataList from "../../domain/RestaurantDataList.js";

export default function Restaurant() {
  const $restaurantHeader = RestaurantHeader({ title: "점심 뭐 먹지" });

  const $restaurantListContainer = RestaurantListContainer(
    restaurantDataList.getDataList()
  );

  document.body.appendChild($restaurantHeader);
  document.body.appendChild($restaurantListContainer);
}
