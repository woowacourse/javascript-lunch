import {
  Category,
  Restaurant,
  CustomElement,
  Action,
  SortMethod,
} from "../abstracts/types";
import {
  CATEGORY_DEFAULT,
  RESTAURANTS_STORAGE,
  RESTAURANT_ACTION,
  SORT_METHOD,
} from "../abstracts/constants";

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

  publish() {
    this.filterByCategory();
    this.sortRestaurants();
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
      this.#category = action.data as Category;
      this.publish();
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      this.#sortMethod = action.data as SortMethod;
      this.publish();
    },
  };

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
        this.#restaurantList = this.#restaurantList;
    }
  }
}

const RestaurantInstance = new RestaurantsStore();

export default RestaurantInstance;
