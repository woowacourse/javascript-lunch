import { defaultRestaurants } from "../defaultRestaurants.ts";
import Restaurant from "./Restaurant.ts";
import { RestaurantInfo } from "../../types/restaurant";

class Restaurants {
  #restaurants!: Restaurant[];

  constructor(restaurantsData: Restaurant[]) {
    this.#restaurants = restaurantsData || [...defaultRestaurants];
    this.#getFromLocalStorage();
  }

  setToLocalStorage() {
    const stringifyData = JSON.stringify(
      this.#restaurants.map((restaurant) => restaurant.toJSON())
    );

    localStorage.setItem("restaurants", stringifyData);
  }

  #getFromLocalStorage() {
    const storedDataString = localStorage.getItem("restaurants");

    if (storedDataString) {
      const parsedData = JSON.parse(storedDataString);

      this.#restaurants = parsedData.map(
        (data: RestaurantInfo) => new Restaurant(data)
      );
      return [...this.#restaurants];
    }

    this.setToLocalStorage();
    return [...this.#restaurants];
  }

  addRestaurant = (restaurant: Restaurant) => {
    restaurant.grantId(this.#restaurants.length + 1);
    this.#restaurants.push(restaurant);
    this.setToLocalStorage();
  };

  deleteRestaurant = (id: number) => {
    this.#restaurants = this.#restaurants.filter((res) => res.info.id !== id);
    this.setToLocalStorage();
  };

  get restaurants(): Restaurant[] {
    return [...this.#restaurants];
  }
}

export default Restaurants;
