import { RestaurantForm, Category } from './Restaurant';
import { sortByName, sortByDistance } from '../utils/Sort';
import { $ } from '../utils/Dom';
import RestaurantRegistry from '../UI/RestaurantRegistry';
import { getRestaurantListFromLocalstorage, stringifyJson } from '../utils/LocalStorage';
import { LOCALSTORAGE_KEY, LOCAL_INPUT, FORM_VALUE } from '../utils/Constant';
export class RestaurantList {
  private list: RestaurantForm[] = [];
  private restaurantRegistry;

  constructor() {
    const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];
    if (res.length !== 0) {
      res.forEach((val: RestaurantForm) => {
        this.list.push(val);
      });
    }
    this.restaurantRegistry = new RestaurantRegistry();
  }

  add(restaurantInfo: RestaurantForm) {
    const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];
    this.list = [...res, restaurantInfo];

    const restaurantString = stringifyJson(this.list);
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT, restaurantString);
  }

  get listRestaurant(): RestaurantForm[] {
    return this.list;
  }

  categoryFilter(category: Category) {
    if (category === LOCAL_INPUT.ALL_CATEGORY) {
      const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];
      this.list = [...res];
      return this.list;
    }

    return this.foodFilter(category);
  }

  foodFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];
    this.list = [...res];
    this.list.forEach(info => {
      if (info.category === category) filteredList.push(info);
    });

    return filteredList;
  }

  filterCategory(selectedValue: Category) {
    localStorage.setItem(LOCALSTORAGE_KEY.FOODCATEGORY, selectedValue);

    $('.restaurant-list').replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(selectedValue);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  filterBySort(sortBy: string, foodCategory: Category) {
    $('.restaurant-list').replaceChildren();
    const restaurantParsedInfo = this.categoryFilter(foodCategory);

    if (sortBy === FORM_VALUE.NAME) sortByName(restaurantParsedInfo);
    if (sortBy === FORM_VALUE.DISTANCE) sortByDistance(restaurantParsedInfo);

    localStorage.setItem(LOCALSTORAGE_KEY.SORTBY, sortBy);
    this.attachRestaurantToRegistry(restaurantParsedInfo);
  }

  attachRestaurantToRegistry(restaurantParsedInfo: RestaurantForm[]) {
    restaurantParsedInfo.forEach(value => {
      this.restaurantRegistry.appendRestaurant(value);
    });
  }

  deleteRestaurantElement() {
    const restaurantId = $('.modal--detail').id;
    const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];

    const deletedRestaurantElementArray = res.filter((val: RestaurantForm) => val.id !== Number(restaurantId));
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT, stringifyJson(deletedRestaurantElementArray));
    this.list = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT) ?? [];

    const restaruantFavorite = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.FAVORITE) ?? [];
    const deletedRestaurantElementList = restaruantFavorite.filter((val: RestaurantForm) => {
      return val.id !== Number(restaurantId);
    });
    localStorage.setItem(LOCALSTORAGE_KEY.FAVORITE, stringifyJson(deletedRestaurantElementList));
  }
}
