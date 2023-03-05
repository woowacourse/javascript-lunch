import { Category, Restaurant, Action, SortMethod } from "../abstracts/types";
import {
  CATEGORY_DEFAULT,
  RESTAURANTS_STORAGE,
  RESTAURANT_ACTION,
  SORT_METHOD,
} from "../abstracts/constants";
import CustomElement from "../abstracts/CustomElement";

class RestaurantsStore {
  #restaurantList: Restaurant[] = [];
  #category: Category = CATEGORY_DEFAULT;
  #sortMethod: SortMethod = SORT_METHOD.NAME;

  #subscribers: CustomElement[] = [];

  constructor() {
    if (!localStorage.getItem(RESTAURANTS_STORAGE)) {
      localStorage.setItem(
        RESTAURANTS_STORAGE,
        JSON.stringify(this.#restaurantList)
      );
    }
  }

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  publish(action: Action) {
    this.filterByCategory(this.#category);
    this.sortRestaurants(this.#sortMethod);
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(this.#restaurantList);
    });
  }

  reducer = {
    [RESTAURANT_ACTION.ADD_RESTAURANT]: (action: Action) => {
      this.addRestaurant(action.data as Restaurant);
      this.publish(action);
    },
    [RESTAURANT_ACTION.FILTER_BY_CATEGORY]: (action: Action) => {
      this.filterByCategory(action.data as Category);
      this.publish(action);
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      this.sortRestaurants(action.data as SortMethod);
      this.publish(action);
    },
  };

  addRestaurant(restaurant: Restaurant) {
    this.#restaurantList.push(restaurant);
    localStorage.setItem(
      RESTAURANTS_STORAGE,
      JSON.stringify(this.#restaurantList)
    );
  }

  filterByCategory(category: Category) {
    this.#category = category;
    this.#restaurantList = JSON.parse(
      localStorage.getItem(RESTAURANTS_STORAGE)!
    );
    if (this.#category !== CATEGORY_DEFAULT) {
      this.#restaurantList = this.#restaurantList.filter(
        (restaurant) => restaurant.category === this.#category
      );
    }
  }

  sortRestaurants(sortMethod: SortMethod) {
    this.#sortMethod = sortMethod;
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
    }
  }
}

const RestaurantInstance = new RestaurantsStore();

export default RestaurantInstance;
