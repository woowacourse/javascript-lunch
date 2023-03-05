import Restaurants from "../domain/Restaurants";
import { CategoryOption, SortOption } from "../types/option";
import { Restaurant } from "../types/restaurant";

class RestaurantState {
  #localStorageId: string;

  #restaurants: Restaurants;

  constructor() {
    this.#localStorageId = "lunch-restaurants";

    const list: Restaurant[] = JSON.parse(
      localStorage.getItem(this.#localStorageId) ?? "[]"
    );
    this.#restaurants = new Restaurants(list);
  }

  getListByOption(filter: CategoryOption, sort: SortOption) {
    return this.#restaurants.getListByOption({ filter, sort });
  }

  update(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);
    localStorage.setItem(
      this.#localStorageId,
      JSON.stringify(this.getListByOption("전체", "name"))
    );
  }
}

const restaurantState = new RestaurantState();

export default restaurantState;
