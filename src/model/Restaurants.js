import RestaurantCard from "../components/restaurantCard";
import { $ } from "../utils/dom";
import { defaultRestaurants } from "../defaultRestaurants";

class Restaurants {
  #restaurants;
  #filterType;

  constructor() {
    this.#restaurants = [...defaultRestaurants];
    this.#filterType = {
      category: "all",
      option: "name",
      favorite: false,
    };
    this.#filter();
  }

  pushList(restaurant) {
    this.#restaurants.push(restaurant);
    $("select#category").value = "all";
    this.#filterType.category = "all";
    this.#filter();
  }

  changeState(state) {
    const sortType = [...Object.keys(state)];
    const sortState = state[sortType];

    this.#filterType[sortType] = sortState;
    this.#filter();
  }

  #filter() {
    const filtered = this.#filterByCategory();
    if (this.#filterType.option === "name") this.#sortByName(filtered);
    if (this.#filterType.option === "distance") this.#sortByDistance(filtered);
    this.#createRestaurant(filtered);
  }

  #sortByName(restaurants) {
    return restaurants.sort((a, b) => a.info.name.localeCompare(b.info.name));
  }

  #sortByDistance(restaurants) {
    return restaurants.sort((a, b) => a.info.distance - b.info.distance);
  }

  #filterByCategory() {
    if (this.#filterType.category === "all") {
      return [...this.#restaurants];
    }

    return [...this.#restaurants].filter(
      (restaurant) => restaurant.info.category === this.#filterType.category
    );
  }

  #createRestaurant(restaurants) {
    const ulTag = $(".restaurant-list");
    ulTag.replaceChildren();

    restaurants.forEach((restaurant) => {
      ulTag.appendChild(RestaurantCard(restaurant));
    });
  }
}

export default Restaurants;
