import {
  Category,
  Restaurant,
  CustomElement,
  Action,
  SortMethod,
  Index,
} from "../abstracts/types";
import { RESTAURANT_ACTION } from "../abstracts/constants";
import RestaurantsInstance from "./RestaurantsStore";

class Store {
  #subscribers: CustomElement[] = [];
  #modal_subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  modalSubscribe(element: CustomElement) {
    this.#modal_subscribers.push(element);
  }

  publish() {
    RestaurantsInstance.filterByCategory();
    RestaurantsInstance.sortRestaurants();

    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(RestaurantsInstance.restaurantList);
    });
  }

  publishDetail(index: Index) {
    const restaurant = RestaurantsInstance.show(index);
    this.#modal_subscribers.forEach((modal_subscribers) => {
      modal_subscribers.rerender(restaurant);
    });
  }

  reducer = {
    [RESTAURANT_ACTION.ADD_RESTAURANT]: (action: Action) => {
      RestaurantsInstance.addRestaurant(action.data as Restaurant);
      this.publish();
    },
    [RESTAURANT_ACTION.FILTER_BY_CATEGORY]: (action: Action) => {
      RestaurantsInstance.category = action.data as Category;
      this.publish();
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      RestaurantsInstance.sortMethod = action.data as SortMethod;
      this.publish();
    },
    [RESTAURANT_ACTION.UPDATE_FAVORITE]: (action: Action) => {
      RestaurantsInstance.updateFavorite(action.data as Index);
    },
    ["showDetail"]: (action: Action) => {
      this.publishDetail(action.data as Index);
    },
  };
}

const StoreInstance = new Store();

export default StoreInstance;
