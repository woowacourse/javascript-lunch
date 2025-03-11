import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";
import MOCK_ITEM from "../mockItem.js";

class RestaurantList {
  constructor(id, restaurantList) {
    const $restaurantList = $(".restaurant-list");
    $restaurantList.id = id;

    restaurantList.forEach(({ src, name, distance, description, label }) => {
      append(
        $restaurantList,
        LunchInfoCard({ src, name, distance, description, label })
      );
    });
  }

  static add(id, newRestaurant) {
    const $targetList = document.getElementById(id);
    append($targetList, LunchInfoCard(newRestaurant));
  }
}

export default RestaurantList;
