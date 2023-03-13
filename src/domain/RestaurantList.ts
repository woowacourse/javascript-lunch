import { RestaurantForm, Category } from "./Restaurant";
import { sortByName, sortByDistance } from "../utils/Sort";
import { $ } from "../utils/Dom";
import RestaurantRegistry from "../UI/RestaurantRegistry";
import {
  getRestaurantListFromLocalstorage,
  stringifyJson,
} from "../utils/LocalStorage";
import { RESTAURANT_LOCALSTORAGE_KEY, FOODCATEGORY_LOCALSTORAGE_KEY, 
  SORTBY_LOCALSTORAGE_KEY, FAVORITE_LOCALSTORAGE_KEY, 
  ALL_CATEGORY_VALUE, NAME_VALUE, DISTANCE_VALUE } from "../utils/Constant";
export class RestaurantList {
  private list: RestaurantForm[] = [];
  private restaurantRegistry;

  constructor() {
    const res = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY) ?? [];
    if (res.length !== 0) {
      res.forEach((val: RestaurantForm) => {
        this.list.push(val);
      });
    }
    this.restaurantRegistry = new RestaurantRegistry();
  }

  add(restaurantInfo: RestaurantForm) {
    const res = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY) ?? [];
    this.list = [...res, restaurantInfo];

    const restaurantString = stringifyJson(this.list);
    localStorage.setItem(RESTAURANT_LOCALSTORAGE_KEY, restaurantString);
  }

  get listRestaurant(): RestaurantForm[] {
    return this.list;
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    if (category === ALL_CATEGORY_VALUE) {
      return this.list;
    }

    return this.foodFilter(category, filteredList);
  }

  foodFilter(category: Category, filteredList: RestaurantForm[]) {
    this.list.filter((info) => {
      if (info.category === category) filteredList.push(info);
    });

    return filteredList;
  }

  filterCategory(selectedValue: Category) {
    localStorage.setItem(FOODCATEGORY_LOCALSTORAGE_KEY, selectedValue);

    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(selectedValue);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  filterBySort(sortBy: string, foodCategory: Category) {
    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(foodCategory);

    if (sortBy === NAME_VALUE) sortByName(restaurantParsedInfo);
    if (sortBy === DISTANCE_VALUE) sortByDistance(restaurantParsedInfo);

    localStorage.setItem(SORTBY_LOCALSTORAGE_KEY, sortBy);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  attachRestaurantToRegistry(restaurantParsedInfo: RestaurantForm[]) {
    restaurantParsedInfo.forEach((value) => {
      this.restaurantRegistry.appendRestaurant(value);
    });
  }

  deleteRestaurantElement() {
    const restaurantId = $(".modal--detail").id;
    const res = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY) ?? [];

    const deletedRestaurantElementArray = res.filter(
      (val: RestaurantForm) => val.id !== Number(restaurantId)
    );
    localStorage.setItem(
      RESTAURANT_LOCALSTORAGE_KEY,
      stringifyJson(deletedRestaurantElementArray)
    );
    this.list = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY) ?? [];

    const restaruantFavorite =
      getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY) ?? [];
    const deletedRestaurantElementList = restaruantFavorite.filter(
      (val: RestaurantForm) => {
        return val.id !== Number(restaurantId);
      }
    );
    localStorage.setItem(
      FAVORITE_LOCALSTORAGE_KEY,
      stringifyJson(deletedRestaurantElementList)
    );
  }
}
