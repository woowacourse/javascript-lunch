import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";
import state from "../state.js";

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

    this.count = state.restaurantList.length;
  }

  add(newRestaurant) {
    this.restaurantList.push(newRestaurant);
    append(this.$restaurantList, LunchInfoCard(newRestaurant));
  }
}

export default RestaurantList;
