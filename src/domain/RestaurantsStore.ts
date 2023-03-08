import { Category, Restaurant, SortMethod } from "../abstracts/types";
import {
  CATEGORY_DEFAULT,
  RESTAURANTS_STORAGE,
  SORT_METHOD,
} from "../abstracts/constants";

class RestaurantsStore {
  #restaurantList: Restaurant[] = [];
  #category: Category = CATEGORY_DEFAULT;
  #sortMethod: SortMethod = SORT_METHOD.NAME;

  constructor() {
    if (!localStorage.getItem(RESTAURANTS_STORAGE)) {
      localStorage.setItem(
        RESTAURANTS_STORAGE,
        JSON.stringify(this.#restaurantList)
      );
    }
  }

  get restaurantList() {
    return this.#restaurantList;
  }

  set category(category: Category) {
    this.#category = category;
  }

  set sortMethod(sortMethod: SortMethod) {
    this.#sortMethod = sortMethod;
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurantList = JSON.parse(
      localStorage.getItem(RESTAURANTS_STORAGE) as string
    );
    this.#restaurantList.push(restaurant);

    localStorage.setItem(
      RESTAURANTS_STORAGE,
      JSON.stringify(this.#restaurantList)
    );
  }

  filterByCategory() {
    this.#restaurantList = JSON.parse(
      localStorage.getItem(RESTAURANTS_STORAGE) as string
    );

    if (this.#category !== CATEGORY_DEFAULT) {
      this.#restaurantList = this.#restaurantList.filter(
        (restaurant) => restaurant.category === this.#category
      );
    }
  }

  sortRestaurants() {
    switch (this.#sortMethod) {
      case SORT_METHOD.NAME:
        this.#restaurantList = this.#restaurantList.sort((prev, next) =>
          prev.name > next.name ? 1 : -1
        );
        break;
      case SORT_METHOD.DISTANCE:
        this.#restaurantList = this.#restaurantList.sort(
          (prev, next) => prev.distance - next.distance
        );
        break;
      default:
        this.#restaurantList = this.#restaurantList.sort((prev, next) =>
          prev.name > next.name ? 1 : -1
        );
    }
  }
}

const RestaurantsInstance = new RestaurantsStore();
export default RestaurantsInstance;
