import RestaurantType from "../type/Restaurant";
import Restaurant from "./model/Restaurant";

class Controller {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
    this.loadRestaurants();
  }

  getRestaurants() {
    console.log("식당 부르기");
    return this.#restaurants;
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.#restaurants.push(new Restaurant(newRestaurant));
    const restaurants = JSON.stringify(this.#restaurants);
    localStorage.setItem("restaurants", restaurants);
  }

  loadRestaurants() {
    this.#restaurants = JSON.parse(
      localStorage.getItem("restaurants") as string
    );
  }
}

export default Controller;
