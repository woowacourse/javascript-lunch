import { generateUniqueId, setRestaurantStorage } from "../utils/store.js";
import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;

  constructor(listItemContents = []) {
    this.#restaurants = this.initialAddRestaurant(listItemContents);
  }

  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant({ ...restaurantInformation, id: generateUniqueId() });
    this.#restaurants.push(newRestaurant);
    const newRestaurantData = this.#restaurants.map((restaurant) => restaurant.information);
    setRestaurantStorage(newRestaurantData);

    return newRestaurant;
  }

  deleteRestaurant(id) {
    const targetIndex = this.#restaurants.findIndex((restaurant) => restaurant.information.id === id);
    this.#restaurants.splice(targetIndex, 1);
    const newRestaurantData = this.#restaurants.map((restaurant) => restaurant.information);
    setRestaurantStorage(newRestaurantData);
  }

  updateRestaurant(id) {
    const targetRestaurant = this.#restaurants.find((restaurant) => restaurant.information.id === id);
    if (targetRestaurant) {
      targetRestaurant.updateInformation();

      const newRestaurantData = this.#restaurants.map((restaurant) => restaurant.information);
      setRestaurantStorage(newRestaurantData);
    }
  }

  getRestaurantInformation(id) {
    const findRestaurant = this.#restaurants.filter((restaurant) => restaurant.information.id === id);
    return findRestaurant[0].information;
  }

  get restaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantList;
