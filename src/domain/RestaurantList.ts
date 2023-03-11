import { RestaurantForm, Category } from "./Restaurant";
import { sortByName, sortByDistance } from "../utils/Sort";
import { $ } from "../utils/Dom";
import RestaurantRegistry from "../UI/RestaurantRegistry";
import {
  getRestaurantListFromLocalstorage,
  stringifyJson,
} from "../utils/LocalStorage";
import { RESTAURANT } from "../utils/Constant";
export class RestaurantList {
  private list: RestaurantForm[] = [];
  private restaurantRegistry;

  constructor() {
    const res = getRestaurantListFromLocalstorage(RESTAURANT) ?? [];
    if (res.length !== 0) {
      res.forEach((val: RestaurantForm) => {
        this.list.push(val);
      });
    }
    this.restaurantRegistry = new RestaurantRegistry();
  }

  add(restaurantInfo: RestaurantForm) {
    const res = getRestaurantListFromLocalstorage(RESTAURANT) ?? [];
    this.list = [...res, restaurantInfo];

    const restaurantString = stringifyJson(this.list);
    localStorage.setItem("restaurants", restaurantString);
  }

  get listRestaurant(): RestaurantForm[] {
    return this.list;
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    if (category === "전체") {
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
    localStorage.setItem("foodCategory", selectedValue);

    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(selectedValue);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  filterBySort(sortBy: string, foodCategory: Category) {
    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(foodCategory);

    if (sortBy === "name") sortByName(restaurantParsedInfo);
    if (sortBy === "distance") sortByDistance(restaurantParsedInfo);

    localStorage.setItem("sort", sortBy);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  attachRestaurantToRegistry(restaurantParsedInfo: RestaurantForm[]) {
    restaurantParsedInfo.forEach((value) => {
      this.restaurantRegistry.appendRestaurant(value);
    });
  }

  deleteRestaurantElement() {
    const restaurantId = $(".modal--detail").id;
    const res = getRestaurantListFromLocalstorage(RESTAURANT) ?? [];

    const deletedRestaurantElementArray = res.filter(
      (val: RestaurantForm) => val.id !== Number(restaurantId)
    );
    localStorage.setItem(
      "restaurants",
      stringifyJson(deletedRestaurantElementArray)
    );
    this.list = getRestaurantListFromLocalstorage(RESTAURANT) ?? []

    const restaruantFavorite = getRestaurantListFromLocalstorage("favorite") ?? [];
    const deletedRestaurantElementList = restaruantFavorite.filter((val: RestaurantForm) => {
      return val.id !== Number(restaurantId)
    });
    localStorage.setItem(
      "favorite",
      stringifyJson(deletedRestaurantElementList)
    );
  }
}
