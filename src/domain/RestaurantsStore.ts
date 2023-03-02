import {
  Category,
  Restaurant,
  CustomElement,
  Action,
  SortMethod,
} from "../abstracts/types";
import { RESTAURANT_ACTION } from "../abstracts/constants";

class RestaurantsStore {
  #restaurantList: Restaurant[] =
    JSON.parse(localStorage.getItem("restaurantList")!) || [];
  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  publish() {
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
    return this.#restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  sortRestaurants(sortMethod: SortMethod) {
    switch (sortMethod) {
      case "이름순":
        return this.#restaurantList.sort((prev, next) =>
          prev.name > next.name ? 1 : -1
        );
      case "거리순":
        return this.#restaurantList.sort(
          (prev, next) => prev.distance - next.distance
        );
    }
  }
}

const RestaurantInstance = new RestaurantsStore();

export default RestaurantInstance;
