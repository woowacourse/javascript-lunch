import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";
import MOCK_ITEM from "../mockItem.js";

class RestaurantList {
  $restaurantList;
  restaurantList;

  constructor(restaurantList) {
    this.$restaurantList = $(".restaurant-list");
    this.restaurantList = restaurantList;

    restaurantList.forEach(({ src, name, distance, description, label }) => {
      append(
        this.$restaurantList,
        LunchInfoCard({ src, name, distance, description, label })
      );
    });

    this.count = MOCK_ITEM.restaurantList.length;
  }

  add(newRestaurant) {
    this.restaurantList.push(newRestaurant);
    append(this.$restaurantList, LunchInfoCard(newRestaurant));
  }
}

export default RestaurantList;
