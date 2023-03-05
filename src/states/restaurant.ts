import Restaurants from "../domain/Restaurants";
import { CategoryOption, SortOption } from "../types/option";
import { Restaurant } from "../types/restaurant";

class RestaurantState {
  #localStorageId: string;

  #restaurants: Restaurants;

  #state: Restaurant[];

  constructor() {
    this.#localStorageId = "lunch-restaurants";

    const list: Restaurant[] = JSON.parse(
      localStorage.getItem(this.#localStorageId) ?? "[]"
    );
    this.#restaurants = new Restaurants(list);
    this.#state = this.#restaurants.getListByOption({
      filter: "전체",
      sort: "name",
    });
  }

  getState() {
    return this.#state;
  }

  setState(filter: CategoryOption = "전체", sort: SortOption = "name") {
    this.#state = this.#restaurants.getListByOption({ filter, sort });
  }

  update(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);

    localStorage.setItem(
      this.#localStorageId,
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );

    this.setState();
  }
}

const restaurantState = new RestaurantState();

export default restaurantState;
