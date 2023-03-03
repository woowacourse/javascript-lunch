import {
  Category,
  Restaurant,
  CustomElement,
  Action,
  SortMethod,
} from "../abstracts/types";
import { RESTAURANT_ACTION } from "../abstracts/constants";

class RestaurantsStore {
  #restaurantList: Restaurant[] = [];
  #category: Category = "전체";
  #sortMethod: SortMethod = "name";

  #subscribers: CustomElement[] = [];

  constructor() {
    if (!localStorage.getItem("restaurantList")) {
      localStorage.setItem(
        "restaurantList",
        JSON.stringify(this.#restaurantList)
      );
    }
  }

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  publish() {
    this.filterByCategory(this.#category);
    this.sortRestaurants(this.#sortMethod);
    this.#subscribers.forEach((subscriber) => {
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
    localStorage.setItem(
      "restaurantList",
      JSON.stringify(this.#restaurantList)
    );
  }

  filterByCategory(category: Category) {
    this.#category = category;
    this.#restaurantList = JSON.parse(localStorage.getItem("restaurantList")!);
    if (this.#category !== "전체") {
      this.#restaurantList = this.#restaurantList.filter(
        (restaurant) => restaurant.category === this.#category
      );
    }
  }

  sortRestaurants(sortMethod: SortMethod) {
    this.#sortMethod = sortMethod;
    switch (this.#sortMethod) {
      case "name":
        this.#restaurantList = this.#restaurantList.sort((prev, next) =>
          prev.name > next.name ? 1 : -1
        );
        break;
      case "distance":
        this.#restaurantList = this.#restaurantList.sort(
          (prev, next) => prev.distance - next.distance
        );
        break;
    }
  }
}

const RestaurantInstance = new RestaurantsStore();

export default RestaurantInstance;
