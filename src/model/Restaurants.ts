import RestaurantCard from "../components/restaurantCard/index.js";
import { $ } from "../utils/dom.js";
import { defaultRestaurants } from "../defaultRestaurants.ts";
import { createElement } from "../utils/createElement.js";
import Restaurant from "./Restaurant.ts";
import { Category, RestaurantInfo } from "../../types/restaurant";

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [...defaultRestaurants];
  }

  #setToLocalStorage() {
    const stringifyData = JSON.stringify(
      this.#restaurants.map((restaurant) => restaurant.toJSON())
    );

    localStorage.setItem("restaurants", stringifyData);
  }

  getFromLocalStorage() {
    const storedDataString = localStorage.getItem("restaurants");
    if (storedDataString) {
      const parsedData = JSON.parse(storedDataString);

      this.#restaurants = parsedData.map(
        (data: RestaurantInfo) => new Restaurant(data)
      );
    }

    return this.#restaurants;
  }

  addRestaurant = (restaurant: Restaurant) => {
    restaurant.grantId(this.#restaurants.length + 1);
    this.#restaurants.push(restaurant);
    // this.#filterType.category = "all";

    // this.filter();
  };

  deleteRestaurant = (id: number) => {
    this.#restaurants = this.#restaurants.filter((res) => res.info.id !== id);
  };
}

export default Restaurants;
