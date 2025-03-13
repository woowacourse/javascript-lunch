import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.ts";
import { Restaurant } from "../../types/RestaurantType.ts";

class RestaurantList {
  #el;

  constructor(items: Restaurant[]) {
    this.#el = $(".restaurant-list");
    this.#el.innerHTML = items.map(LunchInfoCard).join("");
  }

  add(newRestaurant: Restaurant) {
    append(this.#el, toElement(LunchInfoCard(newRestaurant)));
  }
}

export default RestaurantList;
