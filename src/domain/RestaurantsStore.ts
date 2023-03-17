import {
  Category,
  Index,
  MENU_TAP,
  Restaurant,
  SortMethod,
} from "../abstracts/types";
import {
  CATEGORY_DEFAULT,
  MENU,
  RESTAURANTS_STORAGE,
  SORT_METHOD,
} from "../abstracts/constants";

class RestaurantsStore {
  #restaurantList: Restaurant[] = [];
  #category: Category = CATEGORY_DEFAULT;
  #sortMethod: SortMethod = SORT_METHOD.NAME;

  constructor() {
    this.hasNoneRestaurantList();
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

  show(index: Index) {
    this.refreshRestaurantList();
    return this.#restaurantList[index];
  }

  updateFavorite(index: Index) {
    this.refreshRestaurantList();

    this.#restaurantList[index].favorite =
      this.#restaurantList[index].favorite === 0 ? 1 : 0;

    this.updateLocalStorage();
  }

  refreshRestaurantList() {
    if (!localStorage.getItem(RESTAURANTS_STORAGE))
      throw new Error("[ERROR] localStorage에 값이 없습니다.");

    this.#restaurantList = JSON.parse(
      localStorage.getItem(RESTAURANTS_STORAGE) as string
    );
  }

  hasNoneRestaurantList() {
    if (!localStorage.getItem(RESTAURANTS_STORAGE)) {
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem(
      RESTAURANTS_STORAGE,
      JSON.stringify(this.#restaurantList)
    );
  }

  deleteRestaurant(index: Index) {
    this.refreshRestaurantList();
    this.#restaurantList = this.#restaurantList.filter((restaurant, i) => {
      if (restaurant.key && i > index) {
        restaurant.key = restaurant.key - 1;
      }
      return restaurant;
    });
    this.#restaurantList.splice(index, 1);

    this.updateLocalStorage();
  }

  addRestaurant(restaurant: Restaurant) {
    try {
      this.refreshRestaurantList();
      this.#restaurantList.push(restaurant);
      restaurant.key = this.#restaurantList.length - 1;

      this.updateLocalStorage();
    } catch (e) {
      this.hasNoneRestaurantList();
    }
  }

  changeMenu(menu: MENU_TAP) {
    try {
      this.refreshRestaurantList();
    } catch (e) {
      this.hasNoneRestaurantList();
    }
    this.#category = CATEGORY_DEFAULT;
    this.#sortMethod = SORT_METHOD.NAME;

    if (menu === MENU.FAVORITE) this.filterByMenu();
  }

  filterByMenu() {
    this.#restaurantList = this.#restaurantList.filter(
      (restaurant) => restaurant.favorite === 1
    );
  }

  filterByCategory() {
    try {
      this.refreshRestaurantList();

      if (this.#category !== CATEGORY_DEFAULT) {
        this.#restaurantList = this.#restaurantList.filter(
          (restaurant) => restaurant.category === this.#category
        );
      }
    } catch (e) {
      this.hasNoneRestaurantList();
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
