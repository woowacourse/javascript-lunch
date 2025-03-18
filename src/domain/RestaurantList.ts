import { generateUniqueId } from "../utils/restaurant.js";
import { setRestaurantStorage } from "../utils/store.js";
import Restaurant from "./Restaurant.js";
import { RestaurantInformation } from "./type";

class RestaurantList {
  #restaurants: Restaurant[];

  constructor(listItemContents: RestaurantInformation[] = []) {
    this.#restaurants = this.initialAddRestaurant(listItemContents);
  }

  private initialAddRestaurant(listItemContents: RestaurantInformation[]): Restaurant[] {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  addRestaurant(restaurantInformation: RestaurantInformation): Restaurant {
    const newRestaurant = new Restaurant({
      ...restaurantInformation,
      id: generateUniqueId(),
    });
    this.#restaurants.push(newRestaurant);
    const newRestaurantData: RestaurantInformation[] = this.#restaurants.map((restaurant) => restaurant.information);
    setRestaurantStorage(newRestaurantData);
    return newRestaurant;
  }

  deleteRestaurant(id: string): void {
    const targetIndex = this.#restaurants.findIndex((restaurant) => restaurant.information.id === id);
    if (targetIndex !== -1) {
      this.#restaurants.splice(targetIndex, 1);
      const newRestaurantData: RestaurantInformation[] = this.#restaurants.map((restaurant) => restaurant.information);
      setRestaurantStorage(newRestaurantData);
    }
  }

  updateRestaurant(id: string): void {
    const targetRestaurant = this.#restaurants.find((restaurant) => restaurant.information.id === id);
    if (targetRestaurant) {
      targetRestaurant.updateFavorite();
      const newRestaurantData: RestaurantInformation[] = this.#restaurants.map((restaurant) => restaurant.information);
      setRestaurantStorage(newRestaurantData);
    }
  }

  getRestaurantInformation(id: string): RestaurantInformation | undefined {
    const found = this.#restaurants.find((restaurant) => restaurant.information.id === id);
    return found ? found.information : undefined;
  }

  get restaurants(): Restaurant[] {
    return [...this.#restaurants];
  }
}

export default RestaurantList;
