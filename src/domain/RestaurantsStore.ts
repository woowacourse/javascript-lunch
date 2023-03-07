import { Category, Restaurant, Action, SortMethod } from "../abstracts/types";
import {
  CATEGORY_DEFAULT,
  RESTAURANTS_STORAGE,
  RESTAURANT_ACTION,
  SORT_METHOD,
} from "../abstracts/constants";
import CustomElement from "../abstracts/CustomElement";
import Store from "./Store";
import {
  getArrayFromLocalStorage,
  setArrayToLocalStorage,
} from "../utils/localStorage";

class RestaurantsStore extends Store {
  #restaurantList: Restaurant[] = [];
  #category: Category = CATEGORY_DEFAULT;
  #sortMethod: SortMethod = SORT_METHOD.NAME;

  constructor() {
    super();
    if (!localStorage.getItem(RESTAURANTS_STORAGE)) {
      setArrayToLocalStorage(RESTAURANTS_STORAGE, this.#restaurantList);
      return;
    }
    this.#restaurantList = getArrayFromLocalStorage(RESTAURANTS_STORAGE);
  }

  publish() {
    this.#restaurantList = getArrayFromLocalStorage(RESTAURANTS_STORAGE);
    this.filterByCategory(this.#category);
    this.sortRestaurants(this.#sortMethod);
    this.getSubscribers().forEach((subscriber) => {
      subscriber.rerender(this.#restaurantList);
    });
  }

  reducer = {
    [RESTAURANT_ACTION.ADD_RESTAURANT]: (action: Action) => {
      this.addRestaurant(action.data as Restaurant);
      this.publish();
    },
    [RESTAURANT_ACTION.FILTER_BY_CATEGORY]: (action: Action) => {
      this.filterByCategory(action.data as Category);
      this.publish();
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      this.sortRestaurants(action.data as SortMethod);
      this.publish();
    },
  };

  addRestaurant(restaurant: Restaurant) {
    this.#restaurantList.push(restaurant);
    setArrayToLocalStorage(RESTAURANTS_STORAGE, this.#restaurantList);
  }

  filterByCategory(category: Category) {
    this.#category = category;
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
