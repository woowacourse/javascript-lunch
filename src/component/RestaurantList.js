import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";

class RestaurantList {
  #el;

  constructor(items) {
    this.#el = $(".restaurant-list");
    this.#el.innerHTML = items.map(LunchInfoCard).join("");
  }

  add(newRestaurant) {
    append(this.#el, toElement(LunchInfoCard(newRestaurant)));
  }
}

export default RestaurantList;
